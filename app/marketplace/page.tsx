"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Clock,
  Star,
  Shield,
  ChevronDown,
} from "lucide-react";
import { mockServices, type MockService } from "@/lib/mockData";

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
  S: "from-violet-600 to-pink-500",
  D: "from-emerald-600 to-teal-500",
  V: "from-pink-600 to-rose-500",
  C: "from-blue-600 to-violet-500",
  M: "from-orange-600 to-amber-500",
  N: "from-cyan-600 to-blue-500",
  F: "from-rose-600 to-pink-500",
  A: "from-indigo-600 to-violet-500",
  default: "from-violet-500 to-pink-500",
};

function avatarGradient(name: string): string {
  const char = name[0]?.toUpperCase() ?? "A";
  return AVATAR_GRADIENTS[char] ?? AVATAR_GRADIENTS.default;
}

function formatFollowers(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

function formatPrice(n: number): string {
  return n.toLocaleString("es-MX");
}

// ─── Platform Badge ───────────────────────────────────────────────────────────

const PLATFORM_STYLES: Record<string, string> = {
  Instagram: "bg-pink-500/20 text-pink-300 border border-pink-500/30",
  TikTok: "bg-violet-500/20 text-violet-300 border border-violet-500/30",
  YouTube: "bg-red-500/20 text-red-300 border border-red-500/30",
  OnlyFans: "bg-orange-500/20 text-orange-300 border border-orange-500/30",
};

function PlatformBadge({ platform }: { platform: string }) {
  const style = PLATFORM_STYLES[platform] ?? "bg-white/10 text-white/60";
  const shortNames: Record<string, string> = {
    Instagram: "IG",
    TikTok: "TT",
    YouTube: "YT",
    OnlyFans: "OF",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${style}`}>
      {shortNames[platform] ?? platform}
    </span>
  );
}

// ─── Star Rating ──────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i <= Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-white/20"}`}
        />
      ))}
      <span className="text-white/60 text-xs ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

// ─── Service Card ─────────────────────────────────────────────────────────────

