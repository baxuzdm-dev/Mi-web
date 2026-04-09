"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Zap, Mail, Lock, User, ArrowRight, Users, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useLang } from "@/contexts/LangContext";

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useLang();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"CREATOR" | "AGENCY">("CREATOR");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
        setError(data.error ?? "Registration failed");
        setLoading(false);
        return;
      }

      await signIn("credentials", { email, password, redirect: false });
      router.push("/onboarding");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-violet-600/8 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-md relative">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center">
              <Zap className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-white">Mundo Creadores</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mt-6 mb-2">{t("register.title")}</h1>
          <p className="text-white/50">{t("register.sub")}</p>
        </div>

        <div className="p-8 rounded-2xl border border-white/10 bg-white/4 backdrop-blur-sm">
          {/* Role Selection */}
          <div className="mb-6">
            <Label className="block mb-3">{t("register.iAm")}</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("CREATOR")}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200",
                  role === "CREATOR"
                    ? "border-violet-500/60 bg-violet-500/15 text-violet-300"
                    : "border-white/10 bg-white/5 text-white/50 hover:border-white/20"
                )}
              >
                <Users className="w-6 h-6" />
                <span className="text-sm font-medium">{t("register.creator")}</span>
              </button>
              <button
                type="button"
                onClick={() => setRole("AGENCY")}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200",
                  role === "AGENCY"
                    ? "border-pink-500/60 bg-pink-500/15 text-pink-300"
                    : "border-white/10 bg-white/5 text-white/50 hover:border-white/20"
                )}
              >
                <Building2 className="w-6 h-6" />
                <span className="text-sm font-medium">{t("register.agency")}</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t("register.name")}</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <Input id="name" type="text" placeholder={t("register.namePH")} className="pl-9" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t("register.email")}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <Input id="email" type="email" placeholder="you@example.com" className="pl-9" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t("register.password")}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <Input id="password" type="password" placeholder={t("register.passwordPH")} className="pl-9" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} required />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>
            )}

            <Button type="submit" variant="gradient" className="w-full gap-2" disabled={loading}>
              {loading ? t("register.submitting") : t("register.submit")}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </Button>
          </form>

          <p className="text-center text-sm text-white/50 mt-6">
            {t("register.haveAccount")}{" "}
            <Link href="/login" className="text-violet-400 hover:text-violet-300">{t("register.signIn")}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
