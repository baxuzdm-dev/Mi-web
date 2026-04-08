"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ArrowRight, Users, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const NICHES = ["Fitness", "Lifestyle", "Gaming", "Beauty", "Travel", "Food", "Fashion", "Music", "Art", "Tech", "Cosplay", "Adult Content"];
const SERVICES = ["Account Management", "Content Strategy", "Marketing", "Promotion", "Chatting", "PPV Strategy", "Social Media Growth", "Brand Deals"];
const COUNTRIES = ["United States", "United Kingdom", "Canada", "Australia", "Germany", "France", "Spain", "Brazil", "Mexico", "Colombia", "Argentina", "Other"];

export default function OnboardingPage() {
  const router = useRouter();
  const { update } = useSession();
  const [step, setStep] = useState<"role" | "profile">("role");
  const [role, setRole] = useState<"CREATOR" | "AGENCY">("CREATOR");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Creator fields
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [country, setCountry] = useState("");
  const [niche, setNiche] = useState<string[]>([]);
  const [followers, setFollowers] = useState("");
  const [estimatedIncome, setEstimatedIncome] = useState("");

  // Agency fields
  const [agencyName, setAgencyName] = useState("");
  const [description, setDescription] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [commission, setCommission] = useState("20");
  const [website, setWebsite] = useState("");
  const [agencyCountry, setAgencyCountry] = useState("");

  function toggleItem(arr: string[], setArr: (a: string[]) => void, item: string) {
    setArr(arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const profileData =
        role === "CREATOR"
          ? {
              role,
              username,
              bio,
              country,
              niche,
              followers: parseInt(followers) || 0,
              estimatedIncome: parseInt(estimatedIncome) || 0,
            }
          : {
              role,
              name: agencyName,
              description,
              services,
              commission: parseFloat(commission) || 20,
              website,
              country: agencyCountry,
            };

      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      });

      if (!res.ok) {
        const d = await res.json();
        setError(d.error ?? "Failed to save profile");
        setLoading(false);
        return;
      }

      await update();
      router.push(role === "CREATOR" ? "/creator" : "/agency");
    } catch {
      setError("Something went wrong.");
      setLoading(false);
    }
  }

  if (step === "role") {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <h1 className="text-3xl font-bold text-white mb-3">Welcome to FanConnect!</h1>
          <p className="text-white/50 mb-10">Let&apos;s set up your profile. What are you?</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => setRole("CREATOR")}
              className={`p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all duration-200 ${
                role === "CREATOR"
                  ? "border-violet-500 bg-violet-500/15 text-violet-300"
                  : "border-white/10 bg-white/5 text-white/50 hover:border-white/20"
              }`}
            >
              <Users className="w-8 h-8" />
              <div>
                <div className="font-semibold">Content Creator</div>
                <div className="text-xs mt-0.5 opacity-70">OnlyFans, Fansly, etc.</div>
              </div>
            </button>
            <button
              onClick={() => setRole("AGENCY")}
              className={`p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all duration-200 ${
                role === "AGENCY"
                  ? "border-pink-500 bg-pink-500/15 text-pink-300"
                  : "border-white/10 bg-white/5 text-white/50 hover:border-white/20"
              }`}
            >
              <Building2 className="w-8 h-8" />
              <div>
                <div className="font-semibold">Agency</div>
                <div className="text-xs mt-0.5 opacity-70">Management & Growth</div>
              </div>
            </button>
          </div>

          <Button variant="gradient" size="lg" className="w-full gap-2" onClick={() => setStep("profile")}>
            Continue <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-start justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {role === "CREATOR" ? "Set up your creator profile" : "Set up your agency profile"}
          </h1>
          <p className="text-white/50">This is how you&apos;ll appear to {role === "CREATOR" ? "agencies" : "creators"}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {role === "CREATOR" ? (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username *</Label>
                  <Input
                    id="username"
                    placeholder="yourhandle"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <select
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="flex h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                  >
                    <option value="">Select country</option>
                    {COUNTRIES.map((c) => <option key={c} value={c} className="bg-[#1a1a2e]">{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell agencies about yourself, your content, and what you're looking for..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Niche / Content Type</Label>
                <div className="flex flex-wrap gap-2">
                  {NICHES.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => toggleItem(niche, setNiche, n)}
                      className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                        niche.includes(n)
                          ? "border-violet-500/60 bg-violet-500/20 text-violet-300"
                          : "border-white/10 bg-white/5 text-white/50 hover:border-white/20"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="followers">Total Followers (all platforms)</Label>
                  <Input
                    id="followers"
                    type="number"
                    placeholder="e.g. 50000"
                    value={followers}
                    onChange={(e) => setFollowers(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="income">Estimated Monthly Income ($)</Label>
                  <Input
                    id="income"
                    type="number"
                    placeholder="e.g. 5000"
                    value={estimatedIncome}
                    onChange={(e) => setEstimatedIncome(e.target.value)}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="agencyName">Agency Name *</Label>
                  <Input
                    id="agencyName"
                    placeholder="Your Agency Name"
                    value={agencyName}
                    onChange={(e) => setAgencyName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agencyCountry">Country</Label>
                  <select
                    value={agencyCountry}
                    onChange={(e) => setAgencyCountry(e.target.value)}
                    className="flex h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                  >
                    <option value="">Select country</option>
                    {COUNTRIES.map((c) => <option key={c} value={c} className="bg-[#1a1a2e]">{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your agency, your approach, results you've achieved..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Services Offered</Label>
                <div className="flex flex-wrap gap-2">
                  {SERVICES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleItem(services, setServices, s)}
                      className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                        services.includes(s)
                          ? "border-pink-500/60 bg-pink-500/20 text-pink-300"
                          : "border-white/10 bg-white/5 text-white/50 hover:border-white/20"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="commission">Commission % (your cut)</Label>
                  <Input
                    id="commission"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="20"
                    value={commission}
                    onChange={(e) => setCommission(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website (optional)</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://youragency.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={() => setStep("role")}>
              Back
            </Button>
            <Button type="submit" variant="gradient" className="flex-1 gap-2" disabled={loading}>
              {loading ? "Saving..." : "Complete setup"}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
