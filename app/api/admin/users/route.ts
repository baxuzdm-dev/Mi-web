import { NextRequest, NextResponse } from "next/server";
import { getAllUsers, createUser, updateUser, deleteUser } from "@/lib/demoUsers";
import { readSettings } from "@/lib/adminData";

const COOKIE = "mc_admin_v1";

async function isAuth(req: NextRequest): Promise<boolean> {
  const cookie = req.cookies.get(COOKIE)?.value;
  if (!cookie) return false;
  const settings = await readSettings();
  return cookie === (settings.adminPassword ?? "admin2024");
}

function safe(u: { id: string; name: string; email: string; role: string }) {
  return { id: u.id, name: u.name, email: u.email, role: u.role };
}

export async function GET(req: NextRequest) {
  if (!(await isAuth(req))) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const users = await getAllUsers();
  return NextResponse.json(users.map(safe));
}

export async function POST(req: NextRequest) {
  if (!(await isAuth(req))) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const { name, email, password, role } = await req.json() as {
    name: string; email: string; password: string; role: "CREATOR" | "AGENCY" | "BRAND";
  };
  if (!name || !email || !password || !role)
    return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
  try {
    const user = await createUser({ name, email, password, role });
    return NextResponse.json(safe(user), { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  if (!(await isAuth(req))) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const { id, name, email, password, role } = await req.json() as {
    id: string; name?: string; email?: string; password?: string; role?: "CREATOR" | "AGENCY" | "BRAND";
  };
  if (!id) return NextResponse.json({ error: "Falta id" }, { status: 400 });
  try {
    const user = await updateUser(id, {
      name,
      email,
      password: password || undefined,  // empty string → don't change
      role,
    });
    if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    return NextResponse.json(safe(user));
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuth(req))) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const { id } = await req.json() as { id: string };
  const ok = await deleteUser(id);
  if (!ok) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
