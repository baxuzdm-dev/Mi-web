"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight, Zap, ShieldCheck, MessageSquare, TrendingUp,
  Star, Users, Building2, CheckCircle2, ChevronDown, Check, ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/contexts/LangContext";

/* ─────────────────────────────── data ──────────────────────────────── */

const stats = [
  { labelKey: "landing.stats.creators", value: "12,000+" },
  { labelKey: "landing.stats.agencies", value: "340+" },
  { label: "Marcas activas", value: "2,500+" },
  { labelKey: "landing.stats.matches", value: "8,500+" },
  { labelKey: "landing.stats.revenue", value: "$42M+" },
];

const testimonials = [
  {
    name: "Sofia M.",
    role: "Content Creator",
    text: "Found my agency within 3 days. They helped me double my monthly revenue in 6 months. This platform is a game changer.",
    followers: "450K",
  },
  {
    name: "Elite Talent Agency",
    role: "Management Agency",
    text: "We've onboarded 40+ creators through Mundo Creadores. The quality of talent here is unmatched.",
    creators: "120+",
  },
  {
    name: "Luna R.",
    role: "Content Creator",
    text: "The chat feature made it so easy to communicate with agencies. I signed with my dream team in under a week.",
    followers: "890K",
  },
];

const agencyPartners = [
  "Stellar Talent Group",
  "Nexus Agency",
  "LatamCreators Hub",
  "VidPro Management",
  "ContentFirst Agency",
  "Pinnacle Talent",
  "CreatorX",
  "MediaForge Agency",
];

const brandPartners = [
  { name: "Adidas", color: "from-black/60 to-white/10" },
  { name: "L'Oréal", color: "from-rose-900/60 to-rose-700/40" },
  { name: "Samsung", color: "from-blue-900/60 to-blue-700/40" },
  { name: "Red Bull", color: "from-red-900/60 to-orange-700/40" },
  { name: "Spotify", color: "from-emerald-900/60 to-emerald-700/40" },
  { name: "Zara", color: "from-zinc-800/60 to-zinc-600/40" },
  { name: "Netflix", color: "from-red-900/60 to-black/60" },
  { name: "Nike", color: "from-orange-900/60 to-orange-700/40" },
];

const pricingPlans = [
  {
    id: "gratis",
    name: "Gratis",
    target: "Creadores",
    monthlyPrice: 0,
    annualPrice: 0,
    popular: false,
    accentClass: "border-white/10",
    badgeClass: "",
    features: [
      "Perfil verificado",
      "Hasta 5 aplicaciones/mes",
      "Chat básico",
      "Badge de creador",
      "Búsqueda de agencias",
    ],
    cta: "Empezar Gratis",
    ctaVariant: "outline" as const,
    ctaClass: "bg-white/10 hover:bg-white/15 border border-white/20 text-white w-full",
  },
  {
    id: "pro",
    name: "Pro Agency",
    target: "Agencias",
    monthlyPrice: 99,
    annualPrice: 79,
    popular: true,
    accentClass: "border-violet-500/60",
    badgeClass: "ring-1 ring-violet-500/40",
    features: [
      "Todo lo de Gratis",
      "Hasta 50 creadores en roster",
      "Filtros avanzados",
      "Analytics de perfiles",
      "Soporte prioritario",
      "Badge verificado",
    ],
    cta: "Empezar Pro",
    ctaVariant: "gradient" as const,
    ctaClass: "w-full",
  },
  {
    id: "elite",
    name: "Elite Agency",
    target: "Agencias",
    monthlyPrice: 299,
    annualPrice: 239,
    popular: false,
    accentClass: "border-pink-500/30",
    badgeClass: "",
    features: [
      "Todo lo de Pro",
      "Creadores ilimitados",
      "API access",
      "Gestor de cuenta dedicado",
      "Contratos digitales",
      "Featured listing",
    ],
    cta: "Empezar Elite",
    ctaVariant: "outline" as const,
    ctaClass: "border-pink-500/40 hover:bg-pink-500/10 text-pink-300 w-full",
  },
];