function ServiceCard({ service }: { service: MockService }) {
  return (
    <article className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-4 hover:border-white/20 transition-colors">
      {/* Platform badge */}
      <div className="flex items-center justify-between">
        <PlatformBadge platform={service.platform} />
        <span className="text-white/30 text-xs">{service.totalOrders} pedidos</span>
      </div>

      {/* Creator info */}
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarGradient(service.creatorName)} flex items-center justify-center flex-shrink-0`}
        >
          <span className="text-white text-xs font-bold">{getInitials(service.creatorName)}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 flex-wrap">
            <span className="text-white text-sm font-semibold truncate">{service.creatorName}</span>
            {service.creatorVerified && <Shield className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />}
          </div>
          <p className="text-white/40 text-xs">@{service.creatorUsername} · {formatFollowers(service.creatorFollowers)} seguidores</p>
        </div>
      </div>

      {/* Title & description */}
      <div className="flex-1">
        <p className="text-white font-semibold text-sm mb-1.5 leading-snug">{service.title}</p>
        <p className="text-white/50 text-xs leading-relaxed line-clamp-2">{service.description}</p>
      </div>

      {/* Rating & delivery */}
      <div className="flex items-center justify-between">
        <StarRating rating={service.rating} />
        <div className="flex items-center gap-1 text-white/40 text-xs">
          <Clock className="w-3 h-3" />
          <span>{service.deliveryDays}d entrega</span>
        </div>
      </div>

      {/* Niche pills */}
      <div className="flex flex-wrap gap-1">
        {service.niche.map((n) => (
          <span key={n} className="bg-violet-500/10 text-violet-300 border border-violet-500/20 text-xs px-2 py-0.5 rounded-full">
            {n}
          </span>
        ))}
      </div>

      {/* Price & CTA */}
      <div className="flex items-center justify-between pt-3 border-t border-white/10 mt-auto">
        <div>
          <span className="text-white text-xl font-bold">${formatPrice(service.price)}</span>
          <span className="text-white/40 text-xs ml-1">USD</span>
        </div>
        <button className="border border-violet-500/40 text-violet-400 hover:bg-violet-500/10 text-xs font-medium px-4 py-2 rounded-lg transition-colors">
          Ver servicio
        </button>
      </div>
    </article>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

function ServiceSection({
  title,
  services,
}: {
  title: string;
  services: MockService[];
}) {
  return (
    <section className="mt-10">
      <h2 className="text-white text-xl font-bold mb-5">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {services.map((s) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </div>
    </section>
  );
}

// ─── Categories ──────────────────────────────────────────────────────────────

const CATEGORIES = [
  { label: "Videos", icon: "🎬" },
  { label: "Posts", icon: "📸" },
  { label: "Stories", icon: "📱" },
  { label: "Lives", icon: "🔴" },
  { label: "Reviews", icon: "📝" },
  { label: "Unboxings", icon: "📦" },
  { label: "Gaming", icon: "🎮" },
  { label: "Podcasts", icon: "🎤" },
];

const PLATFORMS = ["Todos", "Instagram", "TikTok", "YouTube", "OnlyFans"];

const BUDGETS = [
  { label: "Cualquier precio", min: 0, max: Infinity },
  { label: "Hasta $500", min: 0, max: 500 },
  { label: "$500-$2,000", min: 500, max: 2000 },
  { label: "$2,000-$5,000", min: 2000, max: 5000 },
  { label: "$5,000+", min: 5000, max: Infinity },
];

const SORT_OPTIONS = [
  "Más popular",
  "Mejor valorados",
  "Precio: menor a mayor",
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [platform, setPlatform] = useState("Todos");
  const [budgetIdx, setBudgetIdx] = useState(0);
  const [sort, setSort] = useState("Más popular");

  const filteredServices = useMemo(() => {
    let result = [...mockServices];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.creatorName.toLowerCase().includes(q) ||
          s.niche.some((n) => n.toLowerCase().includes(q))
      );
    }

    // Platform
    if (platform !== "Todos") {
      result = result.filter((s) => s.platform === platform);
    }

    // Budget
    const budget = BUDGETS[budgetIdx];
    if (budget.max !== Infinity || budget.min > 0) {
      result = result.filter((s) => s.price >= budget.min && s.price <= budget.max);
    }

    // Sort
    if (sort === "Más popular") {
      result.sort((a, b) => b.totalOrders - a.totalOrders);
    } else if (sort === "Mejor valorados") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sort === "Precio: menor a mayor") {
      result.sort((a, b) => a.price - b.price);
    }

    return result;
  }, [search, platform, budgetIdx, sort]);

  // Top 4 by totalOrders from full list
  const topSellers = useMemo(
    () => [...mockServices].sort((a, b) => b.totalOrders - a.totalOrders).slice(0, 4),
    []
  );

  // Last 4 (lowest ids = newest in mock)
  const newTalents = useMemo(() => mockServices.slice(-4), []);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* ── Header ── */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Marketplace de Servicios</h1>
          <p className="text-white/60 text-base">
            Encuentra al creador perfecto para tu campaña. Miles de servicios de influencer marketing a tu medida.
          </p>

          {/* Search */}
          <div className="relative mt-5 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar servicios, creadores, nichos..."
              className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/30 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-violet-500/50 transition-colors"
            />
          </div>
        </div>

        {/* ── Category Pills ── */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none mb-6">
          {CATEGORIES.map(({ label, icon }) => {
            const active = activeCategory === label;
            return (
              <button
                key={label}
                onClick={() => setActiveCategory(active ? null : label)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                  active
                    ? "bg-violet-600 border-violet-500 text-white"
                    : "bg-white/5 border-white/10 text-white/60 hover:border-white/20 hover:text-white"
                }`}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* ── Filters Bar ── */}
        <div className="flex flex-wrap items-center gap-3 mb-8 p-4 bg-white/5 border border-white/10 rounded-2xl">
          {/* Platform */}
          <div className="relative">
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="appearance-none bg-white/10 border border-white/10 text-white text-sm rounded-lg pl-3 pr-8 py-2 outline-none focus:border-violet-500/50 cursor-pointer"
            >
              {PLATFORMS.map((p) => (
                <option key={p} value={p} className="bg-[#0a0a0f]">
                  {p}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40 pointer-events-none" />
          </div>

          {/* Budget */}
          <div className="relative">
            <select
              value={budgetIdx}
              onChange={(e) => setBudgetIdx(Number(e.target.value))}
              className="appearance-none bg-white/10 border border-white/10 text-white text-sm rounded-lg pl-3 pr-8 py-2 outline-none focus:border-violet-500/50 cursor-pointer"
            >
              {BUDGETS.map((b, i) => (
                <option key={b.label} value={i} className="bg-[#0a0a0f]">
                  {b.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40 pointer-events-none" />
          </div>

          {/* Sort */}
          <div className="relative ml-auto">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none bg-white/10 border border-white/10 text-white text-sm rounded-lg pl-3 pr-8 py-2 outline-none focus:border-violet-500/50 cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o} value={o} className="bg-[#0a0a0f]">
                  {o}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40 pointer-events-none" />
          </div>

          {/* Result count */}
          <span className="text-white/40 text-sm">
            {filteredServices.length} servicio{filteredServices.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* ── Main Grid ── */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredServices.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-white/30 text-lg">Sin resultados para tu búsqueda</p>
            <p className="text-white/20 text-sm mt-2">Intenta ajustar los filtros</p>
          </div>
        )}

        {/* ── Más vendidos esta semana ── */}
        <ServiceSection title="Más vendidos esta semana" services={topSellers} />

        {/* ── Nuevos talentos ── */}
        <ServiceSection title="Nuevos talentos" services={newTalents} />
      </div>
    </div>
  );
}
