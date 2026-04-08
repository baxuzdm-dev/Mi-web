import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { pusherServer } from "@/lib/pusher";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const conversationId = searchParams.get("conversationId");

  if (!conversationId) return NextResponse.json({ error: "conversationId required" }, { status: 400 });

  // Verify user is participant
  const conv = await prisma.conversation.findFirst({
    where: {
      id: conversationId,
      participants: { some: { id: session.user.id } },
    },
  });

  if (!conv) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const messages = await prisma.message.findMany({
    where: { conversationId },
    include: { sender: { select: { id: true, name: true, image: true } } },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(messages);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { conversationId, content } = await req.json();

  if (!conversationId || !content?.trim()) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  // Verify participant
  const conv = await prisma.conversation.findFirst({
    where: {
      id: conversationId,
      participants: { some: { id: session.user.id } },
    },
  });

  if (!conv) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const message = await prisma.message.create({
    data: { conversationId, senderId: session.user.id, content: content.trim() },
    include: { sender: { select: { id: true, name: true, image: true } } },
  });

  // Update conversation updatedAt
  await prisma.conversation.update({
    where: { id: conversationId },
    data: { updatedAt: new Date() },
  });

  // Trigger Pusher event
  await pusherServer.trigger(`conversation-${conversationId}`, "new-message", message);

  return NextResponse.json(message, { status: 201 });
}
