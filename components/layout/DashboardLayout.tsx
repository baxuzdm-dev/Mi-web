"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  MessageSquare,
  User,
  Users,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  role?: "CREATOR" | "AGENCY";
}

const creatorNav: NavItem[] = [
  { label: "Inicio", href: "/creator", icon: <Home className="w-5 h-5" /> },
  {
    label: "Explorar Agencias",
    href: "/explore/agencies",
    icon: <Building2 className="w-5 h-5" />,
  },
  {
    label: "Mensajes",
    href: "/chat",
    icon: <MessageSquare className="w-5 h-5" />,
  },
  { label: "Mi Perfil", href: "/me", icon: <User className="w-5 h-5" /> },
];

const agencyNav: NavItem[] = [
  { label: "Inicio", href: "/agency", icon: <Home className="w-5 h-5" /> },
  {
    label: "Explorar Creadores",
    href: "/explore/creators",
    icon: <Users className="w-5 h-5" />,
  },
  {
    label: "Mensajes",
    href: "/chat",
    icon: <MessageSquare className="w-5 h-5" />,
  },
  { label: "Mi Perfil", href: "/me", icon: <User className="w-5 h-5" /> },
];

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const pathname = usePathname();
  const navItems = role === "AGENCY" ? agencyNav : creatorNav;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - hidden on mobile, visible md+ */}
      <aside className="hidden md:flex flex-col w-60 shrink-0 border-r border-white/8 bg-[#0d0d14] pt-4 pb-8 px-3">
        <nav className="flex flex-col gap-1 mt-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                pathname === item.href
                  ? "bg-violet-600/20 text-violet-300 border border-violet-500/30"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
