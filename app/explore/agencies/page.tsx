"use client";

import { useEffect, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AgencyCard from "@/components/AgencyCard";
import { mockAgencies, filterAgencies } from "@/lib/mockData";

const COUNTRIES = ["México", "Colombia", "Argentina", "España", "Chile", "Perú", "Venezuela", "Uruguay", "Ecuador", "Estados Unidos", "Reino Unido"];
const SERVICES = ["Management", "Negociación de contratos", "Producción", "Estrategia de contenido", "Distribución", "Marketing digital"];

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
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [maxCommission, setMaxCommission] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Compute filtered mock data directly
  const agencies: Agency[] = filterAgencies(mockAgencies, {
    search: search || undefined,
    country: selectedCountry || undefined,
    maxCommission: maxCommission ? Number(maxCommission) : undefined,
    verifiedOnly: verifiedOnly || undefined,
  }).filter((a) =>
    !selectedService || a.services.some((s) => s.toLowerCase().includes(selectedService.toLowerCase()))
  );

  const hasFilters = selectedCountry || selectedService || maxCommission || verifiedOnly;

  // Background API upgrade
  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    fetch(`/api/agencies`, { signal: controller.signal })
      .then(() => { /* upgrade with real data if needed */ })
      .catch(() => { /* keep mock */ })
      .finally(() => clearTimeout(timeout));
    return () => { controller.abort(); clearTimeout(timeout); };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Explorar Agencias</h1>
        <p className="text-white/50">Encuentra la agencia de management perfecta para hacer crecer tu carrera</p>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <Input
            placeholder="Buscar agencias por nombre, especialidad..."
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
              <button
                onClick={() => { setSelectedCountry(""); setSelectedService(""); setMaxCommission(""); setVerifiedOnly(false); }}
                className="text-xs text-white/40 hover:text-white flex items-center gap-1"
              >
                <X className="w-3 h-3" /> Limpiar todo
              </button>
            )}
          </div>

          <div>
            <label className="text-xs text-white/50 mb-2 block">Especialidad</label>
            <div className="flex flex-wrap gap-2">
              {SERVICES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedService(selectedService === s ? "" : s)}
                  className={`px-3 py-1 rounded-full text-xs border transition-all ${
                    selectedService === s
                      ? "border-pink-500/60 bg-pink-500/20 text-pink-300"
                      : "border-white/10 bg-white/5 text-white/50 hover:border-white/20"
                  }`}
                >
                  {s}
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
              <label className="text-xs text-white/50 mb-2 block">Comisión máxima %</label>
              <select
                value={maxCommission}
                onChange={(e) => setMaxCommission(e.target.value)}
                className="flex h-9 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="" className="bg-[#1a1a2e]">Cualquiera</option>
                <option value="15" className="bg-[#1a1a2e]">Hasta 15%</option>
                <option value="20" className="bg-[#1a1a2e]">Hasta 20%</option>
                <option value="25" className="bg-[#1a1a2e]">Hasta 25%</option>
                <option value="30" className="bg-[#1a1a2e]">Hasta 30%</option>
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
                Solo verificadas
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="text-sm text-white/40 mb-4">
        {`${agencies.length} ${agencies.length === 1 ? "agencia encontrada" : "agencias encontradas"}`}
      </div>

      {agencies.length === 0 ? (
        <div className="text-center py-20">
          <Search className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <p className="text-white/50 text-lg">No se encontraron agencias</p>
          <p className="text-white/30 text-sm mt-1">Intenta ajustar los filtros</p>
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
