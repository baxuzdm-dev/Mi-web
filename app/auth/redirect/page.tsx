"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Landing page after OAuth (Google). Reads the session role and sends the
// user to the right place instead of always dumping them in onboarding.
export default function AuthRedirectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") { router.push("/login"); return; }

    if (session?.user?.role === "CREATOR") router.replace("/creator");
    else if (session?.user?.role === "AGENCY") router.replace("/agency");
    else router.replace("/onboarding");
  }, [status, session, router]);

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
