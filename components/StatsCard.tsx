import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  label: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  accent?: "violet" | "pink" | "emerald" | "orange";
}

const ACCENT_MAP = {
  violet: {
    bg: "bg-violet-500/20",
    text: "text-violet-400",
    ring: "ring-violet-500/10",
  },
  pink: {
    bg: "bg-pink-500/20",
    text: "text-pink-400",
    ring: "ring-pink-500/10",
  },
  emerald: {
    bg: "bg-emerald-500/20",
    text: "text-emerald-400",
    ring: "ring-emerald-500/10",
  },
  orange: {
    bg: "bg-orange-500/20",
    text: "text-orange-400",
    ring: "ring-orange-500/10",
  },
} as const;

export default function StatsCard({
  label,
  value,
  change,
  icon,
  accent = "violet",
}: StatsCardProps) {
  const colors = ACCENT_MAP[accent];
  const isPositive = change !== undefined && change >= 0;
  const isNeutral = change === undefined;

  return (
    <div
      className={cn(
        "bg-white/5 border border-white/10 rounded-2xl p-5",
        "hover:border-violet-500/30 hover:bg-white/[0.07] transition-all duration-200"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Icon */}
        <div
          className={cn(
            "w-11 h-11 rounded-xl flex items-center justify-center shrink-0",
            "ring-1",
            colors.bg,
            colors.text,
            colors.ring
          )}
        >
          {icon}
        </div>

        {/* Change badge */}
        {!isNeutral && (
          <div
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
              isPositive
                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                : "bg-red-500/15 text-red-400 border border-red-500/20"
            )}
          >
            {isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {isPositive ? "+" : ""}
            {change.toFixed(1)}%
          </div>
        )}
      </div>

      {/* Value */}
      <div className="mt-4 space-y-1">
        <p className="text-3xl font-bold text-white tracking-tight leading-none">
          {typeof value === "number" ? value.toLocaleString("es-MX") : value}
        </p>
        <p className="text-sm text-white/50">{label}</p>
      </div>

      {/* Subtle accent bar */}
      <div
        className={cn("mt-4 h-0.5 w-full rounded-full opacity-30", colors.bg)}
      />
    </div>
  );
}
