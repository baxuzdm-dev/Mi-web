"use client";

import { useEffect, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CreatorCard from "@/components/CreatorCard";
import { useLang } from "@/contexts/LangContext";
import { COUNTRIES } from "@/lib/countries";
import { mockCreators, filterCreators } from "@/lib/mockData";

const NICHES = ["Fitness", "Lifestyle", "Gaming", "Beauty", "Travel", "Food", "Fashion", "Music", "Art", "Tech", "Cosplay", "OnlyFans"];

interface Creator {
  id: string;
  username: string;
  avatar?: string;
  bio?: string;
  country?: string;
  niche: string[];
  followers: number;
  estimatedIncome: number;
  isVerified: boolean;
  isAvailable: boolean;
  user?: { name?: string; image?: string };
}

export default function ExploreCreatorsPage() {
  const { t } = useLang();
  const [search, setSearch] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [minFollowers, setMinFollowers] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Compute filtered mock data directly — no async loading needed
  const creators: Creator[] = filterCreators(mockCreators, {
    search: search || undefined,
    niche: selectedNiche || undefined,
    country: selectedCountry || undefined,
    minFollowers: minFollowers ? Number(minFollowers) : undefined,
    verifiedOnly: verifiedOnly || undefined,
  });

  const hasFilters = selectedNiche || selectedCountry || minFollowers || verifiedOnly;

  function clearFilters() {
    setSelectedNiche("");
    setSelectedCountry("");
    setMinFollowers("");
    setVerifiedOnly(false);
  }

  const foundText = `${creators.length} ${creators.length === 1 ? "creador encontrado" : "creadores encontrados"}`;

  // In the background, try to upgrade with real DB data
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (selectedNiche) params.set("niche", selectedNiche);
    if (selectedCountry) params.set("country", selectedCountry);
    if (minFollowers) params.set("minFollowers", minFollowers);
    if (verifiedOnly) params.set("verified", "true");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    fetch(`/api/creators?${params.toString()}`, { signal: controller.signal })
      .then((r) => r.json())
      .then(() => { /* real data would be set here */ })
      .catch(() => { /* silently fall back to mock */ })
      .finally(() => clearTimeout(timeout));

    return () => { controller.abort(); clearTimeout(timeout); };
  }, [search, selectedNiche, selectedCountry, minFollowers, verifiedOnly]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Explorar Creadores</h1>
        <p className="text-white/50">Encuentra el creador perfecto para tu próxima campaña</p>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <Input
            placeholder="Buscar creadores por nombre, nicho..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button
          variant={showFilters ? "default" : "outline"}
          className="gap-2 shrink-0"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filtros
          {hasFilters && <span className="w-2 h-2 rounded-full bg-violet-400" />}
        </Button>
      </div>

      {showFilters && (
        <div className="p-5 rounded-2xl border border-white/10 bg-white/4 mb-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-white">Filtros</span>
            {hasFilters && (
              <button onClick={clearFilters} className="text-xs text-white/40 hover:text-white flex items-center gap-1">
                <X className="w-3 h-3" /> Limpiar todo
              </button>
            )}
          </div>

          <div>
            <label className="text-xs text-white/50 mb-2 block">Nicho</label>
            <div className="flex flex-wrap gap-2">
              {NICHES.map((n) => (
                <button
                  key={n}
                  onClick={() => setSelectedNiche(selectedNiche === n ? "" : n)}
                  className={`px-3 py-1 rounded-full text-xs border transition-all ${
                    selectedNiche === n
                      ? "border-violet-500/60 bg-violet-500/20 text-violet-300"
                      : "border-white/10 bg-white/5 text-white/50 hover:border-white/20"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-white/50 mb-2 block">País</label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="flex h-9 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="" className="bg-[#1a1a2e]">Todos los países</option>
                {COUNTRIES.map((c) => <option key={c} value={c} className="bg-[#1a1a2e]">{c}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs text-white/50 mb-2 block">Seguidores mínimos</label>
              <select
                value={minFollowers}
                onChange={(e) => setMinFollowers(e.target.value)}
                className="flex h-9 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="" className="bg-[#1a1a2e]">Cualquiera</option>
                <option value="10000" className="bg-[#1a1a2e]">10K+</option>
                <option value="50000" className="bg-[#1a1a2e]">50K+</option>
                <option value="100000" className="bg-[#1a1a2e]">100K+</option>
                <option value="500000" className="bg-[#1a1a2e]">500K+</option>
                <option value="1000000" className="bg-[#1a1a2e]">1M+</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-white/50 mb-2 block">Verificación</label>
              <button
                onClick={() => setVerifiedOnly(!verifiedOnly)}
                className={`flex h-9 w-full items-center justify-center rounded-lg border text-sm transition-all ${
                  verifiedOnly
                    ? "border-violet-500/60 bg-violet-500/20 text-violet-300"
                    : "border-white/10 bg-white/5 text-white/50 hover:border-white/20"
                }`}
              >
                Solo verificados
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="text-sm text-white/40 mb-4">{foundText}</div>

      {creators.length === 0 ? (
        <div className="text-center py-20">
          <Search className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <p className="text-white/50 text-lg">No se encontraron creadores</p>
          <p className="text-white/30 text-sm mt-1">Intenta ajustar los filtros</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {creators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      )}
    </div>
  );
}
