import { promises as fs } from "fs";
import path from "path";
import {
  mockCreators,
  mockAgencies,
  mockCampaigns,
  mockPosts,
  MockCreator,
  MockAgency,
  MockCampaign,
  MockPost,
} from "./mockData";

const DATA_DIR = path.join(process.cwd(), "data");

// ─── Entity helpers ───────────────────────────────────────────────────────────

type EntityMap = {
  creators: MockCreator[];
  agencies: MockAgency[];
  campaigns: MockCampaign[];
  posts: MockPost[];
};

type EntityName = keyof EntityMap;

const defaults: EntityMap = {
  creators: mockCreators,
  agencies: mockAgencies,
  campaigns: mockCampaigns,
  posts: mockPosts,
};

export async function readEntity<T extends EntityName>(entity: T): Promise<EntityMap[T]> {
  try {
    const file = path.join(DATA_DIR, `${entity}.json`);
    const content = await fs.readFile(file, "utf-8");
    return JSON.parse(content) as EntityMap[T];
  } catch {
    return defaults[entity];
  }
}

export async function writeEntity<T extends EntityName>(entity: T, data: EntityMap[T]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const file = path.join(DATA_DIR, `${entity}.json`);
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf-8");
}

// ─── Settings helpers ─────────────────────────────────────────────────────────

export const DEFAULT_SETTINGS: Record<string, string> = {
  siteName: "Mundo Creadores",
  siteDescription:
    "El marketplace premium que conecta creadores de contenido con las mejores agencias de talento.",
  heroTitle: "Conecta. Crea. Crece.",
  heroSubtitle:
    "La plataforma líder en LATAM para creadores de contenido y agencias de talento.",
  primaryColor: "violet",
  adminPassword: "admin2024",
};

export async function readSettings(): Promise<Record<string, string>> {
  try {
    const file = path.join(DATA_DIR, "settings.json");
    const content = await fs.readFile(file, "utf-8");
    return JSON.parse(content) as Record<string, string>;
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export async function writeSettings(settings: Record<string, string>): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const file = path.join(DATA_DIR, "settings.json");
  await fs.writeFile(file, JSON.stringify(settings, null, 2), "utf-8");
}
