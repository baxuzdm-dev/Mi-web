"use client";

import { useState, useMemo } from "react";
import { Search, Shield, CalendarDays, Users, DollarSign, CheckCircle2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { mockCampaigns, mockBrands, type MockCampaign } from "@/lib/mockData";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const AVATAR_GRADIENTS: Record<string, string> = {
  A: "from-violet-600 to-pink-500",
  L: "from-pink-600 to-rose-500",
  S: "from-blue-600 to-violet-500",
  R: "from-red-600 to-orange-500",
  Z: "from-emerald-600 to-teal-500",
  N: "from-cyan-600 to-blue-500",
  default: "from-violet-500 to-pink-500",
};

function avatarGradient(name: string): string {
  const char = name[0]?.toUpperCase() ?? "A";
  return AVATAR_GRADIENTS[char] ?? AVATAR_GRADIENTS.default;
}

function formatPrice(n: number): string {
  return n.toLocaleString("es-MX");
}

function formatFollowers(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

function daysUntil(iso: string): number {
  const ms = new Date(iso).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / 86_400_000));
}

function formatDeadline(iso: string): string {
  return new Date(iso).toLocaleDateString("es-MX", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ─── Platform Pill ────────────────────────────────────────────────────────────

const PLATFORM_STYLES: Record<string, string> = {
  Instagram: "bg-pink-500/20 text-pink-300 border border-pink-500/30",
  TikTok: "bg-violet-500/20 text-violet-300 border border-violet-500/30",
  YouTube: "bg-red-500/20 text-red-300 border border-red-500/30",
};

function PlatformPill({ platform }: { platform: string }) {
  const style = PLATFORM_STYLES[platform] ?? "bg-white/10 text-white/60";
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${style}`}>
      {platform}
    </span>
  );
}

// ─── Campaign Card ────────────────────────────────────────────────────────────

function CampaignCard({ campaign }: { campaign: MockCampaign }) {
  const [applied, setApplied] = useState(false);
  const days = daysUntil(campaign.deadline);
  const progress = Math.min(100, Math.round((campaign.creatorsApplied / campaign.creatorsNeeded) * 100));
  const brandUsername = mockBrands.find((b) => b.id === campaign.brandId)?.username ?? null;

  return (
    <article className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4 hover:border-white/20 transition-colors">

      {/* Header: brand + hot badge */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarGradient(campaign.brandName)} flex items-center justify-center flex-shrink-0`}
          >
            <span className="text-white text-xs font-bold">{getInitials(campaign.brandName)}</span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-white font-semibold text-sm truncate">{campaign.brandName}</span>
              <Shield className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />
            </div>
            <span className="text-white/40 text-xs">Marca verificada</span>
          </div>
        </div>
        {campaign.isHot && (
          <span className="flex-shrink-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 text-orange-300 text-xs font-bold px-2.5 py-1 rounded-full">
            HOT 🔥
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-white text-xl font-bold leading-snug">{campaign.title}</h3>

      {/* Description */}
      <p className="text-white/60 text-sm leading-relaxed line-clamp-3">{campaign.description}</p>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3">
        {/* Budget per creator */}
        <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2.5">
          <DollarSign className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <div>
            <p className="text-white font-semibold text-sm">${formatPrice(campaign.budgetPerCreator)}</p>
            <p className="text-white/40 text-xs">por creador</p>
          </div>
        </div>

        {/* Creators needed */}
        <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2.5">
          <Users className="w-4 h-4 text-violet-400 flex-shrink-0" />
          <div>
            <p className="text-white font-semibold text-sm">{campaign.creatorsNeeded}</p>
            <p className="text-white/40 text-xs">creadores</p>
          </div>
        </div>
      </div>

      {/* Platforms */}
      <div className="flex flex-wrap gap-1.5">
        {campaign.platforms.map((p) => (
          <PlatformPill key={p} platform={p} />
        ))}
      </div>

      {/* Deadline */}
      <div className="flex items-center gap-2 text-sm">
        <CalendarDays className="w-4 h-4 text-white/40 flex-shrink-0" />
        <span className="text-white/60">Fecha límite: {formatDeadline(campaign.deadline)}</span>
        {days <= 30 && (
          <span
            className={`ml-auto text-xs font-semibold px-2 py-0.5 rounded-full ${
              days < 7
                ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                : "bg-white/10 text-white/50"
            }`}
          >
            {days === 0 ? "Hoy" : `${days}d restantes`}
          </span>
        )}
      </div>

      {/* Min followers */}
      <p className="text-white/50 text-xs">
        Mín: <span className="text-white/70 font-medium">{formatFollowers(campaign.minFollowers)} seguidores</span>
      </p>

      {/* Niche pills */}
      <div className="flex flex-wrap gap-1.5">
        {campaign.niches.map((n) => (
          <span
            key={n}
            className="bg-violet-500/10 text-violet-300 border border-violet-500/20 text-xs px-2.5 py-0.5 rounded-full"
          >
            {n}
          </span>
        ))}
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-white/50 text-xs">
            {campaign.creatorsApplied}/{campaign.creatorsNeeded} creadores aplicando
          </span>
          <span className="text-white/50 text-xs">{progress}%</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-pink-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* CTA */}
      <div className="flex gap-2 mt-auto">
        {applied ? (
          <div className="flex-1 flex items-center justify-center gap-2 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold text-sm py-3 rounded-xl">
            <CheckCircle2 className="w-4 h-4" /> ¡Aplicación enviada!
          </div>
        ) : (
          <button
            onClick={() => setApplied(true)}
            className="flex-1 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white font-semibold text-sm py-3 rounded-xl transition-all"
          >
            Aplicar a esta campaña
          </button>
        )}
        {brandUsername && (
        <Link
          href={`/brand/${brandUsername}`}
          className="flex items-center justify-center w-11 bg-white/5 border border-white/10 hover:border-white/20 rounded-xl transition-colors"
          title="Ver marca"
        >
          <ExternalLink className="w-4 h-4 text-white/50" />
        </Link>
        )}
      </div>
    </article>
  );
}

// ─── Filters ──────────────────────────────────────────────────────────────────

const ALL_PLATFORMS = ["Todas", "Instagram", "TikTok", "YouTube"];

const BUDGET_FILTERS = [
  { label: "Cualquier presupuesto", min: 0, max: Infinity },
  { label: "Hasta $1,000", min: 0, max: 1000 },
  { label: "$1,000-$3,000", min: 1000, max: 3000 },
  { label: "$3,000+", min: 3000, max: Infinity },
];

const ALL_NICHES = [
  "Todos los nichos",
  "Fitness",
  "Beauty",
  "Tech",
  "Gaming",
  "Food",
  "Fashion",
  "Music",
  "Lifestyle",
];

// ─── Stats Bar ────────────────────────────────────────────────────────────────

function StatsBar() {
  return (
    <div className="flex flex-wrap gap-6 mt-6">
      {[
        { icon: "🎯", value: "8", label: "campañas activas" },
        { icon: "💰", value: "$200K+", label: "en presupuestos" },
        { icon: "👥", value: "700+", label: "creadores aplicando" },
      ].map(({ icon, value, label }) => (
        <div key={label} className="flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          <div>
            <p className="text-white font-bold text-lg leading-none">{value}</p>
            <p className="text-white/50 text-xs mt-0.5">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CampaignsPage() {
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("Todas");
  const [budgetIdx, setBudgetIdx] = useState(0);
  const [niche, setNiche] = useState("Todos los nichos");

  const displayedCampaigns = useMemo(() => {
    let result = [...mockCampaigns];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.brandName.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
      );
    }

    // Platform
    if (platform !== "Todas") {
      result = result.filter((c) => c.platforms.includes(platform));
    }

    // Budget
    const budget = BUDGET_FILTERS[budgetIdx];
    if (budget.max !== Infinity || budget.min > 0) {
      result = result.filter(
        (c) => c.budgetPerCreator >= budget.min && c.budgetPerCreator <= budget.max
      );
    }

    // Niche
    if (niche !== "Todos los nichos") {
      result = result.filter((c) => c.niches.includes(niche));
    }

    // Sort: hot first, then creatorsApplied desc
    result.sort((a, b) => {
      if (a.isHot && !b.isHot) return -1;
      if (!a.isHot && b.isHot) return 1;
      return b.creatorsApplied - a.creatorsApplied;
    });

    return result;
  }, [search, platform, budgetIdx, niche]);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* ── Header ── */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Campañas Activas</h1>
          <p className="text-white/60 text-base mt-1">
            Encuentra la campaña perfecta para tu audiencia
          </p>
          <StatsBar />
        </div>

        {/* ── Search & Filters ── */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por marca, título o descripción..."
              className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/30 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-violet-500/50 transition-colors"
            />
          </div>

          {/* Filter pills row */}
          <div className="flex flex-wrap gap-2">
            {/* Platform */}
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl px-2 py-1">
              <span className="text-white/40 text-xs mr-1">📱</span>
              {ALL_PLATFORMS.map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    platform === p
                      ? "bg-violet-600 text-white"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Budget */}
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl px-2 py-1 flex-wrap">
              <span className="text-white/40 text-xs mr-1">💰</span>
              {BUDGET_FILTERS.map((b, i) => (
                <button
                  key={b.label}
                  onClick={() => setBudgetIdx(i)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    budgetIdx === i
                      ? "bg-violet-600 text-white"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>

            {/* Niche */}
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl px-2 py-1 flex-wrap">
              <span className="text-white/40 text-xs mr-1">🎯</span>
              {ALL_NICHES.map((n) => (
                <button
                  key={n}
                  onClick={() => setNiche(n)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    niche === n
                      ? "bg-violet-600 text-white"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Result count */}
          <p className="text-white/40 text-sm">
            {displayedCampaigns.length} campaña{displayedCampaigns.length !== 1 ? "s" : ""} encontrada{displayedCampaigns.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* ── Campaign Grid ── */}
        {displayedCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-white/30 text-lg">No se encontraron campañas</p>
            <p className="text-white/20 text-sm mt-2">Intenta ajustar los filtros de búsqueda</p>
            <button
              onClick={() => {
                setSearch("");
                setPlatform("Todas");
                setBudgetIdx(0);
                setNiche("Todos los nichos");
              }}
              className="mt-4 text-violet-400 hover:text-violet-300 text-sm transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