const faqItems = [
  {
    q: "¿Es gratis para los creadores?",
    a: "Sí, completamente gratis para creadores. Solo las agencias pagan para acceder a funciones avanzadas de gestión y búsqueda.",
  },
  {
    q: "¿Cómo funciona la verificación?",
    a: "Revisamos tu ID y estadísticas de plataformas para garantizar autenticidad. El proceso tarda entre 24 y 48 horas.",
  },
  {
    q: "¿Cuánto tiempo tarda el proceso de matching?",
    a: "La mayoría de creadores reciben su primera oferta en 48-72 horas. Depende de tu nicho y del número de agencias activas en tu categoría.",
  },
  {
    q: "¿Puedo cancelar mi suscripción en cualquier momento?",
    a: "Sí, cancela cuando quieras sin penalizaciones ni cargos ocultos. Tu plan se mantiene activo hasta el final del período pagado.",
  },
  {
    q: "¿Qué plataformas están soportadas?",
    a: "TikTok, Instagram, YouTube, OnlyFans y más. Seguimos añadiendo integraciones constantemente.",
  },
  {
    q: "¿Cómo se manejan los contratos?",
    a: "Los planes Pro y Elite incluyen contratos digitales con firma electrónica, almacenamiento seguro y seguimiento del estado en tiempo real.",
  },
];

/* ──────────────── Social icon helpers (SVG) ──────────────── */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.75a8.2 8.2 0 0 0 4.79 1.53V6.84a4.85 4.85 0 0 1-1.02-.15z" />
    </svg>
  );
}
function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

/* ─────────────────────────────── page ──────────────────────────────── */

