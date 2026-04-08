"use client";

import { useState, useRef } from "react";
import { X, Upload, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const NICHES = [
  "Fitness", "Lifestyle", "Art", "Music", "Gaming", "Cooking",
  "Travel", "Fashion", "Beauty", "Comedy", "Education", "Tech",
  "Adult", "Cosplay", "Modeling",
];

interface Profile {
  id: string;
  username: string;
  avatar?: string;
  bio?: string;
  country?: string;
  niche: string[];
  estimatedIncome: number;
  isAvailable: boolean;
}

interface Props {
  profile: Profile;
  onClose: () => void;
  onSaved: (updated: Profile) => void;
}

export default function EditProfileModal({ profile, onClose, onSaved }: Props) {
  const [form, setForm] = useState({
    username: profile.username,
    bio: profile.bio ?? "",
    country: profile.country ?? "",
    niche: profile.niche,
    estimatedIncome: profile.estimatedIncome,
    isAvailable: profile.isAvailable,
    avatar: profile.avatar ?? "",
  });
  const [avatarPreview, setAvatarPreview] = useState(profile.avatar ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function toggleNiche(n: string) {
    setForm((f) => ({
      ...f,
      niche: f.niche.includes(n) ? f.niche.filter((x) => x !== n) : [...f.niche, n],
    }));
  }

  async function handleAvatarFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    // Convert to base64 data URL for preview and storage
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      setAvatarPreview(url);
      setForm((f) => ({ ...f, avatar: url }));
    };
    reader.readAsDataURL(file);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const res = await fetch(`/api/creators/${profile.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSaving(false);

    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      setError(d.error ?? "Failed to save");
      return;
    }

    const updated = await res.json();
    onSaved(updated);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0f0f17] p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Edit Profile</h2>
          <button onClick={onClose} className="p-1 text-white/40 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={avatarPreview} />
              <AvatarFallback className="text-xl">{form.username[0]?.toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <Button type="button" variant="outline" size="sm" className="gap-2" onClick={() => fileRef.current?.click()}>
                <Upload className="w-3.5 h-3.5" /> Upload Photo
              </Button>
              <p className="text-xs text-white/40 mt-1">JPG, PNG — max 2MB</p>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarFile} />
            </div>
          </div>

          {/* Avatar URL fallback */}
          <div className="space-y-1.5">
            <Label htmlFor="avatar-url">Or paste image URL</Label>
            <Input
              id="avatar-url"
              placeholder="https://..."
              value={form.avatar.startsWith("data:") ? "" : form.avatar}
              onChange={(e) => {
                setForm((f) => ({ ...f, avatar: e.target.value }));
                setAvatarPreview(e.target.value);
              }}
            />
          </div>

          {/* Username */}
          <div className="space-y-1.5">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={form.username}
              onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
              required
            />
          </div>

          {/* Bio */}
          <div className="space-y-1.5">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              rows={3}
              placeholder="Tell agencies about yourself..."
              value={form.bio}
              onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
            />
          </div>

          {/* Country */}
          <div className="space-y-1.5">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              placeholder="e.g. United States"
              value={form.country}
              onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
            />
          </div>

          {/* Est. Income */}
          <div className="space-y-1.5">
            <Label htmlFor="income">Estimated Monthly Income (USD)</Label>
            <Input
              id="income"
              type="number"
              min={0}
              value={form.estimatedIncome}
              onChange={(e) => setForm((f) => ({ ...f, estimatedIncome: Number(e.target.value) }))}
            />
          </div>

          {/* Availability */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              role="switch"
              aria-checked={form.isAvailable}
              onClick={() => setForm((f) => ({ ...f, isAvailable: !f.isAvailable }))}
              className={`relative w-10 h-6 rounded-full transition-colors ${form.isAvailable ? "bg-emerald-500" : "bg-white/20"}`}
            >
              <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${form.isAvailable ? "translate-x-4" : "translate-x-0"}`} />
            </button>
            <span className="text-sm text-white/70">Open to agency offers</span>
          </div>

          {/* Niche */}
          <div className="space-y-2">
            <Label>Content Niche</Label>
            <div className="flex flex-wrap gap-2">
              {NICHES.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => toggleNiche(n)}
                  className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                    form.niche.includes(n)
                      ? "border-violet-500 bg-violet-500/20 text-violet-300"
                      : "border-white/10 bg-white/5 text-white/50 hover:border-white/30"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>
          )}

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="ghost" className="flex-1" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="gradient" className="flex-1 gap-2" disabled={saving}>
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
