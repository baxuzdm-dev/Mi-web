import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const role = searchParams.get("role");

  let applications;

  if (role === "CREATOR") {
    const creator = await prisma.creatorProfile.findUnique({
      where: { userId: session.user.id },
    });
    if (!creator) return NextResponse.json([]);

    applications = await prisma.application.findMany({
      where: { creatorId: creator.id },
      include: {
        agency: {
          include: { user: { select: { name: true } } },
        },
        conversation: { select: { id: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  } else {
    const agency = await prisma.agencyProfile.findUnique({
      where: { userId: session.user.id },
    });
    if (!agency) return NextResponse.json([]);

    applications = await prisma.application.findMany({
      where: { agencyId: agency.id },
      include: {
        creator: {
          include: { user: { select: { name: true, image: true } } },
        },
        conversation: { select: { id: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  return NextResponse.json(applications);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { agencyId, message } = await req.json();

  const creator = await prisma.creatorProfile.findUnique({
    where: { userId: session.user.id },
  });

  if (!creator) return NextResponse.json({ error: "Creator profile not found" }, { status: 404 });

  const existing = await prisma.application.findUnique({
    where: { creatorId_agencyId: { creatorId: creator.id, agencyId } },
  });

  if (existing) return NextResponse.json({ error: "Already applied" }, { status: 409 });

  const application = await prisma.application.create({
    data: { creatorId: creator.id, agencyId, message },
  });

  return NextResponse.json(application, { status: 201 });
}
