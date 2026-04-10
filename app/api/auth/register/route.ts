import { NextResponse } from "next/server";
import { z } from "zod";
import { createUser } from "@/lib/demoUsers";

const schema = z.object({
  name:     z.string().min(2),
  email:    z.string().email(),
  password: z.string().min(8),
  role:     z.enum(["CREATOR", "AGENCY", "BRAND"]),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, role } = schema.parse(body);

    const user = await createUser({ name, email, password, role });
    return NextResponse.json({ id: user.id, email: user.email, role: user.role }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0]?.message ?? "Datos inválidos" }, { status: 422 });
    }
    if (err instanceof Error && err.message === "Email already in use") {
      return NextResponse.json({ error: "Este correo ya está registrado" }, { status: 400 });
    }
    console.error("[register]", err);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
