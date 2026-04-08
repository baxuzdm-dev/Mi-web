import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const niche = searchParams.get("niche");
  const country = searchParams.get("country");
  const minFollowers = searchParams.get("minFollowers");
  const search = searchParams.get("search");
  const verified = searchParams.get("verified");

  const creators = await prisma.creatorProfile.findMany({
    where: {
      isAvailable: true,
      ...(niche && { niche: { has: niche } }),
      ...(country && { country }),
      ...(minFollowers && { followers: { gte: parseInt(minFollowers) } }),
      ...(verified === "true" && { isVerified: true }),
      ...(search && {
        OR: [
          { username: { contains: search, mode: "insensitive" } },
          { bio: { contains: search, mode: "insensitive" } },
        ],
      }),
    },
    include: {
      user: { select: { name: true, image: true } },
    },
    orderBy: { followers: "desc" },
  });

  return NextResponse.json(creators);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const profile = await prisma.creatorProfile.upsert({
    where: { userId: session.user.id },
    update: body,
    create: { ...body, userId: session.user.id },
  });

  return NextResponse.json(profile);
}
