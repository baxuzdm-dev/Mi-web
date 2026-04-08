"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn, timeAgo } from "@/lib/utils";
import { getPusherClient } from "@/lib/pusher";

interface Message {
  id: string;
  content: string;
  createdAt: string;
  sender: { id: string; name?: string; image?: string };
}

export default function ChatPage() {
  const { id } = useParams<{ id: string }>();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  // Load messages
  useEffect(() => {
    if (status !== "authenticated") return;
    fetch(`/api/messages?conversationId=${id}`)
      .then((r) => r.json())
      .then((data) => {
        setMessages(data);
        setLoading(false);
      });
  }, [id, status]);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Subscribe to real-time messages via Pusher
  useEffect(() => {
    if (status !== "authenticated") return;

    let channel: any = null;

    try {
      const pusher = getPusherClient();
      channel = pusher.subscribe(`conversation-${id}`);
      channel.bind("new-message", (newMessage: Message) => {
        setMessages((prev) => {
          // Avoid duplicates
          if (prev.some((m) => m.id === newMessage.id)) return prev;
          return [...prev, newMessage];
        });
      });
    } catch {
      // Pusher not configured - chat still works via polling fallback
    }

    return () => {
      channel?.unbind_all();
      channel?.unsubscribe();
    };
  }, [id, status]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || sending) return;

    setSending(true);
    const content = input.trim();
    setInput("");

    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversationId: id, content }),
    });

    setSending(false);

    if (res.ok) {
      const msg = await res.json();
      setMessages((prev) => {
        if (prev.some((m) => m.id === msg.id)) return prev;
        return [...prev, msg];
      });
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Chat header */}
      <div className="px-4 sm:px-6 py-4 border-b border-white/8 bg-[#0a0a0f]/80 backdrop-blur-xl flex items-center gap-3 shrink-0">
        <Link href="/chat">
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center text-sm font-bold">
          C
        </div>
        <div>
          <div className="font-medium text-white text-sm">Conversation</div>
          <div className="text-xs text-white/40">{messages.length} messages</div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/30 text-sm">No messages yet. Say hello!</p>
          </div>
        )}

        {messages.map((msg) => {
          const isOwn = msg.sender.id === session?.user?.id;
          return (
            <div key={msg.id} className={cn("flex gap-3 items-end", isOwn && "flex-row-reverse")}>
              <Avatar className="w-7 h-7 shrink-0">
                <AvatarImage src={msg.sender.image ?? ""} />
                <AvatarFallback className="text-xs">
                  {msg.sender.name?.[0]?.toUpperCase() ?? "?"}
                </AvatarFallback>
              </Avatar>

              <div className={cn("max-w-[70%] space-y-1", isOwn && "items-end flex flex-col")}>
                <div
                  className={cn(
                    "px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
                    isOwn
                      ? "bg-gradient-to-r from-violet-600 to-violet-700 text-white rounded-br-sm"
                      : "bg-white/8 text-white/90 rounded-bl-sm border border-white/8"
                  )}
                >
                  {msg.content}
                </div>
                <div className="text-xs text-white/30 px-1">{timeAgo(msg.createdAt)}</div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 sm:px-6 py-4 border-t border-white/8 bg-[#0a0a0f] shrink-0">
        <form onSubmit={sendMessage} className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <textarea
              className="w-full min-h-[44px] max-h-32 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none transition-colors"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(e as any);
                }
              }}
            />
          </div>
          <Button
            type="submit"
            variant="gradient"
            size="icon"
            className="shrink-0 w-11 h-11 rounded-xl"
            disabled={!input.trim() || sending}
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
        <p className="text-xs text-white/20 mt-2">Enter to send • Shift+Enter for new line</p>
      </div>
    </div>
  );
}
