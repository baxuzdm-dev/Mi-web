import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const country = searchParams.get("country");
  const search = searchParams.get("search");
  const verified = searchParams.get("verified");
  const maxCommission = searchParams.get("maxCommission");

  const agencies = await prisma.agencyProfile.findMany({
    where: {
      ...(country && { country }),
      ...(verified === "true" && { isVerified: true }),
      ...(maxCommission && { commission: { lte: parseFloat(maxCommission) } }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      }),
    },
    include: {
      user: { select: { name: true, image: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(agencies);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const profile = await prisma.agencyProfile.upsert({
    where: { userId: session.user.id },
    update: body,
    create: { ...body, userId: session.user.id },
  });

  return NextResponse.json(profile);
}
