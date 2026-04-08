"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { MessageSquare, LayoutDashboard, LogOut, Menu, X, Zap, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const role = session?.user?.role;
  const dashboardHref = role === "CREATOR" ? "/creator" : role === "AGENCY" ? "/agency" : "/onboarding";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/8 bg-[#0a0a0f]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-white">FanConnect</span>
          </Link>

          {/* Desktop Nav links */}
          <div className="hidden md:flex items-center gap-1">
            <Button asChild variant="ghost" size="sm">
              <Link href="/explore/creators" className="gap-2 flex items-center">
                <Search className="w-4 h-4" /> Creators
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/explore/agencies" className="gap-2 flex items-center">
                <Search className="w-4 h-4" /> Agencies
              </Link>
            </Button>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-1">
            {session ? (
              <>
                {/* Messages */}
                <Button asChild variant="ghost" size="icon" className="hidden md:flex">
                  <Link href="/chat" aria-label="Messages">
                    <MessageSquare className="w-4 h-4" />
                  </Link>
                </Button>

                {/* Dashboard */}
                <Button asChild variant="ghost" size="icon" className="hidden md:flex">
                  <Link href={dashboardHref} aria-label="Dashboard">
                    <LayoutDashboard className="w-4 h-4" />
                  </Link>
                </Button>

                {/* Avatar → profile page */}
                <Link
                  href="/me"
                  aria-label="My profile"
                  className="hidden md:flex items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                >
                  <Avatar className="w-8 h-8 hover:ring-2 hover:ring-violet-500 transition-all">
                    <AvatarImage src={session.user?.image ?? ""} />
                    <AvatarFallback className="text-xs">
                      {session.user?.name?.[0]?.toUpperCase() ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                </Link>

                {/* Sign out */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden md:flex text-white/50 hover:text-red-400"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  aria-label="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button asChild variant="gradient" size="sm">
                  <Link href="/register">Get started</Link>
                </Button>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 text-white/70 hover:text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/8 bg-[#0a0a0f]/95 px-4 py-4 space-y-2">
          <Button asChild variant="ghost" className="w-full justify-start gap-2">
            <Link href="/explore/creators" onClick={() => setMenuOpen(false)}>
              <Search className="w-4 h-4" /> Explore Creators
            </Link>
          </Button>
          <Button asChild variant="ghost" className="w-full justify-start gap-2">
            <Link href="/explore/agencies" onClick={() => setMenuOpen(false)}>
              <Search className="w-4 h-4" /> Explore Agencies
            </Link>
          </Button>
          {session ? (
            <>
              <Button asChild variant="ghost" className="w-full justify-start gap-2">
                <Link href="/chat" onClick={() => setMenuOpen(false)}>
                  <MessageSquare className="w-4 h-4" /> Messages
                </Link>
              </Button>
              <Button asChild variant="ghost" className="w-full justify-start gap-2">
                <Link href={dashboardHref} onClick={() => setMenuOpen(false)}>
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
              </Button>
              <Button asChild variant="ghost" className="w-full justify-start gap-2">
                <Link href="/me" onClick={() => setMenuOpen(false)}>
                  <Avatar className="w-5 h-5">
                    <AvatarImage src={session.user?.image ?? ""} />
                    <AvatarFallback className="text-xs">
                      {session.user?.name?.[0]?.toUpperCase() ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                  My Profile
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-red-400"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <LogOut className="w-4 h-4" /> Sign out
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" className="w-full">
                <Link href="/login" onClick={() => setMenuOpen(false)}>Sign in</Link>
              </Button>
              <Button asChild variant="gradient" className="w-full">
                <Link href="/register" onClick={() => setMenuOpen(false)}>Get started</Link>
              </Button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
