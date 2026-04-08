import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { status } = await req.json();

  if (!["ACCEPTED", "REJECTED"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const application = await prisma.application.findUnique({
    where: { id: params.id },
    include: { agency: true },
  });

  if (!application) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Only the agency owner can update
  if (application.agency.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const updated = await prisma.application.update({
    where: { id: params.id },
    data: { status },
  });

  // If accepted, create conversation and add both users as participants
  if (status === "ACCEPTED") {
    const creator = await prisma.creatorProfile.findUnique({
      where: { id: application.creatorId },
      select: { userId: true },
    });

    if (creator) {
      const existingConv = await prisma.conversation.findUnique({
        where: { applicationId: params.id },
      });

      if (!existingConv) {
        await prisma.conversation.create({
          data: {
            applicationId: params.id,
            participants: {
              connect: [{ id: creator.userId }, { id: session.user.id }],
            },
          },
        });
      }
    }
  }

  return NextResponse.json(updated);
}
