"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  Image as ImageIcon,
  Megaphone,
  Shield,
  Bookmark,
  Share2,
  MessageCircle,
  Flame,
  Trophy,
  Handshake,
  Send,
  X,
} from "lucide-react";
import { mockPosts, mockCreators, mockCampaigns, type MockPost } from "@/lib/mockData";
import { useApp, type AppPost } from "@/contexts/AppContext";

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
  if (hours < 1) return "justo ahora";
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

// ─── Post Card (unified for mock + user posts) ────────────────────────────────

type UnifiedPost = MockPost | AppPost;

function PostCard({ post }: { post: UnifiedPost }) {
  const {
    toggleLike,
    toggleBookmark,
    addComment,
    getComments,
    isLiked,
    isBookmarked,
    getLikeCount,
    getCommentCount,
  } = useApp();

  const [commentsOpen, setCommentsOpen] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [copied, setCopied] = useState(false);

  const liked = isLiked(post.id);
  const bookmarked = isBookmarked(post.id);
  const likeCount = getLikeCount(post.id, post.likes);
  const commentCount = getCommentCount(post.id, post.comments);
  const comments = getComments(post.id);

  const campaignData =
    post.type === "campaign" && post.campaignRef
      ? mockCampaigns.find((c) => c.id === post.campaignRef)
      : null;

  function handleShare() {
    const url = `${window.location.origin}/post/${post.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleAddComment() {
    const text = commentInput.trim();
    if (!text) return;
    addComment(post.id, text, { name: "Sofia Ramírez", username: "sofiaramirez", role: "CREATOR" });
    setCommentInput("");
  }

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

      {/* Image preview */}
      {"image" in post && post.image && (
        <div className="mb-4 rounded-xl overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.image} alt="Post image" className="w-full max-h-80 object-cover" />
        </div>
      )}

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
            <Link href="/campaigns" className="flex-shrink-0 bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap">
              Ver campaña →
            </Link>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <div className="flex items-center gap-5">
          {/* Like */}
          <button
            onClick={() => toggleLike(post.id)}
            className={`flex items-center gap-1.5 transition-colors text-sm ${
              liked ? "text-orange-400" : "text-white/40 hover:text-orange-400"
            }`}
          >
            <Flame className="w-4 h-4" fill={liked ? "currentColor" : "none"} />
            <span>{formatCount(likeCount)}</span>
          </button>

          {/* Comment */}
          <button
            onClick={() => setCommentsOpen((o) => !o)}
            className={`flex items-center gap-1.5 transition-colors text-sm ${
              commentsOpen ? "text-violet-400" : "text-white/40 hover:text-violet-400"
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>{formatCount(commentCount)}</span>
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-white/40 hover:text-pink-400 transition-colors text-sm"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-xs">{copied ? "¡Copiado!" : formatCount(post.shares)}</span>
          </button>
        </div>

        {/* Bookmark */}
        <button
          onClick={() => toggleBookmark(post.id)}
          className={`transition-colors ${bookmarked ? "text-violet-400" : "text-white/30 hover:text-white/60"}`}
        >
          <Bookmark className="w-4 h-4" fill={bookmarked ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Inline Comments */}
      {commentsOpen && (
        <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
          {comments.length === 0 && (
            <p className="text-white/30 text-xs">Sin comentarios aún. ¡Sé el primero!</p>
          )}
          {comments.map((c) => (
            <div key={c.id} className="flex gap-2">
              <div
                className={`w-7 h-7 rounded-full bg-gradient-to-br ${avatarGradient(c.authorName)} flex items-center justify-center flex-shrink-0`}
              >
                <span className="text-white text-[10px] font-bold">{getInitials(c.authorName)}</span>
              </div>
              <div className="bg-white/5 rounded-xl px-3 py-2 flex-1">
                <p className="text-white/80 text-xs font-medium">@{c.authorUsername}</p>
                <p className="text-white/70 text-xs mt-0.5">{c.content}</p>
              </div>
            </div>
          ))}

          {/* Comment input */}
          <div className="flex gap-2 mt-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[10px] font-bold">SR</span>
            </div>
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                placeholder="Escribe un comentario…"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white/80 text-xs placeholder:text-white/30 outline-none focus:border-violet-500/50 transition-colors"
              />
              <button
                onClick={handleAddComment}
                disabled={!commentInput.trim()}
                className="bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white p-2 rounded-xl transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

// ─── Create Post Box ──────────────────────────────────────────────────────────

const POST_TYPES: { id: AppPost["type"]; label: string; icon: React.ElementType }[] = [
  { id: "post",        label: "Post",         icon: MessageCircle },
  { id: "achievement", label: "Logro",         icon: Trophy },
  { id: "collab",      label: "Colaboración",  icon: Handshake },
];

const MAX_CHARS = 500;

function CreatePostBox() {
  const { createPost } = useApp();
  const [focused, setFocused] = useState(false);
  const [content, setContent] = useState("");
  const [type, setType] = useState<AppPost["type"]>("post");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  }

  function handleSubmit() {
    if (!content.trim()) return;
    createPost(content.trim(), type, imagePreview ?? undefined);
    setContent("");
    setType("post");
    setImagePreview(null);
    setFocused(false);
  }

  const remaining = MAX_CHARS - content.length;
  const overLimit = remaining < 0;

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-bold">SR</span>
        </div>
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setFocused(true)}
            placeholder="¿Qué está pasando en tu mundo creador?"
            rows={focused ? 3 : 1}
            maxLength={MAX_CHARS + 50}
            className="w-full bg-transparent text-white/80 placeholder:text-white/30 text-sm outline-none resize-none transition-all"
          />

          {/* Image preview */}
          {imagePreview && (
            <div className="relative mt-2 rounded-xl overflow-hidden w-full max-h-48">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imagePreview} alt="Preview" className="w-full object-cover max-h-48" />
              <button
                onClick={() => setImagePreview(null)}
                className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {focused && (
        <>
          {/* Type selector */}
          <div className="flex items-center gap-2 mt-3">
            {POST_TYPES.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setType(id)}
                className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                  type === id
                    ? "bg-violet-600 text-white"
                    : "text-white/40 hover:text-violet-400 hover:bg-violet-500/10"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>

          {/* Bottom toolbar */}
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
            {/* Image upload */}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              onClick={() => fileRef.current?.click()}
              className="flex items-center gap-1.5 text-white/40 hover:text-violet-400 transition-colors text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-violet-500/10"
            >
              <ImageIcon className="w-4 h-4" />
              <span>Imagen</span>
            </button>

            <button
              onClick={() => fileRef.current?.click()}
              className="flex items-center gap-1.5 text-white/40 hover:text-orange-400 transition-colors text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-orange-500/10"
            >
              <Megaphone className="w-4 h-4" />
              <span>Campaña</span>
            </button>

            {/* Character count */}
            <span className={`ml-auto text-xs ${overLimit ? "text-red-400" : remaining < 50 ? "text-yellow-400" : "text-white/30"}`}>
              {remaining}
            </span>

            <button
              onClick={handleSubmit}
              disabled={!content.trim() || overLimit}
              className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-all"
            >
              Publicar
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Left Sidebar ─────────────────────────────────────────────────────────────

function LeftSidebar() {
  const { state } = useApp();

  // Profile fields to check for completeness
  const profileFields = [
    { key: "bio",       label: "Bio",         filled: !!state.profile.bio,                   href: "/settings" },
    { key: "country",   label: "País",        filled: !!state.profile.country,               href: "/settings" },
    { key: "niche",     label: "Nicho",       filled: (state.profile.niche?.length ?? 0) > 0, href: "/settings" },
    { key: "platforms", label: "Plataformas", filled: (state.profile.platforms?.length ?? 0) > 0, href: "/settings" },
    { key: "display",   label: "Nombre",      filled: !!state.profile.displayName,           href: "/settings" },
  ];

  // Mock defaults count 2 filled (name + country pre-filled for demo)
  const filledCount = profileFields.filter((f) => f.filled).length + 2; // +2 for defaults (avatar, username)
  const totalFields = profileFields.length + 2;
  const pct = Math.round((filledCount / totalFields) * 100);
  const missing = profileFields.filter((f) => !f.filled);

  return (
    <aside className="space-y-4">
      {/* Mini profile card */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <div className="flex flex-col items-center text-center mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center mb-3">
            <span className="text-white text-xl font-bold">SR</span>
          </div>
          <p className="text-white font-semibold">{state.profile.displayName ?? "Sofia Ramírez"}</p>
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

        {/* Profile completeness bar */}
        <div className="border-t border-white/10 pt-3 mt-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/60 text-xs">Completa tu perfil</span>
            <span className="text-violet-400 text-xs font-medium">{pct}%</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-pink-500 rounded-full transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>

          {/* Missing fields */}
          {missing.length > 0 && (
            <div className="mt-2 space-y-1">
              <p className="text-white/30 text-[11px]">Falta completar:</p>
              {missing.map((f) => (
                <Link
                  key={f.key}
                  href={f.href}
                  className="block text-violet-400 hover:text-violet-300 text-[11px] transition-colors"
                >
                  + {f.label}
                </Link>
              ))}
            </div>
          )}
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
  const { toggleFollow, isFollowing } = useApp();
  const suggestedCreators = mockCreators.slice(0, 3);
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
      {/* Quién seguir */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <h3 className="text-white font-semibold text-sm mb-4">Quién seguir</h3>
        <div className="space-y-3">
          {suggestedCreators.map((creator) => {
            const following = isFollowing(creator.username);
            return (
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
                <button
                  onClick={() => toggleFollow(creator.username)}
                  className={`flex-shrink-0 text-xs font-medium px-3 py-1 rounded-lg transition-colors ${
                    following
                      ? "bg-white/10 text-white/60 hover:bg-white/15"
                      : "bg-violet-600 hover:bg-violet-500 text-white"
                  }`}
                >
                  {following ? "Siguiendo" : "Seguir"}
                </button>
              </div>
            );
          })}
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
                <Link
                  href="/campaigns"
                  className="flex-shrink-0 border border-violet-500/40 text-violet-400 hover:bg-violet-500/10 text-xs font-medium px-2.5 py-1 rounded-lg transition-colors"
                >
                  Aplicar
                </Link>
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FeedPage() {
  const { state } = useApp();

  // Merge user posts (first) with mock posts — cast MockPost to unified shape
  const allPosts: UnifiedPost[] = [
    ...state.userPosts,
    ...(mockPosts as UnifiedPost[]),
  ];

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
          {allPosts.map((post) => (
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
