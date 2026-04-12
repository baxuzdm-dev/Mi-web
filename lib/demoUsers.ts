/**
 * Demo user store — persists to data/users.json so admin edits survive restarts.
 * Falls back to in-memory seed if the file doesn't exist yet.
 */
import bcrypt from "bcryptjs";
import { promises as fs } from "fs";
import path from "path";

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "CREATOR" | "AGENCY" | "BRAND";
}

const DATA_FILE = path.join(process.cwd(), "data", "users.json");

// In-process cache (reset on cold start, but JSON is the source of truth)
let cache: Map<string, DemoUser> | null = null;

const SEED = [
  { id: "demo-creator", name: "Demo Creator", email: "creator@demo.com", password: "demo1234", role: "CREATOR" as const },
  { id: "demo-agency",  name: "Demo Agency",  email: "agency@demo.com",  password: "demo1234", role: "AGENCY"  as const },
  { id: "demo-brand",   name: "Demo Brand",   email: "brand@demo.com",   password: "demo1234", role: "BRAND"   as const },
];

async function persist(store: Map<string, DemoUser>): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(Array.from(store.values()), null, 2), "utf-8");
}

async function getStore(): Promise<Map<string, DemoUser>> {
  if (cache) return cache;

  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const users: DemoUser[] = JSON.parse(raw);
    cache = new Map(users.map((u) => [u.email, u]));
  } catch {
    // First run: seed defaults and save
    const m = new Map<string, DemoUser>();
    for (const s of SEED) {
      m.set(s.email, {
        id: s.id,
        name: s.name,
        email: s.email,
        passwordHash: await bcrypt.hash(s.password, 10),
        role: s.role,
      });
    }
    cache = m;
    await persist(m);
  }

  return cache;
}

/* ── Public API ───────────────────────────────────────────────── */

export async function findByEmail(email: string): Promise<DemoUser | null> {
  const store = await getStore();
  return store.get(email) ?? null;
}

export async function getAllUsers(): Promise<DemoUser[]> {
  const store = await getStore();
  return Array.from(store.values());
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  role: "CREATOR" | "AGENCY" | "BRAND";
}): Promise<DemoUser> {
  const store = await getStore();
  if (store.has(data.email)) throw new Error("Email ya en uso");
  const user: DemoUser = {
    id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: data.name,
    email: data.email,
    passwordHash: await bcrypt.hash(data.password, 10),
    role: data.role,
  };
  store.set(user.email, user);
  await persist(store);
  return user;
}

export async function updateUser(
  id: string,
  updates: { name?: string; email?: string; password?: string; role?: "CREATOR" | "AGENCY" | "BRAND" }
): Promise<DemoUser | null> {
  const store = await getStore();

  // Find by id
  let oldEmail: string | undefined;
  let user: DemoUser | undefined;
  Array.from(store.entries()).forEach(([e, u]) => {
    if (u.id === id) { oldEmail = e; user = u; }
  });
  if (!user || !oldEmail) return null;

  const updated: DemoUser = { ...user };
  if (updates.name)     updated.name = updates.name;
  if (updates.role)     updated.role = updates.role;
  if (updates.password) updated.passwordHash = await bcrypt.hash(updates.password, 10);

  if (updates.email && updates.email !== oldEmail) {
    if (store.has(updates.email)) throw new Error("Email ya en uso");
    store.delete(oldEmail);
    updated.email = updates.email;
  }

  store.set(updated.email, updated);
  await persist(store);
  return updated;
}

export async function deleteUser(id: string): Promise<boolean> {
  const store = await getStore();
  const entry = Array.from(store.entries()).find(([, u]) => u.id === id);
  if (!entry) return false;
  store.delete(entry[0]);
  await persist(store);
  return true;
}
