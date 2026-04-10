"use client";

import {
  MessageSquare,
  Eye,
  Star,
  Megaphone,
  CheckCircle,
  UserPlus,
  Handshake,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationItemProps {
  notification: {
    id: string;
    type:
      | "message"
      | "proposal"
      | "visit"
      | "review"
      | "campaign"
      | "accepted"
      | "follow";
    title: string;
    body: string;
    fromName: string;
    read: boolean;
    createdAt: string;
  };
  onRead?: (id: string) => void;
}

function timeAgoEs(date: string): string {
  const diff = (Date.now() - new Date(date).getTime()) / 1000;
  if (diff < 60) return "ahora";
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d`;
  return `${Math.floor(diff / 2592000)}mes`;
}

type IconConfig = {
  icon: React.ElementType;
  bg: string;
  text: string;
};

const TYPE_MAP: Record<NotificationItemProps["notification"]["type"], IconConfig> = {
  message: {
    icon: MessageSquare,
    bg: "bg-violet-500/20",
    text: "text-violet-400",
  },
  proposal: {
    icon: Handshake,
    bg: "bg-pink-500/20",
    text: "text-pink-400",
  },
  visit: {
    icon: Eye,
    bg: "bg-blue-500/20",
    text: "text-blue-400",
  },
  review: {
    icon: Star,
    bg: "bg-yellow-500/20",
    text: "text-yellow-400",
  },
  campaign: {
    icon: Megaphone,
    bg: "bg-orange-500/20",
    text: "text-orange-400",
  },
  accepted: {
    icon: CheckCircle,
    bg: "bg-emerald-500/20",
    text: "text-emerald-400",
  },
  follow: {
    icon: UserPlus,
    bg: "bg-violet-500/20",
    text: "text-violet-400",
  },
};

export default function NotificationItem({
  notification,
  onRead,
}: NotificationItemProps) {
  const config = TYPE_MAP[notification.type];
  const Icon = config.icon;

  const handleClick = () => {
    if (!notification.read && onRead) {
      onRead(notification.id);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      className={cn(
        "flex items-start gap-3 py-3 px-4 cursor-pointer",
        "transition-all duration-200 outline-none",
        "focus-visible:ring-1 focus-visible:ring-violet-500/50",
        notification.read
          ? "hover:bg-white/5"
          : "bg-violet-500/[0.05] border-l-2 border-violet-500 hover:bg-violet-500/[0.08]"
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5",
          config.bg,
          config.text
        )}
      >
        <Icon className="w-4 h-4" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-sm leading-snug",
            notification.read ? "font-normal text-white/70" : "font-medium text-white"
          )}
        >
          {notification.title}
        </p>
        <p className="text-xs text-white/50 mt-0.5 line-clamp-1 leading-relaxed">
          {notification.body}
        </p>
      </div>

      {/* Right: time + unread dot */}
      <div className="flex flex-col items-end gap-1.5 shrink-0">
        <span className="text-[11px] text-white/30 whitespace-nowrap">
          {timeAgoEs(notification.createdAt)}
        </span>
        {!notification.read && (
          <span className="w-2 h-2 rounded-full bg-violet-500 shrink-0" />
        )}
      </div>
    </div>
  );
}
