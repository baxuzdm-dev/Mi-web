import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// POST /api/creators/[id]/verify — submit verification request
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existing = await prisma.creatorProfile.findUnique({
    where: { id: params.id },
    select: { userId: true, verificationStatus: true, isVerified: true },
  });

  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (existing.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (existing.isVerified) {
    return NextResponse.json({ error: "Already verified" }, { status: 400 });
  }
  if (existing.verificationStatus === "PENDING") {
    return NextResponse.json({ error: "Verification already pending" }, { status: 400 });
  }

  const { docData } = await req.json();
  if (!docData) {
    return NextResponse.json({ error: "Document is required" }, { status: 400 });
  }

  const updated = await prisma.creatorProfile.update({
    where: { id: params.id },
    data: {
      verificationStatus: "PENDING",
      verificationDoc: docData,
    },
    select: { verificationStatus: true, isVerified: true },
  });

  return NextResponse.json(updated);
}
