"use client";

import Link from "next/link";
import {
  Zap,
  Home,
  Search,
  ShoppingBag,
  Megaphone,
  MessageSquare,
  Bell,
  BarChart2,
  Settings,
  Eye,
  DollarSign,
  User,
  Plus,
} from "lucide-react";
import {
  mockNotifications,
  mockCampaigns,
} from "@/lib/mockData";

// ─── Sidebar ──────────────────────────────────────────────────────────────────

const navItems = [
  { icon: Home, label: "Inicio", href: "/feed" },
  { icon: Search, label: "Explorar", href: "/explore/creators" },
  { icon: ShoppingBag, label: "Marketplace", href: "/marketplace" },
  { icon: Megaphone, label: "Campañas", href: "/campaigns" },
  { icon: MessageSquare, label: "Mensajes", href: "/chat", badge: "3" },
  { icon: Bell, label: "Notificaciones", href: "/notifications", badge: "4" },
  { icon: BarChart2, label: "Analytics", href: "/analytics" },
  { icon: Settings, label: "Ajustes", href: "/settings" },
];

function Sidebar() {
  return (
    <aside className="w-64 shrink-0 hidden md:flex flex-col bg-[#0d0d14] border-r border-white/[0.08] min-h-screen pt-6 pb-4 px-3">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-3 mb-8">
        <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center shrink-0">
          <Zap size={16} className="text-white" />
        </div>
        <span className="font-bold text-white text-sm leading-tight">
          Mundo<br />Creadores
        </span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-0.5 flex-1">
        {navItems.map((item, i) => {
          const Icon = item.icon;
          const isActive = i === 0;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors relative ${
                isActive
                  ? "bg-violet-600/15 text-violet-300 border border-violet-500/20"
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={17} />
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-violet-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom user pill */}
      <div className="mt-4 px-3 py-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
          SR
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-white truncate">Sofia Ramírez</p>
          <p className="text-xs text-white/40 truncate">@sofiaramirez</p>
        </div>
      </div>
    </aside>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  iconBg: string;
  iconColor: string;
}

function StatCard({ label, value, icon: Icon, iconBg, iconColor }: StatCardProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
          <Icon size={18} className={iconColor} />
        </div>
        <span className="text-emerald-400 text-xs font-medium">+12% vs semana pasada</span>
      </div>
      <div>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-sm text-white/50 mt-0.5">{label}</p>
      </div>
    </div>
  );
}

// ─── Notification icon helper ─────────────────────────────────────────────────

function notifIcon(type: string) {
  const map: Record<string, { bg: string; color: string; icon: React.ComponentType<{ size?: number }> }> = {
    message:  { bg: "bg-violet-500/20", color: "text-violet-400", icon: MessageSquare },
    proposal: { bg: "bg-pink-500/20",   color: "text-pink-400",   icon: Zap },
    visit:    { bg: "bg-cyan-500/20",   color: "text-cyan-400",   icon: Eye },
    review:   { bg: "bg-yellow-500/20", color: "text-yellow-400", icon: BarChart2 },
    campaign: { bg: "bg-orange-500/20", color: "text-orange-400", icon: Megaphone },
    accepted: { bg: "bg-emerald-500/20",color: "text-emerald-400",icon: Zap },
    follow:   { bg: "bg-violet-500/20", color: "text-violet-400", icon: User },
  };
  return map[type] ?? map.message;
}

function timeAgo(iso: string) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}d`;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const recentNotifs = mockNotifications.slice(0, 5);
  const featuredCampaigns = mockCampaigns.slice(0, 3);

  const stats = [
    { label: "Visitas al perfil",    value: "2,847",  icon: Eye,            iconBg: "bg-violet-500/20", iconColor: "text-violet-400" },
    { label: "Mensajes nuevos",      value: "4",      icon: MessageSquare,  iconBg: "bg-pink-500/20",   iconColor: "text-pink-400"   },
    { label: "Propuestas recibidas", value: "2",      icon: Zap,            iconBg: "bg-emerald-500/20",iconColor: "text-emerald-400" },
    { label: "Ingresos del mes",     value: "$3,200", icon: DollarSign,     iconBg: "bg-orange-500/20", iconColor: "text-orange-400" },
  ];

  const quickActions = [
    { icon: User,          label: "Editar perfil",    href: "/me" },
    { icon: Plus,          label: "Agregar servicio", href: "/marketplace" },
    { icon: Megaphone,     label: "Ver campañas",     href: "/campaigns" },
    { icon: MessageSquare, label: "Ver mensajes",     href: "/chat" },
  ];

  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      <Sidebar />

      {/* Main */}
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-5xl mx-auto space-y-8">

          {/* 1. Greeting */}
          <div>
            <h1 className="text-2xl font-bold text-white">Buenos días, Sofia ☀️</h1>
            <p className="text-white/60 mt-1">Aquí está tu resumen de hoy</p>
          </div>

          {/* 2. Stats grid */}
          <section>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((s) => (
                <StatCard key={s.label} {...s} />
              ))}
            </div>
          </section>

          {/* 3 + 4 side by side on md */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* 3. Actividad reciente */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h2 className="text-base font-semibold text-white mb-4">Actividad reciente</h2>
              <ul className="space-y-0">
                {recentNotifs.map((n, i) => {
                  const { bg, color, icon: Icon } = notifIcon(n.type);
                  return (
                    <li
                      key={n.id}
                      className={`flex items-start gap-3 py-3 ${i < recentNotifs.length - 1 ? "border-b border-white/5" : ""}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${bg}`}>
                        <Icon size={13} className={color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white leading-snug truncate">{n.title}</p>
                        <p className="text-xs text-white/40 mt-0.5 line-clamp-1">{n.body}</p>
                      </div>
                      <span className="text-xs text-white/30 shrink-0">{timeAgo(n.createdAt)}</span>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* 4. Acciones rápidas */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h2 className="text-base font-semibold text-white mb-4">Acciones rápidas</h2>
              <div className="grid grid-cols-2 gap-3 h-[calc(100%-2.5rem)]">
                {quickActions.map((a) => {
                  const Icon = a.icon;
                  return (
                    <Link
                      key={a.href}
                      href={a.href}
                      className="flex flex-col items-center justify-center gap-2.5 bg-white/[0.03] hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl py-5 px-3 transition-colors text-center group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-violet-600/20 group-hover:bg-violet-600/30 flex items-center justify-center transition-colors">
                        <Icon size={16} className="text-violet-400" />
                      </div>
                      <span className="text-xs text-white/70 group-hover:text-white transition-colors leading-tight">
                        {a.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          </div>

          {/* 5. Recomendados para ti */}
          <section>
            <h2 className="text-base font-semibold text-white mb-4">Recomendados para ti</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featuredCampaigns.map((c) => (
                <div key={c.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-4">
                  {c.isHot && (
                    <span className="self-start text-[10px] font-bold uppercase tracking-wide bg-pink-500/20 text-pink-400 border border-pink-500/20 px-2 py-0.5 rounded-full">
                      Destacado
                    </span>
                  )}
                  <div>
                    <p className="text-xs text-white/40 mb-1">{c.brandName}</p>
                    <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2">{c.title}</h3>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1">
                      <DollarSign size={13} className="text-emerald-400" />
                      <span className="text-sm font-bold text-emerald-400">
                        ${c.budgetPerCreator.toLocaleString()}
                      </span>
                    </div>
                    <Link
                      href={`/campaigns`}
                      className="text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Aplicar
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
