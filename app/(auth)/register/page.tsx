"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  Zap, Mail, Lock, User, ArrowRight,
  Users, Building2, ShoppingBag, DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Role = "CREATOR" | "AGENCY" | "BRAND";

const INDUSTRIES = [
  "Moda y Belleza", "Tecnología", "Alimentación y Bebidas",
  "Deportes y Fitness", "Entretenimiento", "Hogar y Decoración",
  "Salud y Bienestar", "Viajes y Turismo", "Automotriz", "Finanzas", "Otro",
];

const PLATFORMS = ["Instagram", "TikTok", "YouTube", "OnlyFans", "Twitter/X", "Facebook", "Twitch", "Spotify"];

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("CREATOR");
  // Brand-specific fields
  const [industry, setIndustry] = useState("");
  const [budget, setBudget] = useState("");
  const [brandPlatforms, setBrandPlatforms] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function togglePlatform(p: string) {
    setBrandPlatforms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Error al registrarse");
        setLoading(false);
        return;
      }

      await signIn("credentials", { email, password, redirect: false });
      router.push("/onboarding");
    } catch {
      setError("Algo salió mal. Por favor intenta de nuevo.");
      setLoading(false);
    }
  }

  const roles: { value: Role; label: string; icon: React.ReactNode; color: string; activeClass: string }[] = [
    {
      value: "CREATOR",
      label: "Creador",
      icon: <Users className="w-6 h-6" />,
      color: "violet",
      activeClass: "border-violet-500/60 bg-violet-500/15 text-violet-300",
    },
    {
      value: "AGENCY",
      label: "Agencia",
      icon: <Building2 className="w-6 h-6" />,
      color: "pink",
      activeClass: "border-pink-500/60 bg-pink-500/15 text-pink-300",
    },
    {
      value: "BRAND",
      label: "Marca",
      icon: <ShoppingBag className="w-6 h-6" />,
      color: "orange",
      activeClass: "border-orange-500/60 bg-orange-500/15 text-orange-300",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-violet-600/8 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-md relative">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-white">Mundo Creadores</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mt-6 mb-2">Crea tu cuenta</h1>
          <p className="text-white/50">Únete a miles de creadores, agencias y marcas</p>
        </div>

        <div className="p-8 rounded-2xl border border-white/10 bg-white/4 backdrop-blur-sm">
          {/* Role Selection */}
          <div className="mb-6">
            <Label className="block mb-3 text-white/70">Soy una...</Label>
            <div className="grid grid-cols-3 gap-2">
              {roles.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setRole(r.value)}
                  className={cn(
                    "flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all duration-200",
                    role === r.value
                      ? r.activeClass
                      : "border-white/10 bg-white/5 text-white/50 hover:border-white/20"
                  )}
                >
                  {r.icon}
                  <span className="text-xs font-medium">{r.label}</span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Common fields */}
            <div className="space-y-2">
              <Label htmlFor="name">
                {role === "BRAND" ? "Nombre de la empresa" : "Nombre completo"}
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <Input
                  id="name"
                  type="text"
                  placeholder={role === "BRAND" ? "Ej: Nike LATAM" : "Tu nombre completo"}
                  className="pl-9"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@empresa.com"
                  className="pl-9"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  className="pl-9"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  required
                />
              </div>
            </div>

            {/* Brand-specific fields */}
            {role === "BRAND" && (
              <>
                <div className="pt-2 pb-1">
                  <div className="h-px bg-white/8" />
                  <p className="text-xs text-white/40 mt-3 mb-3">Información de tu marca</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industria</Label>
                  <select
                    id="industry"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="flex h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                    required={role === "BRAND"}
                  >
                    <option value="" className="bg-[#1a1a2e]">Selecciona una industria</option>
                    {INDUSTRIES.map((i) => (
                      <option key={i} value={i} className="bg-[#1a1a2e]">{i}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Presupuesto mensual para influencers (USD)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <select
                      id="budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="flex h-10 w-full rounded-lg border border-white/10 bg-white/5 pl-9 pr-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                    >
                      <option value="" className="bg-[#1a1a2e]">Selecciona un rango</option>
                      <option value="500-2000" className="bg-[#1a1a2e]">$500 - $2,000</option>
                      <option value="2000-5000" className="bg-[#1a1a2e]">$2,000 - $5,000</option>
                      <option value="5000-15000" className="bg-[#1a1a2e]">$5,000 - $15,000</option>
                      <option value="15000-50000" className="bg-[#1a1a2e]">$15,000 - $50,000</option>
                      <option value="50000+" className="bg-[#1a1a2e]">$50,000+</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Redes sociales donde quieres publicitar</Label>
                  <div className="flex flex-wrap gap-2">
                    {PLATFORMS.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => togglePlatform(p)}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-xs border transition-all duration-200",
                          brandPlatforms.includes(p)
                            ? "border-orange-500/60 bg-orange-500/15 text-orange-300"
                            : "border-white/10 bg-white/5 text-white/50 hover:border-white/20"
                        )}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <Button type="submit" variant="gradient" className="w-full gap-2" disabled={loading}>
              {loading ? "Creando cuenta..." : "Crear cuenta"}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </Button>
          </form>

          <p className="text-center text-sm text-white/50 mt-6">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="text-violet-400 hover:text-violet-300">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
