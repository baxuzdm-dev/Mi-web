"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MessageSquare, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { timeAgo } from "@/lib/utils";

interface Conversation {
  id: string;
  updatedAt: string;
  participants: { id: string; name?: string; image?: string }[];
  messages: {
    content: string;
    createdAt: string;
    sender: { name?: string };
  }[];
  application: {
    creator: { username: string; avatar?: string };
    agency: { name: string; logo?: string };
  };
}

export default function ChatListPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/conversations")
      .then((r) => r.json())
      .then((data) => {
        setConversations(data);
        setLoading(false);
      });
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-white mb-6">Messages</h1>

      {conversations.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-violet-400" />
          </div>
          <p className="text-white/50 text-lg mb-2">No conversations yet</p>
          <p className="text-white/30 text-sm">
            {session?.user?.role === "CREATOR"
              ? "Apply to agencies and get accepted to start chatting"
              : "Accept creator applications to unlock chat"}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {conversations.map((conv) => {
            const lastMessage = conv.messages[0];
            const isCreator = session?.user?.role === "CREATOR";
            const name = isCreator ? conv.application.agency.name : `@${conv.application.creator.username}`;
            const avatar = isCreator ? conv.application.agency.logo : conv.application.creator.avatar;

            return (
              <Link key={conv.id} href={`/chat/${conv.id}`}>
                <div className="flex items-center gap-4 p-4 rounded-2xl border border-white/8 bg-white/3 hover:border-violet-500/30 hover:bg-white/5 transition-all duration-200">
                  <Avatar className="w-12 h-12 rounded-xl shrink-0">
                    <AvatarImage src={avatar ?? ""} />
                    <AvatarFallback className="rounded-xl">{name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-white">{name}</span>
                      {lastMessage && (
                        <span className="text-xs text-white/30">{timeAgo(lastMessage.createdAt)}</span>
                      )}
                    </div>
                    <p className="text-sm text-white/50 truncate mt-0.5">
                      {lastMessage ? lastMessage.content : "No messages yet"}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/20 shrink-0" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
