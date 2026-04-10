"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/contexts/AppContext";
import { mockCreators } from "@/lib/mockData";
import {
  Zap,
  Home,
  Search,
  ShoppingBag,
  Megaphone,
  MessageSquare,
  Bell,
  BarChart2,
  Settings,
  User,
  Lock,
  BellRing,
  Shield,
  CreditCard,
  BadgeCheck,
  Camera,
  Upload,
  ChevronRight,
  Check,
  type LucideIcon,
} from "lucide-react";

// ─── Sidebar ──────────────────────────────────────────────────────────────────

const navItems = [
  { icon: Home,           label: "Inicio",          href: "/feed" },
  { icon: Search,         label: "Explorar",         href: "/explore/creators" },
  { icon: ShoppingBag,    label: "Marketplace",      href: "/marketplace" },
  { icon: Megaphone,      label: "Campañas",         href: "/campaigns" },
  { icon: MessageSquare,  label: "Mensajes",         href: "/chat",          badge: "3" },
  { icon: Bell,           label: "Notificaciones",   href: "/notifications",  badge: "4" },
  { icon: BarChart2,      label: "Analytics",        href: "/analytics" },
  { icon: Settings,       label: "Ajustes",          href: "/settings" },
];

function Sidebar() {
  return (
    <aside className="w-64 shrink-0 hidden md:flex flex-col bg-[#0d0d14] border-r border-white/[0.08] min-h-screen pt-6 pb-4 px-3">
      <div className="flex items-center gap-2.5 px-3 mb-8">
        <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center shrink-0">
          <Zap size={16} className="text-white" />
        </div>
        <span className="font-bold text-white text-sm leading-tight">
          Mundo<br />Creadores
        </span>
      </div>
      <nav className="flex flex-col gap-0.5 flex-1">
        {navItems.map((item, i) => {
          const Icon = item.icon;
          const isActive = i === 7; // Settings is index 7
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors relative ${
                isActive
                  ? "bg-violet-600/15 text-violet-300 border border-violet-500/20"
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={17} />
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-violet-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="mt-4 px-3 py-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
          SR
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-white truncate">Sofia Ramírez</p>
          <p className="text-xs text-white/40 truncate">@sofiaramirez</p>
        </div>
      </div>
    </aside>
  );
}

// ─── Toggle Switch ────────────────────────────────────────────────────────────

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${
        enabled ? "bg-violet-600" : "bg-white/20"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

// ─── Toggle Row ───────────────────────────────────────────────────────────────

function ToggleRow({
  label,
  description,
  enabled,
  onChange,
}: {
  label: string;
  description?: string;
  enabled: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-white/5 last:border-b-0">
      <div className="flex-1 min-w-0 pr-4">
        <p className="text-sm font-medium text-white">{label}</p>
        {description && <p className="text-xs text-white/40 mt-0.5">{description}</p>}
      </div>
      <Toggle enabled={enabled} onChange={onChange} />
    </div>
  );
}

// ─── Form Field ───────────────────────────────────────────────────────────────

function Field({
  label,
  type = "text",
  defaultValue,
  placeholder,
  readOnly,
  actionLabel,
}: {
  label: string;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
  readOnly?: boolean;
  actionLabel?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-white/70">{label}</label>
      <div className="flex gap-2">
        <input
          type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          readOnly={readOnly}
          className={`flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-violet-500 transition-colors ${
            readOnly ? "opacity-60 cursor-not-allowed" : ""
          }`}
        />
        {actionLabel && (
          <button className="text-sm text-violet-400 hover:text-violet-300 bg-violet-600/10 hover:bg-violet-600/20 border border-violet-500/20 px-4 rounded-xl transition-colors whitespace-nowrap">
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Tab definitions ─────────────────────────────────────────────────────────

type Tab = "perfil" | "cuenta" | "notificaciones" | "privacidad" | "pagos" | "verificacion";

const TABS: { id: Tab; label: string; icon: LucideIcon }[] = [
  { id: "perfil",         label: "Perfil",          icon: User        },
  { id: "cuenta",         label: "Cuenta",          icon: Lock        },
  { id: "notificaciones", label: "Notificaciones",  icon: BellRing    },
  { id: "privacidad",     label: "Privacidad",      icon: Shield      },
  { id: "pagos",          label: "Pagos",           icon: CreditCard  },
  { id: "verificacion",   label: "Verificación",    icon: BadgeCheck  },
];

const NICHES = ["Lifestyle", "Travel", "Beauty", "Fitness", "Tech", "Gaming", "Food", "Music", "Fashion", "Art"];
const PLATFORMS = ["Instagram", "TikTok", "YouTube", "OnlyFans", "Twitter / X", "Twitch"];
const COUNTRIES = ["México", "Colombia", "Argentina", "España", "Venezuela", "Chile", "Perú", "Ecuador", "Uruguay", "Brasil"];

const MOCK_TRANSACTIONS = [
  { date: "10 Abr 2026", description: "Suscripción Plan Pro — Mensual", amount: "$29.99", status: "Completado" },
  { date: "10 Mar 2026", description: "Suscripción Plan Pro — Mensual", amount: "$29.99", status: "Completado" },
  { date: "10 Feb 2026", description: "Suscripción Plan Pro — Mensual", amount: "$29.99", status: "Completado" },
];

// ─── Tab: Perfil ──────────────────────────────────────────────────────────────

function TabPerfil() {
  const { state, updateProfile } = useApp();
  const MAX_BIO = 500;

  const demoCreator = mockCreators.find((c) => c.username === "sofiaramirez");

  const [displayName, setDisplayName] = useState(
    state.profile.displayName ?? demoCreator?.user.name ?? "Sofia Ramírez"
  );
  const [bio, setBio] = useState(
    state.profile.bio ?? demoCreator?.bio ?? ""
  );
  const [country, setCountry] = useState(
    state.profile.country ?? demoCreator?.country ?? "México"
  );
  const [website, setWebsite] = useState(state.profile.website ?? "");
  const [selectedNiches, setSelectedNiches] = useState<string[]>(
    state.profile.niche ?? demoCreator?.niche ?? ["Lifestyle", "Travel"]
  );
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(
    state.profile.platforms ?? demoCreator?.platforms ?? ["Instagram", "TikTok"]
  );
  const [saved, setSaved] = useState(false);

  function toggleItem(list: string[], setList: (v: string[]) => void, item: string) {
    if (list.includes(item)) setList(list.filter((i) => i !== item));
    else setList([...list, item]);
  }

  function handleSave() {
    updateProfile({ displayName, bio, country, website, niche: selectedNiches, platforms: selectedPlatforms });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-8">
      {/* Success toast */}
      {saved && (
        <div className="flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm font-medium px-4 py-3 rounded-xl">
          <Check size={16} />
          ¡Perfil actualizado!
        </div>
      )}

      {/* Avatar */}
      <div className="flex items-center gap-5">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-2xl font-bold text-white">
            SR
          </div>
          <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-violet-600 hover:bg-violet-500 rounded-full flex items-center justify-center transition-colors border-2 border-[#0a0a0f]">
            <Camera size={12} className="text-white" />
          </button>
        </div>
        <div>
          <p className="text-sm font-medium text-white">{displayName}</p>
          <p className="text-xs text-white/40 mt-0.5">@sofiaramirez</p>
          <button className="mt-2 text-xs text-violet-400 hover:text-violet-300 transition-colors">
            Cambiar foto
          </button>
        </div>
      </div>

      {/* Fields */}
      <div className="space-y-5">
        {/* Display name */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-white/70">Nombre visible</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-violet-500 transition-colors"
          />
        </div>

        {/* Username (read-only) */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-white/70">Nombre de usuario</label>
          <input
            type="text"
            value="sofiaramirez"
            readOnly
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white opacity-60 cursor-not-allowed outline-none"
          />
        </div>

        {/* Bio */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-white/70">Bio</label>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value.slice(0, MAX_BIO))}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-violet-500 transition-colors resize-none"
          />
          <p className={`text-xs text-right ${MAX_BIO - bio.length < 40 ? "text-orange-400" : "text-white/30"}`}>
            {MAX_BIO - bio.length} caracteres restantes
          </p>
        </div>

        {/* Website */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-white/70">Sitio web</label>
          <input
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://tuwebsite.com"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-violet-500 transition-colors"
          />
        </div>

        {/* Country */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-white/70">País</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500 transition-colors cursor-pointer"
          >
            {COUNTRIES.map((c) => (
              <option key={c} value={c} className="bg-[#0d0d14]">{c}</option>
            ))}
          </select>
        </div>

        {/* Nicho */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/70">Nicho</label>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {NICHES.map((n) => {
              const active = selectedNiches.includes(n);
              return (
                <button
                  key={n}
                  onClick={() => toggleItem(selectedNiches, setSelectedNiches, n)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${
                    active
                      ? "bg-violet-600/20 border-violet-500/40 text-violet-300"
                      : "bg-white/5 border-white/10 text-white/50 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {active && <Check size={10} />}
                  {n}
                </button>
              );
            })}
          </div>
        </div>

        {/* Plataformas */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/70">Plataformas</label>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {PLATFORMS.map((p) => {
              const active = selectedPlatforms.includes(p);
              return (
                <button
                  key={p}
                  onClick={() => toggleItem(selectedPlatforms, setSelectedPlatforms, p)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${
                    active
                      ? "bg-pink-600/20 border-pink-500/40 text-pink-300"
                      : "bg-white/5 border-white/10 text-white/50 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {active && <Check size={10} />}
                  {p}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Save */}
      <button
        onClick={handleSave}
        className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
      >
        Guardar cambios
      </button>
    </div>
  );
}

// ─── Tab: Cuenta ──────────────────────────────────────────────────────────────

function TabCuenta() {
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwSuccess, setPwSuccess] = useState(false);

  function handlePasswordChange() {
    setPwError("");
    setPwSuccess(false);
    if (!currentPw) { setPwError("Ingresa tu contraseña actual."); return; }
    if (newPw.length < 8) { setPwError("La nueva contraseña debe tener al menos 8 caracteres."); return; }
    if (newPw !== confirmPw) { setPwError("Las contraseñas no coinciden."); return; }
    // Demo: simulate success
    setPwSuccess(true);
    setCurrentPw(""); setNewPw(""); setConfirmPw("");
    setTimeout(() => setPwSuccess(false), 2000);
  }

  return (
    <div className="space-y-8">
      {/* Email */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-4">Correo electrónico</h3>
        <Field
          label="Email"
          type="email"
          defaultValue="sofia@example.com"
          readOnly
          actionLabel="Cambiar"
        />
      </div>

      {/* Password */}
      <div className="pt-4 border-t border-white/5">
        <h3 className="text-sm font-semibold text-white mb-4">Cambiar contraseña</h3>
        <div className="space-y-4">
          {pwSuccess && (
            <div className="flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm font-medium px-4 py-3 rounded-xl">
              <Check size={16} />
              ¡Contraseña actualizada correctamente!
            </div>
          )}
          {pwError && (
            <div className="bg-red-500/15 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl">
              {pwError}
            </div>
          )}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-white/70">Contraseña actual</label>
            <input
              type="password"
              value={currentPw}
              onChange={(e) => setCurrentPw(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-violet-500 transition-colors"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-white/70">Nueva contraseña</label>
            <input
              type="password"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-violet-500 transition-colors"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-white/70">Confirmar nueva contraseña</label>
            <input
              type="password"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              placeholder="••••••••"
              className={`w-full bg-white/5 border rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-violet-500 transition-colors ${
                confirmPw && newPw !== confirmPw ? "border-red-500/50" : "border-white/10"
              }`}
            />
            {confirmPw && newPw !== confirmPw && (
              <p className="text-xs text-red-400">Las contraseñas no coinciden</p>
            )}
          </div>
          <button
            onClick={handlePasswordChange}
            className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
          >
            Actualizar contraseña
          </button>
        </div>
      </div>

      {/* Plan */}
      <div className="pt-4 border-t border-white/5">
        <h3 className="text-sm font-semibold text-white mb-4">Plan actual</h3>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-semibold text-white">Plan Gratis</span>
              <span className="text-[10px] font-bold uppercase tracking-wide bg-white/10 text-white/60 px-2 py-0.5 rounded-full">
                Activo
              </span>
            </div>
            <p className="text-xs text-white/40">Acceso básico a la plataforma. Actualiza para desbloquear todas las funciones.</p>
          </div>
          <button className="ml-4 shrink-0 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all">
            Actualizar a Pro
          </button>
        </div>
      </div>

      {/* Danger zone */}
      <div className="pt-4 border-t border-red-500/20">
        <h3 className="text-sm font-semibold text-red-400 mb-2">Zona de peligro</h3>
        <p className="text-xs text-white/40 mb-4">
          Esta acción es permanente e irreversible. Se eliminarán todos tus datos, conversaciones y servicios.
        </p>
        <button className="bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 hover:text-red-300 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
          Eliminar cuenta
        </button>
      </div>
    </div>
  );
}

// ─── Tab: Notificaciones ──────────────────────────────────────────────────────

const NOTIF_TOGGLES = [
  { id: "messages",    label: "Nuevos mensajes",            description: "Recibe una notificación cuando alguien te escriba." },
  { id: "proposals",   label: "Propuestas de colaboración", description: "Alertas cuando marcas o agencias te envíen propuestas." },
  { id: "visits",      label: "Tu perfil fue visitado",     description: "Entérate cuando alguien vea tu perfil." },
  { id: "campaigns",   label: "Nuevas campañas",            description: "Campañas que encajan con tu perfil y nicho." },
  { id: "reviews",     label: "Reseñas",                    description: "Cuando alguien deje una reseña en tu perfil." },
  { id: "system",      label: "Sistema",                    description: "Actualizaciones de la plataforma y avisos importantes." },
];

const NOTIF_STORAGE_KEY = "mc_notif_prefs";

function TabNotificaciones() {
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(NOTIF_TOGGLES.map((t) => [t.id, true]))
  );
  const [saved, setSaved] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(NOTIF_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, boolean>;
        setToggles((prev) => ({ ...prev, ...parsed }));
      }
    } catch { /* ignore */ }
  }, []);

  function handleToggle(id: string, value: boolean) {
    const next = { ...toggles, [id]: value };
    setToggles(next);
    try { localStorage.setItem(NOTIF_STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
  }

  function handleSave() {
    try { localStorage.setItem(NOTIF_STORAGE_KEY, JSON.stringify(toggles)); } catch { /* ignore */ }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-white mb-1">Preferencias de notificación</h3>
        <p className="text-xs text-white/40">Elige qué notificaciones quieres recibir en la plataforma.</p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm font-medium px-4 py-3 rounded-xl">
          <Check size={16} />
          ¡Preferencias guardadas!
        </div>
      )}

      <div className="bg-white/5 border border-white/10 rounded-2xl px-5 divide-y divide-white/5">
        {NOTIF_TOGGLES.map((t) => (
          <ToggleRow
            key={t.id}
            label={t.label}
            description={t.description}
            enabled={toggles[t.id]}
            onChange={(v) => handleToggle(t.id, v)}
          />
        ))}
      </div>

      <button
        onClick={handleSave}
        className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
      >
        Guardar preferencias
      </button>
    </div>
  );
}

// ─── Tab: Privacidad ──────────────────────────────────────────────────────────

function TabPrivacidad() {
  const [stats, setStats]   = useState(true);
  const [search, setSearch] = useState(true);
  const [pubProfile, setPubProfile] = useState(true);
  const [messaging, setMessaging]   = useState("todos");

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-white mb-1">Configuración de privacidad</h3>
        <p className="text-xs text-white/40">Controla quién puede ver tu información y cómo apareces en la plataforma.</p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl px-5">
        {/* Mensajes */}
        <div className="flex items-center justify-between py-4 border-b border-white/5">
          <div className="flex-1 min-w-0 pr-4">
            <p className="text-sm font-medium text-white">Quién puede mensajearte</p>
            <p className="text-xs text-white/40 mt-0.5">Define quién puede iniciarte una conversación.</p>
          </div>
          <select
            value={messaging}
            onChange={(e) => setMessaging(e.target.value)}
            className="bg-white/10 border border-white/10 text-white text-xs rounded-lg px-3 py-1.5 outline-none focus:border-violet-500 cursor-pointer"
          >
            <option value="todos" className="bg-[#0d0d14]">Todos</option>
            <option value="verificados" className="bg-[#0d0d14]">Solo verificados</option>
          </select>
        </div>

        <ToggleRow
          label="Mostrar mis estadísticas"
          description="Permite que otros vean tu conteo de seguidores y engagement estimado."
          enabled={stats}
          onChange={setStats}
        />
        <ToggleRow
          label="Aparecer en búsquedas"
          description="Tu perfil aparecerá en los resultados de búsqueda de marcas y agencias."
          enabled={search}
          onChange={setSearch}
        />
        <ToggleRow
          label="Perfil público"
          description="Cualquier persona puede ver tu perfil aunque no sea usuaria de la plataforma."
          enabled={pubProfile}
          onChange={setPubProfile}
        />
      </div>

      <button className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors">
        Guardar cambios
      </button>
    </div>
  );
}

// ─── Tab: Pagos ───────────────────────────────────────────────────────────────

function TabPagos() {
  return (
    <div className="space-y-8">
      {/* Métodos de pago */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-4">Métodos de pago</h3>
        <div className="bg-white/5 border border-dashed border-white/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-3">
            <CreditCard size={22} className="text-white/30" />
          </div>
          <p className="text-sm text-white/50 mb-1">Sin métodos de pago registrados</p>
          <p className="text-xs text-white/30 mb-4">Agrega una tarjeta o cuenta bancaria para recibir pagos.</p>
          <button className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2">
            <span>+</span>
            Agregar método de pago
          </button>
        </div>
      </div>

      {/* Historial de transacciones */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-4">Historial de transacciones</h3>
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-4 px-5 py-3 border-b border-white/5">
            <span className="text-xs font-semibold text-white/40 uppercase tracking-wide">Fecha</span>
            <span className="text-xs font-semibold text-white/40 uppercase tracking-wide col-span-1">Descripción</span>
            <span className="text-xs font-semibold text-white/40 uppercase tracking-wide text-right">Monto</span>
            <span className="text-xs font-semibold text-white/40 uppercase tracking-wide text-right">Estado</span>
          </div>
          {MOCK_TRANSACTIONS.map((tx, i) => (
            <div
              key={i}
              className="grid grid-cols-4 items-center px-5 py-4 border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors"
            >
              <span className="text-xs text-white/50">{tx.date}</span>
              <span className="text-sm text-white col-span-1 truncate">{tx.description}</span>
              <span className="text-sm font-semibold text-white text-right">{tx.amount}</span>
              <div className="flex justify-end">
                <span className="text-[10px] font-bold uppercase tracking-wide bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  {tx.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Verificación ────────────────────────────────────────────────────────

const VERIF_STEPS = [
  { num: 1, title: "Subir ID oficial",           desc: "Pasaporte, INE, cédula u otro documento de identidad oficial." },
  { num: 2, title: "Selfie con ID",               desc: "Una foto tuya sosteniendo tu documento de identidad." },
  { num: 3, title: "Conectar redes sociales",     desc: "Vincula al menos una red social con tu mismo nombre de usuario." },
];

function TabVerificacion() {
  const [dragOver, setDragOver] = useState(false);

  return (
    <div className="space-y-8">
      {/* Status */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
          <BadgeCheck size={18} className="text-orange-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Estado de verificación</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 block" />
            <span className="text-xs text-orange-400 font-medium">Sin verificar</span>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-white">Pasos para verificar tu cuenta</h3>
        {VERIF_STEPS.map((step) => (
          <div
            key={step.num}
            className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-4"
          >
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-sm font-bold text-white/60 shrink-0">
              {step.num}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">{step.title}</p>
              <p className="text-xs text-white/40 mt-0.5">{step.desc}</p>
            </div>
            <ChevronRight size={15} className="text-white/20 shrink-0 mt-0.5" />
          </div>
        ))}
      </div>

      {/* Upload box */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-3">Subir documento</h3>
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
          className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center transition-colors cursor-pointer ${
            dragOver
              ? "border-violet-500/60 bg-violet-500/5"
              : "border-white/15 hover:border-white/30 hover:bg-white/[0.02]"
          }`}
        >
          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-3">
            <Upload size={20} className="text-white/30" />
          </div>
          <p className="text-sm text-white/60 mb-1">Arrastra tu documento aquí</p>
          <p className="text-xs text-white/30">o haz clic para seleccionar un archivo</p>
          <p className="text-[10px] text-white/20 mt-3">PNG, JPG, PDF — máx. 10 MB</p>
        </div>
      </div>

      <button className="w-full bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white text-sm font-semibold py-3 rounded-xl transition-all">
        Solicitar verificación
      </button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("perfil");

  function renderContent() {
    switch (activeTab) {
      case "perfil":         return <TabPerfil />;
      case "cuenta":         return <TabCuenta />;
      case "notificaciones": return <TabNotificaciones />;
      case "privacidad":     return <TabPrivacidad />;
      case "pagos":          return <TabPagos />;
      case "verificacion":   return <TabVerificacion />;
    }
  }

  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      <Sidebar />

      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-white">Ajustes</h1>
            <p className="text-white/50 text-sm mt-1">Administra tu cuenta y preferencias</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors shrink-0 ${
                    isActive
                      ? "bg-violet-600/20 text-violet-300 border border-violet-500/30"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon size={14} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8">
            {renderContent()}
          </div>

        </div>
      </main>
    </div>
  );
}
