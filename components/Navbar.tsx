"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { MessageSquare, Search, LayoutDashboard, LogOut, User, Menu, X, Zap } from "lucide-react";
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

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link href="/explore/creators">
              <Button variant="ghost" size="sm" className="gap-2">
                <Search className="w-4 h-4" /> Creators
              </Button>
            </Link>
            <Link href="/explore/agencies">
              <Button variant="ghost" size="sm" className="gap-2">
                <Search className="w-4 h-4" /> Agencies
              </Button>
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {session ? (
              <>
                <Link href="/chat">
                  <Button variant="ghost" size="icon" className="hidden md:flex">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href={dashboardHref}>
                  <Button variant="ghost" size="icon" className="hidden md:flex">
                    <LayoutDashboard className="w-4 h-4" />
                  </Button>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Avatar className="w-7 h-7">
                    <AvatarImage src={session.user?.image ?? ""} />
                    <AvatarFallback className="text-xs">
                      {session.user?.name?.[0]?.toUpperCase() ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">Sign in</Button>
                </Link>
                <Link href="/register">
                  <Button variant="gradient" size="sm">Get started</Button>
                </Link>
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
          <Link href="/explore/creators" onClick={() => setMenuOpen(false)}>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Search className="w-4 h-4" /> Explore Creators
            </Button>
          </Link>
          <Link href="/explore/agencies" onClick={() => setMenuOpen(false)}>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Search className="w-4 h-4" /> Explore Agencies
            </Button>
          </Link>
          {session ? (
            <>
              <Link href="/chat" onClick={() => setMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <MessageSquare className="w-4 h-4" /> Messages
                </Button>
              </Link>
              <Link href={dashboardHref} onClick={() => setMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Button>
              </Link>
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
              <Link href="/login" onClick={() => setMenuOpen(false)}>
                <Button variant="ghost" className="w-full">Sign in</Button>
              </Link>
              <Link href="/register" onClick={() => setMenuOpen(false)}>
                <Button variant="gradient" className="w-full">Get started</Button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
