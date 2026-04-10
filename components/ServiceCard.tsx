"use client";

import Link from "next/link";
import { ShieldCheck, Star, Clock, RotateCcw } from "lucide-react";
import { cn, formatNumber, formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  service: {
    id: string;
    creatorName: string;
    creatorUsername: string;
    creatorVerified: boolean;
    creatorFollowers: number;
    platform: string;
    title: string;
    description: string;
    price: number;
    deliveryDays: number;
    revisions: number;
    rating: number;
    totalOrders: number;
    niche: string[];
  };
}

function CreatorAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center text-white text-sm font-bold shrink-0 select-none ring-2 ring-white/5">
      {initials}
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "w-3 h-3",
            i < full
              ? "fill-yellow-400 text-yellow-400"
              : i === full && half
              ? "fill-yellow-400/50 text-yellow-400"
              : "text-white/20"
          )}
        />
      ))}
    </div>
  );
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const displayNiches = service.niche.slice(0, 3);

  return (
    <article
      className={cn(
        "bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-4",
        "hover:border-violet-500/30 hover:bg-white/[0.07] transition-all duration-200"
      )}
    >
      {/* Creator info + platform badge */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <Link
            href={`/profile/${service.creatorUsername}`}
            className="shrink-0"
          >
            <CreatorAvatar name={service.creatorName} />
          </Link>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <Link
                href={`/profile/${service.creatorUsername}`}
                className="text-sm font-semibold text-white hover:text-violet-300 transition-colors truncate"
              >
                {service.creatorName}
              </Link>
              {service.creatorVerified && (
                <ShieldCheck className="w-3.5 h-3.5 text-violet-400 shrink-0" />
              )}
            </div>
            <p className="text-xs text-white/40 mt-0.5 truncate">
              {formatNumber(service.creatorFollowers)} seguidores
            </p>
          </div>
        </div>

        <span className="shrink-0 inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium bg-violet-500/20 text-violet-300 border border-violet-500/30">
          {service.platform}
        </span>
      </div>

      {/* Service title + description */}
      <div className="flex-1 space-y-1.5">
        <h3 className="font-semibold text-white leading-snug line-clamp-2 text-[15px]">
          {service.title}
        </h3>
        <p className="text-sm text-white/50 line-clamp-2 leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* Stats: price / delivery / revisions */}
      <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5">
        <div className="text-center">
          <p className="text-base font-bold text-white">
            {formatCurrency(service.price)}
          </p>
          <p className="text-[10px] text-white/40 mt-0.5">precio</p>
        </div>
        <div className="text-center border-x border-white/5">
          <div className="flex items-center justify-center gap-1">
            <Clock className="w-3 h-3 text-white/40" />
            <p className="text-base font-bold text-white">
              {service.deliveryDays}d
            </p>
          </div>
          <p className="text-[10px] text-white/40 mt-0.5">entrega</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1">
            <RotateCcw className="w-3 h-3 text-white/40" />
            <p className="text-base font-bold text-white">
              {service.revisions}
            </p>
          </div>
          <p className="text-[10px] text-white/40 mt-0.5">revisiones</p>
        </div>
      </div>

      {/* Rating row */}
      <div className="flex items-center gap-2">
        <StarRating rating={service.rating} />
        <span className="text-xs font-semibold text-white/70">
          {service.rating.toFixed(1)}
        </span>
        <span className="text-xs text-white/30">
          ({formatNumber(service.totalOrders)} pedidos)
        </span>
      </div>

      {/* Niche pills */}
      {displayNiches.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {displayNiches.map((n) => (
            <span
              key={n}
              className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium bg-white/5 text-white/50 border border-white/10"
            >
              {n}
            </span>
          ))}
          {service.niche.length > 3 && (
            <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] text-white/30">
              +{service.niche.length - 3} más
            </span>
          )}
        </div>
      )}

      {/* CTA */}
      <Link href={`/marketplace/${service.id}`} className="mt-auto">
        <Button variant="outline" className="w-full text-sm">
          Ver servicio
        </Button>
      </Link>
    </article>
  );
}
