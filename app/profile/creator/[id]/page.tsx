"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { MapPin, ShieldCheck, ArrowLeft, Send, Pencil, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { formatNumber, formatCurrency } from "@/lib/utils";
import Link from "next/link";
import EditProfileModal from "@/components/EditProfileModal";
import SocialLinksSection from "@/components/SocialLinksSection";
import VerificationModal from "@/components/VerificationModal";
import { useLang } from "@/contexts/LangContext";

type SocialLinks = Record<string, Record<string, unknown>>;

interface CreatorProfile {
  id: string;
  userId: string;
  username: string;
  avatar?: string;
  bio?: string;
  country?: string;
  niche: string[];
  followers: number;
  estimatedIncome: number;
  platforms: string[];
  isVerified: boolean;
  isAvailable: boolean;
  socialLinks?: SocialLinks;
  verificationStatus?: string;
  user: { name?: string; image?: string };
}

export default function CreatorProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { data: session } = useSession();
  const router = useRouter();
  const { t } = useLang();
  const [profile, setProfile] = useState<CreatorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [message, setMessage] = useState("");
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  useEffect(() => {
    fetch(`/api/creators/${id}`)
      .then((r) => r.json())
      .then((data) => { setProfile(data); setLoading(false); });
  }, [id]);

  const isOwner = session?.user?.id === profile?.userId;

  async function handleApply(e: React.FormEvent) {
    e.preventDefault();
    if (!session) { router.push("/login"); return; }
    setApplying(true);
    setError("");
    setApplying(false);
    setApplicationStatus("sent");
    setShowApplyForm(false);
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
        <p className="text-white/50">{t("profile.notFound")}</p>
        <Link href="/explore/creators">
          <Button variant="outline" className="mt-4">{t("profile.backToExplore")}</Button>
        </Link>
      </div>
    );
  }

  const verPending = profile.verificationStatus === "PENDING";
  const canRequestVerify = isOwner && !profile.isVerified && !verPending;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Link href="/explore/creators">
        <Button variant="ghost" size="sm" className="mb-6 gap-2">
          <ArrowLeft className="w-4 h-4" /> {t("profile.back")}
        </Button>
      </Link>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main profile */}
        <div className="md:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl border border-white/10 bg-white/4">
            <div className="flex items-start gap-5">
              <div className="relative">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={profile.avatar ?? profile.user?.image ?? ""} />
                  <AvatarFallback className="text-2xl">{profile.username[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
                {profile.isAvailable && (
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#0a0a0f]" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-bold text-white">@{profile.username}</h1>
                  {profile.isVerified && (
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-500/20 border border-violet-500/30">
                      <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />
                      <span className="text-xs text-violet-300">{t("profile.verified")}</span>
                    </div>
                  )}
                  {verPending && (
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-xs text-amber-300">{t("profile.verificationPending")}</span>
                    </div>
                  )}
                </div>
                {profile.user?.name && <p className="text-white/50 mt-0.5">{profile.user.name}</p>}
                {profile.country && (
                  <div className="flex items-center gap-1.5 mt-1 text-sm text-white/40">
                    <MapPin className="w-3.5 h-3.5" /> {profile.country}
                  </div>
                )}
              </div>

              {/* Owner action buttons */}
              {isOwner && (
                <div className="flex flex-col gap-2 shrink-0">
                  <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setShowEditModal(true)}>
                    <Pencil className="w-3.5 h-3.5" /> {t("profile.editProfile")}
                  </Button>
                  {canRequestVerify && (
                    <Button variant="ghost" size="sm" className="gap-1.5 text-violet-400 border border-violet-500/30 hover:bg-violet-500/10" onClick={() => setShowVerifyModal(true)}>
                      <ShieldCheck className="w-3.5 h-3.5" /> {t("profile.requestVerification")}
                    </Button>
                  )}
                </div>
              )}
            </div>

            {profile.bio && <p className="mt-5 text-white/70 leading-relaxed">{profile.bio}</p>}

            <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-3 rounded-xl bg-white/5 border border-white/8 text-center">
                <div className="text-lg font-bold text-white">{formatNumber(profile.followers)}</div>
                <div className="text-xs text-white/40">{t("profile.followers")}</div>
              </div>
              {profile.estimatedIncome > 0 && (
                <div className="p-3 rounded-xl bg-white/5 border border-white/8 text-center">
                  <div className="text-lg font-bold text-white">{formatCurrency(profile.estimatedIncome)}</div>
                  <div className="text-xs text-white/40">{t("profile.estMonthly")}</div>
                </div>
              )}
              <div className="p-3 rounded-xl bg-white/5 border border-white/8 text-center">
                <div className={`text-lg font-bold ${profile.isAvailable ? "text-emerald-400" : "text-white/40"}`}>
                  {profile.isAvailable ? t("profile.available") : t("profile.unavailable")}
                </div>
                <div className="text-xs text-white/40">{t("profile.status")}</div>
              </div>
            </div>
          </div>

          {/* Social Platforms */}
          <SocialLinksSection
            profileId={profile.id}
            isOwner={isOwner}
            initialLinks={(profile.socialLinks ?? {}) as SocialLinks}
            onUpdated={(updated) =>
              setProfile((p) => p ? { ...p, socialLinks: updated as SocialLinks } : p)
            }
          />

          {/* Niches */}
          {profile.niche.length > 0 && (
            <div className="p-6 rounded-2xl border border-white/10 bg-white/4">
              <h2 className="text-lg font-semibold text-white mb-4">{t("profile.niche")}</h2>
              <div className="flex flex-wrap gap-2">
                {profile.niche.map((n) => <Badge key={n} variant="default">{n}</Badge>)}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Contact / Apply */}
          {session?.user?.role === "AGENCY" && (
            <div className="p-5 rounded-2xl border border-white/10 bg-white/4">
              <h3 className="font-semibold text-white mb-4">{t("profile.contactCreator")}</h3>
              {applicationStatus === "sent" ? (
                <div className="text-center py-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  </div>
                  <p className="text-sm text-emerald-300">{t("profile.interestSent")}</p>
                </div>
              ) : showApplyForm ? (
                <form onSubmit={handleApply} className="space-y-3">
                  <Textarea placeholder={t("profile.offerPlaceholder")} value={message} onChange={(e) => setMessage(e.target.value)} rows={4} />
                  {error && <p className="text-xs text-red-400">{error}</p>}
                  <div className="flex gap-2">
                    <Button type="button" variant="ghost" size="sm" onClick={() => setShowApplyForm(false)}>{t("profile.cancel")}</Button>
                    <Button type="submit" variant="gradient" size="sm" className="flex-1 gap-1.5" disabled={applying}>
                      <Send className="w-3.5 h-3.5" /> {applying ? t("profile.sending") : t("profile.sendOffer")}
                    </Button>
                  </div>
                </form>
              ) : (
                <Button variant="gradient" className="w-full gap-2" onClick={() => setShowApplyForm(true)} disabled={!profile.isAvailable}>
                  <Send className="w-4 h-4" />
                  {profile.isAvailable ? t("profile.sendOffer") : t("profile.notAvailableBtn")}
                </Button>
              )}
            </div>
          )}

          {/* Quick Stats */}
          <div className="p-5 rounded-2xl border border-white/10 bg-white/4 space-y-3">
            <h3 className="font-semibold text-white text-sm">{t("profile.quickStats")}</h3>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/50">{t("profile.followers")}</span>
              <span className="text-white font-medium">{formatNumber(profile.followers)}</span>
            </div>
            {profile.estimatedIncome > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/50">{t("profile.estMonthly")}</span>
                <span className="text-emerald-400 font-medium">{formatCurrency(profile.estimatedIncome)}/mo</span>
              </div>
            )}
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/50">{t("profile.status")}</span>
              <span className={profile.isAvailable ? "text-emerald-400" : "text-white/40"}>
                {profile.isAvailable ? t("profile.openToOffers") : t("profile.notAvailable")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <EditProfileModal
          profile={profile}
          onClose={() => setShowEditModal(false)}
          onSaved={(updated) => setProfile((p) => p ? { ...p, ...updated } : p)}
        />
      )}

      {/* Verification Modal */}
      {showVerifyModal && (
        <VerificationModal
          profileId={profile.id}
          onClose={() => setShowVerifyModal(false)}
          onSubmitted={() => setProfile((p) => p ? { ...p, verificationStatus: "PENDING" } : p)}
        />
      )}
    </div>
  );
}
