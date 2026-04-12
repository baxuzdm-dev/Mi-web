import { NextRequest, NextResponse } from "next/server";
import { readEntity, writeEntity, readSettings } from "@/lib/adminData";

const COOKIE_NAME = "mc_admin_v1";

// ─── Auth helper ─────────────────────────────────────────────────────────────

async function isAuth(req: NextRequest): Promise<boolean> {
  const cookie = req.cookies.get(COOKIE_NAME)?.value;
  if (!cookie) return false;
  const settings = await readSettings();
  const adminPass = settings.adminPassword ?? process.env.ADMIN_PASSWORD ?? "admin2024";
  return cookie === adminPass;
}

// ─── Entity validation ───────────────────────────────────────────────────────

type ValidEntity = "creators" | "agencies" | "campaigns" | "posts";
const VALID_ENTITIES: ValidEntity[] = ["creators", "agencies", "campaigns", "posts"];

function isValidEntity(entity: string): entity is ValidEntity {
  return VALID_ENTITIES.includes(entity as ValidEntity);
}

// ─── Route context (Next.js 14 — params are synchronous) ─────────────────────

type RouteContext = { params: { entity: string } };

// ─── Handlers ────────────────────────────────────────────────────────────────

export async function GET(req: NextRequest, { params }: RouteContext) {
  if (!(await isAuth(req))) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  if (!isValidEntity(params.entity)) {
    return NextResponse.json({ error: "Entidad inválida" }, { status: 400 });
  }

  const data = await readEntity(params.entity);
  return NextResponse.json(data);
}

export async function POST(req: NextRequest, { params }: RouteContext) {
  if (!(await isAuth(req))) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  if (!isValidEntity(params.entity)) {
    return NextResponse.json({ error: "Entidad inválida" }, { status: 400 });
  }

  const item = (await req.json()) as Record<string, unknown>;
  const data = await readEntity(params.entity);

  const newItem = {
    ...item,
    id: item.id ?? `${params.entity.slice(0, 3)}-${Date.now()}`,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await writeEntity(params.entity, [...data, newItem] as any);
  return NextResponse.json(newItem, { status: 201 });
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
  if (!(await isAuth(req))) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  if (!isValidEntity(params.entity)) {
    return NextResponse.json({ error: "Entidad inválida" }, { status: 400 });
  }

  const item = (await req.json()) as Record<string, unknown>;
  const data = await readEntity(params.entity);

  const updated = (data as unknown as Record<string, unknown>[]).map((d) =>
    d.id === item.id ? { ...d, ...item } : d
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await writeEntity(params.entity, updated as unknown as any);
  return NextResponse.json(item);
}

export async function DELETE(req: NextRequest, { params }: RouteContext) {
  if (!(await isAuth(req))) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  if (!isValidEntity(params.entity)) {
    return NextResponse.json({ error: "Entidad inválida" }, { status: 400 });
  }

  const { id } = (await req.json()) as { id: string };
  const data = await readEntity(params.entity);

  const filtered = (data as unknown as Record<string, unknown>[]).filter((d) => d.id !== id);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await writeEntity(params.entity, filtered as unknown as any);
  return NextResponse.json({ ok: true });
}
