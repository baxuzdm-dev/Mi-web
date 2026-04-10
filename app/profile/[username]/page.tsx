"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  ShieldCheck,
  Star,
  ArrowLeft,
  Instagram,
  Youtube,
  ExternalLink,
  Package,
  Clock,
  Globe,
  Users,
  TrendingUp,
  LayoutGrid,
} from "lucide-react";
import Link from "next/link";
import { mockCreators, mockServices } from "@/lib/mockData";

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

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-amber-400">
      {Array.from({ length: 5 }).map((_, i) =>
        i < Math.floor(rating) ? "★" : i < rating ? "½" : "☆"
      )}
    </span>
  );
}

const PLATFORM_COLORS: Record<string, string> = {
  TikTok: "bg-[#010101]/80 border-white/20 text-white",
  Instagram: "bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/30 text-pink-300",
  YouTube: "bg-red-500/20 border-red-500/30 text-red-400",
  OnlyFans: "bg-[#00AFF0]/10 border-[#00AFF0]/30 text-[#00AFF0]",
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

type Tab = "Sobre mí" | "Servicios" | "Portafolio" | "Reseñas";

/* ═══════════════════════════════════════════════════════════════ */
export default function CreatorProfilePage() {
  const params = useParams<{ username: string }>();
  const username = params.username;

  const creator = mockCreators.find((c) => c.username === username);

  const [activeTab, setActiveTab] = useState<Tab>("Sobre mí");

  if (!creator) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center gap-6 px-4">
        <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
          <Users size={32} className="text-white/30" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Creador no encontrado</h1>
          <p className="text-white/50">El perfil @{username} no existe o fue eliminado.</p>
        </div>
        <Link
          href="/explore"
          className="flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors"
        >
          <ArrowLeft size={16} />
          Volver a explorar
        </Link>
      </div>
    );
  }

  const services = mockServices.filter((s) => s.creatorId === creator.id).slice(0, 3);

  /* mock platform followers */
  const platforms = [
    { name: "TikTok", followers: 400000, icon: "T" },
    { name: "Instagram", followers: 290000, icon: "I" },
    { name: "YouTube", followers: 160000, icon: "Y" },
  ].filter((p) => creator.platforms.includes(p.name));

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Banner */}
      <div className="h-40 bg-gradient-to-r from-violet-900/50 to-pink-900/30 relative" />

      {/* Profile header */}
      <div className="max-w-4xl mx-auto px-4 -mt-12 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full border-4 border-[#0a0a0f] bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-2xl font-bold text-white shrink-0">
            {getInitials(creator.user.name)}
          </div>

          {/* Info */}
          <div className="flex-1 pb-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-white">{creator.user.name}</h1>
              {creator.isVerified && (
                <ShieldCheck size={20} className="text-violet-400" />
              )}
            </div>
            <p className="text-white/50 text-sm mb-2">@{creator.username}</p>
            <p className="text-white/70 text-sm line-clamp-2 max-w-xl">{creator.bio}</p>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 mt-3 text-sm">
              <span className="text-white/60">
                <span className="text-white font-semibold">{formatFollowers(creator.followers)}</span>
                {" "}seguidores
              </span>
              <span className="text-white/60">
                <span className="text-white font-semibold">4.2%</span> engagement
              </span>
              <span className="text-white/60">
                <span className="text-white font-semibold">12</span> posts/mes
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 shrink-0">
            <button className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white rounded-xl transition-all">
              Contratar
            </button>
            <button className="px-4 py-2 text-sm font-semibold border border-white/20 text-white/80 hover:bg-white/5 rounded-xl transition-all">
              Seguir
            </button>
            <button className="px-4 py-2 text-sm font-semibold border border-white/20 text-white/80 hover:bg-white/5 rounded-xl transition-all">
              Mensaje
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-6 border-b border-white/10">
          {(["Sobre mí", "Servicios", "Portafolio", "Reseñas"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                activeTab === t
                  ? "text-white border-violet-500"
                  : "text-white/50 border-transparent hover:text-white/80"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ── TAB: Sobre mí ──────────────────────────────────── */}
        {activeTab === "Sobre mí" && (
          <div className="mt-6 space-y-6">
            {/* Bio */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">Biografía</h2>
              <p className="text-white/80 leading-relaxed">{creator.bio}</p>
            </div>

            {/* Platforms */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Plataformas</h2>
              <div className="space-y-3">
                {platforms.map((p) => (
                  <div key={p.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <PlatformBadge platform={p.name} />
                    </div>
                    <span className="text-white font-semibold">{formatFollowers(p.followers)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Niches */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">Nichos</h2>
              <div className="flex flex-wrap gap-2">
                {creator.niche.map((n) => (
                  <span
                    key={n}
                    className="text-sm bg-violet-500/15 border border-violet-500/30 text-violet-300 rounded-full px-3 py-1"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>

            {/* Audiencia */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Audiencia</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-white/50 text-xs mb-1">Género</p>
                  <p className="text-white font-semibold">68% mujeres</p>
                </div>
                <div>
                  <p className="text-white/50 text-xs mb-1">Edad promedio</p>
                  <p className="text-white font-semibold">24–35 años</p>
                </div>
                <div>
                  <p className="text-white/50 text-xs mb-1">País principal</p>
                  <p className="text-white font-semibold">{creator.country}</p>
                </div>
                <div>
                  <p className="text-white/50 text-xs mb-1">Top países</p>
                  <p className="text-white font-semibold">MX, CO, AR</p>
                </div>
              </div>
            </div>

            {/* Disponibilidad */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Disponible para colaboraciones</p>
                <p className="text-white/50 text-sm">Este creador acepta nuevas propuestas</p>
              </div>
              <div className={`w-3 h-3 rounded-full ${creator.isAvailable ? "bg-emerald-400" : "bg-white/20"}`} />
            </div>
          </div>
        )}

        {/* ── TAB: Servicios ─────────────────────────────────── */}
        {activeTab === "Servicios" && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(services.length > 0 ? services : mockServices.slice(0, 3)).map((svc) => (
              <div
                key={svc.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-3 hover:border-violet-500/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-white text-sm leading-snug">{svc.title}</h3>
                  <PlatformBadge platform={svc.platform} />
                </div>
                <p className="text-white/50 text-xs leading-relaxed">{svc.description}</p>
                <div className="flex items-center gap-3 text-xs text-white/50">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {svc.deliveryDays}d entrega
                  </span>
                  <span className="flex items-center gap-1 text-amber-400">
                    <Star size={12} className="fill-amber-400" />
                    {svc.rating.toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/10">
                  <span className="text-xl font-bold text-white">${svc.price.toLocaleString()}</span>
                  <button className="px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-xl hover:from-violet-500 hover:to-pink-500 transition-all">
                    Contratar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── TAB: Portafolio ────────────────────────────────── */}
        {activeTab === "Portafolio" && (
          <div className="mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { grad: "from-violet-600/40 to-pink-600/30", platform: "Instagram", label: "Post • 2.4M views" },
                { grad: "from-pink-600/40 to-rose-600/30", platform: "TikTok", label: "Video • 1.8M views" },
                { grad: "from-blue-600/40 to-violet-600/30", platform: "YouTube", label: "Reel • 980K views" },
                { grad: "from-emerald-600/30 to-teal-600/30", platform: "Instagram", label: "Story • 450K views" },
                { grad: "from-orange-600/30 to-pink-600/30", platform: "TikTok", label: "Dueto • 3.1M views" },
                { grad: "from-rose-600/40 to-violet-600/30", platform: "Instagram", label: "Collab • 1.2M views" },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-2xl bg-gradient-to-br ${item.grad} border border-white/10 flex flex-col items-center justify-center gap-2 p-3 cursor-pointer hover:border-white/20 transition-colors`}
                >
                  <PlatformBadge platform={item.platform} />
                  <p className="text-xs text-white/70 text-center">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <button className="px-6 py-2.5 text-sm font-medium border border-white/20 text-white/70 hover:bg-white/5 rounded-xl transition-all">
                Ver más
              </button>
            </div>
          </div>
        )}

        {/* ── TAB: Reseñas ───────────────────────────────────── */}
        {activeTab === "Reseñas" && (
          <div className="mt-6 space-y-4">
            {/* Overall */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4">
              <div className="text-center sm:text-left">
                <p className="text-5xl font-bold text-white">4.9</p>
                <div className="text-2xl mt-1"><Stars rating={4.9} /></div>
                <p className="text-white/50 text-sm mt-1">Basado en 12 reseñas</p>
              </div>
            </div>

            {/* Reviews */}
            {[
              {
                company: "L'Oréal Colombia",
                role: "Marca de belleza",
                text: "Excelente colaboración. Sofia entregó todo a tiempo y con calidad excepcional. El contenido superó nuestras expectativas y el engagement fue increíble.",
                rating: 5,
              },
              {
                company: "Adidas México",
                role: "Marca deportiva",
                text: "Muy profesional y creativa. La segunda campaña que hacemos juntos. Sin duda continuaremos colaborando.",
                rating: 5,
              },
              {
                company: "Spotify España",
                role: "Plataforma de música",
                text: "Muy buena experiencia, audiencia muy engaged. Los resultados de la campaña fueron positivos.",
                rating: 4,
              },
            ].map((review, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-white">{review.company}</p>
                    <p className="text-white/50 text-xs">{review.role}</p>
                  </div>
                  <Stars rating={review.rating} />
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
