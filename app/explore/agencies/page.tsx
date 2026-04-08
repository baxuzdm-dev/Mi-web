"use client";

import { useEffect, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AgencyCard from "@/components/AgencyCard";

const COUNTRIES = ["United States", "United Kingdom", "Canada", "Australia", "Germany", "France", "Brazil", "Colombia", "Mexico"];

interface Agency {
  id: string;
  name: string;
  logo?: string;
  description?: string;
  services: string[];
  commission: number;
  website?: string;
  country?: string;
  isVerified: boolean;
  user?: { name?: string; image?: string };
}

export default function ExploreAgenciesPage() {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [maxCommission, setMaxCommission] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (selectedCountry) params.set("country", selectedCountry);
    if (maxCommission) params.set("maxCommission", maxCommission);
    if (verifiedOnly) params.set("verified", "true");

    setLoading(true);
    const timer = setTimeout(() => {
      fetch(`/api/agencies?${params.toString()}`)
        .then((r) => r.json())
        .then((data) => {
          setAgencies(data);
          setLoading(false);
        });
    }, 300);
    return () => clearTimeout(timer);
  }, [search, selectedCountry, maxCommission, verifiedOnly]);

  const hasFilters = selectedCountry || maxCommission || verifiedOnly;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Explore Agencies</h1>
        <p className="text-white/50">Find the perfect management agency to grow your career</p>
      </div>

      {/* Search bar */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <Input
            placeholder="Search agencies..."
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
          {hasFilters && <span className="w-2 h-2 rounded-full bg-violet-400" />}
        </Button>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="p-5 rounded-2xl border border-white/10 bg-white/4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-white">Filters</span>
            {hasFilters && (
              <button
                onClick={() => { setSelectedCountry(""); setMaxCommission(""); setVerifiedOnly(false); }}
                className="text-xs text-white/40 hover:text-white flex items-center gap-1"
              >
                <X className="w-3 h-3" /> Clear all
              </button>
            )}
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
              <label className="text-xs text-white/50 mb-2 block">Max Commission %</label>
              <select
                value={maxCommission}
                onChange={(e) => setMaxCommission(e.target.value)}
                className="flex h-9 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="" className="bg-[#1a1a2e]">Any</option>
                <option value="15" className="bg-[#1a1a2e]">Up to 15%</option>
                <option value="20" className="bg-[#1a1a2e]">Up to 20%</option>
                <option value="25" className="bg-[#1a1a2e]">Up to 25%</option>
                <option value="30" className="bg-[#1a1a2e]">Up to 30%</option>
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

      <div className="text-sm text-white/40 mb-4">
        {loading ? "Loading..." : `${agencies.length} agenc${agencies.length !== 1 ? "ies" : "y"} found`}
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-52 rounded-2xl bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : agencies.length === 0 ? (
        <div className="text-center py-20">
          <Search className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <p className="text-white/50 text-lg">No agencies found</p>
          <p className="text-white/30 text-sm mt-1">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {agencies.map((agency) => (
            <AgencyCard key={agency.id} agency={agency} />
          ))}
        </div>
      )}
    </div>
  );
}
