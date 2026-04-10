"use client";

import { useState } from "react";
import { Image as ImageIcon, Video, Megaphone, Shield, Bookmark, Share2, MessageCircle, Flame } from "lucide-react";
import { mockPosts, mockCreators, mockCampaigns, type MockPost } from "@/lib/mockData";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diff / 3_600_000);
  if (hours < 24) return `hace ${hours}h`;
  const days = Math.floor(hours / 24);
  return `hace ${days}d`;
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

const AVATAR_GRADIENTS: Record<string, string> = {
  A: "from-violet-600 to-pink-500",
  B: "from-pink-600 to-orange-500",
  C: "from-blue-600 to-violet-500",
  D: "from-emerald-600 to-teal-500",
  default: "from-violet-500 to-pink-500",
};

function avatarGradient(name: string): string {
  const char = name[0]?.toUpperCase() ?? "A";
  return AVATAR_GRADIENTS[char] ?? AVATAR_GRADIENTS.default;
}

// ─── Role Badge ───────────────────────────────────────────────────────────────

function RoleBadge({ role }: { role: "CREATOR" | "AGENCY" | "BRAND" }) {
  const styles = {
    CREATOR: "bg-violet-500/20 text-violet-300 border border-violet-500/30",
    AGENCY: "bg-pink-500/20 text-pink-300 border border-pink-500/30",
    BRAND: "bg-orange-500/20 text-orange-300 border border-orange-500/30",
  };
  const labels = { CREATOR: "Creador", AGENCY: "Agencia", BRAND: "Marca" };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles[role]}`}>
      {labels[role]}
    </span>
  );
}

// ─── Inline Post Card ─────────────────────────────────────────────────────────

function PostCard({ post }: { post: MockPost }) {
  const [bookmarked, setBookmarked] = useState(false);

  // Find campaign data if post type is campaign
  const campaignData =
    post.type === "campaign" && post.campaignRef
      ? mockCampaigns.find((c) => c.id === post.campaignRef)
      : null;

  return (
    <article className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-colors">
      {/* Author row */}
      <div className="flex items-start gap-3 mb-4">
        <div
          className={`w-11 h-11 rounded-full bg-gradient-to-br ${avatarGradient(post.authorName)} flex items-center justify-center flex-shrink-0`}
        >
          <span className="text-white text-sm font-bold">{getInitials(post.authorName)}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center flex-wrap gap-1.5">
            <span className="text-white font-semibold text-sm">{post.authorName}</span>
            {post.authorVerified && (
              <Shield className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />
            )}
            <RoleBadge role={post.authorRole} />
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-white/40 text-xs">@{post.authorUsername}</span>
            <span className="text-white/20 text-xs">·</span>
            <span className="text-white/40 text-xs">{timeAgo(post.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <p className="text-white/80 text-sm leading-relaxed mb-4">{post.content}</p>

      {/* Campaign preview */}
      {campaignData && (
        <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-4 mb-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-violet-300 text-xs font-medium mb-1 uppercase tracking-wide">Campaña</p>
              <p className="text-white font-semibold text-sm">{campaignData.title}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-white/60 text-xs">
                  💰 ${campaignData.budgetPerCreator.toLocaleString()} USD por creador
                </span>
                <span className="text-white/40 text-xs">·</span>
                <span className="text-white/60 text-xs">
                  📅 Hasta {new Date(campaignData.deadline).toLocaleDateString("es-MX", { month: "short", day: "numeric" })}
                </span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {campaignData.platforms.map((p) => (
                  <span key={p} className="bg-white/10 text-white/60 text-xs px-2 py-0.5 rounded-full">
                    {p}
                  </span>
                ))}
              </div>
            </div>
            <button className="flex-shrink-0 bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap">
              Ver campaña →
            </button>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <div className="flex items-center gap-5">
          <button className="flex items-center gap-1.5 text-white/40 hover:text-orange-400 transition-colors text-sm">
            <Flame className="w-4 h-4" />
            <span>{formatCount(post.likes)}</span>
          </button>
          <button className="flex items-center gap-1.5 text-white/40 hover:text-violet-400 transition-colors text-sm">
            <MessageCircle className="w-4 h-4" />
            <span>{formatCount(post.comments)}</span>
          </button>
          <button className="flex items-center gap-1.5 text-white/40 hover:text-pink-400 transition-colors text-sm">
            <Share2 className="w-4 h-4" />
            <span>{formatCount(post.shares)}</span>
          </button>
        </div>
        <button
          onClick={() => setBookmarked((b) => !b)}
          className={`transition-colors ${bookmarked ? "text-violet-400" : "text-white/30 hover:text-white/60"}`}
        >
          <Bookmark className="w-4 h-4" fill={bookmarked ? "currentColor" : "none"} />
        </button>
      </div>
    </article>
  );
}

// ─── Left Sidebar ─────────────────────────────────────────────────────────────

function LeftSidebar() {
  return (
    <aside className="space-y-4">
      {/* Mini profile card */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <div className="flex flex-col items-center text-center mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center mb-3">
            <span className="text-white text-xl font-bold">SR</span>
          </div>
          <p className="text-white font-semibold">Sofia Ramírez</p>
          <span className="mt-1 bg-violet-500/20 text-violet-300 border border-violet-500/30 px-2 py-0.5 rounded-full text-xs font-medium">
            Creadora
          </span>
          <p className="text-white/40 text-xs mt-1">850K seguidores</p>
        </div>

        {/* Stats */}
        <div className="border-t border-white/10 pt-3 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-white/60">Visitas esta semana</span>
            <span className="text-white font-medium">2,847</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-white/60">Búsquedas</span>
            <span className="text-white font-medium">312</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-white/60">Conexiones</span>
            <span className="text-white font-medium">48</span>
          </div>
        </div>

        {/* Profile completion */}
        <div className="border-t border-white/10 pt-3 mt-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/60 text-xs">Completa tu perfil</span>
            <span className="text-violet-400 text-xs font-medium">72%</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-violet-500 to-pink-500 rounded-full" style={{ width: "72%" }} />
          </div>
        </div>

        <a
          href="/me"
          className="block text-center text-violet-400 hover:text-violet-300 text-sm font-medium mt-3 transition-colors"
        >
          Ver mi perfil →
        </a>
      </div>
    </aside>
  );
}

// ─── Right Sidebar ────────────────────────────────────────────────────────────

function RightSidebar() {
  const suggestedCreators = mockCreators.slice(0, 4);
  const activeCampaigns = mockCampaigns.slice(0, 3);

  const TRENDS = [
    { tag: "#CreadorLatino", posts: "12.4K" },
    { tag: "#InfluencerMarketing", posts: "8.9K" },
    { tag: "#ContentCreator", posts: "34.1K" },
    { tag: "#Gaming", posts: "51.2K" },
    { tag: "#BeautyTikTok", posts: "22.7K" },
  ];

  return (
    <aside className="space-y-4">
      {/* Suggested creators */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <h3 className="text-white font-semibold text-sm mb-4">Creadores sugeridos</h3>
        <div className="space-y-3">
          {suggestedCreators.map((creator) => (
            <div key={creator.id} className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-full bg-gradient-to-br ${avatarGradient(creator.user.name)} flex items-center justify-center flex-shrink-0`}
              >
                <span className="text-white text-xs font-bold">{getInitials(creator.user.name)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-medium truncate">{creator.user.name}</p>
                <span className="inline-block mt-0.5 bg-violet-500/10 text-violet-300 text-xs px-1.5 py-0.5 rounded-full border border-violet-500/20">
                  {creator.niche[0]}
                </span>
              </div>
              <button className="flex-shrink-0 bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium px-3 py-1 rounded-lg transition-colors">
                Seguir
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Active campaigns */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <h3 className="text-white font-semibold text-sm mb-4">Campañas activas</h3>
        <div className="space-y-3">
          {activeCampaigns.map((campaign) => (
            <div key={campaign.id} className="group">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-white/60 text-xs font-medium">{campaign.brandName}</p>
                  <p className="text-white text-xs font-medium mt-0.5 line-clamp-1">{campaign.title}</p>
                  <p className="text-violet-400 text-xs font-semibold mt-1">
                    ${campaign.budgetPerCreator.toLocaleString()}
                  </p>
                </div>
                <button className="flex-shrink-0 border border-violet-500/40 text-violet-400 hover:bg-violet-500/10 text-xs font-medium px-2.5 py-1 rounded-lg transition-colors">
                  Aplicar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trends */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <h3 className="text-white font-semibold text-sm mb-4">Tendencias</h3>
        <div className="space-y-2.5">
          {TRENDS.map(({ tag, posts }) => (
            <div key={tag} className="flex items-center justify-between">
              <span className="text-violet-400 hover:text-violet-300 text-sm cursor-pointer transition-colors">
                {tag}
              </span>
              <span className="text-white/40 text-xs">{posts} posts</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

// ─── Create Post Box ──────────────────────────────────────────────────────────

function CreatePostBox() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-bold">SR</span>
        </div>
        <input
          type="text"
          placeholder="¿Qué está pasando en tu mundo creador?"
          className="flex-1 bg-transparent text-white/60 placeholder:text-white/30 text-sm outline-none"
          readOnly
        />
      </div>
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
        <button className="flex items-center gap-1.5 text-white/40 hover:text-violet-400 transition-colors text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-violet-500/10">
          <ImageIcon className="w-4 h-4" />
          <span>Imagen</span>
        </button>
        <button className="flex items-center gap-1.5 text-white/40 hover:text-pink-400 transition-colors text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-pink-500/10">
          <Video className="w-4 h-4" />
          <span>Video</span>
        </button>
        <button className="flex items-center gap-1.5 text-white/40 hover:text-orange-400 transition-colors text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-orange-500/10">
          <Megaphone className="w-4 h-4" />
          <span>Campaña</span>
        </button>
        <button className="ml-auto bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-all">
          Publicar
        </button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-6">
        {/* Left sidebar */}
        <div className="hidden lg:block">
          <LeftSidebar />
        </div>

        {/* Center feed */}
        <main className="space-y-4">
          <CreatePostBox />
          {mockPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </main>

        {/* Right sidebar */}
        <div className="hidden lg:block">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
