"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  ShieldCheck,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Globe,
  MapPin,
  Users,
  Percent,
  MessageSquare,
  TrendingUp,
  Award,
  FileText,
  BarChart2,
  Video,
  Share2,
  UserPlus,
  UserCheck,
} from "lucide-react";
import Link from "next/link";
import { mockAgencies, mockCreators } from "@/lib/mockData";
import { useApp } from "@/contexts/AppContext";

/* ─── helpers ─────────────────────────────────────────────────── */

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[áàä]/g, "a")
    .replace(/[éèë]/g, "e")
    .replace(/[íìï]/g, "i")
    .replace(/[óòö]/g, "o")
    .replace(/[úùü]/g, "u")
    .replace(/[ñ]/g, "n")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

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

type Tab = "Sobre nosotros" | "Nuestros Creadores" | "Servicios" | "Casos de Éxito" | "Reseñas";

const SERVICE_ICONS = [TrendingUp, FileText, Video, Share2, BarChart2];

const CREATOR_GRADIENTS = [
  "from-violet-500 to-pink-500",
  "from-pink-500 to-rose-500",
  "from-blue-500 to-violet-500",
  "from-emerald-500 to-teal-500",
  "from-orange-500 to-pink-500",
  "from-sky-500 to-blue-500",
];

/* ═══════════════════════════════════════════════════════════════ */
export default function AgencyProfilePage() {
  const params = useParams<{ username: string }>();
  const username = params.username;

  const agency = mockAgencies.find(
    (a) => slugify(a.name) === username || a.id === username
  );

  const [activeTab, setActiveTab] = useState<Tab>("Sobre nosotros");
  const { toggleFollow, isFollowing } = useApp();

  const agencySlug = slugify(agency?.name ?? "");
  const following = isFollowing(agencySlug);

  if (!agency) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center gap-6 px-4">
        <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
          <Users size={32} className="text-white/30" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Agencia no encontrada</h1>
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

  const displayedCreators = mockCreators.slice(0, 6);

  const successCases = [
    {
      creator: "@sofiaramirez",
      headline: "De 100K a 1M en 8 meses",
      description: "Estrategia de contenido viral y negociación de 3 brand deals con marcas globales.",
      before: "100K",
      after: "1M",
      metric: "seguidores",
    },
    {
      creator: "@diegotorres_gamer",
      headline: "Primer deal con marca global",
      description: "Cerramos su primer contrato con una marca internacional de periféricos gaming.",
      before: "$0",
      after: "$45K",
      metric: "deal value",
    },
    {
      creator: "@valentina.cruz",
      headline: "Multiplicó ingresos x3 en 6 meses",
      description: "Optimización de servicios y posicionamiento premium en el mercado beauty.",
      before: "$3K/mes",
      after: "$9K/mes",
      metric: "ingresos",
    },
  ];

  const agencyReviews = [
    {
      creator: "Sofia Ramírez",
      username: "@sofiaramirez",
      text: "La mejor decisión que tomé fue unirme a esta agencia. Mi carrera despegó completamente. Son profesionales, honestos y realmente se preocupan por sus talentos.",
      rating: 5,
    },
    {
      creator: "Diego Torres",
      username: "@diegotorres_gamer",
      text: "Increíble gestión. Me consiguieron deals que yo nunca hubiera podido cerrar solo. El equipo es top y siempre están disponibles.",
      rating: 5,
    },
    {
      creator: "Valentina Cruz",
      username: "@valentina.cruz",
      text: "Profesionalismo de primer nivel. Me ayudaron a construir mi marca personal y a monetizar de forma estratégica. Muy recomendados.",
      rating: 5,
    },
  ];

  const TABS: Tab[] = ["Sobre nosotros", "Nuestros Creadores", "Servicios", "Casos de Éxito", "Reseñas"];

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Banner */}
      <div className="h-40 bg-gradient-to-r from-pink-900/40 to-violet-900/30 relative" />

      {/* Profile header */}
      <div className="max-w-4xl mx-auto px-4 -mt-12 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          {/* Logo */}
          <div className="w-24 h-24 rounded-2xl border-4 border-[#0a0a0f] bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center text-2xl font-bold text-white shrink-0">
            {getInitials(agency.name)}
          </div>

          {/* Info */}
          <div className="flex-1 pb-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-white">{agency.name}</h1>
              {agency.isVerified && (
                <ShieldCheck size={20} className="text-violet-400" />
              )}
            </div>
            <p className="text-white/70 text-sm line-clamp-2 max-w-xl mb-3">{agency.description}</p>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="text-white/60">
                <span className="text-white font-semibold">{agency.rosterSize}</span> creadores
              </span>
              <span className="text-white/60">
                <span className="text-white font-semibold">{agency.rating}★</span> rating
              </span>
              <span className="text-white/60">
                <span className="text-white font-semibold">{agency.commission}%</span> comisión
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 shrink-0 flex-wrap">
            <button className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-500 hover:to-violet-500 text-white rounded-xl transition-all">
              Aplicar para representación
            </button>
            <button
              onClick={() => toggleFollow(agencySlug)}
              className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all flex items-center gap-1.5 ${
                following
                  ? "bg-violet-600/20 border border-violet-500/40 text-violet-300 hover:bg-red-500/15 hover:border-red-500/30 hover:text-red-400"
                  : "border border-white/20 text-white/80 hover:bg-white/5"
              }`}
            >
              {following ? (
                <>
                  <UserCheck size={14} />
                  Siguiendo ✓
                </>
              ) : (
                <>
                  <UserPlus size={14} />
                  Seguir agencia
                </>
              )}
            </button>
            <button className="px-4 py-2 text-sm font-semibold border border-white/20 text-white/80 hover:bg-white/5 rounded-xl transition-all flex items-center gap-1.5">
              <MessageSquare size={14} />
              Mensaje
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-6 border-b border-white/10 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px whitespace-nowrap ${
                activeTab === t
                  ? "text-white border-violet-500"
                  : "text-white/50 border-transparent hover:text-white/80"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ── TAB: Sobre nosotros ────────────────────────────── */}
        {activeTab === "Sobre nosotros" && (
          <div className="mt-6 space-y-6">
            {/* Description */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">Sobre la agencia</h2>
              <p className="text-white/80 leading-relaxed">{agency.description}</p>
            </div>

            {/* Services offered */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Servicios que ofrecen</h2>
              <ul className="space-y-2.5">
                {agency.services.map((svc, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/80 text-sm">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    {svc}
                  </li>
                ))}
              </ul>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-1">
                <Percent size={16} className="text-violet-400 mb-1" />
                <p className="text-white/50 text-xs">Comisión</p>
                <p className="text-white font-bold text-lg">{agency.commission}%</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-1">
                <Users size={16} className="text-pink-400 mb-1" />
                <p className="text-white/50 text-xs">Creadores</p>
                <p className="text-white font-bold text-lg">{agency.rosterSize}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-1">
                <MapPin size={16} className="text-sky-400 mb-1" />
                <p className="text-white/50 text-xs">País</p>
                <p className="text-white font-bold text-sm mt-1">{agency.country}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-1">
                <Award size={16} className="text-amber-400 mb-1" />
                <p className="text-white/50 text-xs">Fundada en</p>
                <p className="text-white font-bold text-lg">2018</p>
              </div>
            </div>

            {/* Website */}
            {agency.website && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe size={16} className="text-violet-400" />
                  <span className="text-white/70 text-sm">Sitio web</span>
                </div>
                <a
                  href={agency.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
                >
                  {agency.website.replace("https://", "")}
                </a>
              </div>
            )}

            {/* Application process */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-5">Proceso de aplicación</h2>
              <div className="flex flex-col sm:flex-row gap-0 sm:gap-0">
                {[
                  { step: 1, title: "Aplica", desc: "Completa el formulario de aplicación con tu perfil y métricas." },
                  { step: 2, title: "Revisamos tu perfil", desc: "Nuestro equipo analiza tu contenido, audiencia y potencial." },
                  { step: 3, title: "Firmamos contrato", desc: "Acordamos términos y comenzamos a trabajar juntos." },
                ].map((s, i) => (
                  <div key={i} className="flex items-start gap-3 sm:flex-1 relative pb-6 sm:pb-0">
                    {/* Connector line */}
                    {i < 2 && (
                      <div className="absolute left-4 top-8 w-px sm:w-full sm:h-px h-full sm:left-auto sm:top-4 bg-violet-500/20 sm:block" />
                    )}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center text-sm font-bold text-white shrink-0 relative z-10">
                      {s.step}
                    </div>
                    <div className="pt-0.5 flex-1">
                      <p className="font-semibold text-white text-sm">{s.title}</p>
                      <p className="text-white/50 text-xs mt-0.5 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: Nuestros Creadores ────────────────────────── */}
        {activeTab === "Nuestros Creadores" && (
          <div className="mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {displayedCreators.map((creator, idx) => {
                const creatorFollowing = isFollowing(creator.username);
                return (
                  <div
                    key={creator.id}
                    className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center gap-3 hover:border-violet-500/30 transition-colors"
                  >
                    <Link href={`/profile/${creator.username}`} className="flex flex-col items-center gap-3 w-full">
                      <div
                        className={`w-14 h-14 rounded-full bg-gradient-to-br ${CREATOR_GRADIENTS[idx % CREATOR_GRADIENTS.length]} flex items-center justify-center text-lg font-bold text-white`}
                      >
                        {getInitials(creator.user.name)}
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-white text-sm">{creator.user.name}</p>
                        <p className="text-white/50 text-xs">@{creator.username}</p>
                      </div>
                      <div className="flex flex-wrap justify-center gap-1">
                        {creator.niche.slice(0, 2).map((n) => (
                          <span
                            key={n}
                            className="text-[10px] bg-violet-500/15 border border-violet-500/30 text-violet-300 rounded-full px-2 py-0.5"
                          >
                            {n}
                          </span>
                        ))}
                      </div>
                      <p className="text-white/60 text-xs font-medium">{formatFollowers(creator.followers)} seguidores</p>
                    </Link>
                    <button
                      onClick={() => toggleFollow(creator.username)}
                      className={`w-full py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1 ${
                        creatorFollowing
                          ? "bg-violet-600/20 border border-violet-500/40 text-violet-300"
                          : "bg-white/5 border border-white/15 text-white/70 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {creatorFollowing ? (
                        <><UserCheck size={11} /> Siguiendo</>
                      ) : (
                        <><UserPlus size={11} /> Seguir</>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center mt-6">
              <button className="px-6 py-2.5 text-sm font-medium border border-white/20 text-white/70 hover:bg-white/5 rounded-xl transition-all">
                Ver todos los creadores
              </button>
            </div>
          </div>
        )}

        {/* ── TAB: Servicios ─────────────────────────────────── */}
        {activeTab === "Servicios" && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Management integral",
                description: "Gestión completa de tu carrera como creador. Contratos, marcas, calendario de contenido y más.",
                included: ["Negociación de contratos", "Estrategia de contenido", "Relaciones con marcas", "Soporte 24/7"],
                notIncluded: ["Producción de contenido", "Edición de videos"],
              },
              {
                title: "Negociación de contratos",
                description: "Nuestro equipo legal y comercial negocia los mejores términos para tus brand deals.",
                included: ["Revisión de contratos", "Negociación de tarifas", "Protección legal básica"],
                notIncluded: ["Representación legal completa"],
              },
              {
                title: "Estrategia de contenido",
                description: "Planificación editorial, análisis de tendencias y optimización de tu perfil para crecer.",
                included: ["Calendario editorial", "Análisis de tendencias", "Benchmarking competitivo", "Reportes mensuales"],
                notIncluded: ["Producción física"],
              },
              {
                title: "Producción y edición",
                description: "Equipo creativo disponible para elevar la calidad de tu contenido al siguiente nivel.",
                included: ["Edición profesional", "Diseño gráfico", "Thumbnails y covers"],
                notIncluded: ["Grabación en locación", "Equipo de filmación"],
              },
              {
                title: "Distribución multiplataforma",
                description: "Maximizamos el alcance de tu contenido publicándolo de forma optimizada en cada plataforma.",
                included: ["Publicación automatizada", "Optimización de horarios", "Cross-posting", "Hashtag research"],
                notIncluded: ["Ads pagados"],
              },
            ].map((svc, i) => {
              const Icon = SERVICE_ICONS[i];
              return (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-4 hover:border-violet-500/20 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/20 to-violet-500/20 border border-white/10 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-violet-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{svc.title}</h3>
                      <p className="text-white/50 text-xs mt-1 leading-relaxed">{svc.description}</p>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    {svc.included.map((item, j) => (
                      <div key={j} className="flex items-center gap-2 text-xs text-white/70">
                        <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                        {item}
                      </div>
                    ))}
                    {svc.notIncluded.map((item, j) => (
                      <div key={j} className="flex items-center gap-2 text-xs text-white/40">
                        <XCircle size={13} className="text-white/20 shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── TAB: Casos de Éxito ────────────────────────────── */}
        {activeTab === "Casos de Éxito" && (
          <div className="mt-6 space-y-4">
            {successCases.map((c, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-pink-500/20 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-violet-400 font-semibold text-sm">{c.creator}</span>
                      <span className="text-xs bg-pink-500/15 border border-pink-500/30 text-pink-300 rounded-full px-2 py-0.5 font-medium">
                        Caso de éxito
                      </span>
                    </div>
                    <h3 className="font-bold text-white text-lg mb-2">{c.headline}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{c.description}</p>
                  </div>

                  {/* Before/After */}
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-center">
                      <p className="text-white/40 text-xs mb-1">Antes</p>
                      <p className="text-white font-bold text-xl">{c.before}</p>
                      <p className="text-white/40 text-[10px] mt-0.5">{c.metric}</p>
                    </div>
                    <div className="text-white/20 text-2xl">→</div>
                    <div className="text-center">
                      <p className="text-white/40 text-xs mb-1">Después</p>
                      <p className="text-emerald-400 font-bold text-xl">{c.after}</p>
                      <p className="text-white/40 text-[10px] mt-0.5">{c.metric}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── TAB: Reseñas ───────────────────────────────────── */}
        {activeTab === "Reseñas" && (
          <div className="mt-6 space-y-4">
            {/* Overall */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4">
              <div className="text-center sm:text-left">
                <p className="text-5xl font-bold text-white">{agency.rating.toFixed(1)}</p>
                <div className="text-2xl mt-1"><Stars rating={agency.rating} /></div>
                <p className="text-white/50 text-sm mt-1">Basado en {agencyReviews.length} reseñas de creadores</p>
              </div>
            </div>

            {agencyReviews.map((review, i) => (
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
        )}
      </div>
    </div>
  );
}
