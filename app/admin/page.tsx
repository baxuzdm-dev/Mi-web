"use client";

import { useState, useEffect, useCallback } from "react";
import {
  LayoutDashboard, Users, Building2, Megaphone, MessageSquare,
  Settings, LogOut, Plus, Edit2, Trash2, Search, Shield,
  Eye, EyeOff, Save, X, Check, RefreshCw, AlertTriangle,
  ChevronRight, Star, TrendingUp, DollarSign, Globe, UserCog,
  KeyRound, Mail,
} from "lucide-react";
import { mockConversations } from "@/lib/mockData";

/* ─────────────────────────── types ──────────────────────────── */
type Tab = "dashboard" | "creators" | "agencies" | "campaigns" | "messages" | "users" | "settings";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = Record<string, any>;

/* ─────────────────────── helper hooks ───────────────────────── */
function useAdminData(entity: string, authed: boolean) {
  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!authed) return;
    setLoading(true);
    try {
      const r = await fetch(`/api/admin/${entity}`);
      if (r.ok) setData(await r.json());
    } finally {
      setLoading(false);
    }
  }, [entity, authed]);

  useEffect(() => { load(); }, [load]);
  return { data, setData, loading, reload: load };
}

/* ══════════════════════════ MAIN PAGE ════════════════════════ */
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [tab, setTab] = useState<Tab>("dashboard");

  // Check existing session
  useEffect(() => {
    fetch("/api/admin/creators")
      .then((r) => { if (r.ok) setAuthed(true); })
      .finally(() => setChecking(false));
  }, []);

  if (checking) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#0a0a0f] flex items-center justify-center">
        <RefreshCw size={24} className="text-violet-400 animate-spin" />
      </div>
    );
  }

  if (!authed) return <LoginScreen onSuccess={() => setAuthed(true)} />;

  return (
    <div className="fixed inset-0 z-[100] bg-[#0a0a0f] flex overflow-hidden">
      <Sidebar tab={tab} setTab={setTab} onLogout={async () => {
        await fetch("/api/admin/auth", { method: "DELETE" });
        setAuthed(false);
      }} />
      <main className="flex-1 overflow-y-auto">
        {tab === "dashboard" && <DashboardTab authed={authed} />}
        {tab === "creators"  && <EntityTab entity="creators"  authed={authed} config={creatorConfig}  />}
        {tab === "agencies"  && <EntityTab entity="agencies"  authed={authed} config={agencyConfig}   />}
        {tab === "campaigns" && <EntityTab entity="campaigns" authed={authed} config={campaignConfig} />}
        {tab === "messages"  && <MessagesTab />}
        {tab === "users"     && <UsersTab />}
        {tab === "settings"  && <SettingsTab />}
      </main>
    </div>
  );
}

/* ══════════════════════════ LOGIN ════════════════════════════ */
function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const r = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (r.ok) { onSuccess(); }
    else { setError("Contraseña incorrecta"); }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#0a0a0f] flex items-center justify-center">
      <div className="w-full max-w-sm mx-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-pink-600 mb-4">
            <Shield size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Panel Admin</h1>
          <p className="text-white/50 text-sm mt-1">Mundo Creadores</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Contraseña</label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa la contraseña"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-violet-500 transition-colors pr-12"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <AlertTriangle size={16} />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 text-white font-semibold hover:from-violet-500 hover:to-pink-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {loading ? "Verificando..." : "Entrar al panel"}
          </button>
        </form>

        <p className="text-center text-white/30 text-xs mt-6">
          Contraseña por defecto: <span className="font-mono text-white/50">admin2024</span>
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════ SIDEBAR ══════════════════════════ */
const NAV_ITEMS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "dashboard", label: "Dashboard",    icon: <LayoutDashboard size={18} /> },
  { id: "creators",  label: "Creadores",    icon: <Users size={18} /> },
  { id: "agencies",  label: "Agencias",     icon: <Building2 size={18} /> },
  { id: "campaigns", label: "Campañas",     icon: <Megaphone size={18} /> },
  { id: "messages",  label: "Mensajes",     icon: <MessageSquare size={18} /> },
  { id: "users",     label: "Usuarios",     icon: <UserCog size={18} /> },
  { id: "settings",  label: "Configuración",icon: <Settings size={18} /> },
];

