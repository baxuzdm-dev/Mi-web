import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Redirects the logged-in user to their own public profile page.
export default async function MePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) redirect("/login");

  const role = session.user.role;

  if (role === "CREATOR") {
    const profile = await prisma.creatorProfile.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });
    if (profile) redirect(`/profile/creator/${profile.id}`);
    else redirect("/onboarding");
  }

  if (role === "AGENCY") {
    const profile = await prisma.agencyProfile.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });
    if (profile) redirect(`/profile/agency/${profile.id}`);
    else redirect("/onboarding");
  }

  redirect("/onboarding");
}
