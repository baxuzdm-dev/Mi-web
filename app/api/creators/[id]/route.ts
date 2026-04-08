import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const profile = await prisma.creatorProfile.findUnique({
    where: { id: params.id },
    include: {
      user: { select: { name: true, image: true, email: true } },
    },
  });

  if (!profile) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(profile);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Verify ownership
  const existing = await prisma.creatorProfile.findUnique({
    where: { id: params.id },
    select: { userId: true },
  });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (existing.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { username, bio, country, niche, estimatedIncome, isAvailable, avatar, socialLinks } = body;

  const updated = await prisma.creatorProfile.update({
    where: { id: params.id },
    data: {
      ...(username !== undefined && { username }),
      ...(bio !== undefined && { bio }),
      ...(country !== undefined && { country }),
      ...(niche !== undefined && { niche }),
      ...(estimatedIncome !== undefined && { estimatedIncome: Number(estimatedIncome) }),
      ...(isAvailable !== undefined && { isAvailable }),
      ...(avatar !== undefined && { avatar }),
      ...(socialLinks !== undefined && { socialLinks }),
    },
    include: { user: { select: { name: true, image: true, email: true } } },
  });

  return NextResponse.json(updated);
}
