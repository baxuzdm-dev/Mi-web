"use client";

import { useParams } from "next/navigation";
import {
  ShieldCheck,
  Star,
  ArrowLeft,
  Globe,
  MapPin,
  DollarSign,
  BarChart2,
  Users,
  Megaphone,
  Clock,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { mockBrands, mockCampaigns, mockCreators } from "@/lib/mockData";

/* ─── helpers ─────────────────────────────────────────────────── */

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function formatFollowers(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

function formatBudget(n: number) {
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-amber-400">
      {Array.from({ length: 5 }).map((_, i) =>
        i < Math.floor(rating) ? "★" : i < rating ? "½" : "☆"
      )}
    </span>
  );
}

const STATUS_LABEL: Record<string, string> = {
  active: "Activa",
  closed: "Cerrada",
  draft: "Borrador",
};

const STATUS_COLOR: Record<string, string> = {
  active: "bg-emerald-500/20 border-emerald-500/30 text-emerald-400",
  closed: "bg-white/10 border-white/20 text-white/50",
  draft: "bg-yellow-500/20 border-yellow-500/30 text-yellow-400",
};

const PLATFORM_COLORS: Record<string, string> = {
  TikTok: "bg-white/10 border-white/20 text-white",
  Instagram: "bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/30 text-pink-300",
  YouTube: "bg-red-500/20 border-red-500/30 text-red-400",
  Twitter: "bg-sky-500/10 border-sky-500/30 text-sky-400",
};

function PlatformBadge({ platform }: { platform: string }) {
  const cls = PLATFORM_COLORS[platform] ?? "bg-white/10 border-white/20 text-white/70";
  return (
    <span className={`text-xs border rounded-full px-2.5 py-0.5 font-medium ${cls}`}>
      {platform}
    </span>
  );
}

const CREATOR_GRADIENTS = [
  "from-violet-500 to-pink-500",
  "from-pink-500 to-rose-500",
  "from-blue-500 to-violet-500",
  "from-emerald-500 to-teal-500",
];

/* ═══════════════════════════════════════════════════════════════ */
export default function BrandProfilePage() {
  const params = useParams<{ username: string }>();
  const username = params.username;

  const brand = mockBrands.find((b) => b.username === username);

  if (!brand) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center gap-6 px-4">
        <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
          <Megaphone size={32} className="text-white/30" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Marca no encontrada</h1>
          <p className="text-white/50">El perfil @{username} no existe o fue eliminado.</p>
        </div>
        <Link
          href="/explore"
          className="flex items-center gap-2 text-sm text-orange-400 hover:text-orange-300 transition-colors"
        >
          <ArrowLeft size={16} />
          Volver a explorar
        </Link>
      </div>
    );
  }

  const campaigns = mockCampaigns.filter((c) => c.brandId === brand.id);
  const featuredCreators = mockCreators.slice(0, 4);

  const brandReviews = [
    {
      creator: "Sofia Ramírez",
      username: "@sofiaramirez",
      text: "Trabajar con esta marca fue una experiencia increíble. Muy profesionales, respetan los tiempos creativos y pagan puntualmente. Sin duda repetiría.",
      rating: 5,
    },
    {
      creator: "Diego Torres",
      username: "@diegotorres_gamer",
      text: "Brief claro, buen presupuesto y total libertad creativa. Uno de los mejores brand deals que he tenido. La comunicación fue excelente de principio a fin.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Banner */}
      <div className="h-40 bg-gradient-to-r from-orange-900/30 to-pink-900/30 relative" />

      {/* Profile header */}
      <div className="max-w-4xl mx-auto px-4 -mt-12 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          {/* Logo */}
          <div className="w-24 h-24 rounded-2xl border-4 border-[#0a0a0f] bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-2xl font-bold text-white shrink-0">
            {getInitials(brand.name)}
          </div>

          {/* Info */}
          <div className="flex-1 pb-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-white">{brand.name}</h1>
              {brand.isVerified && (
                <ShieldCheck size={20} className="text-orange-400" />
              )}
              <span className="text-xs bg-orange-500/15 border border-orange-500/30 text-orange-300 rounded-full px-2.5 py-0.5 font-medium">
                {brand.industry}
              </span>
            </div>
            <p className="text-white/70 text-sm max-w-xl mb-3 leading-relaxed">{brand.description}</p>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="text-white/60">
                <span className="text-white font-semibold">{brand.activeCampaigns}</span> campañas activas
              </span>
              <span className="text-white/60">
                <span className="text-white font-semibold">$200K+</span> invertido
              </span>
              <span className="text-white/60">
                <span className="text-white font-semibold">45</span> creadores contratados
              </span>
            </div>
          </div>

          {/* Action */}
          <div className="shrink-0">
            <a
              href="#campaigns"
              className="inline-block px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-500 hover:to-pink-500 text-white rounded-xl transition-all"
            >
              Ver campañas activas
            </a>
          </div>
        </div>

        {/* ── Sección 1: Campañas Activas ───────────────────────── */}
        <section id="campaigns" className="mt-10">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Megaphone size={18} className="text-orange-400" />
            Campañas Activas
          </h2>
          {campaigns.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
              <p className="text-white/40">No hay campañas activas en este momento.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {campaigns.map((camp) => (
                <div
                  key={camp.id}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-3 hover:border-orange-500/20 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-white text-sm leading-snug line-clamp-2">
                          {camp.title}
                        </h3>
                        {camp.isHot && (
                          <span className="shrink-0 flex items-center gap-0.5 text-[10px] bg-orange-500/20 border border-orange-500/30 text-orange-400 rounded-full px-1.5 py-0.5 font-bold">
                            <Zap size={10} />
                            Hot
                          </span>
                        )}
                      </div>
                      <p className="text-white/50 text-xs leading-relaxed line-clamp-2">{camp.description}</p>
                    </div>
                    <span
                      className={`shrink-0 text-[10px] border rounded-full px-2 py-0.5 font-medium ${STATUS_COLOR[camp.status]}`}
                    >
                      {STATUS_LABEL[camp.status]}
                    </span>
                  </div>

                  {/* Platforms */}
                  <div className="flex flex-wrap gap-1.5">
                    {camp.platforms.map((p) => (
                      <PlatformBadge key={p} platform={p} />
                    ))}
                  </div>

                  {/* Niches */}
                  <div className="flex flex-wrap gap-1.5">
                    {camp.niches.map((n) => (
                      <span
                        key={n}
                        className="text-[10px] bg-orange-500/10 border border-orange-500/20 text-orange-300 rounded-full px-2 py-0.5"
                      >
                        {n}
                      </span>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
                    <div className="text-center">
                      <p className="text-white font-bold text-sm">{formatBudget(camp.budgetPerCreator)}</p>
                      <p className="text-white/40 text-[10px] mt-0.5">por creador</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-bold text-sm">{camp.creatorsNeeded}</p>
                      <p className="text-white/40 text-[10px] mt-0.5">plazas</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-bold text-sm">{camp.creatorsApplied}</p>
                      <p className="text-white/40 text-[10px] mt-0.5">aplicaron</p>
                    </div>
                  </div>

                  {/* Deadline + apply */}
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs text-white/40">
                      <Clock size={12} />
                      Cierra: {new Date(camp.deadline).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                    <button className="px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-500 hover:to-pink-500 text-white rounded-xl transition-all">
                      Aplicar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── Sección 2: Información de la marca ───────────────── */}
        <section className="mt-10">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <BarChart2 size={18} className="text-pink-400" />
            Información de la marca
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-1">
              <BarChart2 size={15} className="text-orange-400 mb-1" />
              <p className="text-white/50 text-xs">Industria</p>
              <p className="text-white font-semibold text-sm">{brand.industry}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-1">
              <MapPin size={15} className="text-sky-400 mb-1" />
              <p className="text-white/50 text-xs">País</p>
              <p className="text-white font-semibold text-sm">{brand.country}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-1">
              <DollarSign size={15} className="text-emerald-400 mb-1" />
              <p className="text-white/50 text-xs">Presupuesto mensual</p>
              <p className="text-white font-semibold text-sm">${brand.monthlyBudget} USD</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-1">
              <Globe size={15} className="text-violet-400 mb-1" />
              <p className="text-white/50 text-xs">Plataformas</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {brand.platforms.slice(0, 2).map((p) => (
                  <span key={p} className="text-[10px] text-white/60 bg-white/5 border border-white/10 rounded px-1.5 py-0.5">
                    {p}
                  </span>
                ))}
                {brand.platforms.length > 2 && (
                  <span className="text-[10px] text-white/40">+{brand.platforms.length - 2}</span>
                )}
              </div>
            </div>
          </div>

          {/* Platforms full list */}
          <div className="mt-4 bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-3">Plataformas de interés</p>
            <div className="flex flex-wrap gap-2">
              {brand.platforms.map((p) => (
                <PlatformBadge key={p} platform={p} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Sección 3: Creadores con los que ha trabajado ──────── */}
        <section className="mt-10">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Users size={18} className="text-violet-400" />
            Creadores con los que ha trabajado
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {featuredCreators.map((creator, idx) => (
              <Link
                key={creator.id}
                href={`/profile/${creator.username}`}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center gap-2.5 hover:border-violet-500/30 transition-colors"
              >
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${CREATOR_GRADIENTS[idx % CREATOR_GRADIENTS.length]} flex items-center justify-center text-base font-bold text-white`}
                >
                  {getInitials(creator.user.name)}
                </div>
                <div className="text-center">
                  <p className="font-semibold text-white text-xs leading-tight">{creator.user.name}</p>
                  <p className="text-white/40 text-[10px]">@{creator.username}</p>
                </div>
                <span className="text-[10px] bg-violet-500/15 border border-violet-500/30 text-violet-300 rounded-full px-2 py-0.5">
                  {creator.niche[0]}
                </span>
                <p className="text-white/50 text-[11px]">{formatFollowers(creator.followers)}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Sección 4: Reseñas de creadores ───────────────────── */}
        <section className="mt-10 pb-10">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Star size={18} className="text-amber-400" />
            Reseñas de creadores
          </h2>
          <div className="space-y-4">
            {brandReviews.map((review, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-white">{review.creator}</p>
                    <p className="text-white/50 text-xs">{review.username}</p>
                  </div>
                  <Stars rating={review.rating} />
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
