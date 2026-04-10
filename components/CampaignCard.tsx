"use client";

import Link from "next/link";
import { Users, DollarSign, Clock, TrendingUp } from "lucide-react";
import { cn, formatNumber, formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CampaignCardProps {
  campaign: {
    id: string;
    brandName: string;
    title: string;
    description: string;
    platforms: string[];
    minFollowers: number;
    budgetPerCreator: number;
    deadline: string;
    creatorsNeeded: number;
    creatorsApplied: number;
    niches: string[];
    isHot: boolean;
  };
  showApply?: boolean;
}

function BrandAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-600 to-rose-700 flex items-center justify-center text-white text-sm font-bold shrink-0 select-none ring-2 ring-white/5">
      {initials}
    </div>
  );
}

function deadlineCountdown(deadline: string): { label: string; urgent: boolean } {
  const diff = new Date(deadline).getTime() - Date.now();
  if (diff <= 0) return { label: "Expirada", urgent: true };
  const days = Math.floor(diff / 86400000);
  const urgent = days <= 3;
  if (days === 0) return { label: "Hoy", urgent: true };
  if (days === 1) return { label: "1 día", urgent: true };
  return { label: `${days} días`, urgent };
}

function StatPill({
  icon,
  label,
  value,
  accent = "default",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: "violet" | "emerald" | "red" | "default";
}) {
  const accentMap: Record<string, string> = {
    violet: "text-violet-400",
    emerald: "text-emerald-400",
    red: "text-red-400",
    default: "text-white",
  };

  return (
    <div className="bg-white/[0.04] border border-white/8 rounded-xl p-2.5 flex flex-col gap-1">
      <div className={cn("flex items-center gap-1 text-white/40", accentMap[accent])}>
        {icon}
      </div>
      <p className={cn("text-sm font-semibold leading-none", accentMap[accent])}>
        {value}
      </p>
      <p className="text-[10px] text-white/30 leading-none">{label}</p>
    </div>
  );
}

export default function CampaignCard({
  campaign,
  showApply = true,
}: CampaignCardProps) {
  const progress = Math.min(
    (campaign.creatorsApplied / campaign.creatorsNeeded) * 100,
    100
  );
  const spotsLeft = Math.max(
    campaign.creatorsNeeded - campaign.creatorsApplied,
    0
  );
  const isFull = spotsLeft === 0;
  const { label: countdownLabel, urgent } = deadlineCountdown(campaign.deadline);

  return (
    <article
      className={cn(
        "bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-4",
        "hover:border-violet-500/30 hover:bg-white/[0.07] transition-all duration-200"
      )}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <BrandAvatar name={campaign.brandName} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-white truncate">
              {campaign.brandName}
            </span>
            {campaign.isHot && (
              <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold bg-red-500/20 text-red-400 border border-red-500/30">
                HOT 🔥
              </span>
            )}
          </div>
          <p className="text-xs text-white/40 mt-0.5">Campaña activa</p>
        </div>
      </div>

      {/* Campaign info */}
      <div className="space-y-1.5">
        <h3 className="font-bold text-white leading-snug">{campaign.title}</h3>
        <p className="text-sm text-white/50 line-clamp-2 leading-relaxed">
          {campaign.description}
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-2">
        <StatPill
          icon={<DollarSign className="w-3 h-3" />}
          label="por creador"
          value={formatCurrency(campaign.budgetPerCreator)}
          accent="emerald"
        />
        <StatPill
          icon={<Users className="w-3 h-3" />}
          label="mín. seguidores"
          value={formatNumber(campaign.minFollowers)}
          accent="violet"
        />
        <StatPill
          icon={<Clock className="w-3 h-3" />}
          label="plazo"
          value={countdownLabel}
          accent={urgent ? "red" : "default"}
        />
      </div>

      {/* Progress bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-white/50">
            <TrendingUp className="w-3 h-3" />
            <span>
              <span className="text-white font-medium">
                {campaign.creatorsApplied}
              </span>
              /{campaign.creatorsNeeded} creadores
            </span>
          </div>
          <span
            className={cn(
              "font-medium",
              isFull ? "text-emerald-400" : "text-white/50"
            )}
          >
            {isFull ? "Completo ✓" : `${spotsLeft} lugares`}
          </span>
        </div>

        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              isFull
                ? "bg-emerald-500"
                : progress > 75
                ? "bg-gradient-to-r from-violet-600 to-pink-500"
                : "bg-violet-600"
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Platform + niche pills */}
      {(campaign.platforms.length > 0 || campaign.niches.length > 0) && (
        <div className="flex flex-wrap gap-1.5">
          {campaign.platforms.map((p) => (
            <span
              key={p}
              className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium bg-white/5 text-white/60 border border-white/10"
            >
              {p}
            </span>
          ))}
          {campaign.niches.slice(0, 2).map((n) => (
            <span
              key={n}
              className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20"
            >
              {n}
            </span>
          ))}
        </div>
      )}

      {/* CTA */}
      {showApply && (
        <Link href={`/campaigns/${campaign.id}/apply`} className="mt-auto">
          <Button
            variant={isFull ? "outline" : "gradient"}
            className="w-full text-sm"
            disabled={isFull}
          >
            {isFull ? "Cupos agotados" : "Aplicar ahora"}
          </Button>
        </Link>
      )}
    </article>
  );
}
