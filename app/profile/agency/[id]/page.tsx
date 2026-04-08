"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import {
  MapPin,
  Percent,
  Globe,
  ShieldCheck,
  ArrowLeft,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

interface AgencyProfile {
  id: string;
  name: string;
  logo?: string;
  description?: string;
  services: string[];
  commission: number;
  website?: string;
  country?: string;
  isVerified: boolean;
  user: { name?: string; image?: string };
}

export default function AgencyProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { data: session } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<AgencyProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [message, setMessage] = useState("");
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/agencies/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setProfile(data);
        setLoading(false);
      });
  }, [id]);

  async function handleApply(e: React.FormEvent) {
    e.preventDefault();
    if (!session) { router.push("/login"); return; }
    setApplying(true);
    setError("");

    const res = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ agencyId: id, message }),
    });

    setApplying(false);

    if (res.ok) {
      setApplied(true);
      setShowApplyForm(false);
    } else {
      const d = await res.json();
      if (d.error === "Already applied") {
        setApplied(true);
        setShowApplyForm(false);
      } else {
        setError(d.error ?? "Failed to apply");
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-white/50">Agency not found</p>
        <Link href="/explore/agencies">
          <Button variant="outline" className="mt-4">Back</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Link href="/explore/agencies">
        <Button variant="ghost" size="sm" className="mb-6 gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
      </Link>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Agency header */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/4">
            <div className="flex items-start gap-5">
              <Avatar className="w-20 h-20 rounded-2xl">
                <AvatarImage src={profile.logo ?? profile.user?.image ?? ""} />
                <AvatarFallback className="rounded-2xl text-2xl">
                  {profile.name[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-bold text-white">{profile.name}</h1>
                  {profile.isVerified && (
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-500/20 border border-violet-500/30">
                      <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />
                      <span className="text-xs text-violet-300">Verified</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-4 mt-2">
                  {profile.country && (
                    <div className="flex items-center gap-1.5 text-sm text-white/40">
                      <MapPin className="w-3.5 h-3.5" /> {profile.country}
                    </div>
                  )}
                  {profile.website && (
                    <a
                      href={profile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-violet-400 hover:text-violet-300"
                    >
                      <Globe className="w-3.5 h-3.5" /> Website
                    </a>
                  )}
                </div>
              </div>
            </div>

            {profile.description && (
              <p className="mt-5 text-white/70 leading-relaxed">{profile.description}</p>
            )}

            <div className="mt-5">
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-500/15 border border-violet-500/30">
                <Percent className="w-4 h-4 text-violet-400" />
                <span className="text-violet-300 font-medium">{profile.commission}% commission</span>
              </div>
            </div>
          </div>

          {/* Services */}
          {profile.services.length > 0 && (
            <div className="p-6 rounded-2xl border border-white/10 bg-white/4">
              <h2 className="text-lg font-semibold text-white mb-4">Services</h2>
              <div className="flex flex-wrap gap-2">
                {profile.services.map((s) => (
                  <Badge key={s} variant="pink">{s}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Apply CTA */}
          {session?.user?.role === "CREATOR" && (
            <div className="p-5 rounded-2xl border border-white/10 bg-white/4">
              <h3 className="font-semibold text-white mb-4">Apply to this Agency</h3>
              {applied ? (
                <div className="text-center py-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  </div>
                  <p className="text-sm text-emerald-300">Application sent!</p>
                  <p className="text-xs text-white/40 mt-1">They&apos;ll review and respond soon.</p>
                </div>
              ) : showApplyForm ? (
                <form onSubmit={handleApply} className="space-y-3">
                  <Textarea
                    placeholder="Introduce yourself and explain why you'd be a great fit..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                  />
                  {error && <p className="text-xs text-red-400">{error}</p>}
                  <div className="flex gap-2">
                    <Button type="button" variant="ghost" size="sm" onClick={() => setShowApplyForm(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="gradient" size="sm" className="flex-1 gap-1.5" disabled={applying}>
                      <Send className="w-3.5 h-3.5" /> {applying ? "Sending..." : "Apply Now"}
                    </Button>
                  </div>
                </form>
              ) : (
                <Button variant="gradient" className="w-full gap-2" onClick={() => setShowApplyForm(true)}>
                  <Send className="w-4 h-4" /> Apply Now
                </Button>
              )}
            </div>
          )}

          {/* Quick stats */}
          <div className="p-5 rounded-2xl border border-white/10 bg-white/4 space-y-3">
            <h3 className="font-semibold text-white text-sm">Details</h3>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/50">Commission</span>
              <span className="text-white font-medium">{profile.commission}%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/50">Verified</span>
              <span className={profile.isVerified ? "text-violet-400" : "text-white/30"}>
                {profile.isVerified ? "Yes" : "No"}
              </span>
            </div>
            {profile.country && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/50">Location</span>
                <span className="text-white">{profile.country}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
