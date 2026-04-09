"use client";

import { useState } from "react";
import { Plus, X, RefreshCw, Loader2, ExternalLink, Users, Heart, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { formatNumber } from "@/lib/utils";
import { useLang } from "@/contexts/LangContext";

type Platform = "onlyfans" | "fansly" | "instagram" | "tiktok" | "telegram";

interface PlatformStats {
  url?: string;
  username?: string;
  followers?: number;
  subscribers?: number;
  likes?: number;
  members?: number;
  avatar?: string;
  lastUpdated?: string;
}

type SocialLinks = Partial<Record<Platform, PlatformStats>>;

interface Props {
  profileId: string;
  isOwner: boolean;
  initialLinks: SocialLinks;
  onUpdated?: (links: SocialLinks) => void;
}

const PLATFORMS: { id: Platform; label: string; color: string; icon: string; manual: boolean }[] = [
  { id: "onlyfans",  label: "OnlyFans",  color: "from-blue-500 to-cyan-400",    icon: "OF", manual: true  },
  { id: "fansly",    label: "Fansly",    color: "from-pink-500 to-rose-400",    icon: "FL", manual: true  },
  { id: "instagram", label: "Instagram", color: "from-purple-500 to-pink-500",  icon: "IG", manual: false },
  { id: "tiktok",    label: "TikTok",    color: "from-slate-700 to-slate-900",  icon: "TT", manual: false },
  { id: "telegram",  label: "Telegram",  color: "from-sky-500 to-blue-400",    icon: "TG", manual: true  },
];

export default function SocialLinksSection({ profileId, isOwner, initialLinks, onUpdated }: Props) {
  const { t } = useLang();
  const [links, setLinks] = useState<SocialLinks>(initialLinks ?? {});
  const [editing, setEditing] = useState<Platform | null>(null);
  const [form, setForm] = useState<PlatformStats>({});
  const [fetching, setFetching] = useState(false);
  const [saving, setSaving] = useState(false);
  const [fetchError, setFetchError] = useState("");

  function openEditor(p: Platform) {
    setEditing(p);
    setForm(links[p] ?? {});
    setFetchError("");
  }

  function closeEditor() {
    setEditing(null);
    setForm({});
    setFetchError("");
  }

  async function fetchStats(platform: Platform, handle: string) {
    setFetching(true);
    setFetchError("");
    try {
      const res = await fetch(`/api/social/fetch?platform=${platform}&handle=${encodeURIComponent(handle)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to fetch");
      setForm((f) => ({
        ...f,
        username: data.username ?? f.username,
        followers: data.followers ?? f.followers,
        likes: data.likes ?? f.likes,
        avatar: data.avatar ?? f.avatar,
      }));
    } catch (e) {
      setFetchError(e instanceof Error ? e.message : "Failed to fetch stats");
    } finally {
      setFetching(false);
    }
  }

  async function saveLink(platform: Platform) {
    setSaving(true);
    const newLinks = { ...links, [platform]: { ...form, lastUpdated: new Date().toISOString() } };

    const res = await fetch(`/api/creators/${profileId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ socialLinks: newLinks }),
    });

    setSaving(false);
    if (res.ok) {
      setLinks(newLinks);
      onUpdated?.(newLinks);
      closeEditor();
    }
  }

  async function removeLink(platform: Platform) {
    const newLinks = { ...links };
    delete newLinks[platform];
    setSaving(true);
    const res = await fetch(`/api/creators/${profileId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ socialLinks: newLinks }),
    });
    setSaving(false);
    if (res.ok) {
      setLinks(newLinks);
      onUpdated?.(newLinks);
    }
  }

  const hasAny = Object.keys(links).length > 0;

  return (
    <div className="p-6 rounded-2xl border border-white/10 bg-white/4 space-y-5">
      <h2 className="text-lg font-semibold text-white">{t("social.title")}</h2>

      {/* Platform cards */}
      {hasAny && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PLATFORMS.filter((p) => links[p.id]).map((p) => {
            const data = links[p.id]!;
            return (
              <div key={p.id} className="relative p-4 rounded-xl border border-white/10 bg-white/5 group">
                {isOwner && (
                  <button
                    onClick={() => removeLink(p.id)}
                    className="absolute top-2 right-2 p-1 rounded-full text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${p.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                    {p.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-white">{p.label}</div>
                    {data.username && <div className="text-xs text-white/40 truncate">@{data.username}</div>}
                  </div>
                  {data.url && (
                    <a href={data.url} target="_blank" rel="noopener noreferrer" className="ml-auto text-white/20 hover:text-white/60 transition-colors shrink-0">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  {data.followers !== undefined && (
                    <div>
                      <div className="flex items-center justify-center mb-1"><Users className="w-3 h-3 text-white/40" /></div>
                      <div className="text-sm font-bold text-white">{formatNumber(data.followers)}</div>
                      <div className="text-xs text-white/30">{t("social.followers")}</div>
                    </div>
                  )}
                  {data.subscribers !== undefined && (
                    <div>
                      <div className="flex items-center justify-center mb-1"><Star className="w-3 h-3 text-white/40" /></div>
                      <div className="text-sm font-bold text-white">{formatNumber(data.subscribers)}</div>
                      <div className="text-xs text-white/30">{t("social.subscribers")}</div>
                    </div>
                  )}
                  {data.likes !== undefined && (
                    <div>
                      <div className="flex items-center justify-center mb-1"><Heart className="w-3 h-3 text-white/40" /></div>
                      <div className="text-sm font-bold text-white">{formatNumber(data.likes)}</div>
                      <div className="text-xs text-white/30">{t("social.likes")}</div>
                    </div>
                  )}
                  {data.members !== undefined && (
                    <div>
                      <div className="flex items-center justify-center mb-1"><Users className="w-3 h-3 text-white/40" /></div>
                      <div className="text-sm font-bold text-white">{formatNumber(data.members)}</div>
                      <div className="text-xs text-white/30">{t("social.members")}</div>
                    </div>
                  )}
                </div>

                {isOwner && (
                  <button
                    onClick={() => openEditor(p.id)}
                    className="mt-3 w-full text-xs text-center text-white/30 hover:text-violet-400 transition-colors"
                  >
                    {t("social.editStats")}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Add buttons (owner only) */}
      {isOwner && (
        <div className="flex flex-wrap gap-2">
          {PLATFORMS.filter((p) => !links[p.id]).map((p) => (
            <button
              key={p.id}
              onClick={() => openEditor(p.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dashed border-white/20 text-white/40 hover:border-violet-500/50 hover:text-violet-400 text-sm transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> {p.label}
            </button>
          ))}
        </div>
      )}

      {!hasAny && !isOwner && (
        <p className="text-sm text-white/30 text-center py-4">{t("social.noSocials")}</p>
      )}

      {/* Editor modal */}
      {editing && (() => {
        const p = PLATFORMS.find((x) => x.id === editing)!;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeEditor} />
            <div className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-[#0f0f17] p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${p.color} flex items-center justify-center text-white text-xs font-bold`}>
                    {p.icon}
                  </div>
                  <h3 className="font-semibold text-white">{p.label}</h3>
                </div>
                <button onClick={closeEditor} className="text-white/40 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label>{t("social.profileUrl")}</Label>
                  <Input
                    placeholder={`https://${p.id}.com/yourhandle`}
                    value={form.url ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
                  />
                </div>

                {!p.manual && (
                  <div className="space-y-1.5">
                    <Label>{t("social.username")}</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="@handle"
                        value={form.username ?? ""}
                        onChange={(e) => setForm((f) => ({ ...f, username: e.target.value.replace(/^@/, "") }))}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="shrink-0 gap-1.5"
                        disabled={fetching || !form.username}
                        onClick={() => fetchStats(editing, form.username!)}
                      >
                        {fetching ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                        {t("social.fetch")}
                      </Button>
                    </div>
                    {fetchError && (
                      <p className="text-xs text-amber-400">
                        {fetchError.includes("not configured") ? t("social.noApiKey") : fetchError}
                      </p>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label>{t("social.followers")}</Label>
                    <Input
                      type="number"
                      min={0}
                      placeholder="0"
                      value={form.followers ?? ""}
                      onChange={(e) => setForm((f) => ({ ...f, followers: Number(e.target.value) }))}
                    />
                  </div>
                  {(p.id === "onlyfans" || p.id === "fansly") && (
                    <>
                      <div className="space-y-1.5">
                        <Label>{t("social.subscribers")}</Label>
                        <Input
                          type="number"
                          min={0}
                          placeholder="0"
                          value={form.subscribers ?? ""}
                          onChange={(e) => setForm((f) => ({ ...f, subscribers: Number(e.target.value) }))}
                        />
                      </div>
                      <div className="space-y-1.5 col-span-2">
                        <Label>{t("social.likesReactions")}</Label>
                        <Input
                          type="number"
                          min={0}
                          placeholder="0"
                          value={form.likes ?? ""}
                          onChange={(e) => setForm((f) => ({ ...f, likes: Number(e.target.value) }))}
                        />
                      </div>
                    </>
                  )}
                  {(p.id === "instagram" || p.id === "tiktok") && (
                    <div className="space-y-1.5">
                      <Label>{t("social.likesHearts")}</Label>
                      <Input
                        type="number"
                        min={0}
                        placeholder="0"
                        value={form.likes ?? ""}
                        onChange={(e) => setForm((f) => ({ ...f, likes: Number(e.target.value) }))}
                      />
                    </div>
                  )}
                  {p.id === "telegram" && (
                    <div className="space-y-1.5">
                      <Label>{t("social.members")}</Label>
                      <Input
                        type="number"
                        min={0}
                        placeholder="0"
                        value={form.members ?? ""}
                        onChange={(e) => setForm((f) => ({ ...f, members: Number(e.target.value) }))}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2 mt-5">
                <Button variant="ghost" className="flex-1" onClick={closeEditor}>{t("social.cancel")}</Button>
                <Button
                  variant="gradient"
                  className="flex-1 gap-2"
                  disabled={saving}
                  onClick={() => saveLink(editing)}
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  {t("social.save")}
                </Button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
