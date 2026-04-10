"use client";

import { useState } from "react";
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
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  DollarSign,
} from "lucide-react";
import { mockAnalytics } from "@/lib/mockData";

// ─── Sidebar ──────────────────────────────────────────────────────────────────

const navItems = [
  { icon: Home,           label: "Inicio",          href: "/feed" },
  { icon: Search,         label: "Explorar",         href: "/explore/creators" },
  { icon: ShoppingBag,    label: "Marketplace",      href: "/marketplace" },
  { icon: Megaphone,      label: "Campañas",         href: "/campaigns" },
  { icon: MessageSquare,  label: "Mensajes",         href: "/chat",          badge: "3" },
  { icon: Bell,           label: "Notificaciones",   href: "/notifications",  badge: "4" },
  { icon: BarChart2,      label: "Analytics",        href: "/analytics" },
  { icon: Settings,       label: "Ajustes",          href: "/settings" },
];

function Sidebar() {
  return (
    <aside className="w-64 shrink-0 hidden md:flex flex-col bg-[#0d0d14] border-r border-white/[0.08] min-h-screen pt-6 pb-4 px-3">
      <div className="flex items-center gap-2.5 px-3 mb-8">
        <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center shrink-0">
          <Zap size={16} className="text-white" />
        </div>
        <span className="font-bold text-white text-sm leading-tight">
          Mundo<br />Creadores
        </span>
      </div>
      <nav className="flex flex-col gap-0.5 flex-1">
        {navItems.map((item, i) => {
          const Icon = item.icon;
          const isActive = i === 6; // Analytics is index 6
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

// ─── Helpers ──────────────────────────────────────────────────────────────────

type Period = "7d" | "30d" | "90d";

const PERIOD_LABELS: Record<Period, string> = {
  "7d":  "Últimos 7 días",
  "30d": "Últimos 30 días",
  "90d": "Últimos 90 días",
};

// ─── Bar Chart (CSS only) ─────────────────────────────────────────────────────

function BarChart({ values, labels }: { values: number[]; labels: string[] }) {
  const max = Math.max(...values);
  return (
    <div className="space-y-2">
      <div className="flex items-end gap-[3px] h-32">
        {values.map((v, i) => {
          const heightPct = max > 0 ? (v / max) * 100 : 0;
          return (
            <div
              key={i}
              className="flex-1 group relative"
              style={{ height: "100%", display: "flex", alignItems: "flex-end" }}
            >
              <div
                className="w-full bg-violet-500/60 hover:bg-violet-500 rounded-t transition-colors cursor-pointer"
                style={{ height: `${heightPct}%`, minHeight: "2px" }}
                title={`${v.toLocaleString()}`}
              />
            </div>
          );
        })}
      </div>
      {/* X-axis labels every 5 items */}
      <div className="flex">
        {labels.map((l, i) => (
          <div key={i} className="flex-1 text-center">
            {i % 5 === 0 && (
              <span className="text-[9px] text-white/30 whitespace-nowrap">{l}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Horizontal Bar ───────────────────────────────────────────────────────────

function HorizontalBar({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="w-32 text-sm text-white/70 truncate shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-violet-600 to-violet-400 rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-sm font-semibold text-white w-20 text-right shrink-0">
        ${value.toLocaleString()}
      </span>
    </div>
  );
}

// ─── Mini Progress ────────────────────────────────────────────────────────────

function MiniProgress({ label, visits, max }: { label: string; visits: number; max: number }) {
  const pct = max > 0 ? (visits / max) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="w-24 text-sm text-white/70 truncate shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-white/50 w-16 text-right shrink-0">
        {visits.toLocaleString()}
      </span>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

function StatCard({ label, value, change, positive, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
          <Icon size={18} className="text-violet-400" />
        </div>
        <span className={`flex items-center gap-0.5 text-xs font-medium ${positive ? "text-emerald-400" : "text-red-400"}`}>
          {positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
          {change}
        </span>
      </div>
      <div>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-sm text-white/50 mt-0.5">{label}</p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<Period>("30d");

  const data = mockAnalytics;
  const views = data.profileViews;
  const maxRevenue = Math.max(...data.revenueByService.map((r) => r.value));
  const maxCountry = Math.max(...data.topCountries.map((c) => c.visits));

  // Last 7 values for comparison
  const thisWeek = views.slice(-7);
  const lastWeek = views.slice(-14, -7);
  const thisWeekTotal = thisWeek.reduce((a, b) => a + b, 0);
  const lastWeekTotal = lastWeek.reduce((a, b) => a + b, 0);
  const weekDiff = lastWeekTotal > 0
    ? (((thisWeekTotal - lastWeekTotal) / lastWeekTotal) * 100).toFixed(1)
    : "0";
  const weekPositive = thisWeekTotal >= lastWeekTotal;

  // Funnel
  const totalVisits = 18432;
  const totalMessages = 67;
  const totalDeals = 5;
  const visitToMsg = ((totalMessages / totalVisits) * 100).toFixed(2);
  const msgToDeal  = ((totalDeals / totalMessages) * 100).toFixed(2);

  const stats: StatCardProps[] = [
    { label: "Total visitas",        value: "18,432", change: "+23%", positive: true,  icon: Eye          },
    { label: "Búsquedas",            value: "3,891",  change: "+15%", positive: true,  icon: Search       },
    { label: "Mensajes recibidos",   value: "67",     change: "+8%",  positive: true,  icon: MessageSquare },
    { label: "Deals cerrados",       value: "5",      change: "+25%", positive: true,  icon: DollarSign   },
  ];

  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      <Sidebar />

      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-5xl mx-auto space-y-8">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Analytics</h1>
              <p className="text-white/50 text-sm mt-1">Resumen de rendimiento de tu perfil</p>
            </div>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as Period)}
              className="bg-white/5 border border-white/10 text-white text-sm rounded-xl px-3 py-2 outline-none focus:border-violet-500 cursor-pointer"
            >
              {(Object.keys(PERIOD_LABELS) as Period[]).map((p) => (
                <option key={p} value={p} className="bg-[#0d0d14]">
                  {PERIOD_LABELS[p]}
                </option>
              ))}
            </select>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>

          {/* Bar chart — Visitas al perfil */}
          <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-semibold text-white">Visitas al perfil — últimos 30 días</h2>
              <span className="text-xs text-white/40">{data.profileViews.reduce((a, b) => a + b, 0).toLocaleString()} total</span>
            </div>
            <BarChart values={data.profileViews} labels={data.monthLabels} />
          </section>

          {/* Revenue + Countries row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Ingresos por servicio */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-base font-semibold text-white mb-5">Ingresos por servicio</h2>
              <div className="space-y-4">
                {data.revenueByService.map((r) => (
                  <HorizontalBar
                    key={r.name}
                    label={r.name}
                    value={r.value}
                    max={maxRevenue}
                  />
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-sm text-white/50">Total ingresos</span>
                <span className="text-base font-bold text-white">
                  ${data.revenueByService.reduce((a, b) => a + b.value, 0).toLocaleString()}
                </span>
              </div>
            </section>

            {/* Top países */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-base font-semibold text-white mb-5">Top países</h2>
              <div className="space-y-4">
                {data.topCountries.map((c) => (
                  <MiniProgress
                    key={c.country}
                    label={c.country}
                    visits={c.visits}
                    max={maxCountry}
                  />
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-sm text-white/50">Total visitas</span>
                <span className="text-base font-bold text-white">
                  {data.topCountries.reduce((a, b) => a + b.visits, 0).toLocaleString()}
                </span>
              </div>
            </section>
          </div>

          {/* Conversion + Comparativa */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Conversión (funnel) */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-base font-semibold text-white mb-6">Conversión</h2>
              <div className="flex flex-col gap-3">

                {/* Visitas */}
                <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye size={15} className="text-violet-400" />
                    <span className="text-sm text-white/70">Visitas</span>
                  </div>
                  <span className="text-lg font-bold text-white">{totalVisits.toLocaleString()}</span>
                </div>

                {/* Arrow + rate */}
                <div className="flex items-center justify-center gap-2 py-1">
                  <div className="w-px h-4 bg-white/10" />
                  <span className="text-xs text-white/40 px-2 py-0.5 bg-white/5 rounded-full">
                    {visitToMsg}% conversión
                  </span>
                  <div className="w-px h-4 bg-white/10" />
                </div>

                {/* Mensajes */}
                <div className="bg-pink-500/10 border border-pink-500/20 rounded-xl px-4 py-3 flex items-center justify-between mx-4">
                  <div className="flex items-center gap-2">
                    <MessageSquare size={15} className="text-pink-400" />
                    <span className="text-sm text-white/70">Mensajes</span>
                  </div>
                  <span className="text-lg font-bold text-white">{totalMessages}</span>
                </div>

                {/* Arrow + rate */}
                <div className="flex items-center justify-center gap-2 py-1">
                  <div className="w-px h-4 bg-white/10" />
                  <span className="text-xs text-white/40 px-2 py-0.5 bg-white/5 rounded-full">
                    {msgToDeal}% conversión
                  </span>
                  <div className="w-px h-4 bg-white/10" />
                </div>

                {/* Deals */}
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3 flex items-center justify-between mx-8">
                  <div className="flex items-center gap-2">
                    <DollarSign size={15} className="text-emerald-400" />
                    <span className="text-sm text-white/70">Deals cerrados</span>
                  </div>
                  <span className="text-lg font-bold text-white">{totalDeals}</span>
                </div>
              </div>
            </section>

            {/* Comparativa */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-base font-semibold text-white mb-6">Comparativa semanal</h2>

              <div className="space-y-4">
                {/* Esta semana */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/60">Esta semana</span>
                    <span className="text-base font-bold text-white">{thisWeekTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex items-end gap-1 h-12">
                    {thisWeek.map((v, i) => {
                      const m = Math.max(...thisWeek, ...lastWeek);
                      return (
                        <div
                          key={i}
                          className="flex-1 bg-violet-500 rounded-t"
                          style={{ height: `${m > 0 ? (v / m) * 100 : 0}%`, minHeight: "2px" }}
                        />
                      );
                    })}
                  </div>
                  <div className="flex mt-1">
                    {data.weekLabels.map((l) => (
                      <div key={l} className="flex-1 text-center text-[9px] text-white/30">{l}</div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/60">Semana pasada</span>
                    <span className="text-base font-bold text-white/50">{lastWeekTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex items-end gap-1 h-12">
                    {lastWeek.map((v, i) => {
                      const m = Math.max(...thisWeek, ...lastWeek);
                      return (
                        <div
                          key={i}
                          className="flex-1 bg-white/20 rounded-t"
                          style={{ height: `${m > 0 ? (v / m) * 100 : 0}%`, minHeight: "2px" }}
                        />
                      );
                    })}
                  </div>
                  <div className="flex mt-1">
                    {data.weekLabels.map((l) => (
                      <div key={l} className="flex-1 text-center text-[9px] text-white/30">{l}</div>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="mt-2 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-sm text-white/50">Variación</span>
                  <span className={`flex items-center gap-1 text-sm font-semibold ${weekPositive ? "text-emerald-400" : "text-red-400"}`}>
                    {weekPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {weekPositive ? "+" : ""}{weekDiff}%
                  </span>
                </div>
              </div>
            </section>
          </div>

        </div>
      </main>
    </div>
  );
}
