import { NextRequest, NextResponse } from "next/server";
import { readSettings, writeSettings } from "@/lib/adminData";

const COOKIE_NAME = "mc_admin_v1";

// ─── Auth helper ─────────────────────────────────────────────────────────────

async function isAuth(req: NextRequest): Promise<boolean> {
  const cookie = req.cookies.get(COOKIE_NAME)?.value;
  if (!cookie) return false;
  const settings = await readSettings();
  const adminPass = settings.adminPassword ?? process.env.ADMIN_PASSWORD ?? "admin2024";
  return cookie === adminPass;
}

// ─── Handlers ────────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  if (!(await isAuth(req))) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const settings = await readSettings();
  // Never expose the admin password in GET responses
  const { adminPassword: _omit, ...publicSettings } = settings;
  void _omit;
  return NextResponse.json(publicSettings);
}

export async function PUT(req: NextRequest) {
  if (!(await isAuth(req))) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = (await req.json()) as Record<string, string>;

  // Merge with existing settings so partial updates don't wipe other fields
  const current = await readSettings();
  const merged: Record<string, string> = { ...current, ...body };

  await writeSettings(merged);

  // If the password changed, refresh the auth cookie so the session stays valid
  const res = NextResponse.json({ ok: true });
  if (body.adminPassword && body.adminPassword !== current.adminPassword) {
    res.cookies.set(COOKIE_NAME, body.adminPassword, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      sameSite: "lax",
    });
  }

  return res;
}
