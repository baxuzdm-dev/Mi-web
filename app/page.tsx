"use client";

import Link from "next/link";
import {
  ArrowRight, Zap, ShieldCheck, MessageSquare, TrendingUp,
  Star, Users, Building2, CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/contexts/LangContext";

const stats = [
  { labelKey: "landing.stats.creators", value: "12,000+" },
  { labelKey: "landing.stats.agencies", value: "340+" },
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

export default function LandingPage() {
  const { t } = useLang();

  const features = [
    { icon: <Zap className="w-5 h-5" />, titleKey: "landing.feature1Title", descKey: "landing.feature1Desc" },
    { icon: <ShieldCheck className="w-5 h-5" />, titleKey: "landing.feature2Title", descKey: "landing.feature2Desc" },
    { icon: <MessageSquare className="w-5 h-5" />, titleKey: "landing.feature3Title", descKey: "landing.feature3Desc" },
    { icon: <TrendingUp className="w-5 h-5" />, titleKey: "landing.feature4Title", descKey: "landing.feature4Desc" },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero */}
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
        <div className="max-w-4xl mx-auto mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/8 rounded-2xl overflow-hidden border border-white/8">
            {stats.map((stat) => (
              <div key={stat.labelKey} className="bg-[#0a0a0f] p-6 text-center">
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/50">{t(stat.labelKey)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4 border-t border-white/8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="default" className="mb-4">{t("landing.howItWorks")}</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">{t("landing.howItWorksSub")}</h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">{t("landing.howItWorksSub2")}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* For Creators */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-violet-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">{t("landing.forCreators")}</h3>
              </div>
              {(["landing.creatorStep1","landing.creatorStep2","landing.creatorStep3","landing.creatorStep4"] as const).map((key, i) => (
                <div key={key} className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center shrink-0 text-violet-400 text-sm font-bold">
                    {i + 1}
                  </div>
                  <p className="text-white/70 pt-0.5">{t(key)}</p>
                </div>
              ))}
              <Link href="/register?role=creator">
                <Button variant="gradient" className="mt-4 gap-2">
                  {t("landing.joinCreator")} <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* For Agencies */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-pink-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">{t("landing.forAgencies")}</h3>
              </div>
              {(["landing.agencyStep1","landing.agencyStep2","landing.agencyStep3","landing.agencyStep4"] as const).map((key, i) => (
                <div key={key} className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-pink-600/20 border border-pink-500/30 flex items-center justify-center shrink-0 text-pink-400 text-sm font-bold">
                    {i + 1}
                  </div>
                  <p className="text-white/70 pt-0.5">{t(key)}</p>
                </div>
              ))}
              <Link href="/register?role=agency">
                <Button variant="outline" className="mt-4 gap-2 border-pink-500/30 hover:bg-pink-500/10 text-pink-300">
                  {t("landing.joinAgency")} <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
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

      {/* Testimonials */}
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

      {/* CTA */}
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
              <div className="mt-6 flex items-center justify-center gap-6 text-sm text-white/40">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> {t("landing.freeToJoin")}</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> {t("landing.verifiedAgencies")}</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> {t("landing.realtimeChat")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-white">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            Mundo Creadores
          </div>
          <p className="text-white/30 text-sm">© {new Date().getFullYear()} Mundo Creadores. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-white/40">
            <Link href="/explore/creators" className="hover:text-white transition-colors">{t("nav.creators")}</Link>
            <Link href="/explore/agencies" className="hover:text-white transition-colors">{t("nav.agencies")}</Link>
            <Link href="/login" className="hover:text-white transition-colors">{t("nav.signIn")}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
