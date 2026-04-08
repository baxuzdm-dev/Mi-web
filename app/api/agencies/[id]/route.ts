import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const profile = await prisma.agencyProfile.findUnique({
    where: { id: params.id },
    include: {
      user: { select: { name: true, image: true, email: true } },
    },
  });

  if (!profile) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(profile);
}
