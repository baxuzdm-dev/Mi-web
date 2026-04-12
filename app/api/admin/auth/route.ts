import { NextRequest, NextResponse } from "next/server";
import { readSettings } from "@/lib/adminData";

const COOKIE_NAME = "mc_admin_v1";

export async function POST(req: NextRequest) {
  const { password } = (await req.json()) as { password: string };
  const settings = await readSettings();
  const adminPass = settings.adminPassword ?? process.env.ADMIN_PASSWORD ?? "admin2024";

  if (password !== adminPass) {
    return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, adminPass, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    sameSite: "lax",
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(COOKIE_NAME);
  return res;
}
