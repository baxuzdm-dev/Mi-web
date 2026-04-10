"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, getSession } from "next-auth/react";

import { Zap, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLang } from "@/contexts/LangContext";

export default function LoginPage() {
  const router = useRouter();
  const { t } = useLang();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);

    if (res?.error) {
      setError(t("login.error"));
    } else {
      const session = await getSession();
      const role = session?.user?.role;
      if (role === "CREATOR") router.push("/creator");
      else if (role === "AGENCY") router.push("/agency");
      else if (role === "BRAND") router.push("/dashboard");
      else router.push("/onboarding");
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
          <h1 className="text-2xl font-bold text-white mt-6 mb-2">{t("login.welcome")}</h1>
          <p className="text-white/50">{t("login.sub")}</p>
        </div>

        {/* Demo credentials */}
        <div className="mb-4 p-4 rounded-xl border border-violet-500/20 bg-violet-500/5 text-xs space-y-1.5">
          <p className="text-violet-300 font-semibold mb-2">Cuentas de demo</p>
          {[
            { label: "Creador", email: "creator@demo.com" },
            { label: "Agencia", email: "agency@demo.com" },
            { label: "Marca",   email: "brand@demo.com" },
          ].map(({ label, email: demoEmail }) => (
            <button
              key={demoEmail}
              type="button"
              onClick={() => { setEmail(demoEmail); setPassword("demo1234"); }}
              className="flex items-center justify-between w-full px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
              <span className="font-medium">{label}</span>
              <span className="text-white/40 font-mono">{demoEmail}</span>
            </button>
          ))}
          <p className="text-white/30 pt-1">Contraseña: <span className="font-mono text-white/50">demo1234</span></p>
        </div>

        <div className="p-8 rounded-2xl border border-white/10 bg-white/4 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("login.email")}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <Input id="email" type="email" placeholder="you@example.com" className="pl-9" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t("login.password")}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <Input id="password" type="password" placeholder="••••••••" className="pl-9" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>
            )}

            <Button type="submit" variant="gradient" className="w-full gap-2" disabled={loading}>
              {loading ? t("login.signingIn") : t("login.signIn")}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </Button>
          </form>

          <p className="text-center text-sm text-white/50 mt-6">
            {t("login.noAccount")}{" "}
            <Link href="/register" className="text-violet-400 hover:text-violet-300">{t("login.signUp")}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
