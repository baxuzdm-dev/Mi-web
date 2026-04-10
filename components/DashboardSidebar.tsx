"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Compass,
  ShoppingBag,
  Megaphone,
  MessageSquare,
  Bell,
  Settings,
  BarChart2,
  Package,
  Users,
  Target,
  Zap,
} from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";

interface DashboardSidebarProps {
  role?: "CREATOR" | "AGENCY" | "BRAND";
  unreadMessages?: number;
  unreadNotifications?: number;
  userName?: string;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
  roles?: Array<"CREATOR" | "AGENCY" | "BRAND">;
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

function UserAvatar({ name, role }: { name: string; role: "CREATOR" | "AGENCY" | "BRAND" }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const gradients: Record<string, string> = {
    CREATOR: "from-violet-600 to-pink-600",
    AGENCY: "from-pink-600 to-rose-600",
    BRAND: "from-orange-500 to-amber-600",
  };

  return (
    <div
      className={cn(
        "w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 select-none",
        "bg-gradient-to-br",
        gradients[role]
      )}
    >
      {initials}
    </div>
  );
}

export default function DashboardSidebar({
  role = "CREATOR",
  unreadMessages = 0,
  unreadNotifications = 0,
  userName = "Usuario",
}: DashboardSidebarProps) {
  const pathname = usePathname();

  const exploreHref =
    role === "CREATOR"
      ? "/explore/agencies"
      : role === "AGENCY"
      ? "/explore/creators"
      : "/explore/creators";

  // Build nav items list
  const navItems: NavItem[] = [
    { label: "Feed", href: "/feed", icon: Home },
    { label: "Explorar", href: exploreHref, icon: Compass },
    { label: "Marketplace", href: "/marketplace", icon: ShoppingBag },
    { label: "Campañas", href: "/campaigns", icon: Megaphone },
    {
      label: "Mensajes",
      href: "/chat",
      icon: MessageSquare,
      badge: unreadMessages,
    },
    {
      label: "Notificaciones",
      href: "/notifications",
      icon: Bell,
      badge: unreadNotifications,
    },
    // Role-specific items
    ...(role === "CREATOR"
      ? [
          { label: "Analytics", href: "/analytics", icon: BarChart2 },
          { label: "Mis Servicios", href: "/marketplace/my-services", icon: Package },
        ]
      : []),
    ...(role === "AGENCY"
      ? [{ label: "Mi Roster", href: "/roster", icon: Users }]
      : []),
    ...(role === "BRAND"
      ? [{ label: "Mis Campañas", href: "/campaigns/mine", icon: Target }]
      : []),
    { label: "Configuración", href: "/settings", icon: Settings },
  ];

  const roleBadge = ROLE_BADGE[role];

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col",
        "w-64 h-screen fixed left-0 top-0 z-30",
        "bg-[#0d0d14] border-r border-white/8"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/5">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center shrink-0">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-white text-[15px] tracking-tight">
          Mundo Creadores
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5 scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/feed"
              ? pathname === item.href
              : pathname.startsWith(item.href);
          const hasBadge = item.badge !== undefined && item.badge > 0;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "bg-violet-600/15 text-violet-300 border border-violet-500/20"
                  : "text-white/50 hover:text-white hover:bg-white/5 border border-transparent"
              )}
            >
              <Icon
                className={cn(
                  "w-4.5 h-4.5 shrink-0 transition-colors",
                  isActive
                    ? "text-violet-400"
                    : "text-white/40 group-hover:text-white/70"
                )}
                size={18}
              />
              <span className="flex-1 truncate">{item.label}</span>

              {hasBadge && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 rounded-full bg-violet-600 text-white text-[10px] font-bold px-1.5 shrink-0">
                  {item.badge! > 99 ? "99+" : formatNumber(item.badge!)}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="px-3 pb-4 border-t border-white/5 pt-3">
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-white/5 transition-colors cursor-default">
          <UserAvatar name={userName} role={role} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate leading-none">
              {userName}
            </p>
            <span
              className={cn(
                "inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium mt-1",
                roleBadge.className
              )}
            >
              {roleBadge.label}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