function Sidebar({ tab, setTab, onLogout }: { tab: Tab; setTab: (t: Tab) => void; onLogout: () => void }) {
  return (
    <aside className="w-60 shrink-0 border-r border-white/10 flex flex-col bg-[#0d0d15]">
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center">
            <Shield size={16} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Admin Panel</p>
            <p className="text-[11px] text-white/40">Mundo Creadores</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              tab === item.id
                ? "bg-violet-600/20 text-violet-300 border border-violet-500/30"
                : "text-white/50 hover:text-white hover:bg-white/5"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-3 border-t border-white/10">
        <a
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all mb-1"
        >
          <Globe size={18} />
          Ver sitio
        </a>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut size={18} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}

/* ══════════════════════════ DASHBOARD ═══════════════════════ */
function DashboardTab({ authed }: { authed: boolean }) {
  const { data: creators } = useAdminData("creators", authed);
  const { data: agencies }  = useAdminData("agencies",  authed);
  const { data: campaigns } = useAdminData("campaigns", authed);

  const totalApplied = campaigns.reduce((s: number, c: Row) => s + (c.creatorsApplied ?? 0), 0);
  const totalBudget  = campaigns.reduce((s: number, c: Row) => s + (c.totalBudget ?? 0), 0);
  const hotCampaigns = campaigns.filter((c: Row) => c.isHot).length;
  const verifiedCreators = creators.filter((c: Row) => c.isVerified).length;

  const stats = [
    { label: "Creadores",    value: creators.length,     sub: `${verifiedCreators} verificados`,   icon: <Users size={20} />,       color: "from-violet-600 to-violet-800" },
    { label: "Agencias",     value: agencies.length,     sub: "en la plataforma",                  icon: <Building2 size={20} />,   color: "from-pink-600 to-pink-800" },
    { label: "Campañas",     value: campaigns.length,    sub: `${hotCampaigns} trending 🔥`,       icon: <Megaphone size={20} />,   color: "from-blue-600 to-blue-800" },
    { label: "Aplicaciones", value: totalApplied,        sub: "total en campañas",                 icon: <TrendingUp size={20} />,  color: "from-emerald-600 to-emerald-800" },
    { label: "Budget total", value: `$${(totalBudget/1000).toFixed(0)}K`, sub: "USD en campañas", icon: <DollarSign size={20} />,  color: "from-amber-600 to-amber-800" },
    { label: "Mensajes",     value: mockConversations.length, sub: "conversaciones activas",       icon: <MessageSquare size={20} />, color: "from-rose-600 to-rose-800" },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Dashboard</h2>
        <p className="text-white/50 text-sm mt-1">Vista general de la plataforma</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white shrink-0`}>
              {s.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-xs text-white/50 mt-0.5">{s.label}</p>
              <p className="text-[11px] text-white/30">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent campaigns */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="font-semibold text-white mb-4">Campañas recientes</h3>
        <div className="space-y-3">
          {campaigns.slice(0, 5).map((c: Row) => (
            <div key={c.id} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
              <div className={`w-2 h-2 rounded-full shrink-0 ${c.status === "active" ? "bg-emerald-400" : c.status === "draft" ? "bg-yellow-400" : "bg-white/30"}`} />
              <span className="text-sm text-white flex-1 truncate">{c.title}</span>
              <span className="text-xs text-white/40">{c.brandName}</span>
              <span className="text-xs font-medium text-emerald-400">${c.budgetPerCreator?.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════ GENERIC ENTITY TAB ══════════════════ */
interface FieldDef {
  key: string;
  label: string;
  type: "text" | "textarea" | "number" | "boolean" | "tags" | "select" | "date";
  options?: string[];
  placeholder?: string;
}

interface EntityConfig {
  columns: { key: string; label: string; render?: (v: Row) => React.ReactNode }[];
  fields: FieldDef[];
  defaultNew: Row;
  searchKeys: string[];
}

function EntityTab({
  entity, authed, config,
}: {
  entity: string;
  authed: boolean;
  config: EntityConfig;
}) {
  const { data, loading, reload } = useAdminData(entity, authed);
  const [search, setSearch] = useState("");
  const [editItem, setEditItem] = useState<Row | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const filtered = data.filter((row) =>
    config.searchKeys.some((k) =>
      String(row[k] ?? "").toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleSave = async (item: Row) => {
    setSaving(true);
    const isNew = !item.id;
    const method = isNew ? "POST" : "PUT";
    await fetch(`/api/admin/${entity}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    await reload();
    setSaving(false);
    setEditItem(null);
    showToast(isNew ? "Creado correctamente" : "Guardado correctamente");
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await fetch(`/api/admin/${entity}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: deleteId }),
    });
    await reload();
    setDeleteId(null);
    showToast("Eliminado correctamente");
  };

  const LABELS: Record<string, string> = {
    creators: "Creadores",
    agencies: "Agencias",
    campaigns: "Campañas",
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">{LABELS[entity] ?? entity}</h2>
          <p className="text-white/50 text-sm mt-1">{data.length} registros totales</p>
        </div>
        <button
          onClick={() => setEditItem({ ...config.defaultNew })}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-pink-600 text-white text-sm font-semibold rounded-xl hover:from-violet-500 hover:to-pink-500 transition-all"
        >
          <Plus size={16} />
          Agregar nuevo
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Buscar ${LABELS[entity]?.toLowerCase() ?? entity}...`}
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-violet-500 transition-colors"
        />
      </div>

      {/* Table */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-40 text-white/40">
            <RefreshCw size={20} className="animate-spin mr-2" /> Cargando...
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex items-center justify-center h-40 text-white/40 text-sm">
            Sin resultados
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  {config.columns.map((col) => (
                    <th key={col.key} className="px-4 py-3 text-left text-xs font-semibold text-white/40 uppercase tracking-wide">
                      {col.label}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-right text-xs font-semibold text-white/40 uppercase tracking-wide">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    {config.columns.map((col) => (
                      <td key={col.key} className="px-4 py-3 text-sm text-white/80">
                        {col.render ? col.render(row) : String(row[col.key] ?? "—")}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditItem({ ...row })}
                          className="p-1.5 text-white/40 hover:text-violet-400 hover:bg-violet-500/10 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => setDeleteId(row.id)}
                          className="p-1.5 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit modal */}
      {editItem && (
        <EditModal
          item={editItem}
          fields={config.fields}
          onClose={() => setEditItem(null)}
          onSave={handleSave}
          saving={saving}
        />
      )}

      {/* Delete confirm */}
      {deleteId && (
        <ConfirmModal
          message="¿Seguro que quieres eliminar este registro? Esta acción no se puede deshacer."
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 flex items-center gap-2 bg-emerald-600 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg z-[200]">
          <Check size={16} />
          {toast}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════ EDIT MODAL ══════════════════════ */

// Support "a.b.c" dot-notation for nested objects
function getDeep(obj: Row, path: string): unknown {
  return path.split(".").reduce((acc: unknown, k) => (acc as Row)?.[k], obj);
}
function setDeep(obj: Row, path: string, value: unknown): Row {
  const [head, ...tail] = path.split(".");
  if (tail.length === 0) return { ...obj, [head]: value };
  return { ...obj, [head]: setDeep((obj[head] as Row) ?? {}, tail.join("."), value) };
}

function EditModal({
  item, fields, onClose, onSave, saving,
}: {
  item: Row;
  fields: FieldDef[];
  onClose: () => void;
  onSave: (item: Row) => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<Row>({ ...item });

  const set = (key: string, value: unknown) =>
    setForm((prev) => setDeep(prev, key, value));

  const isNew = !item.id;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#12121f] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 shrink-0">
          <h3 className="text-base font-semibold text-white">
            {isNew ? "Agregar nuevo" : "Editar registro"}
          </h3>
          <button onClick={onClose} className="p-1.5 text-white/40 hover:text-white rounded-lg hover:bg-white/10 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Fields */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {fields.map((field) => (
            <FormField key={field.key} field={field} value={getDeep(form, field.key)} onChange={(v) => set(field.key, v)} />
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-5 border-t border-white/10 shrink-0">
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors">
            Cancelar
          </button>
          <button
            onClick={() => onSave(form)}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-violet-600 to-pink-600 text-white hover:from-violet-500 hover:to-pink-500 disabled:opacity-50 transition-all"
          >
            <Save size={15} />
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </div>
    </div>
  );
}

function FormField({ field, value, onChange }: { field: FieldDef; value: unknown; onChange: (v: unknown) => void }) {
  const base = "w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-violet-500 transition-colors";
  const boolVal = Boolean(value);

  return (
    <div>
      <label className="block text-xs font-medium text-white/60 mb-1.5">{field.label}</label>

      {field.type === "textarea" && (
        <textarea
          rows={3}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={`${base} resize-none`}
        />
      )}

      {field.type === "text" && (
        <input type="text" value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} className={base} />
      )}

      {field.type === "number" && (
        <input type="number" value={Number(value ?? 0)} onChange={(e) => onChange(Number(e.target.value))} className={base} />
      )}

      {field.type === "date" && (
        <input type="date" value={String(value ?? "").slice(0, 10)} onChange={(e) => onChange(e.target.value)} className={base} />
      )}

      {field.type === "boolean" && (
        <button
          onClick={() => onChange(!boolVal)}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-colors ${
            boolVal
              ? "bg-emerald-600/20 border-emerald-500/30 text-emerald-400"
              : "bg-white/5 border-white/10 text-white/50 hover:text-white"
          }`}
        >
          <div className={`w-4 h-4 rounded flex items-center justify-center ${boolVal ? "bg-emerald-500" : "bg-white/20"}`}>
            {boolVal && <Check size={11} className="text-white" />}
          </div>
          {boolVal ? "Sí" : "No"}
        </button>
      )}

      {field.type === "tags" && (
        <div className="space-y-2">
          <input
            type="text"
            value={Array.isArray(value) ? (value as string[]).join(", ") : String(value ?? "")}
            onChange={(e) => onChange(e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
            placeholder={field.placeholder ?? "Separar con comas"}
            className={base}
          />
          {Array.isArray(value) && (value as string[]).length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {(value as string[]).map((tag) => (
                <span key={tag} className="text-xs bg-violet-500/20 text-violet-300 border border-violet-500/30 rounded-full px-2.5 py-1">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {field.type === "select" && (
        <select
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          className={`${base} cursor-pointer`}
        >
          {field.options?.map((opt) => (
            <option key={opt} value={opt} className="bg-[#0a0a0f] text-white">{opt}</option>
          ))}
        </select>
      )}
    </div>
  );
}

/* ═══════════════════════ CONFIRM MODAL ═════════════════════ */
function ConfirmModal({ message, onConfirm, onCancel }: { message: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#12121f] border border-white/10 rounded-2xl w-full max-w-sm p-6 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0">
            <AlertTriangle size={20} className="text-red-400" />
          </div>
          <h3 className="font-semibold text-white text-sm">Confirmar eliminación</h3>
        </div>
        <p className="text-sm text-white/60 mb-6">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2 rounded-xl border border-white/10 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors">
            Cancelar
          </button>
          <button onClick={onConfirm} className="flex-1 py-2 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-500 transition-colors">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════ MESSAGES TAB ════════════════════ */
function MessagesTab() {
  const [active, setActive] = useState(mockConversations[0]);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Mensajes</h2>
        <p className="text-white/50 text-sm mt-1">{mockConversations.length} conversaciones activas</p>
      </div>
      <div className="flex gap-4 h-[calc(100vh-220px)]">
        {/* List */}
        <div className="w-72 shrink-0 bg-white/5 border border-white/10 rounded-2xl overflow-y-auto">
          {mockConversations.map((conv, idx) => {
            const isActive = active?.id === conv.id;
            const colors = ["from-violet-500 to-pink-500", "from-pink-500 to-rose-500", "from-blue-500 to-violet-500", "from-emerald-500 to-teal-500", "from-orange-500 to-pink-500"];
            const color = colors[idx % colors.length];
            return (
              <button
                key={conv.id}
                onClick={() => setActive(conv)}
                className={`w-full text-left p-3 flex gap-3 border-b border-white/5 last:border-0 transition-colors ${isActive ? "bg-violet-600/10" : "hover:bg-white/5"}`}
              >
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                  {conv.creatorName.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{conv.creatorName}</p>
                  <p className="text-xs text-white/40 truncate">{conv.lastMessage}</p>
                </div>
                {conv.unreadCount > 0 && (
                  <span className="shrink-0 text-[10px] bg-violet-600 text-white rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {conv.unreadCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        {/* Detail */}
        <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <p className="font-semibold text-white">{active?.creatorName}</p>
            <p className="text-xs text-white/40">{active?.agencyName}</p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {active?.messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.senderId === "creator-001" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] px-4 py-2.5 text-sm rounded-2xl ${msg.senderId === "creator-001" ? "bg-violet-600 text-white" : "bg-white/10 text-white/80"}`}>
                  <p className="text-[11px] mb-1 opacity-60">{msg.senderId}</p>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════ USERS TAB ══════════════════════ */
interface AdminUser { id: string; name: string; email: string; role: string; }

function UsersTab() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState<AdminUser | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState("");
  const [search, setSearch] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const r = await fetch("/api/admin/users");
    if (r.ok) setUsers(await r.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  const filtered = users.filter(
    (u) => u.name.toLowerCase().includes(search.toLowerCase()) ||
           u.email.toLowerCase().includes(search.toLowerCase())
  );

  const roleBadge = (role: string) => {
    const map: Record<string, string> = {
      CREATOR: "bg-violet-500/20 text-violet-300 border-violet-500/30",
      AGENCY:  "bg-pink-500/20 text-pink-300 border-pink-500/30",
      BRAND:   "bg-blue-500/20 text-blue-300 border-blue-500/30",
    };
    return (
      <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${map[role] ?? "bg-white/10 text-white/50 border-white/10"}`}>
        {role}
      </span>
    );
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Usuarios</h2>
          <p className="text-white/50 text-sm mt-1">{users.length} cuentas registradas</p>
        </div>
        <button
          onClick={() => { setEditUser({ id: "", name: "", email: "", role: "CREATOR" }); setIsNew(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-pink-600 text-white text-sm font-semibold rounded-xl hover:from-violet-500 hover:to-pink-500 transition-all"
        >
          <Plus size={16} /> Nuevo usuario
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por nombre o email..."
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-violet-500 transition-colors" />
      </div>

      {/* Table */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-40 text-white/40">
            <RefreshCw size={20} className="animate-spin mr-2" /> Cargando...
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                {["Nombre", "Email", "Rol", "Acciones"].map((h) => (
                  <th key={h} className={`px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-wide ${h === "Acciones" ? "text-right" : "text-left"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
                        {u.name.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="text-sm text-white font-medium">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-white/70 font-mono">{u.email}</span>
                  </td>
                  <td className="px-4 py-3">{roleBadge(u.role)}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => { setEditUser({ ...u }); setIsNew(false); }}
                        className="p-1.5 text-white/40 hover:text-violet-400 hover:bg-violet-500/10 rounded-lg transition-colors" title="Editar">
                        <Edit2 size={15} />
                      </button>
                      <button onClick={() => setDeleteId(u.id)}
                        className="p-1.5 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors" title="Eliminar">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit / Create modal */}
      {editUser && (
        <UserModal
          user={editUser}
          isNew={isNew}
          onClose={() => { setEditUser(null); setIsNew(false); }}
          onSave={async (data) => {
            const method = isNew ? "POST" : "PUT";
            const r = await fetch("/api/admin/users", {
              method,
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(isNew ? data : { id: editUser.id, ...data }),
            });
            if (r.ok) {
              await load();
              setEditUser(null);
              setIsNew(false);
              showToast(isNew ? "Usuario creado" : "Usuario actualizado");
            } else {
              const err = await r.json();
              alert(err.error ?? "Error al guardar");
            }
          }}
        />
      )}

      {/* Delete confirm */}
      {deleteId && (
        <ConfirmModal
          message="¿Eliminar este usuario? Perderá acceso a la plataforma."
          onConfirm={async () => {
            await fetch("/api/admin/users", {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: deleteId }),
            });
            await load();
            setDeleteId(null);
            showToast("Usuario eliminado");
          }}
          onCancel={() => setDeleteId(null)}
        />
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 flex items-center gap-2 bg-emerald-600 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg z-[200]">
          <Check size={16} /> {toast}
        </div>
      )}
    </div>
  );
}

interface UserModalProps {
  user: AdminUser;
  isNew: boolean;
  onClose: () => void;
  onSave: (data: { name: string; email: string; password: string; role: string }) => Promise<void>;
}

function UserModal({ user, isNew, onClose, onSave }: UserModalProps) {
  const [name, setName]         = useState(user.name);
  const [email, setEmail]       = useState(user.email);
  const [password, setPassword] = useState("");
  const [role, setRole]         = useState(user.role || "CREATOR");
  const [showPass, setShowPass] = useState(false);
  const [saving, setSaving]     = useState(false);

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-violet-500 transition-colors";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    if (isNew && !password) return;
    setSaving(true);
    await onSave({ name, email, password, role });
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#12121f] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h3 className="font-semibold text-white">{isNew ? "Nuevo usuario" : "Editar usuario"}</h3>
          <button onClick={onClose} className="p-1.5 text-white/40 hover:text-white rounded-lg hover:bg-white/10 transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-white/60 mb-1.5">Nombre completo</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre del usuario" required className={inputClass} />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-white/60 mb-1.5 flex items-center gap-1.5">
              <Mail size={12} /> Email
            </label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="usuario@ejemplo.com" required className={inputClass} />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-white/60 mb-1.5 flex items-center gap-1.5">
              <KeyRound size={12} /> Contraseña {!isNew && <span className="text-white/30">(dejar vacío para no cambiar)</span>}
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isNew ? "Mínimo 6 caracteres" : "Nueva contraseña (opcional)"}
                required={isNew}
                minLength={isNew ? 6 : undefined}
                className={`${inputClass} pr-12`}
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block text-xs font-medium text-white/60 mb-1.5">Rol</label>
            <div className="flex gap-2">
              {(["CREATOR", "AGENCY", "BRAND"] as const).map((r) => (
                <button key={r} type="button" onClick={() => setRole(r)}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    role === r
                      ? "bg-violet-600/30 border-violet-500 text-violet-300"
                      : "bg-white/5 border-white/10 text-white/50 hover:text-white"
                  }`}>
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-white/10 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors">
              Cancelar
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 text-white text-sm font-semibold hover:from-violet-500 hover:to-pink-500 disabled:opacity-50 transition-all">
              <Save size={15} />
              {saving ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ══════════════════════════ SETTINGS TAB ════════════════════ */
function SettingsTab() {
  const [form, setForm] = useState({ siteName: "", siteDescription: "", heroTitle: "", heroSubtitle: "", adminPassword: "", confirmPassword: "" });
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [passError, setPassError] = useState("");
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings").then(async (r) => {
      if (r.ok) {
        const data = await r.json();
        setForm((prev) => ({ ...prev, ...data }));
        setLoaded(true);
      }
    });
  }, []);

  const handleSave = async () => {
    setPassError("");
    if (form.adminPassword && form.adminPassword !== form.confirmPassword) {
      setPassError("Las contraseñas no coinciden");
      return;
    }
    if (form.adminPassword && form.adminPassword.length < 6) {
      setPassError("Mínimo 6 caracteres");
      return;
    }
    setSaving(true);
    const body: Record<string, string> = {
      siteName: form.siteName,
      siteDescription: form.siteDescription,
      heroTitle: form.heroTitle,
      heroSubtitle: form.heroSubtitle,
    };
    if (form.adminPassword) body.adminPassword = form.adminPassword;

    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setSaving(false);
    setForm((prev) => ({ ...prev, adminPassword: "", confirmPassword: "" }));
    setToast("Configuración guardada");
    setTimeout(() => setToast(""), 2500);
  };

  if (!loaded) return (
    <div className="p-8 flex items-center justify-center h-64 text-white/40">
      <RefreshCw size={20} className="animate-spin mr-2" /> Cargando...
    </div>
  );

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-violet-500 transition-colors";

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Configuración</h2>
        <p className="text-white/50 text-sm mt-1">Ajustes generales del sitio</p>
      </div>

      <div className="space-y-6">
        {/* Site info */}
        <Section title="Información del sitio">
          <Field label="Nombre del sitio">
            <input className={inputClass} value={form.siteName} onChange={(e) => setForm((p) => ({ ...p, siteName: e.target.value }))} />
          </Field>
          <Field label="Descripción">
            <textarea rows={3} className={`${inputClass} resize-none`} value={form.siteDescription} onChange={(e) => setForm((p) => ({ ...p, siteDescription: e.target.value }))} />
          </Field>
        </Section>

        {/* Hero */}
        <Section title="Hero / Portada">
          <Field label="Título principal">
            <input className={inputClass} value={form.heroTitle} onChange={(e) => setForm((p) => ({ ...p, heroTitle: e.target.value }))} />
          </Field>
          <Field label="Subtítulo">
            <textarea rows={2} className={`${inputClass} resize-none`} value={form.heroSubtitle} onChange={(e) => setForm((p) => ({ ...p, heroSubtitle: e.target.value }))} />
          </Field>
        </Section>

        {/* Password */}
        <Section title="Cambiar contraseña admin">
          <Field label="Nueva contraseña">
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                className={`${inputClass} pr-12`}
                value={form.adminPassword}
                placeholder="Dejar vacío para no cambiar"
                onChange={(e) => setForm((p) => ({ ...p, adminPassword: e.target.value }))}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </Field>
          <Field label="Confirmar contraseña">
            <input
              type="password"
              className={inputClass}
              value={form.confirmPassword}
              placeholder="Repetir nueva contraseña"
              onChange={(e) => setForm((p) => ({ ...p, confirmPassword: e.target.value }))}
            />
          </Field>
          {passError && (
            <p className="text-sm text-red-400 flex items-center gap-2"><AlertTriangle size={14} /> {passError}</p>
          )}
        </Section>

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 text-white font-semibold hover:from-violet-500 hover:to-pink-500 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
        >
          <Save size={16} />
          {saving ? "Guardando..." : "Guardar configuración"}
        </button>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 flex items-center gap-2 bg-emerald-600 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg z-[200]">
          <Check size={16} /> {toast}
        </div>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
      <h3 className="text-sm font-semibold text-white/70 flex items-center gap-2">
        <ChevronRight size={14} className="text-violet-400" />
        {title}
      </h3>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-white/50 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

/* ══════════════════════ ENTITY CONFIGS ═════════════════════ */

// ── Badges helpers
const verified = (v: Row) => (
  v.isVerified
    ? <span className="text-[11px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full px-2 py-0.5">✓ Verificado</span>
    : <span className="text-[11px] bg-white/5 text-white/40 rounded-full px-2 py-0.5">Sin verificar</span>
);

const statusBadge = (v: Row) => {
  const map: Record<string, string> = { active: "bg-emerald-500/20 text-emerald-400", draft: "bg-yellow-500/20 text-yellow-400", closed: "bg-white/10 text-white/40" };
  return <span className={`text-[11px] rounded-full px-2 py-0.5 border border-white/10 ${map[v.status] ?? ""}`}>{v.status}</span>;
};

const COUNTRIES = ["México", "Colombia", "Argentina", "España", "Venezuela", "Chile", "Perú", "Estados Unidos", "Brasil"];
const SERVICES = ["Talent Management", "Brand Deals", "Content Strategy", "Legal Support", "Analytics", "Social Media", "PR", "Events"];

const creatorConfig: EntityConfig = {
  searchKeys: ["username", "country"],
  columns: [
    { key: "username", label: "Usuario", render: (v) => <span className="font-mono text-violet-300">@{v.username}</span> },
    { key: "user",     label: "Nombre",  render: (v) => <span>{v.user?.name ?? "—"}</span> },
    { key: "country",  label: "País" },
    { key: "followers",label: "Seguidores", render: (v) => <span className="font-mono">{(v.followers ?? 0).toLocaleString()}</span> },
    { key: "niche",    label: "Nichos", render: (v) => <span className="text-white/60 text-xs">{(v.niche ?? []).join(", ")}</span> },
    { key: "isVerified", label: "Estado", render: verified },
  ],
  defaultNew: { username: "", bio: "", country: "México", niche: [], followers: 0, estimatedIncome: 0, isVerified: false, isAvailable: true, platforms: [], user: { name: "" } },
  fields: [
    { key: "username",        label: "Username",          type: "text",    placeholder: "ej: sofiaramirez" },
    { key: "user.name",       label: "Nombre completo",   type: "text",    placeholder: "ej: Sofia Ramírez" },
    { key: "bio",             label: "Biografía",         type: "textarea" },
    { key: "country",         label: "País",              type: "select",  options: COUNTRIES },
    { key: "niche",           label: "Nichos (separar con coma)", type: "tags", placeholder: "Lifestyle, Travel, Gaming" },
    { key: "platforms",       label: "Plataformas",       type: "tags",    placeholder: "Instagram, TikTok" },
    { key: "followers",       label: "Seguidores",        type: "number" },
    { key: "estimatedIncome", label: "Ingreso estimado (USD/mes)", type: "number" },
    { key: "isVerified",      label: "Verificado",        type: "boolean" },
    { key: "isAvailable",     label: "Disponible",        type: "boolean" },
  ],
};

const agencyConfig: EntityConfig = {
  searchKeys: ["name", "country"],
  columns: [
    { key: "name",       label: "Agencia" },
    { key: "country",    label: "País" },
    { key: "commission", label: "Comisión", render: (v) => <span className="font-mono">{v.commission}%</span> },
    { key: "rosterSize", label: "Creadores" },
    { key: "rating",     label: "Rating",   render: (v) => <span className="flex items-center gap-1"><Star size={12} className="text-yellow-400 fill-yellow-400" />{v.rating}</span> },
    { key: "isVerified", label: "Estado",   render: verified },
  ],
  defaultNew: { name: "", description: "", services: [], commission: 15, country: "México", isVerified: false, rosterSize: 0, rating: 4.5, user: { name: "" } },
  fields: [
    { key: "name",        label: "Nombre de la agencia", type: "text" },
    { key: "description", label: "Descripción",          type: "textarea" },
    { key: "country",     label: "País",                 type: "select", options: COUNTRIES },
    { key: "services",    label: "Servicios (separar con coma)", type: "tags", placeholder: SERVICES.join(", ") },
    { key: "commission",  label: "Comisión (%)",         type: "number" },
    { key: "rosterSize",  label: "Tamaño del roster",    type: "number" },
    { key: "rating",      label: "Rating (0-5)",         type: "number" },
    { key: "website",     label: "Sitio web",            type: "text",    placeholder: "https://..." },
    { key: "isVerified",  label: "Verificada",           type: "boolean" },
  ],
};

const campaignConfig: EntityConfig = {
  searchKeys: ["title", "brandName"],
  columns: [
    { key: "title",            label: "Campaña",    render: (v) => <span className="font-medium text-white">{v.title}</span> },
    { key: "brandName",        label: "Marca" },
    { key: "budgetPerCreator", label: "Budget/Creador", render: (v) => <span className="font-mono text-emerald-400">${(v.budgetPerCreator ?? 0).toLocaleString()}</span> },
    { key: "creatorsApplied",  label: "Aplicaron" },
    { key: "deadline",         label: "Deadline",   render: (v) => <span className="text-white/60">{v.deadline?.slice(0, 10) ?? "—"}</span> },
    { key: "status",           label: "Estado",     render: statusBadge },
  ],
  defaultNew: { title: "", brandId: "brand-new", brandName: "", description: "", platforms: [], minFollowers: 10000, budgetPerCreator: 500, totalBudget: 5000, deadline: "", creatorsNeeded: 5, creatorsApplied: 0, niches: [], status: "draft", isHot: false },
  fields: [
    { key: "title",            label: "Título",              type: "text" },
    { key: "brandName",        label: "Nombre de la marca",  type: "text" },
    { key: "description",      label: "Descripción",         type: "textarea" },
    { key: "platforms",        label: "Plataformas",         type: "tags",   placeholder: "Instagram, TikTok, YouTube" },
    { key: "niches",           label: "Nichos requeridos",   type: "tags",   placeholder: "Lifestyle, Gaming, Beauty" },
    { key: "minFollowers",     label: "Mínimo de seguidores",type: "number" },
    { key: "budgetPerCreator", label: "Budget por creador (USD)", type: "number" },
    { key: "totalBudget",      label: "Budget total (USD)",  type: "number" },
    { key: "creatorsNeeded",   label: "Creadores necesarios",type: "number" },
    { key: "deadline",         label: "Fecha límite",        type: "date" },
    { key: "status",           label: "Estado",              type: "select", options: ["active", "draft", "closed"] },
    { key: "isHot",            label: "Trending 🔥",         type: "boolean" },
  ],
};
