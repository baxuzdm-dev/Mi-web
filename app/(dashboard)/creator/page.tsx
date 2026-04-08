"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Users,
  Building2,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  Search,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatNumber, formatCurrency, timeAgo } from "@/lib/utils";

interface Application {
  id: string;
  status: string;
  createdAt: string;
  message?: string;
  agency: {
    id: string;
    name: string;
    logo?: string;
    commission: number;
    isVerified: boolean;
    user: { name: string };
  };
  conversation?: { id: string } | null;
}

interface Profile {
  username: string;
  followers: number;
  estimatedIncome: number;
  niche: string[];
  isVerified: boolean;
  isAvailable: boolean;
}

export default function CreatorDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated" && session.user.role !== "CREATOR") router.push("/onboarding");
  }, [status, session, router]);

  useEffect(() => {
    if (status !== "authenticated") return;
    Promise.all([
      fetch("/api/creators").then((r) => r.json()),
      fetch("/api/applications?role=CREATOR").then((r) => r.json()),
    ]).then(([_, apps]) => {
      setApplications(apps);
      setLoading(false);
    });

    // Fetch own profile
    fetch("/api/creators")
      .then((r) => r.json())
      .catch(() => null);
  }, [status]);

  // Fetch creator's own profile
  useEffect(() => {
    if (status !== "authenticated") return;
    fetch(`/api/me/profile`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => { if (data) setProfile(data); })
      .catch(() => null);
  }, [status]);

  const pending = applications.filter((a) => a.status === "PENDING");
  const accepted = applications.filter((a) => a.status === "ACCEPTED");
  const rejected = applications.filter((a) => a.status === "REJECTED");

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
            Hey, {session?.user?.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-white/50 mt-1">Here's an overview of your activity</p>
        </div>
        <Link href="/explore/agencies">
          <Button variant="gradient" className="gap-2">
            <Search className="w-4 h-4" /> Find Agencies
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
                <TrendingUp className="w-4 h-4 text-pink-400" />
              </div>
              <span className="text-sm text-white/60">Total Applied</span>
            </div>
            <div className="text-2xl font-bold text-white">{applications.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Applications list */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>My Applications</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {applications.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <Building2 className="w-10 h-10 text-white/20 mx-auto mb-3" />
                  <p className="text-white/50 mb-4">No applications yet</p>
                  <Link href="/explore/agencies">
                    <Button variant="gradient" size="sm" className="gap-2">
                      Browse Agencies <ArrowRight className="w-3 h-3" />
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-white/8">
                  {applications.map((app) => (
                    <div key={app.id} className="px-6 py-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <Avatar className="w-10 h-10 rounded-xl shrink-0">
                          <AvatarImage src={app.agency.logo ?? ""} />
                          <AvatarFallback className="rounded-xl">
                            {app.agency.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-medium text-white truncate">{app.agency.name}</span>
                            {app.agency.isVerified && (
                              <ShieldCheck className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                            )}
                          </div>
                          <div className="text-xs text-white/40">{timeAgo(app.createdAt)}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <StatusBadge status={app.status} />
                        {app.status === "ACCEPTED" && app.conversation && (
                          <Link href={`/chat/${app.conversation.id}`}>
                            <Button variant="secondary" size="sm" className="gap-1.5">
                              <MessageSquare className="w-3.5 h-3.5" /> Chat
                            </Button>
                          </Link>
                        )}
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
          {/* Quick actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/explore/agencies" className="block">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Building2 className="w-4 h-4 text-violet-400" /> Browse Agencies
                </Button>
              </Link>
              <Link href="/chat" className="block">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <MessageSquare className="w-4 h-4 text-violet-400" /> My Messages
                </Button>
              </Link>
              <Link href="/explore/creators" className="block">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Users className="w-4 h-4 text-violet-400" /> See Other Creators
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Profile completeness */}
          {!profile?.isVerified && (
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-medium text-white">Get Verified</span>
                </div>
                <p className="text-xs text-white/50 mb-3">
                  Verified profiles get 3x more agency responses.
                </p>
                <Button variant="outline" size="sm" className="w-full text-yellow-400 border-yellow-500/30">
                  Apply for Verification
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === "PENDING")
    return <Badge variant="warning">Pending</Badge>;
  if (status === "ACCEPTED")
    return <Badge variant="success">Accepted</Badge>;
  return <Badge variant="destructive">Rejected</Badge>;
}
