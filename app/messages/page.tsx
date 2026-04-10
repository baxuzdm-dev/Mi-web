"use client";

import { useState } from "react";
import {
  MessageSquare,
  Pencil,
  Search,
  Smile,
  Paperclip,
  Send,
  CheckCheck,
} from "lucide-react";
import Link from "next/link";
import { mockConversations, MockConversation } from "@/lib/mockData";

/* ─── helpers ─────────────────────────────────────────────────── */

function formatTime(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - d.getTime()) / 86400000);
  if (diffDays === 0) return d.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });
  if (diffDays === 1) return "Ayer";
  return d.toLocaleDateString("es-MX", { day: "2-digit", month: "short" });
}

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

const GRADIENTS = [
  "from-violet-500 to-pink-500",
  "from-pink-500 to-rose-500",
  "from-blue-500 to-violet-500",
  "from-emerald-500 to-teal-500",
  "from-orange-500 to-pink-500",
];

function gradient(idx: number) {
  return GRADIENTS[idx % GRADIENTS.length];
}

/* ─── types ───────────────────────────────────────────────────── */
type Tab = "Todo" | "No leído" | "Propuestas";

/* ═══════════════════════════════════════════════════════════════ */
export default function MessagesPage() {
  const [activeConv, setActiveConv] = useState<MockConversation>(mockConversations[0]);
  const [tab, setTab] = useState<Tab>("Todo");
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");

  const filtered = mockConversations.filter((c) => {
    if (search) {
      const q = search.toLowerCase();
      if (
        !c.creatorName.toLowerCase().includes(q) &&
        !c.agencyName.toLowerCase().includes(q) &&
        !c.lastMessage.toLowerCase().includes(q)
      )
        return false;
    }
    if (tab === "No leído") return c.unreadCount > 0;
    if (tab === "Propuestas") return c.id === "conv-002"; // simulate
    return true;
  });

  const handleSend = () => {
    if (!inputText.trim()) return;
    setInputText("");
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-[#0a0a0f]">
      {/* ── LEFT PANEL ──────────────────────────────────────────── */}
      <aside className="w-80 shrink-0 border-r border-white/10 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-white">Mensajes</h1>
          <button className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white">
            <Pencil size={16} />
          </button>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-white/10">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Buscar conversaciones..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-violet-500/50 transition-colors"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10">
          {(["Todo", "No leído", "Propuestas"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 text-xs font-medium transition-colors ${
                tab === t
                  ? "text-violet-400 border-b-2 border-violet-500"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-white/40 text-sm">
              Sin conversaciones
            </div>
          ) : (
            filtered.map((conv, idx) => {
              const isActive = activeConv?.id === conv.id;
              const isProposal = conv.id === "conv-002";
              return (
                <button
                  key={conv.id}
                  onClick={() => setActiveConv(conv)}
                  className={`w-full text-left p-3 flex gap-3 transition-all border-r-2 ${
                    isActive
                      ? "bg-violet-600/10 border-r-violet-500"
                      : "border-r-transparent hover:bg-white/5"
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div
                      className={`w-11 h-11 rounded-full bg-gradient-to-br ${gradient(idx)} flex items-center justify-center text-sm font-bold text-white`}
                    >
                      {getInitials(conv.creatorName)}
                    </div>
                    {conv.unreadCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 bg-violet-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="text-sm font-medium text-white truncate">
                        {conv.creatorName}
                      </span>
                      <span className="text-[10px] text-white/40 shrink-0">
                        {formatTime(conv.lastMessageAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs text-white/50 line-clamp-1 flex-1">
                        {conv.lastMessage}
                      </p>
                      {isProposal && (
                        <span className="shrink-0 text-[9px] font-semibold bg-pink-500/20 text-pink-400 border border-pink-500/30 rounded-full px-1.5 py-0.5">
                          Propuesta
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </aside>

      {/* ── RIGHT PANEL ─────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {!activeConv ? (
          /* Empty state */
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-white/40">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <MessageSquare size={28} />
            </div>
            <div className="text-center">
              <p className="text-base font-medium text-white/60">Selecciona una conversación</p>
              <p className="text-sm mt-1">Elige una conversación para comenzar a chatear</p>
            </div>
          </div>
        ) : (
          <>
            {/* Conversation header */}
            <div className="p-4 border-b border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-sm font-bold text-white shrink-0">
                {getInitials(activeConv.creatorName)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">{activeConv.creatorName}</span>
                  <span className="text-[10px] bg-violet-500/20 text-violet-300 border border-violet-500/30 rounded-full px-2 py-0.5 font-medium">
                    Creador
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    En línea
                  </span>
                </div>
                <p className="text-xs text-white/50 truncate">{activeConv.agencyName}</p>
              </div>
              <Link
                href={`/profile/${activeConv.creatorName.toLowerCase().replace(" ", "")}`}
                className="text-xs text-violet-400 hover:text-violet-300 transition-colors shrink-0"
              >
                Ver perfil
              </Link>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {activeConv.messages.map((msg) => {
                const isMine = msg.senderId === "creator-001";
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[72%] ${isMine ? "items-end" : "items-start"} flex flex-col gap-1`}>
                      <div
                        className={`px-4 py-2.5 text-sm leading-relaxed ${
                          isMine
                            ? "bg-violet-600 text-white rounded-2xl rounded-tr-sm"
                            : "bg-white/10 text-white rounded-2xl rounded-tl-sm"
                        }`}
                      >
                        {msg.content}
                      </div>
                      <div className={`flex items-center gap-1 text-[10px] text-white/40 ${isMine ? "flex-row-reverse" : ""}`}>
                        <span>{formatTime(msg.createdAt)}</span>
                        {isMine && <CheckCheck size={12} className="text-violet-400" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input area */}
            <div className="border-t border-white/10 p-4">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 focus-within:border-violet-500/50 transition-colors">
                <button className="p-1.5 text-white/40 hover:text-white/70 transition-colors shrink-0">
                  <Smile size={18} />
                </button>
                <input
                  type="text"
                  placeholder="Escribe un mensaje..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1 bg-transparent text-sm text-white placeholder-white/40 focus:outline-none min-w-0"
                />
                <button className="p-1.5 text-white/40 hover:text-white/70 transition-colors shrink-0">
                  <Paperclip size={18} />
                </button>
                <button
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                  className="p-1.5 bg-gradient-to-r from-violet-600 to-pink-600 rounded-lg text-white disabled:opacity-40 disabled:cursor-not-allowed hover:from-violet-500 hover:to-pink-500 transition-all shrink-0"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
