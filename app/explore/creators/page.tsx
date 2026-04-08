"use client";

import { useEffect, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CreatorCard from "@/components/CreatorCard";

const NICHES = ["Fitness", "Lifestyle", "Gaming", "Beauty", "Travel", "Food", "Fashion", "Music", "Art", "Tech", "Cosplay"];
const COUNTRIES = ["United States", "United Kingdom", "Canada", "Australia", "Germany", "France", "Brazil", "Colombia", "Mexico"];

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
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [minFollowers, setMinFollowers] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (selectedNiche) params.set("niche", selectedNiche);
    if (selectedCountry) params.set("country", selectedCountry);
    if (minFollowers) params.set("minFollowers", minFollowers);
    if (verifiedOnly) params.set("verified", "true");

    setLoading(true);
    const timer = setTimeout(() => {
      fetch(`/api/creators?${params.toString()}`)
        .then((r) => r.json())
        .then((data) => {
          setCreators(data);
          setLoading(false);
        });
    }, 300);
    return () => clearTimeout(timer);
  }, [search, selectedNiche, selectedCountry, minFollowers, verifiedOnly]);

  const hasFilters = selectedNiche || selectedCountry || minFollowers || verifiedOnly;

  function clearFilters() {
    setSelectedNiche("");
    setSelectedCountry("");
    setMinFollowers("");
    setVerifiedOnly(false);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Explore Creators</h1>
        <p className="text-white/50">Discover talented content creators looking for management</p>
      </div>

      {/* Search + Filter bar */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <Input
            placeholder="Search by username or bio..."
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
          Filters
          {hasFilters && (
            <span className="w-2 h-2 rounded-full bg-violet-400" />
          )}
        </Button>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="p-5 rounded-2xl border border-white/10 bg-white/4 mb-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-white">Filters</span>
            {hasFilters && (
              <button onClick={clearFilters} className="text-xs text-white/40 hover:text-white flex items-center gap-1">
                <X className="w-3 h-3" /> Clear all
              </button>
            )}
          </div>

          <div>
            <label className="text-xs text-white/50 mb-2 block">Niche</label>
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
              <label className="text-xs text-white/50 mb-2 block">Country</label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="flex h-9 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="" className="bg-[#1a1a2e]">All countries</option>
                {COUNTRIES.map((c) => <option key={c} value={c} className="bg-[#1a1a2e]">{c}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs text-white/50 mb-2 block">Min. Followers</label>
              <select
                value={minFollowers}
                onChange={(e) => setMinFollowers(e.target.value)}
                className="flex h-9 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="" className="bg-[#1a1a2e]">Any</option>
                <option value="1000" className="bg-[#1a1a2e]">1K+</option>
                <option value="10000" className="bg-[#1a1a2e]">10K+</option>
                <option value="50000" className="bg-[#1a1a2e]">50K+</option>
                <option value="100000" className="bg-[#1a1a2e]">100K+</option>
                <option value="500000" className="bg-[#1a1a2e]">500K+</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-white/50 mb-2 block">Verification</label>
              <button
                onClick={() => setVerifiedOnly(!verifiedOnly)}
                className={`flex h-9 w-full items-center justify-center rounded-lg border text-sm transition-all ${
                  verifiedOnly
                    ? "border-violet-500/60 bg-violet-500/20 text-violet-300"
                    : "border-white/10 bg-white/5 text-white/50 hover:border-white/20"
                }`}
              >
                Verified only
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Results count */}
      <div className="text-sm text-white/40 mb-4">
        {loading ? "Loading..." : `${creators.length} creator${creators.length !== 1 ? "s" : ""} found`}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-52 rounded-2xl bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : creators.length === 0 ? (
        <div className="text-center py-20">
          <Search className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <p className="text-white/50 text-lg">No creators found</p>
          <p className="text-white/30 text-sm mt-1">Try adjusting your filters</p>
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
