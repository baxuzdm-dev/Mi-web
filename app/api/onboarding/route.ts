import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { role, ...profileData } = body;

  // Update user role
  await prisma.user.update({
    where: { id: session.user.id },
    data: { role },
  });

  if (role === "CREATOR") {
    await prisma.creatorProfile.upsert({
      where: { userId: session.user.id },
      update: profileData,
      create: { userId: session.user.id, ...profileData },
    });
  } else if (role === "AGENCY") {
    await prisma.agencyProfile.upsert({
      where: { userId: session.user.id },
      update: profileData,
      create: { userId: session.user.id, ...profileData },
    });
  }

  return NextResponse.json({ success: true });
}
