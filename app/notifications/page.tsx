"use client";

import { useState } from "react";
import {
  MessageSquare,
  Zap,
  Eye,
  Star,
  Megaphone,
  CheckCircle,
  UserPlus,
  Bell,
} from "lucide-react";
import { useApp, type AppNotification } from "@/contexts/AppContext";

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "todas" | "no_leidas" | "propuestas" | "sistema";

const TABS: { id: Tab; label: string }[] = [
  { id: "todas",      label: "Todas" },
  { id: "no_leidas",  label: "No leídas" },
  { id: "propuestas", label: "Propuestas" },
  { id: "sistema",    label: "Sistema" },
];

// ─── Icon map ─────────────────────────────────────────────────────────────────

function getIconMeta(type: AppNotification["type"]) {
  const map: Record<
    AppNotification["type"],
    { icon: React.ElementType; bg: string; color: string }
  > = {
    message:  { icon: MessageSquare, bg: "bg-violet-500/20", color: "text-violet-400" },
    proposal: { icon: Zap,           bg: "bg-pink-500/20",   color: "text-pink-400"   },
    visit:    { icon: Eye,           bg: "bg-cyan-500/20",   color: "text-cyan-400"   },
    review:   { icon: Star,          bg: "bg-yellow-500/20", color: "text-yellow-400" },
    campaign: { icon: Megaphone,     bg: "bg-orange-500/20", color: "text-orange-400" },
    accepted: { icon: CheckCircle,   bg: "bg-emerald-500/20",color: "text-emerald-400"},
    follow:   { icon: UserPlus,      bg: "bg-violet-500/20", color: "text-violet-400" },
  };
  return map[type] ?? map.message;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function timeAgo(iso: string) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60)    return "ahora";
  if (diff < 3600)  return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}d`;
}

function filterNotifications(
  notifs: AppNotification[],
  tab: Tab,
  notifRead: string[]
): AppNotification[] {
  const isUnread = (n: AppNotification) =>
    !notifRead.includes(n.id) && !n.read;

  if (tab === "no_leidas")  return notifs.filter(isUnread);
  if (tab === "propuestas") return notifs.filter((n) => n.type === "proposal" || n.type === "campaign");
  if (tab === "sistema")    return notifs.filter((n) => n.type === "accepted");
  return notifs;
}

// ─── Row ──────────────────────────────────────────────────────────────────────

interface NotificationRowProps {
  notif: AppNotification;
  isUnread: boolean;
  onRead: (id: string) => void;
}

function NotificationRow({ notif, isUnread, onRead }: NotificationRowProps) {
  const { icon: Icon, bg, color } = getIconMeta(notif.type);

  return (
    <div
      onClick={() => onRead(notif.id)}
      className={`flex items-start gap-4 px-4 py-4 hover:bg-white/5 cursor-pointer transition-colors border-b border-white/5 last:border-b-0 ${
        isUnread ? "bg-violet-500/5 border-l-2 border-l-violet-500 pl-3" : ""
      }`}
    >
      {/* Icon */}
      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${bg}`}>
        <Icon size={16} className={color} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-white text-sm leading-snug">{notif.title}</p>
        <p className="text-sm text-white/50 mt-0.5 leading-snug">{notif.body}</p>
        {notif.fromName && (
          <p className="text-xs text-white/30 mt-1">De: {notif.fromName}</p>
        )}
      </div>

      {/* Right */}
      <div className="flex flex-col items-end gap-2 shrink-0">
        <span className="text-xs text-white/30">{timeAgo(notif.createdAt)}</span>
        {isUnread && (
          <span className="w-2 h-2 rounded-full bg-violet-500 block" />
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NotificationsPage() {
  const { allNotifications, unreadCount, markRead, markAllRead, state } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>("todas");

  const filtered = filterNotifications(allNotifications, activeTab, state.notifRead);

  function isUnread(n: AppNotification) {
    return !state.notifRead.includes(n.id) && !n.read;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-16 pb-12">
      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-violet-600/20 rounded-xl flex items-center justify-center">
              <Bell size={17} className="text-violet-400" />
            </div>
            <h1 className="text-xl font-bold text-white">Notificaciones</h1>
            {unreadCount > 0 && (
              <span className="bg-violet-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <button
            onClick={markAllRead}
            className="text-sm text-violet-400 hover:text-violet-300 transition-colors font-medium"
          >
            Marcar todas como leídas
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-0 border-b border-white/10 mb-0">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-3 text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? "text-white border-b-2 border-violet-500"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                {tab.label}
                {tab.id === "no_leidas" && unreadCount > 0 && (
                  <span className="bg-violet-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                    {unreadCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Notifications list */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden mt-4">
          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <Bell size={32} className="text-white/20 mx-auto mb-3" />
              <p className="text-white/40 text-sm">Sin notificaciones en esta categoría</p>
            </div>
          ) : (
            filtered.map((n) => (
              <NotificationRow
                key={n.id}
                notif={n}
                isUnread={isUnread(n)}
                onRead={markRead}
              />
            ))
          )}
        </div>

      </div>
    </div>
  );
}
