"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MessageCircle,
  Share2,
  Bookmark,
  ShieldCheck,
  Flame,
} from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";

interface PostCardProps {
  post: {
    id: string;
    authorName: string;
    authorUsername: string;
    authorRole: "CREATOR" | "AGENCY" | "BRAND";
    authorVerified: boolean;
    content: string;
    image?: string;
    likes: number;
    comments: number;
    shares: number;
    createdAt: string;
    type: "post" | "campaign" | "achievement" | "collab";
    campaignRef?: string;
  };
}

function timeAgoEs(date: string): string {
  const diff = (Date.now() - new Date(date).getTime()) / 1000;
  if (diff < 60) return "ahora";
  if (diff < 3600) return `hace ${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `hace ${Math.floor(diff / 3600)}h`;
  if (diff < 2592000) return `hace ${Math.floor(diff / 86400)}d`;
  return `hace ${Math.floor(diff / 2592000)} mes`;
}

const ROLE_BADGE: Record<
  "CREATOR" | "AGENCY" | "BRAND",
  { label: string; className: string }
> = {
  CREATOR: {
    label: "Creador",
    className:
      "bg-violet-500/20 text-violet-300 border border-violet-500/30",
  },
  AGENCY: {
    label: "Agencia",
    className:
      "bg-pink-500/20 text-pink-300 border border-pink-500/30",
  },
  BRAND: {
    label: "Marca",
    className:
      "bg-orange-500/20 text-orange-300 border border-orange-500/30",
  },
};

function AuthorAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center text-white text-sm font-bold shrink-0 select-none ring-2 ring-white/5">
      {initials}
    </div>
  );
}

function ActionButton({
  icon,
  label,
  count,
  active = false,
  activeClass = "text-violet-400",
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  count: number;
  active?: boolean;
  activeClass?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
        active
          ? cn(activeClass, "bg-white/5")
          : "text-white/40 hover:text-white/70 hover:bg-white/5"
      )}
    >
      {icon}
      <span>{formatNumber(count)}</span>
      <span className="hidden sm:inline text-white/30">{label}</span>
    </button>
  );
}

export default function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setLiked((prev) => {
      setLikeCount((c) => (prev ? c - 1 : c + 1));
      return !prev;
    });
  };

  const roleBadge = ROLE_BADGE[post.authorRole];

  const contentPrefix =
    post.type === "achievement"
      ? "🏆 "
      : post.type === "collab"
      ? "🤝 "
      : "";

  return (
    <article
      className={cn(
        "bg-white/5 border border-white/10 rounded-2xl p-5",
        "hover:border-violet-500/30 hover:bg-white/[0.07] transition-all duration-200"
      )}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <Link href={`/profile/${post.authorUsername}`} className="shrink-0">
          <AuthorAvatar name={post.authorName} />
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href={`/profile/${post.authorUsername}`}
              className="font-semibold text-white hover:text-violet-300 transition-colors text-sm leading-none"
            >
              {post.authorName}
            </Link>
            {post.authorVerified && (
              <ShieldCheck className="w-3.5 h-3.5 text-violet-400 shrink-0" />
            )}
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium",
                roleBadge.className
              )}
            >
              {roleBadge.label}
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-xs text-white/40">
              @{post.authorUsername}
            </span>
            <span className="text-white/20 text-xs">·</span>
            <span className="text-xs text-white/40">
              {timeAgoEs(post.createdAt)}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-3.5">
        <p className="text-white/80 leading-relaxed text-sm">
          {contentPrefix}
          {post.content}
        </p>
      </div>

      {/* Optional image */}
      {post.image && (
        <div className="mt-3 overflow-hidden rounded-xl border border-white/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt="Imagen del post"
            className="w-full max-h-64 object-cover"
          />
        </div>
      )}

      {/* Campaign banner */}
      {post.type === "campaign" && post.campaignRef && (
        <Link
          href={`/campaigns/${post.campaignRef}`}
          className={cn(
            "mt-3.5 flex items-center justify-between",
            "bg-violet-500/10 border border-violet-500/20 rounded-xl px-4 py-2.5",
            "hover:bg-violet-500/15 transition-colors group"
          )}
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-sm text-violet-300 font-medium">
              Campaña vinculada
            </span>
          </div>
          <span className="text-xs text-violet-400 group-hover:translate-x-0.5 transition-transform">
            Ver campaña →
          </span>
        </Link>
      )}

      {/* Action bar */}
      <div className="mt-4 flex items-center gap-0.5 border-t border-white/5 pt-3.5">
        <ActionButton
          icon={
            <Flame
              className={cn(
                "w-4 h-4 transition-colors",
                liked ? "fill-orange-400 text-orange-400" : ""
              )}
            />
          }
          label="Me inspira"
          count={likeCount}
          active={liked}
          activeClass="text-orange-400"
          onClick={handleLike}
        />
        <ActionButton
          icon={<MessageCircle className="w-4 h-4" />}
          label="Comentar"
          count={post.comments}
        />
        <ActionButton
          icon={<Share2 className="w-4 h-4" />}
          label="Compartir"
          count={post.shares}
        />
        <div className="ml-auto">
          <button
            onClick={() => setSaved((v) => !v)}
            aria-label="Guardar"
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
              saved
                ? "text-violet-400 bg-violet-500/10"
                : "text-white/40 hover:text-white/70 hover:bg-white/5"
            )}
          >
            <Bookmark
              className={cn("w-4 h-4", saved && "fill-violet-400")}
            />
            <span className="hidden sm:inline">
              {saved ? "Guardado" : "Guardar"}
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}
