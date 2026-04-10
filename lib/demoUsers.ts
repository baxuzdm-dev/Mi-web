/**
 * In-memory user store — replaces Prisma for demo/dev when no DB is available.
 * Users persist for the lifetime of the Node.js process.
 */
import bcrypt from "bcryptjs";

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "CREATOR" | "AGENCY" | "BRAND";
}

const store = new Map<string, DemoUser>();
let seeded = false;

async function seed() {
  const demos = [
    { id: "demo-creator", name: "Demo Creator", email: "creator@demo.com", password: "demo1234", role: "CREATOR" as const },
    { id: "demo-agency",  name: "Demo Agency",  email: "agency@demo.com",  password: "demo1234", role: "AGENCY"  as const },
    { id: "demo-brand",   name: "Demo Brand",   email: "brand@demo.com",   password: "demo1234", role: "BRAND"   as const },
  ];
  for (const d of demos) {
    store.set(d.email, { id: d.id, name: d.name, email: d.email, passwordHash: await bcrypt.hash(d.password, 10), role: d.role });
  }
}

async function ensureSeeded() {
  if (!seeded) { await seed(); seeded = true; }
}

export async function findByEmail(email: string): Promise<DemoUser | null> {
  await ensureSeeded();
  return store.get(email) ?? null;
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  role: "CREATOR" | "AGENCY" | "BRAND";
}): Promise<DemoUser> {
  await ensureSeeded();
  if (store.has(data.email)) throw new Error("Email already in use");
  const id = `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const user: DemoUser = {
    id,
    name: data.name,
    email: data.email,
    passwordHash: await bcrypt.hash(data.password, 10),
    role: data.role,
  };
  store.set(data.email, user);
  return user;
}
