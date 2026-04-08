"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Users,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatNumber, timeAgo } from "@/lib/utils";

interface Application {
  id: string;
  status: string;
  message?: string;
  createdAt: string;
  creator: {
    id: string;
    username: string;
    avatar?: string;
    isVerified: boolean;
    niche: string[];
    followers: number;
    user: { name?: string; image?: string };
  };
  conversation?: { id: string } | null;
}

export default function AgencyDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated" && session.user.role !== "AGENCY") router.push("/onboarding");
  }, [status, session, router]);

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/applications?role=AGENCY")
      .then((r) => r.json())
      .then((data) => {
        setApplications(data);
        setLoading(false);
      });
  }, [status]);

  async function updateStatus(appId: string, newStatus: "ACCEPTED" | "REJECTED") {
    const res = await fetch(`/api/applications/${appId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      setApplications((prev) =>
        prev.map((a) => (a.id === appId ? { ...a, status: newStatus } : a))
      );
      if (newStatus === "ACCEPTED") {
        // Refresh to get conversation
        fetch("/api/applications?role=AGENCY")
          .then((r) => r.json())
          .then(setApplications);
      }
    }
  }

  const pending = applications.filter((a) => a.status === "PENDING");
  const accepted = applications.filter((a) => a.status === "ACCEPTED");

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Agency Dashboard
          </h1>
          <p className="text-white/50 mt-1">Manage your creator applications</p>
        </div>
        <Link href="/explore/creators">
          <Button variant="gradient" className="gap-2">
            <Search className="w-4 h-4" /> Browse Creators
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                <Clock className="w-4 h-4 text-yellow-400" />
              </div>
              <span className="text-sm text-white/60">Pending</span>
            </div>
            <div className="text-2xl font-bold text-white">{pending.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-sm text-white/60">Accepted</span>
            </div>
            <div className="text-2xl font-bold text-white">{accepted.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-violet-500/20 flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-violet-400" />
              </div>
              <span className="text-sm text-white/60">Active Chats</span>
            </div>
            <div className="text-2xl font-bold text-white">{accepted.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-pink-500/20 flex items-center justify-center">
                <Users className="w-4 h-4 text-pink-400" />
              </div>
              <span className="text-sm text-white/60">Total Apps</span>
            </div>
            <div className="text-2xl font-bold text-white">{applications.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Pending Applications */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Incoming Applications</CardTitle>
                {pending.length > 0 && (
                  <Badge variant="warning">{pending.length} new</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {applications.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <Users className="w-10 h-10 text-white/20 mx-auto mb-3" />
                  <p className="text-white/50 mb-4">No applications yet</p>
                  <Link href="/explore/creators">
                    <Button variant="gradient" size="sm" className="gap-2">
                      Discover Creators <ArrowRight className="w-3 h-3" />
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-white/8">
                  {applications.map((app) => (
                    <div key={app.id} className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-11 h-11 shrink-0">
                          <AvatarImage src={app.creator.avatar ?? app.creator.user?.image ?? ""} />
                          <AvatarFallback>
                            {app.creator.username[0]?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Link
                              href={`/profile/creator/${app.creator.id}`}
                              className="font-medium text-white hover:text-violet-400 transition-colors"
                            >
                              @{app.creator.username}
                            </Link>
                            {app.creator.isVerified && (
                              <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />
                            )}
                            <span className="text-xs text-white/40">{timeAgo(app.createdAt)}</span>
                          </div>
                          <div className="flex items-center gap-3 mt-1 text-sm text-white/50">
                            <span>{formatNumber(app.creator.followers)} followers</span>
                            {app.creator.niche.slice(0, 2).map((n) => (
                              <Badge key={n} variant="default" className="text-xs py-0">{n}</Badge>
                            ))}
                          </div>
                          {app.message && (
                            <p className="text-sm text-white/60 mt-2 italic">&quot;{app.message}&quot;</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {app.status === "PENDING" ? (
                            <>
                              <Button
                                size="sm"
                                variant="default"
                                className="gap-1 bg-emerald-600 hover:bg-emerald-700"
                                onClick={() => updateStatus(app.id, "ACCEPTED")}
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" /> Accept
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="gap-1 border-red-500/30 text-red-400 hover:bg-red-500/10"
                                onClick={() => updateStatus(app.id, "REJECTED")}
                              >
                                <XCircle className="w-3.5 h-3.5" /> Reject
                              </Button>
                            </>
                          ) : (
                            <div className="flex items-center gap-2">
                              {app.status === "ACCEPTED" && <Badge variant="success">Accepted</Badge>}
                              {app.status === "REJECTED" && <Badge variant="destructive">Rejected</Badge>}
                              {app.status === "ACCEPTED" && app.conversation && (
                                <Link href={`/chat/${app.conversation.id}`}>
                                  <Button variant="secondary" size="sm" className="gap-1.5">
                                    <MessageSquare className="w-3.5 h-3.5" /> Chat
                                  </Button>
                                </Link>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/explore/creators" className="block">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Users className="w-4 h-4 text-violet-400" /> Browse Creators
                </Button>
              </Link>
              <Link href="/chat" className="block">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <MessageSquare className="w-4 h-4 text-violet-400" /> Messages
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Roster */}
          {accepted.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Your Roster</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {accepted.slice(0, 5).map((app) => (
                  <Link
                    key={app.id}
                    href={`/profile/creator/${app.creator.id}`}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={app.creator.avatar ?? ""} />
                      <AvatarFallback className="text-xs">
                        {app.creator.username[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium text-white">@{app.creator.username}</div>
                      <div className="text-xs text-white/40">{formatNumber(app.creator.followers)} followers</div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