export default function LandingPage() {
  const { t } = useLang();
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const features = [
    { icon: <Zap className="w-5 h-5" />, titleKey: "landing.feature1Title", descKey: "landing.feature1Desc" },
    { icon: <ShieldCheck className="w-5 h-5" />, titleKey: "landing.feature2Title", descKey: "landing.feature2Desc" },
    { icon: <MessageSquare className="w-5 h-5" />, titleKey: "landing.feature3Title", descKey: "landing.feature3Desc" },
    { icon: <TrendingUp className="w-5 h-5" />, titleKey: "landing.feature4Title", descKey: "landing.feature4Desc" },
  ];

  return (
    <div className="overflow-hidden">
      {/* ── Hero ── */}
      <section className="relative pt-20 pb-32 px-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-violet-600/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-pink-600/8 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm mb-8">
            <Star className="w-3.5 h-3.5" />
            <span>{t("landing.badge")}</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            {t("landing.headline1")}
            <br />
            <span className="gradient-text">{t("landing.headline2")}</span>
          </h1>

          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t("landing.sub")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button variant="gradient" size="xl" className="gap-2">
                {t("landing.cta")} <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/explore/creators">
              <Button variant="outline" size="xl" className="gap-2">
                {t("landing.exploreCreators")}
              </Button>
            </Link>
          </div>

          <p className="text-white/30 text-sm mt-6">{t("landing.noCreditCard")}</p>
        </div>

        {/* Stats bar */}
        <div className="max-w-5xl mx-auto mt-20">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-white/8 rounded-2xl overflow-hidden border border-white/8">
            {stats.map((stat, i) => (
              <div key={i} className="bg-[#0a0a0f] p-6 text-center">
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/50">{"label" in stat ? stat.label : t(stat.labelKey!)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-24 px-4 border-t border-white/8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="default" className="mb-4">{t("landing.howItWorks")}</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">{t("landing.howItWorksSub")}</h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">{t("landing.howItWorksSub2")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* For Creators */}
            <div className="space-y-5 p-6 rounded-2xl border border-white/8 bg-white/3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-violet-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">{t("landing.forCreators")}</h3>
              </div>
              {(["landing.creatorStep1","landing.creatorStep2","landing.creatorStep3","landing.creatorStep4"] as const).map((key, i) => (
                <div key={key} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center shrink-0 text-violet-400 text-xs font-bold mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed">{t(key)}</p>
                </div>
              ))}
              <Link href="/register?role=creator">
                <Button variant="gradient" size="sm" className="mt-2 gap-2 w-full">
                  {t("landing.joinCreator")} <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* For Agencies */}
            <div className="space-y-5 p-6 rounded-2xl border border-pink-500/20 bg-pink-500/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-pink-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">{t("landing.forAgencies")}</h3>
              </div>
              {(["landing.agencyStep1","landing.agencyStep2","landing.agencyStep3","landing.agencyStep4"] as const).map((key, i) => (
                <div key={key} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-pink-600/20 border border-pink-500/30 flex items-center justify-center shrink-0 text-pink-400 text-xs font-bold mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed">{t(key)}</p>
                </div>
              ))}
              <Link href="/register?role=agency">
                <Button variant="outline" size="sm" className="mt-2 gap-2 w-full border-pink-500/30 hover:bg-pink-500/10 text-pink-300">
                  {t("landing.joinAgency")} <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* For Brands */}
            <div className="space-y-5 p-6 rounded-2xl border border-orange-500/20 bg-orange-500/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Para Marcas</h3>
              </div>
              {[
                "Crea el perfil de tu marca y publica campañas en minutos",
                "Accede a +12,000 creadores filtrados por nicho, alcance y precio",
                "Gestiona propuestas, contratos y pagos en un solo lugar",
                "Analiza el rendimiento de cada campaña con métricas en tiempo real",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-600/20 border border-orange-500/30 flex items-center justify-center shrink-0 text-orange-400 text-xs font-bold mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed">{step}</p>
                </div>
              ))}
              <Link href="/register?role=brand">
                <Button variant="outline" size="sm" className="mt-2 gap-2 w-full border-orange-500/30 hover:bg-orange-500/10 text-orange-300">
                  Registrar mi marca <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 px-4 border-t border-white/8 bg-white/2">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="default" className="mb-4">{t("landing.features")}</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">{t("landing.featuresTitle")}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.titleKey} className="p-6 rounded-2xl border border-white/8 bg-white/3 hover:border-violet-500/30 hover:bg-white/5 transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center text-violet-400 mb-4">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-white mb-2">{t(f.titleKey)}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{t(f.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 px-4 border-t border-white/8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="default" className="mb-4">{t("landing.testimonials")}</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">{t("landing.testimonialsTitle")}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((tm) => (
              <div key={tm.name} className="p-6 rounded-2xl border border-white/8 bg-white/3 flex flex-col gap-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-white/70 leading-relaxed flex-1">&quot;{tm.text}&quot;</p>
                <div className="pt-2 border-t border-white/8">
                  <div className="font-semibold text-white">{tm.name}</div>
                  <div className="text-sm text-white/50">{tm.role}</div>
                  {tm.followers && <Badge variant="default" className="mt-2 text-xs">{tm.followers} followers</Badge>}
                  {tm.creators && <Badge variant="pink" className="mt-2 text-xs">{tm.creators} creators managed</Badge>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          NEW SECTION 1 — Partner Logos Marquee
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 border-t border-white/8 bg-[#0d0d14] overflow-hidden">
        <div className="max-w-6xl mx-auto mb-10 text-center">
          <p className="text-white/40 text-sm uppercase tracking-widest font-medium">
            Agencias que confían en nosotros
          </p>
        </div>

        {/* Marquee track */}
        <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="flex gap-4 shrink-0 animate-marquee">
            {[...agencyPartners, ...agencyPartners].map((name, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-5 py-3 rounded-xl border border-white/10 bg-white/5 shrink-0 select-none"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600/70 to-pink-600/70 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {name.charAt(0)}
                </div>
                <span className="text-white/70 text-sm font-medium whitespace-nowrap">{name}</span>
              </div>
            ))}
          </div>
          {/* Duplicate for seamless loop */}
          <div className="flex gap-4 shrink-0 animate-marquee" aria-hidden>
            {[...agencyPartners, ...agencyPartners].map((name, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-5 py-3 rounded-xl border border-white/10 bg-white/5 shrink-0 select-none"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600/70 to-pink-600/70 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {name.charAt(0)}
                </div>
                <span className="text-white/70 text-sm font-medium whitespace-nowrap">{name}</span>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 28s linear infinite;
          }
          .animate-marquee-slow {
            animation: marquee 40s linear infinite;
          }
        `}</style>
      </section>

      {/* ══════════════════════════════════════════════════════════
          BRANDS MARQUEE — Marcas que publican campañas
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16 px-4 border-t border-white/8 overflow-hidden">
        <div className="max-w-6xl mx-auto mb-8 text-center">
          <p className="text-white/40 text-sm uppercase tracking-widest font-medium">
            Marcas que publican campañas
          </p>
        </div>
        <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="flex gap-4 shrink-0 animate-marquee-slow">
            {[...brandPartners, ...brandPartners].map((brand, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-5 py-3 rounded-xl border border-white/10 bg-white/5 shrink-0 select-none"
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${brand.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                  {brand.name.charAt(0)}
                </div>
                <span className="text-white/80 text-sm font-semibold whitespace-nowrap">{brand.name}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 shrink-0 animate-marquee-slow" aria-hidden>
            {[...brandPartners, ...brandPartners].map((brand, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-5 py-3 rounded-xl border border-white/10 bg-white/5 shrink-0 select-none"
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${brand.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                  {brand.name.charAt(0)}
                </div>
                <span className="text-white/80 text-sm font-semibold whitespace-nowrap">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          NEW SECTION 2 — Pricing
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 border-t border-white/8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="default" className="mb-4">Precios</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">
              Simple y transparente
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Gratis para siempre para creadores. Las agencias eligen el plan que mejor se adapta a su tamaño.
            </p>

            {/* Toggle */}
            <div className="inline-flex items-center gap-3 mt-8 p-1 rounded-full border border-white/10 bg-white/5">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  !isAnnual
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-600/25"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                Mensual
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  isAnnual
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-600/25"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                Anual
                <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
                  −20%
                </span>
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {pricingPlans.map((plan) => {
              const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
              return (
                <div
                  key={plan.id}
                  className={`relative flex flex-col p-8 rounded-2xl border bg-white/5 transition-all duration-200 ${
                    plan.popular
                      ? "border-violet-500/60 shadow-xl shadow-violet-500/10 scale-[1.02]"
                      : plan.accentClass
                  } ${plan.badgeClass}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 rounded-full bg-violet-600 text-white text-xs font-semibold shadow-lg shadow-violet-600/40">
                        Más popular
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                      <span className="text-xs text-white/40 border border-white/10 rounded-full px-2 py-0.5">
                        {plan.target}
                      </span>
                    </div>
                    <div className="flex items-end gap-1 mt-4">
                      <span className="text-4xl font-extrabold text-white">
                        {price === 0 ? "Gratis" : `$${price}`}
                      </span>
                      {price > 0 && (
                        <span className="text-white/40 mb-1.5">/mes</span>
                      )}
                    </div>
                    {isAnnual && price > 0 && (
                      <p className="text-xs text-emerald-400 mt-1">
                        Facturado anualmente · ahorra ${(plan.monthlyPrice - plan.annualPrice) * 12}/año
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-sm text-white/70">
                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.popular ? "text-violet-400" : "text-emerald-400"}`} />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <Link href={plan.id === "gratis" ? "/register?role=creator" : `/register?role=agency&plan=${plan.id}`}>
                    <Button
                      variant={plan.ctaVariant}
                      className={plan.ctaClass}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>

          <p className="text-center text-white/30 text-sm mt-10">
            ¿Necesitas un plan personalizado?{" "}
            <Link href="#" className="text-violet-400 hover:text-violet-300 underline underline-offset-2 transition-colors">
              Contacta con ventas
            </Link>
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          NEW SECTION 3 — FAQ
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 border-t border-white/8 bg-[#0d0d14]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <Badge variant="default" className="mb-4">FAQ</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">Preguntas frecuentes</h2>
            <p className="text-white/50 text-lg">
              Todo lo que necesitas saber para empezar.
            </p>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "border-violet-500/30 bg-violet-500/5"
                      : "border-white/10 bg-white/3 hover:border-white/20"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-medium text-white text-base leading-snug">{item.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 text-white/40 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-violet-400" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5">
                      <p className="text-white/60 leading-relaxed text-sm">{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-4 border-t border-white/8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-pink-600/20 rounded-3xl blur-3xl" />
            <div className="relative p-12 rounded-3xl border border-white/10 bg-white/3">
              <h2 className="text-4xl font-bold text-white mb-4">{t("landing.ctaTitle")}</h2>
              <p className="text-white/60 text-lg mb-8">{t("landing.ctaSub")}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button variant="gradient" size="xl" className="gap-2">
                    {t("landing.startFree")} <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/explore/agencies">
                  <Button variant="outline" size="xl">{t("landing.browseAgencies")}</Button>
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-white/40">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> {t("landing.freeToJoin")}</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> {t("landing.verifiedAgencies")}</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> {t("landing.realtimeChat")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          NEW FOOTER — multi-column
      ══════════════════════════════════════════════════════════ */}
      <footer className="border-t border-white/8 bg-[#0d0d14]">
        {/* Main grid */}
        <div className="max-w-6xl mx-auto px-4 pt-16 pb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">

            {/* Brand column */}
            <div className="col-span-2 md:col-span-1 flex flex-col gap-5">
              <Link href="/" className="flex items-center gap-2 font-bold text-white w-fit">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                Mundo Creadores
              </Link>
              <p className="text-white/40 text-sm leading-relaxed max-w-[220px]">
                La plataforma que conecta creadores de contenido con las mejores agencias del mundo.
              </p>
              {/* Social icons */}
              <div className="flex gap-3 mt-1">
                {[
                  { href: "#", icon: <InstagramIcon className="w-4 h-4" />, label: "Instagram" },
                  { href: "#", icon: <TikTokIcon className="w-4 h-4" />, label: "TikTok" },
                  { href: "#", icon: <XIcon className="w-4 h-4" />, label: "Twitter / X" },
                  { href: "#", icon: <YoutubeIcon className="w-4 h-4" />, label: "YouTube" },
                ].map(({ href, icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all duration-150"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Plataforma */}
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-semibold text-sm">Plataforma</h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Explorar Creadores", href: "/explore/creators" },
                  { label: "Explorar Agencias", href: "/explore/agencies" },
                  { label: "Cómo Funciona", href: "#how-it-works" },
                  { label: "Precios", href: "#pricing" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-white/50 text-sm hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Empresa */}
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-semibold text-sm">Empresa</h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Sobre Nosotros", href: "/about" },
                  { label: "Blog", href: "#" },
                  { label: "Carreras", href: "#" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-white/50 text-sm hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-semibold text-sm">Legal</h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Privacidad", href: "/privacy" },
                  { label: "Términos", href: "/terms" },
                  { label: "Cookies", href: "#" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-white/50 text-sm hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8">
          <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-white/30 text-sm order-2 md:order-1">
              © 2025 Mundo Creadores. Todos los derechos reservados.
            </p>

            {/* Newsletter */}
            <div className="flex flex-col sm:flex-row items-center gap-3 order-1 md:order-2 w-full md:w-auto">
              <label htmlFor="newsletter-email" className="text-white/50 text-sm shrink-0">
                Suscríbete a nuestro newsletter
              </label>
              <div className="flex gap-2 w-full sm:w-auto">
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="tu@email.com"
                  className="flex-1 sm:w-52 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 focus:bg-white/8 transition-all"
                />
                <button className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium transition-colors shrink-0">
                  Suscribirse
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
