"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect, useCallback } from "react";
import { MessageSquare, LayoutDashboard, LogOut, Menu, X, Zap, Search, ShoppingBag, Megaphone } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useLang } from "@/contexts/LangContext";
import { useApp } from "@/contexts/AppContext";
import { mockCreators, mockAgencies, mockCampaigns } from "@/lib/mockData";

// ─── Search Bar ───────────────────────────────────────────────────────────────

function GlobalSearch() {
  const { setSearch, state } = useApp();
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const query = state.searchQuery;

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setSearch]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    [setSearch]
  );

  function handleClose() {
    setSearch("");
    setFocused(false);
    inputRef.current?.blur();
  }

  // Filter results
  const q = query.toLowerCase();
  const creatorResults = q
    ? mockCreators
        .filter(
          (c) =>
            c.username.toLowerCase().includes(q) ||
            c.user.name.toLowerCase().includes(q) ||
            c.bio.toLowerCase().includes(q)
        )
        .slice(0, 3)
    : [];

  const agencyResults = q
    ? mockAgencies
        .filter((a) => a.name.toLowerCase().includes(q))
        .slice(0, 3)
    : [];

  const campaignResults = q
    ? mockCampaigns
        .filter(
          (c) =>
            c.title.toLowerCase().includes(q) ||
            c.brandName.toLowerCase().includes(q)
        )
        .slice(0, 3)
    : [];

  const hasResults =
    creatorResults.length > 0 ||
    agencyResults.length > 0 ||
    campaignResults.length > 0;

  const showDropdown = focused && query.length > 0;

  return (
    <div ref={containerRef} className="relative hidden md:block">
      {/* Input */}
      <div
        className={`flex items-center gap-2 bg-white/5 border rounded-xl px-3 py-1.5 transition-all ${
          focused
            ? "border-violet-500/50 w-64"
            : "border-white/10 w-44 hover:border-white/20"
        }`}
      >
        <Search className="w-3.5 h-3.5 text-white/40 flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          placeholder="Buscar creadores, campañas…"
          className="bg-transparent text-white text-xs placeholder:text-white/30 outline-none w-full min-w-0"
        />
        {query && (
          <button onClick={handleClose} className="text-white/30 hover:text-white/60 transition-colors flex-shrink-0">
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute top-full mt-2 left-0 w-80 bg-[#13131a] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
          {!hasResults ? (
            <div className="px-4 py-6 text-center">
              <p className="text-white/40 text-sm">Sin resultados para &ldquo;{query}&rdquo;</p>
            </div>
          ) : (
            <div className="max-h-80 overflow-y-auto">
              {creatorResults.length > 0 && (
                <div>
                  <p className="px-4 py-2 text-[10px] font-semibold uppercase tracking-widest text-white/30 border-b border-white/5">
                    Creadores
                  </p>
                  {creatorResults.map((creator) => (
                    <Link
                      key={creator.id}
                      href={`/creator/${creator.username}`}
                      onClick={handleClose}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-bold">
                          {creator.user.name[0]?.toUpperCase() ?? "?"}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-white text-sm font-medium truncate">{creator.user.name}</p>
                        <p className="text-white/40 text-xs truncate">@{creator.username} · {creator.niche[0]}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {agencyResults.length > 0 && (
                <div>
                  <p className="px-4 py-2 text-[10px] font-semibold uppercase tracking-widest text-white/30 border-b border-white/5 border-t border-t-white/5">
                    Agencias
                  </p>
                  {agencyResults.map((agency) => (
                    <Link
                      key={agency.id}
                      href={`/agency/${agency.id}`}
                      onClick={handleClose}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-600 to-orange-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-bold">
                          {agency.name[0]?.toUpperCase() ?? "?"}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-white text-sm font-medium truncate">{agency.name}</p>
                        <p className="text-white/40 text-xs truncate">{agency.country} · {agency.rosterSize} creadores</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {campaignResults.length > 0 && (
                <div>
                  <p className="px-4 py-2 text-[10px] font-semibold uppercase tracking-widest text-white/30 border-b border-white/5 border-t border-t-white/5">
                    Campañas
                  </p>
                  {campaignResults.map((campaign) => (
                    <Link
                      key={campaign.id}
                      href="/campaigns"
                      onClick={handleClose}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-600 to-yellow-500 flex items-center justify-center flex-shrink-0">
                        <Megaphone className="w-4 h-4 text-white" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-white text-sm font-medium truncate">{campaign.title}</p>
                        <p className="text-white/40 text-xs truncate">{campaign.brandName} · ${campaign.budgetPerCreator.toLocaleString()}/creator</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

export default function Navbar() {
  const { data: session } = useSession();
  const { t, lang, setLang } = useLang();
  const { unreadCount } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);

  const role = session?.user?.role;
  const dashboardHref = role === "CREATOR" ? "/creator" : role === "AGENCY" ? "/agency" : role === "BRAND" ? "/dashboard" : "/onboarding";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/8 bg-[#0a0a0f]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-white">Mundo Creadores</span>
          </Link>

          {/* Desktop Nav links */}
          <div className="hidden md:flex items-center gap-1">
            <Button asChild variant="ghost" size="sm">
              <Link href="/explore/creators" className="gap-2 flex items-center">
                <Search className="w-4 h-4" /> {t("nav.creators")}
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/explore/agencies" className="gap-2 flex items-center">
                <Search className="w-4 h-4" /> {t("nav.agencies")}
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/marketplace" className="gap-2 flex items-center">
                <ShoppingBag className="w-4 h-4" /> Marketplace
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/campaigns" className="gap-2 flex items-center">
                <Megaphone className="w-4 h-4" /> Campañas
              </Link>
            </Button>
          </div>

          {/* Global search — desktop only, between nav and actions */}
          <GlobalSearch />

          {/* Right side */}
          <div className="flex items-center gap-1">
            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              className="hidden md:flex items-center px-2 py-1 rounded-md text-xs font-medium text-white/40 hover:text-white hover:bg-white/5 transition-colors"
              title={lang === "en" ? "Cambiar a Español" : "Switch to English"}
            >
              {lang === "en" ? "🇪🇸 ES" : "🇺🇸 EN"}
            </button>

            {session ? (
              <>
                <Button asChild variant="ghost" size="icon" className="hidden md:flex relative">
                  <Link href="/messages" aria-label={t("nav.messages")}>
                    <MessageSquare className="w-4 h-4" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-violet-600 rounded-full text-[10px] font-bold text-white flex items-center justify-center leading-none">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="icon" className="hidden md:flex">
                  <Link href={dashboardHref} aria-label={t("nav.dashboard")}>
                    <LayoutDashboard className="w-4 h-4" />
                  </Link>
                </Button>
                <Link
                  href="/me"
                  aria-label={t("nav.myProfile")}
                  className="hidden md:flex items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                >
                  <Avatar className="w-8 h-8 hover:ring-2 hover:ring-violet-500 transition-all">
                    <AvatarImage src={session.user?.image ?? ""} />
                    <AvatarFallback className="text-xs">
                      {session.user?.name?.[0]?.toUpperCase() ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden md:flex text-white/50 hover:text-red-400"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  aria-label={t("nav.signOut")}
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/login">{t("nav.signIn")}</Link>
                </Button>
                <Button asChild variant="gradient" size="sm">
                  <Link href="/register">{t("nav.getStarted")}</Link>
                </Button>
              </div>
            )}

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
              <Search className="w-4 h-4" /> {t("nav.exploreCreators")}
            </Link>
          </Button>
          <Button asChild variant="ghost" className="w-full justify-start gap-2">
            <Link href="/explore/agencies" onClick={() => setMenuOpen(false)}>
              <Search className="w-4 h-4" /> {t("nav.exploreAgencies")}
            </Link>
          </Button>
          <Button asChild variant="ghost" className="w-full justify-start gap-2">
            <Link href="/marketplace" onClick={() => setMenuOpen(false)}>
              <ShoppingBag className="w-4 h-4" /> Marketplace
            </Link>
          </Button>
          <Button asChild variant="ghost" className="w-full justify-start gap-2">
            <Link href="/campaigns" onClick={() => setMenuOpen(false)}>
              <Megaphone className="w-4 h-4" /> Campañas
            </Link>
          </Button>
          <button
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-md text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors"
          >
            {lang === "en" ? "🇪🇸 Cambiar a Español" : "🇺🇸 Switch to English"}
          </button>
          {session ? (
            <>
              <Button asChild variant="ghost" className="w-full justify-start gap-2">
                <Link href="/messages" onClick={() => setMenuOpen(false)}>
                  <MessageSquare className="w-4 h-4" /> {t("nav.messages")}
                </Link>
              </Button>
              <Button asChild variant="ghost" className="w-full justify-start gap-2">
                <Link href={dashboardHref} onClick={() => setMenuOpen(false)}>
                  <LayoutDashboard className="w-4 h-4" /> {t("nav.dashboard")}
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
                  {t("nav.myProfile")}
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-red-400"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <LogOut className="w-4 h-4" /> {t("nav.signOut")}
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" className="w-full">
                <Link href="/login" onClick={() => setMenuOpen(false)}>{t("nav.signIn")}</Link>
              </Button>
              <Button asChild variant="gradient" className="w-full">
                <Link href="/register" onClick={() => setMenuOpen(false)}>{t("nav.getStarted")}</Link>
              </Button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
