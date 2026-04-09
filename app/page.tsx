import Link from "next/link";
import {
  ArrowRight,
  Zap,
  ShieldCheck,
  MessageSquare,
  TrendingUp,
  Star,
  Users,
  Building2,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const stats = [
  { label: "Active Creators", value: "12,000+" },
  { label: "Partner Agencies", value: "340+" },
  { label: "Successful Matches", value: "8,500+" },
  { label: "Revenue Generated", value: "$42M+" },
];

const features = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Smart Matching",
    description: "Our algorithm connects creators with agencies that align with their niche, earnings, and goals.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Verified Profiles",
    description: "Every agency is vetted and verified. No scams, no sketchy DMs — just legitimate partnerships.",
  },
  {
    icon: <MessageSquare className="w-5 h-5" />,
    title: "Real-time Chat",
    description: "Communicate directly once matched. No middlemen, no delays.",
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Grow Your Revenue",
    description: "Agencies on our platform have helped creators increase their earnings by an average of 3.2x.",
  },
];

const testimonials = [
  {
    name: "Sofia M.",
    role: "Content Creator",
    text: "Found my agency within 3 days. They helped me double my monthly revenue in 6 months. This platform is a game changer.",
    followers: "450K",
  },
  {
    name: "Elite Talent Agency",
    role: "Management Agency",
    text: "We've onboarded 40+ creators through Mundo Creadores. The quality of talent here is unmatched.",
    creators: "120+",
  },
  {
    name: "Luna R.",
    role: "Content Creator",
    text: "The chat feature made it so easy to communicate with agencies. I signed with my dream team in under a week.",
    followers: "890K",
  },
];

export default function LandingPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4">
        {/* Background glow effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-violet-600/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-pink-600/8 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm mb-8">
            <Star className="w-3.5 h-3.5" />
            <span>The #1 marketplace for creator-agency deals</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            Where Top Creators
            <br />
            <span className="gradient-text">Meet Elite Agencies</span>
          </h1>

          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Mundo Creadores is the premium marketplace where content creators find management agencies
            that help them scale. Verified profiles, smart matching, real-time communication.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button variant="gradient" size="xl" className="gap-2">
                Get Started Free <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/explore/creators">
              <Button variant="outline" size="xl" className="gap-2">
                Explore Creators
              </Button>
            </Link>
          </div>

          <p className="text-white/30 text-sm mt-6">No credit card required • Free to join</p>
        </div>

        {/* Stats bar */}
        <div className="max-w-4xl mx-auto mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/8 rounded-2xl overflow-hidden border border-white/8">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-[#0a0a0f] p-6 text-center">
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4 border-t border-white/8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="default" className="mb-4">How it works</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">
              From signup to partnership in days, not months
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              We simplified the entire process so you can focus on what matters — creating.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* For Creators */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-violet-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">For Creators</h3>
              </div>
              {[
                "Create your profile and showcase your stats",
                "Browse verified agencies that fit your niche",
                "Apply with a personalized message",
                "Chat directly and close the deal",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center shrink-0 text-violet-400 text-sm font-bold">
                    {i + 1}
                  </div>
                  <p className="text-white/70 pt-0.5">{step}</p>
                </div>
              ))}
              <Link href="/register?role=creator">
                <Button variant="gradient" className="mt-4 gap-2">
                  Join as Creator <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* For Agencies */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-pink-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">For Agencies</h3>
              </div>
              {[
                "Set up your agency profile with services and rates",
                "Browse creators with powerful filters",
                "Send personalized offers to top talent",
                "Manage your roster directly from the dashboard",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-pink-600/20 border border-pink-500/30 flex items-center justify-center shrink-0 text-pink-400 text-sm font-bold">
                    {i + 1}
                  </div>
                  <p className="text-white/70 pt-0.5">{step}</p>
                </div>
              ))}
              <Link href="/register?role=agency">
                <Button variant="outline" className="mt-4 gap-2 border-pink-500/30 hover:bg-pink-500/10 text-pink-300">
                  Join as Agency <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 border-t border-white/8 bg-white/2">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="default" className="mb-4">Features</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything you need to succeed
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-2xl border border-white/8 bg-white/3 hover:border-violet-500/30 hover:bg-white/5 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center text-violet-400 mb-4">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 border-t border-white/8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="default" className="mb-4">Testimonials</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">
              Real results from real people
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="p-6 rounded-2xl border border-white/8 bg-white/3 flex flex-col gap-4"
              >
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-white/70 leading-relaxed flex-1">"{t.text}"</p>
                <div className="pt-2 border-t border-white/8">
                  <div className="font-semibold text-white">{t.name}</div>
                  <div className="text-sm text-white/50">{t.role}</div>
                  {t.followers && (
                    <Badge variant="default" className="mt-2 text-xs">
                      {t.followers} followers
                    </Badge>
                  )}
                  {t.creators && (
                    <Badge variant="pink" className="mt-2 text-xs">
                      {t.creators} creators managed
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 border-t border-white/8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-pink-600/20 rounded-3xl blur-3xl" />
            <div className="relative p-12 rounded-3xl border border-white/10 bg-white/3">
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to level up?
              </h2>
              <p className="text-white/60 text-lg mb-8">
                Join thousands of creators and agencies already using Mundo Creadores.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button variant="gradient" size="xl" className="gap-2">
                    Start for free <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/explore/agencies">
                  <Button variant="outline" size="xl">
                    Browse Agencies
                  </Button>
                </Link>
              </div>
              <div className="mt-6 flex items-center justify-center gap-6 text-sm text-white/40">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Free to join
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Verified agencies
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Real-time chat
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-white">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            Mundo Creadores
          </div>
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} Mundo Creadores. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/40">
            <Link href="/explore/creators" className="hover:text-white transition-colors">Creators</Link>
            <Link href="/explore/agencies" className="hover:text-white transition-colors">Agencies</Link>
            <Link href="/login" className="hover:text-white transition-colors">Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
