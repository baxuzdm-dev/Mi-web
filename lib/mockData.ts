// ─── Types ───────────────────────────────────────────────────────────────────

export interface MockBrand {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  description: string;
  website?: string;
  country: string;
  monthlyBudget: string;
  activeCampaigns: number;
  totalCollabs: number;
  isVerified: boolean;
  user: { name: string; image?: string };
}

export interface MockCampaign {
  id: string;
  brandId: string;
  brandName: string;
  title: string;
  description: string;
  product: string;
  platforms: string[];
  minFollowers: number;
  budgetPerCreator: number;
  totalBudget: number;
  deadline: string;
  creatorsNeeded: number;
  creatorsApplied: number;
  niches: string[];
  deliverables: string[];
  isHot: boolean;
  status: "active" | "closed" | "draft";
}

export interface MockPost {
  id: string;
  authorId: string;
  authorName: string;
  authorUsername: string;
  authorRole: "CREATOR" | "AGENCY" | "BRAND";
  authorIsVerified: boolean;
  content: string;
  image?: string;
  type: "post" | "campaign" | "achievement" | "collab";
  likes: number;
  comments: number;
  shares: number;
  createdAt: string;
  campaign?: {
    title: string;
    budget: number;
    deadline: string;
    platforms: string[];
  };
}

export interface MockService {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorUsername: string;
  creatorAvatar?: string;
  creatorFollowers: number;
  creatorIsVerified: boolean;
  platform: string;
  title: string;
  description: string;
  price: number;
  deliveryDays: number;
  revisions: number;
  deliverables: string[];
  rating: number;
  totalOrders: number;
  category: string;
}

export interface MockNotification {
  id: string;
  type: "message" | "proposal" | "profile_visit" | "review" | "campaign" | "accepted" | "follower" | "system";
  title: string;
  body: string;
  fromName?: string;
  isRead: boolean;
  createdAt: string;
  link?: string;
}

export interface AnalyticsData {
  profileVisits: number[];
  searchAppearances: number[];
  revenueByMonth: number[];
  revenueByService: { name: string; value: number; color: string }[];
  funnel: { stage: string; count: number }[];
  topCountries: { country: string; percentage: number }[];
  dates: string[];
  months: string[];
}

export interface MockCreator {
  id: string;
  username: string;
  avatar?: string;
  bio: string;
  country: string;
  niche: string[];
  followers: number;
  estimatedIncome: number;
  isVerified: boolean;
  isAvailable: boolean;
  platforms: string[];
  user: { name: string; image?: string };
}

export interface MockAgency {
  id: string;
  name: string;
  logo?: string;
  description: string;
  services: string[];
  commission: number;
  website?: string;
  country: string;
  isVerified: boolean;
  rosterSize: number;
  rating: number;
  user: { name: string; image?: string };
}

export interface MockMessage {
  id: string;
  content: string;
  senderId: string;
  createdAt: string;
}

export interface MockConversation {
  id: string;
  creatorName: string;
  agencyName: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  messages: MockMessage[];
}

// ─── Creators ────────────────────────────────────────────────────────────────

export const mockCreators: MockCreator[] = [
  {
    id: "creator-001",
    username: "sofiaramirez",
    bio: "Creadora de contenido lifestyle y viajes. Comparto mi vida entre México y el mundo 🌎✈️",
    country: "México",
    niche: ["Lifestyle", "Travel"],
    followers: 850000,
    estimatedIncome: 12000,
    isVerified: true,
    isAvailable: true,
    platforms: ["Instagram", "TikTok"],
    user: { name: "Sofia Ramírez" },
  },
  {
    id: "creator-002",
    username: "diegotorres_gamer",
    bio: "Gamer profesional. Streams diarios de Valorant, Free Fire y más. Top streamer de Colombia 🎮",
    country: "Colombia",
    niche: ["Gaming"],
    followers: 1200000,
    estimatedIncome: 18500,
    isVerified: true,
    isAvailable: false,
    platforms: ["TikTok", "YouTube"],
    user: { name: "Diego Torres" },
  },
  {
    id: "creator-003",
    username: "valentina.cruz",
    bio: "Beauty & skincare addict 💄 Tutoriales de maquillaje y reseñas de productos. Desde Argentina con amor.",
    country: "Argentina",
    niche: ["Beauty", "Lifestyle"],
    followers: 620000,
    estimatedIncome: 8200,
    isVerified: true,
    isAvailable: true,
    platforms: ["Instagram", "YouTube"],
    user: { name: "Valentina Cruz" },
  },
  {
    id: "creator-004",
    username: "mateo_fit",
    bio: "Entrenador certificado | Fitness & nutrición para latinos 💪 Planes de entrenamiento personalizados.",
    country: "España",
    niche: ["Fitness"],
    followers: 430000,
    estimatedIncome: 6800,
    isVerified: false,
    isAvailable: true,
    platforms: ["Instagram", "TikTok"],
    user: { name: "Mateo García" },
  },
  {
    id: "creator-005",
    username: "isabellamoreno",
    bio: "Exclusive content creator. Premium lifestyle 🌹 Colaboraciones y publicidad: DM.",
    country: "Venezuela",
    niche: ["OnlyFans", "Lifestyle"],
    followers: 280000,
    estimatedIncome: 22000,
    isVerified: true,
    isAvailable: true,
    platforms: ["Instagram", "OnlyFans"],
    user: { name: "Isabella Moreno" },
  },
  {
    id: "creator-006",
    username: "sebas.tech",
    bio: "Reviews de tecnología en español 🖥️ Gadgets, smartphones, IA y todo lo tech. Desde Chile.",
    country: "Chile",
    niche: ["Tech"],
    followers: 540000,
    estimatedIncome: 7500,
    isVerified: true,
    isAvailable: false,
    platforms: ["YouTube", "TikTok"],
    user: { name: "Sebastián López" },
  },
  {
    id: "creator-007",
    username: "camilacooks",
    bio: "Cocinera apasionada 👩‍🍳 Recetas colombianas con un toque moderno. ¡La comida es amor!",
    country: "Colombia",
    niche: ["Food"],
    followers: 390000,
    estimatedIncome: 5200,
    isVerified: false,
    isAvailable: true,
    platforms: ["Instagram", "TikTok", "YouTube"],
    user: { name: "Camila Rodríguez" },
  },
  {
    id: "creator-008",
    username: "andres.martinez.mx",
    bio: "Músico y productor 🎵 Comparto mi proceso creativo, covers y canciones originales. CDMX.",
    country: "México",
    niche: ["Music"],
    followers: 175000,
    estimatedIncome: 3800,
    isVerified: false,
    isAvailable: true,
    platforms: ["TikTok", "Instagram", "YouTube"],
    user: { name: "Andrés Martínez" },
  },
  {
    id: "creator-009",
    username: "dani.flores.fashion",
    bio: "Fashion blogger & stylist 👗 Tendencias, outfits y consejos de moda para chicas latinas. Perú 🇵🇪",
    country: "Perú",
    niche: ["Fashion", "Lifestyle"],
    followers: 710000,
    estimatedIncome: 9400,
    isVerified: true,
    isAvailable: true,
    platforms: ["Instagram", "TikTok"],
    user: { name: "Daniela Flores" },
  },
  {
    id: "creator-010",
    username: "lucas.h.vlog",
    bio: "Vlogs de viaje por toda Latinoamérica 🌎 Mochilero, aventurero y amante de la cultura local.",
    country: "Uruguay",
    niche: ["Travel", "Lifestyle"],
    followers: 92000,
    estimatedIncome: 2100,
    isVerified: false,
    isAvailable: true,
    platforms: ["YouTube", "Instagram"],
    user: { name: "Lucas Hernández" },
  },
  {
    id: "creator-011",
    username: "mariana.sanchez.art",
    bio: "Artista digital & ilustradora 🎨 Proceso creativo, tutoriales de arte y comisiones abiertas. Barcelona.",
    country: "España",
    niche: ["Art"],
    followers: 310000,
    estimatedIncome: 4600,
    isVerified: true,
    isAvailable: false,
    platforms: ["Instagram", "TikTok"],
    user: { name: "Mariana Sánchez" },
  },
  {
    id: "creator-012",
    username: "nico.vargas.gaming",
    bio: "Pro player y content creator 🎮 FIFA, LoL y gaming casual. El streamer número 1 de Ecuador.",
    country: "Ecuador",
    niche: ["Gaming"],
    followers: 480000,
    estimatedIncome: 7200,
    isVerified: true,
    isAvailable: true,
    platforms: ["TikTok", "YouTube"],
    user: { name: "Nicolás Vargas" },
  },
  {
    id: "creator-013",
    username: "fer.jimenez.fit",
    bio: "Fitness coach & modelo 🏋️‍♀️ Entrenamiento, nutrición y contenido exclusivo. Venezuela bella.",
    country: "Venezuela",
    niche: ["Fitness", "OnlyFans"],
    followers: 560000,
    estimatedIncome: 15000,
    isVerified: true,
    isAvailable: true,
    platforms: ["Instagram", "OnlyFans", "TikTok"],
    user: { name: "Fernanda Jiménez" },
  },
  {
    id: "creator-014",
    username: "carlos.reyes.chef",
    bio: "Chef profesional 👨‍🍳 Recetas gourmet accesibles para todos. Gastronomía mexicana y fusión.",
    country: "México",
    niche: ["Food"],
    followers: 1900000,
    estimatedIncome: 28000,
    isVerified: true,
    isAvailable: false,
    platforms: ["YouTube", "Instagram", "TikTok"],
    user: { name: "Carlos Reyes" },
  },
  {
    id: "creator-015",
    username: "ximena.g.lifestyle",
    bio: "Mamá, emprendedora y creadora ✨ Lifestyle, maternidad y negocios desde Bogotá. Colombia te amo.",
    country: "Colombia",
    niche: ["Lifestyle", "Fashion"],
    followers: 67000,
    estimatedIncome: 1800,
    isVerified: false,
    isAvailable: true,
    platforms: ["Instagram", "TikTok"],
    user: { name: "Ximena Guerrero" },
  },
];

// ─── Agencies ─────────────────────────────────────────────────────────────────

export const mockAgencies: MockAgency[] = [
  {
    id: "agency-001",
    name: "Stellar Talent Group",
    description: "Agencia premium de gestión de talentos digitales con presencia en toda Latinoamérica. Especializados en creadores de alto impacto.",
    services: ["Gestión de marca", "Negociación de contratos", "Estrategia de contenido", "Relaciones públicas"],
    commission: 20,
    website: "https://stellartalent.com",
    country: "México",
    isVerified: true,
    rosterSize: 45,
    rating: 4.8,
    user: { name: "Stellar Talent Group" },
  },
  {
    id: "agency-002",
    name: "Nexus Creator Agency",
    description: "Conectamos a los mejores creadores de contenido con marcas globales. Especialistas en TikTok e Instagram.",
    services: ["Campañas de influencer marketing", "Producción de contenido", "Analytics y reportes", "Brand deals"],
    commission: 15,
    website: "https://nexuscreators.co",
    country: "Colombia",
    isVerified: true,
    rosterSize: 78,
    rating: 4.6,
    user: { name: "Nexus Creator Agency" },
  },
  {
    id: "agency-003",
    name: "Latam Creators Hub",
    description: "El hub de creadores más grande de LATAM. Apoyamos talentos emergentes y consolidados en su crecimiento digital.",
    services: ["Mentoría creativa", "Monetización", "Expansión de plataformas", "Networking exclusivo"],
    commission: 18,
    website: "https://latamcreatorshub.com",
    country: "Argentina",
    isVerified: true,
    rosterSize: 120,
    rating: 4.5,
    user: { name: "Latam Creators Hub" },
  },
  {
    id: "agency-004",
    name: "VidPro Management",
    description: "Agencia especializada en creadores de video para YouTube y TikTok. Maximizamos ingresos y audiencias.",
    services: ["Optimización de canal", "SEO para YouTube", "Gestión de AdSense", "Patrocinios"],
    commission: 22,
    website: "https://vidpro.es",
    country: "España",
    isVerified: false,
    rosterSize: 32,
    rating: 4.2,
    user: { name: "VidPro Management" },
  },
  {
    id: "agency-005",
    name: "ContentFirst Agency",
    description: "Priorizamos la calidad del contenido. Trabajamos con creadores que quieren construir audiencias fieles y genuinas.",
    services: ["Estrategia editorial", "Dirección creativa", "Fotografía y video profesional", "Community management"],
    commission: 17,
    website: "https://contentfirst.cl",
    country: "Chile",
    isVerified: true,
    rosterSize: 25,
    rating: 4.9,
    user: { name: "ContentFirst Agency" },
  },
  {
    id: "agency-006",
    name: "Pinnacle Talent",
    description: "Llevamos tu carrera como creador al siguiente nivel con estrategias personalizadas y conexiones con las mejores marcas.",
    services: ["Gestión integral", "Lanzamiento de productos", "Colaboraciones internacionales", "PR digital"],
    commission: 25,
    website: "https://pinnacletalent.pe",
    country: "Perú",
    isVerified: true,
    rosterSize: 18,
    rating: 4.7,
    user: { name: "Pinnacle Talent" },
  },
  {
    id: "agency-007",
    name: "CreatorX",
    description: "La agencia disruptiva para la nueva generación de creadores. Tecnología + creatividad para escalar tu presencia digital.",
    services: ["Growth hacking", "Monetización alternativa", "NFTs y web3", "Consultoría de contenido"],
    commission: 12,
    website: "https://creatorx.com.mx",
    country: "México",
    isVerified: false,
    rosterSize: 55,
    rating: 4.3,
    user: { name: "CreatorX" },
  },
  {
    id: "agency-008",
    name: "MediaForge Agency",
    description: "Forjamos medios y carreras. Agencia boutique con enfoque personalizado para creadores de contenido premium.",
    services: ["Producción audiovisual", "Distribución multiplataforma", "Acuerdos de licencias", "Formación de marca personal"],
    commission: 20,
    website: "https://mediaforge.com.co",
    country: "Colombia",
    isVerified: true,
    rosterSize: 14,
    rating: 4.4,
    user: { name: "MediaForge Agency" },
  },
];

// ─── Conversations ─────────────────────────────────────────────────────────────

export const mockConversations: MockConversation[] = [
  {
    id: "conv-001",
    creatorName: "Sofia Ramírez",
    agencyName: "Stellar Talent Group",
    lastMessage: "Perfecto, quedamos para la llamada el martes a las 3pm.",
    lastMessageAt: "2026-04-08T18:30:00Z",
    unreadCount: 2,
    messages: [
      {
        id: "msg-001-1",
        content: "Hola Sofia, somos de Stellar Talent Group. Llevamos meses siguiendo tu trabajo y creemos que encajas perfectamente con nuestra agencia.",
        senderId: "agency-001",
        createdAt: "2026-04-07T10:00:00Z",
      },
      {
        id: "msg-001-2",
        content: "¡Hola! Gracias por escribirme. He escuchado muy buenas referencias de Stellar. ¿Qué tipo de colaboración tienen en mente?",
        senderId: "creator-001",
        createdAt: "2026-04-07T10:45:00Z",
      },
      {
        id: "msg-001-3",
        content: "Queremos representarte de forma integral. Tenemos marcas de viaje y lifestyle que encajan perfectamente con tu audiencia. Podríamos hablar de una comisión del 18%.",
        senderId: "agency-001",
        createdAt: "2026-04-07T11:00:00Z",
      },
      {
        id: "msg-001-4",
        content: "Suena interesante. ¿Podemos agendar una llamada para conocernos mejor?",
        senderId: "creator-001",
        createdAt: "2026-04-08T09:00:00Z",
      },
      {
        id: "msg-001-5",
        content: "Perfecto, quedamos para la llamada el martes a las 3pm.",
        senderId: "agency-001",
        createdAt: "2026-04-08T18:30:00Z",
      },
    ],
  },
  {
    id: "conv-002",
    creatorName: "Diego Torres",
    agencyName: "Nexus Creator Agency",
    lastMessage: "Tenemos una marca de periféricos gaming que quiere trabajar contigo.",
    lastMessageAt: "2026-04-08T14:00:00Z",
    unreadCount: 1,
    messages: [
      {
        id: "msg-002-1",
        content: "Diego, somos Nexus Creator Agency. Representamos a los mejores gamers de LATAM. ¿Estarías interesado en conocer nuestros servicios?",
        senderId: "agency-002",
        createdAt: "2026-04-06T16:00:00Z",
      },
      {
        id: "msg-002-2",
        content: "Cuéntenme más. ¿Qué marcas manejan en gaming?",
        senderId: "creator-002",
        createdAt: "2026-04-06T17:30:00Z",
      },
      {
        id: "msg-002-3",
        content: "Tenemos una marca de periféricos gaming que quiere trabajar contigo.",
        senderId: "agency-002",
        createdAt: "2026-04-08T14:00:00Z",
      },
    ],
  },
  {
    id: "conv-003",
    creatorName: "Valentina Cruz",
    agencyName: "ContentFirst Agency",
    lastMessage: "Nos encantó tu contenido de skincare. ¡Somos el equipo perfecto para ti!",
    lastMessageAt: "2026-04-09T08:15:00Z",
    unreadCount: 0,
    messages: [
      {
        id: "msg-003-1",
        content: "Valentina, hemos revisado tu perfil y tus métricas de engagement son impresionantes para el sector beauty.",
        senderId: "agency-005",
        createdAt: "2026-04-05T12:00:00Z",
      },
      {
        id: "msg-003-2",
        content: "Gracias! Siempre trato de ser auténtica con mi audiencia.",
        senderId: "creator-003",
        createdAt: "2026-04-05T13:30:00Z",
      },
      {
        id: "msg-003-3",
        content: "Nos encantó tu contenido de skincare. ¡Somos el equipo perfecto para ti!",
        senderId: "agency-005",
        createdAt: "2026-04-09T08:15:00Z",
      },
    ],
  },
  {
    id: "conv-004",
    creatorName: "Carlos Reyes",
    agencyName: "Latam Creators Hub",
    lastMessage: "El contrato ya está listo para revisión. ¡Bienvenido al Hub!",
    lastMessageAt: "2026-04-07T20:00:00Z",
    unreadCount: 0,
    messages: [
      {
        id: "msg-004-1",
        content: "Carlos, eres el chef con más crecimiento en YouTube LATAM este año. Queremos ser tu equipo.",
        senderId: "agency-003",
        createdAt: "2026-04-01T09:00:00Z",
      },
      {
        id: "msg-004-2",
        content: "¿Qué porcentaje de comisión manejan?",
        senderId: "creator-014",
        createdAt: "2026-04-01T10:00:00Z",
      },
      {
        id: "msg-004-3",
        content: "Para tu nivel de audiencia, podemos ofrecerte un 15% con un mínimo garantizado mensual.",
        senderId: "agency-003",
        createdAt: "2026-04-02T11:00:00Z",
      },
      {
        id: "msg-004-4",
        content: "Me interesa. Quiero conocer más detalles del contrato.",
        senderId: "creator-014",
        createdAt: "2026-04-05T09:00:00Z",
      },
      {
        id: "msg-004-5",
        content: "El contrato ya está listo para revisión. ¡Bienvenido al Hub!",
        senderId: "agency-003",
        createdAt: "2026-04-07T20:00:00Z",
      },
    ],
  },
  {
    id: "conv-005",
    creatorName: "Fernanda Jiménez",
    agencyName: "Pinnacle Talent",
    lastMessage: "Podemos ayudarte a expandir tu presencia más allá de OnlyFans.",
    lastMessageAt: "2026-04-09T10:00:00Z",
    unreadCount: 3,
    messages: [
      {
        id: "msg-005-1",
        content: "Fernanda, en Pinnacle Talent tenemos experiencia en gestionar talentos de fitness y contenido premium.",
        senderId: "agency-006",
        createdAt: "2026-04-08T15:00:00Z",
      },
      {
        id: "msg-005-2",
        content: "¿Cómo manejan la privacidad y seguridad de sus creadores?",
        senderId: "creator-013",
        createdAt: "2026-04-08T16:00:00Z",
      },
      {
        id: "msg-005-3",
        content: "Podemos ayudarte a expandir tu presencia más allá de OnlyFans.",
        senderId: "agency-006",
        createdAt: "2026-04-09T10:00:00Z",
      },
    ],
  },
];

// ─── Helper Functions ──────────────────────────────────────────────────────────

export function filterCreators(
  creators: MockCreator[],
  filters: {
    search?: string;
    niche?: string;
    country?: string;
    minFollowers?: number;
    verifiedOnly?: boolean;
  }
): MockCreator[] {
  return creators.filter((creator) => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const matchesSearch =
        creator.username.toLowerCase().includes(q) ||
        creator.user.name.toLowerCase().includes(q) ||
        creator.bio.toLowerCase().includes(q);
      if (!matchesSearch) return false;
    }

    if (filters.niche) {
      const matchesNiche = creator.niche.some(
        (n) => n.toLowerCase() === filters.niche!.toLowerCase()
      );
      if (!matchesNiche) return false;
    }

    if (filters.country) {
      if (creator.country.toLowerCase() !== filters.country.toLowerCase()) return false;
    }

    if (filters.minFollowers !== undefined && filters.minFollowers > 0) {
      if (creator.followers < filters.minFollowers) return false;
    }

    if (filters.verifiedOnly) {
      if (!creator.isVerified) return false;
    }

    return true;
  });
}

export function filterAgencies(
  agencies: MockAgency[],
  filters: {
    search?: string;
    country?: string;
    maxCommission?: number;
    verifiedOnly?: boolean;
  }
): MockAgency[] {
  return agencies.filter((agency) => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const matchesSearch =
        agency.name.toLowerCase().includes(q) ||
        agency.description.toLowerCase().includes(q) ||
        agency.services.some((s) => s.toLowerCase().includes(q));
      if (!matchesSearch) return false;
    }

    if (filters.country) {
      if (agency.country.toLowerCase() !== filters.country.toLowerCase()) return false;
    }

    if (filters.maxCommission !== undefined && filters.maxCommission > 0) {
      if (agency.commission > filters.maxCommission) return false;
    }

    if (filters.verifiedOnly) {
      if (!agency.isVerified) return false;
    }

    return true;
  });
}

// ─── New Types ────────────────────────────────────────────────────────────────

export interface MockBrand {
  id: string;
  username: string;
  name: string;
  industry: string;
  description: string;
  country: string;
  monthlyBudget: string;
  platforms: string[];
  isVerified: boolean;
  activeCampaigns: number;
  totalCampaigns: number;
}

export interface MockCampaign {
  id: string;
  brandId: string;
  brandName: string;
  title: string;
  description: string;
  platforms: string[];
  minFollowers: number;
  budgetPerCreator: number;
  totalBudget: number;
  deadline: string;
  creatorsNeeded: number;
  creatorsApplied: number;
  niches: string[];
  status: "active" | "closed" | "draft";
  isHot: boolean;
}

export interface MockPost {
  id: string;
  authorId: string;
  authorName: string;
  authorUsername: string;
  authorRole: "CREATOR" | "AGENCY" | "BRAND";
  authorVerified: boolean;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  createdAt: string;
  type: "post" | "campaign" | "achievement" | "collab";
  campaignRef?: string;
}

export interface MockService {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorUsername: string;
  creatorVerified: boolean;
  creatorFollowers: number;
  platform: string;
  title: string;
  description: string;
  price: number;
  deliveryDays: number;
  revisions: number;
  rating: number;
  totalOrders: number;
  niche: string[];
}

export interface MockNotification {
  id: string;
  type: "message" | "proposal" | "visit" | "review" | "campaign" | "accepted" | "follow";
  title: string;
  body: string;
  fromName: string;
  fromUsername?: string;
  read: boolean;
  createdAt: string;
}

export interface AnalyticsData {
  profileViews: number[];
  searchAppearances: number[];
  messages: number[];
  deals: number[];
  revenueByService: { name: string; value: number }[];
  topCountries: { country: string; visits: number }[];
  weekLabels: string[];
  monthLabels: string[];
}

// ─── Brands ───────────────────────────────────────────────────────────────────

export const mockBrands: MockBrand[] = [
  { id: "brand-001", username: "adidas_mx", name: "Adidas México", industry: "Deportes y Fitness", description: "Marca global de ropa deportiva. Buscamos creadores de fitness, lifestyle y cultura urbana en LATAM.", country: "México", monthlyBudget: "15000-50000", platforms: ["Instagram", "TikTok", "YouTube"], isVerified: true, activeCampaigns: 3, totalCampaigns: 28 },
  { id: "brand-002", username: "loreal_colombia", name: "L'Oréal Colombia", industry: "Moda y Belleza", description: "Líder mundial en belleza. Colaboramos con creadoras de beauty, skincare y lifestyle.", country: "Colombia", monthlyBudget: "5000-15000", platforms: ["Instagram", "TikTok", "YouTube"], isVerified: true, activeCampaigns: 2, totalCampaigns: 45 },
  { id: "brand-003", username: "samsung_latam", name: "Samsung LATAM", industry: "Tecnología", description: "Tecnología de vanguardia para toda LATAM. Buscamos tech creators y lifestyle creators.", country: "Argentina", monthlyBudget: "50000+", platforms: ["YouTube", "TikTok", "Instagram"], isVerified: true, activeCampaigns: 5, totalCampaigns: 62 },
  { id: "brand-004", username: "spotify_es", name: "Spotify España", industry: "Entretenimiento", description: "La plataforma de música y podcasts más grande del mundo.", country: "España", monthlyBudget: "15000-50000", platforms: ["Instagram", "TikTok"], isVerified: true, activeCampaigns: 2, totalCampaigns: 33 },
  { id: "brand-005", username: "redbull_mx", name: "Red Bull México", industry: "Alimentación y Bebidas", description: "Red Bull te da alas. Buscamos creadores de deportes extremos, gaming y lifestyle urbano.", country: "México", monthlyBudget: "15000-50000", platforms: ["Instagram", "TikTok", "YouTube"], isVerified: true, activeCampaigns: 4, totalCampaigns: 91 },
  { id: "brand-006", username: "zara_official", name: "Zara", industry: "Moda y Belleza", description: "Moda accesible de tendencia global. Colaboramos con fashion creators y lifestyle influencers.", country: "España", monthlyBudget: "5000-15000", platforms: ["Instagram", "TikTok"], isVerified: true, activeCampaigns: 1, totalCampaigns: 17 },
  { id: "brand-007", username: "netflix_latam", name: "Netflix LATAM", industry: "Entretenimiento", description: "El entretenimiento que amas, donde quieras. Buscamos creadores para promocionar estrenos.", country: "México", monthlyBudget: "50000+", platforms: ["Instagram", "TikTok", "YouTube"], isVerified: true, activeCampaigns: 6, totalCampaigns: 120 },
  { id: "brand-008", username: "amazon_mx", name: "Amazon México", industry: "Tecnología", description: "El marketplace más grande del mundo. Programa de afiliados y campañas para creadores.", country: "México", monthlyBudget: "50000+", platforms: ["YouTube", "Instagram", "TikTok"], isVerified: true, activeCampaigns: 8, totalCampaigns: 200 },
];

// ─── Campaigns ────────────────────────────────────────────────────────────────

export const mockCampaigns: MockCampaign[] = [
  { id: "camp-001", brandId: "brand-001", brandName: "Adidas México", title: "Colección Primavera 2026 — Fitness Creators", description: "Buscamos creadores de fitness y lifestyle para promocionar nuestra nueva colección de ropa deportiva. Contenido auténtico mostrando el producto en uso real.", platforms: ["Instagram", "TikTok"], minFollowers: 50000, budgetPerCreator: 1500, totalBudget: 15000, deadline: "2026-05-15", creatorsNeeded: 10, creatorsApplied: 47, niches: ["Fitness", "Lifestyle"], status: "active", isHot: true },
  { id: "camp-002", brandId: "brand-002", brandName: "L'Oréal Colombia", title: "Lanzamiento Serum Vitamina C — Beauty Influencers", description: "Campaña de lanzamiento para nuestro nuevo sérum con vitamina C. Buscamos beauty creators auténticas con audiencia femenina.", platforms: ["Instagram", "YouTube"], minFollowers: 100000, budgetPerCreator: 2500, totalBudget: 20000, deadline: "2026-04-30", creatorsNeeded: 8, creatorsApplied: 93, niches: ["Beauty", "Lifestyle"], status: "active", isHot: true },
  { id: "camp-003", brandId: "brand-003", brandName: "Samsung LATAM", title: "Galaxy S26 — Tech Review Campaign", description: "Lanzamiento del Galaxy S26. Necesitamos tech reviewers y lifestyle creators para mostrar las nuevas funciones.", platforms: ["YouTube", "TikTok"], minFollowers: 200000, budgetPerCreator: 5000, totalBudget: 50000, deadline: "2026-05-01", creatorsNeeded: 10, creatorsApplied: 156, niches: ["Tech", "Lifestyle"], status: "active", isHot: true },
  { id: "camp-004", brandId: "brand-004", brandName: "Spotify España", title: "Wrapped 2026 — Creadores de Música", description: "Campaña Wrapped 2026. Buscamos músicos y creadores de contenido musical para compartir sus estadísticas.", platforms: ["Instagram", "TikTok"], minFollowers: 30000, budgetPerCreator: 800, totalBudget: 12000, deadline: "2026-12-01", creatorsNeeded: 15, creatorsApplied: 34, niches: ["Music", "Lifestyle"], status: "active", isHot: false },
  { id: "camp-005", brandId: "brand-005", brandName: "Red Bull México", title: "Red Bull Gaming Arena — Streamers LATAM", description: "Torneo Red Bull Gaming. Buscamos streamers y gaming creators para cobertura del evento.", platforms: ["TikTok", "YouTube"], minFollowers: 50000, budgetPerCreator: 2000, totalBudget: 30000, deadline: "2026-06-20", creatorsNeeded: 15, creatorsApplied: 201, niches: ["Gaming"], status: "active", isHot: true },
  { id: "camp-006", brandId: "brand-006", brandName: "Zara", title: "Zara Summer Collection — Fashion Reels", description: "Colección de verano. Fashion creators para reels mostrando los outfits en locaciones veraniegas.", platforms: ["Instagram"], minFollowers: 80000, budgetPerCreator: 1200, totalBudget: 9600, deadline: "2026-05-30", creatorsNeeded: 8, creatorsApplied: 67, niches: ["Fashion", "Lifestyle"], status: "active", isHot: false },
  { id: "camp-007", brandId: "brand-007", brandName: "Netflix LATAM", title: "Stranger Things 5 — Reacciones y Reviews", description: "Estreno de Stranger Things Temporada 5. Buscamos creadores de entretenimiento para reacciones y análisis.", platforms: ["YouTube", "TikTok"], minFollowers: 100000, budgetPerCreator: 3000, totalBudget: 45000, deadline: "2026-07-15", creatorsNeeded: 15, creatorsApplied: 312, niches: ["Gaming", "Lifestyle"], status: "active", isHot: true },
  { id: "camp-008", brandId: "brand-008", brandName: "Amazon México", title: "Prime Day 2026 — Unboxings y Reviews", description: "Amazon Prime Day. Buscamos unboxers y reviewers para crear contenido de productos seleccionados.", platforms: ["YouTube", "TikTok", "Instagram"], minFollowers: 20000, budgetPerCreator: 600, totalBudget: 18000, deadline: "2026-07-01", creatorsNeeded: 30, creatorsApplied: 89, niches: ["Tech", "Food", "Lifestyle", "Gaming"], status: "active", isHot: false },
];

// ─── Feed Posts ───────────────────────────────────────────────────────────────

export const mockPosts: MockPost[] = [
  { id: "post-001", authorId: "creator-001", authorName: "Sofia Ramírez", authorUsername: "sofiaramirez", authorRole: "CREATOR", authorVerified: true, content: "¡Acabo de cerrar un deal increíble con una marca de viajes! 🌍✈️ Después de 2 años construyendo mi audiencia, esto es prueba de que la constancia vale la pena. Si estás empezando: NO PARES. Tu momento llegará. #CreadorDeContenido #LifestyleCreator", likes: 2847, comments: 183, shares: 412, createdAt: "2026-04-10T08:00:00Z", type: "achievement" },
  { id: "post-002", authorId: "brand-003", authorName: "Samsung LATAM", authorUsername: "samsung_latam", authorRole: "BRAND", authorVerified: true, content: "🚀 ¡NUEVA CAMPAÑA ABIERTA! Buscamos 10 creadores de tecnología y lifestyle para el lanzamiento del Galaxy S26. Presupuesto: hasta $5,000 USD por creador. Aplica ahora ⬇️", likes: 1204, comments: 341, shares: 892, createdAt: "2026-04-10T07:30:00Z", type: "campaign", campaignRef: "camp-003" },
  { id: "post-003", authorId: "creator-002", authorName: "Diego Torres", authorUsername: "diegotorres_gamer", authorRole: "CREATOR", authorVerified: true, content: "Acabo de llegar a 1.2M de seguidores en TikTok 🎮🔥 Gracias a todos los que llevan el viaje conmigo desde los 10K. El gaming latinoamericano está creciendo y nosotros somos parte de eso. GG!", likes: 5621, comments: 892, shares: 1203, createdAt: "2026-04-09T22:00:00Z", type: "achievement" },
  { id: "post-004", authorId: "agency-001", authorName: "Stellar Talent Group", authorUsername: "stellartalentgroup", authorRole: "AGENCY", authorVerified: true, content: "💡 TIP para creadores que buscan agencia: antes de firmar cualquier contrato, asegúrate de entender estas 3 cláusulas clave: exclusividad, duración del contrato y porcentaje de comisión.", likes: 934, comments: 67, shares: 445, createdAt: "2026-04-09T18:00:00Z", type: "post" },
  { id: "post-005", authorId: "creator-014", authorName: "Carlos Reyes", authorUsername: "carlos.reyes.chef", authorRole: "CREATOR", authorVerified: true, content: "Hoy grabamos la receta de tacos al pastor más épica de YouTube 🌮🔥 El video sale el viernes. Les prometo que van a querer hacer esta receta este fin de semana. ¿Qué receta quieren ver la próxima semana?", likes: 8934, comments: 1204, shares: 2341, createdAt: "2026-04-09T16:00:00Z", type: "post" },
  { id: "post-006", authorId: "brand-001", authorName: "Adidas México", authorUsername: "adidas_mx", authorRole: "BRAND", authorVerified: true, content: "🎯 Buscamos fitness creators para nuestra campaña de primavera. Requisitos: +50K seguidores en IG o TikTok, contenido fitness/lifestyle, engagement rate >3%. Presupuesto: $1,500 USD. Aplica en Mundo Creadores.", likes: 3201, comments: 456, shares: 1123, createdAt: "2026-04-09T12:00:00Z", type: "campaign", campaignRef: "camp-001" },
  { id: "post-007", authorId: "creator-009", authorName: "Daniela Flores", authorUsername: "dani.flores.fashion", authorRole: "CREATOR", authorVerified: true, content: "Busco creadora de lifestyle o travel para una collab 🤝✨ Tengo 710K seguidores en IG+TT. Idea: viaje de contenido por Cartagena, Colombia. Si te interesa, escríbeme aquí. ¡Hagamos algo épico juntas! 🇨🇴", likes: 1456, comments: 234, shares: 189, createdAt: "2026-04-09T10:00:00Z", type: "collab" },
  { id: "post-008", authorId: "creator-003", authorName: "Valentina Cruz", authorUsername: "valentina.cruz", authorRole: "CREATOR", authorVerified: true, content: "POV: llevas 3 años creando contenido de belleza y finalmente tienes tu propia línea de skincare en camino 🌸💄 No lo puedo creer todavía. El trabajo duro SÍ paga. Pronto más detalles...", likes: 12034, comments: 2341, shares: 4521, createdAt: "2026-04-08T20:00:00Z", type: "achievement" },
  { id: "post-009", authorId: "agency-002", authorName: "Nexus Creator Agency", authorUsername: "nexuscreatoragency", authorRole: "AGENCY", authorVerified: true, content: "📊 Resultados de la campaña Samsung con 3 de nuestros creators: 12M de impresiones, 890K de views en TikTok y 4.2% de engagement rate promedio. El influencer marketing bien hecho CONVIERTE.", likes: 567, comments: 89, shares: 203, createdAt: "2026-04-08T14:00:00Z", type: "achievement" },
  { id: "post-010", authorId: "creator-006", authorName: "Sebastián López", authorUsername: "sebas.tech", authorRole: "CREATOR", authorVerified: true, content: "Review HONESTA del Galaxy S26: ¿Vale la pena $1,200 USD? Después de 2 semanas de uso intensivo, aquí mi veredicto. Video completo en YouTube 👆", likes: 4521, comments: 678, shares: 1234, createdAt: "2026-04-08T12:00:00Z", type: "post" },
];

// ─── Services (Marketplace) ───────────────────────────────────────────────────

export const mockServices: MockService[] = [
  { id: "svc-001", creatorId: "creator-001", creatorName: "Sofia Ramírez", creatorUsername: "sofiaramirez", creatorVerified: true, creatorFollowers: 850000, platform: "Instagram", title: "Post en Instagram + Stories (pack)", description: "1 post en feed de alta calidad + 3 stories mostrando tu producto/servicio.", price: 1800, deliveryDays: 5, revisions: 2, rating: 4.9, totalOrders: 47, niche: ["Lifestyle", "Travel"] },
  { id: "svc-002", creatorId: "creator-002", creatorName: "Diego Torres", creatorUsername: "diegotorres_gamer", creatorVerified: true, creatorFollowers: 1200000, platform: "TikTok", title: "Video TikTok 60s — Integración gaming", description: "Video de 60 segundos en TikTok integrado naturalmente en mi contenido de gaming.", price: 3200, deliveryDays: 7, revisions: 1, rating: 4.8, totalOrders: 31, niche: ["Gaming"] },
  { id: "svc-003", creatorId: "creator-003", creatorName: "Valentina Cruz", creatorUsername: "valentina.cruz", creatorVerified: true, creatorFollowers: 620000, platform: "YouTube", title: "Review completa en YouTube — Belleza/Skincare", description: "Video de review de 8-12 minutos. Incluye demostración del producto y call to action.", price: 4500, deliveryDays: 10, revisions: 2, rating: 5.0, totalOrders: 23, niche: ["Beauty", "Lifestyle"] },
  { id: "svc-004", creatorId: "creator-006", creatorName: "Sebastián López", creatorUsername: "sebas.tech", creatorVerified: true, creatorFollowers: 540000, platform: "YouTube", title: "Unboxing + Review Tech en YouTube", description: "Video de unboxing y review detallado de gadgets, smartphones o accesorios tech.", price: 3800, deliveryDays: 7, revisions: 1, rating: 4.7, totalOrders: 38, niche: ["Tech"] },
  { id: "svc-005", creatorId: "creator-014", creatorName: "Carlos Reyes", creatorUsername: "carlos.reyes.chef", creatorVerified: true, creatorFollowers: 1900000, platform: "YouTube", title: "Receta patrocinada en YouTube", description: "Integración de tu producto en una de mis recetas. Audiencia masiva y engagement altísimo.", price: 8500, deliveryDays: 14, revisions: 2, rating: 4.9, totalOrders: 62, niche: ["Food"] },
  { id: "svc-006", creatorId: "creator-009", creatorName: "Daniela Flores", creatorUsername: "dani.flores.fashion", creatorVerified: true, creatorFollowers: 710000, platform: "Instagram", title: "Outfit post + 5 stories — Moda y Lifestyle", description: "Post de outfit profesional con tu ropa + 5 stories de estilismo mostrando el producto.", price: 2200, deliveryDays: 5, revisions: 2, rating: 4.8, totalOrders: 55, niche: ["Fashion", "Lifestyle"] },
  { id: "svc-007", creatorId: "creator-004", creatorName: "Mateo García", creatorUsername: "mateo_fit", creatorVerified: false, creatorFollowers: 430000, platform: "TikTok", title: "Mención en workout TikTok", description: "Mención natural de tu marca en uno de mis videos de entrenamiento.", price: 900, deliveryDays: 4, revisions: 1, rating: 4.6, totalOrders: 29, niche: ["Fitness"] },
  { id: "svc-008", creatorId: "creator-012", creatorName: "Nicolás Vargas", creatorUsername: "nico.vargas.gaming", creatorVerified: true, creatorFollowers: 480000, platform: "YouTube", title: "Integración en stream o video gaming", description: "Integración de tu marca durante un stream en vivo o video de gaming.", price: 1500, deliveryDays: 3, revisions: 1, rating: 4.5, totalOrders: 41, niche: ["Gaming"] },
  { id: "svc-009", creatorId: "creator-007", creatorName: "Camila Rodríguez", creatorUsername: "camilacooks", creatorVerified: false, creatorFollowers: 390000, platform: "TikTok", title: "Receta TikTok con tu producto", description: "Video de receta corta en TikTok (30-60s) usando tu producto de manera natural.", price: 750, deliveryDays: 5, revisions: 2, rating: 4.7, totalOrders: 18, niche: ["Food"] },
  { id: "svc-010", creatorId: "creator-013", creatorName: "Fernanda Jiménez", creatorUsername: "fer.jimenez.fit", creatorVerified: true, creatorFollowers: 560000, platform: "Instagram", title: "Pack premium: Post + Reel + Stories", description: "Paquete completo: 1 post en feed + 1 reel de 30-60s + 5 stories.", price: 3500, deliveryDays: 7, revisions: 2, rating: 4.9, totalOrders: 34, niche: ["Fitness"] },
];

// ─── Notifications ────────────────────────────────────────────────────────────

export const mockNotifications: MockNotification[] = [
  { id: "notif-001", type: "proposal", title: "Nueva propuesta de colaboración", body: "Stellar Talent Group te envió una propuesta de representación.", fromName: "Stellar Talent Group", fromUsername: "stellartalentgroup", read: false, createdAt: "2026-04-10T09:00:00Z" },
  { id: "notif-002", type: "visit", title: "Tu perfil fue visitado", body: "Samsung LATAM visitó tu perfil hace 2 horas.", fromName: "Samsung LATAM", fromUsername: "samsung_latam", read: false, createdAt: "2026-04-10T08:30:00Z" },
  { id: "notif-003", type: "campaign", title: "Campaña que encaja con tu perfil", body: "Adidas México está buscando creadores de fitness. Presupuesto: $1,500 USD.", fromName: "Adidas México", fromUsername: "adidas_mx", read: false, createdAt: "2026-04-10T08:00:00Z" },
  { id: "notif-004", type: "message", title: "Nuevo mensaje", body: "Nexus Creator Agency: \"Tenemos una marca de periféricos gaming que quiere trabajar contigo.\"", fromName: "Nexus Creator Agency", fromUsername: "nexuscreatoragency", read: false, createdAt: "2026-04-09T18:00:00Z" },
  { id: "notif-005", type: "accepted", title: "¡Tu aplicación fue aceptada!", body: "ContentFirst Agency aceptó tu solicitud de representación.", fromName: "ContentFirst Agency", fromUsername: "contentfirstagency", read: true, createdAt: "2026-04-09T14:00:00Z" },
  { id: "notif-006", type: "review", title: "Nueva reseña recibida", body: "L'Oréal Colombia dejó una reseña de 5 estrellas en tu perfil.", fromName: "L'Oréal Colombia", fromUsername: "loreal_colombia", read: true, createdAt: "2026-04-08T20:00:00Z" },
  { id: "notif-007", type: "follow", title: "Nuevo seguidor", body: "Daniela Flores comenzó a seguirte.", fromName: "Daniela Flores", fromUsername: "dani.flores.fashion", read: true, createdAt: "2026-04-08T16:00:00Z" },
  { id: "notif-008", type: "visit", title: "Tu perfil fue visitado", body: "Netflix LATAM visitó tu perfil.", fromName: "Netflix LATAM", fromUsername: "netflix_latam", read: true, createdAt: "2026-04-08T12:00:00Z" },
  { id: "notif-009", type: "proposal", title: "Nueva propuesta de campaña", body: "Red Bull México te invitó a participar en la campaña Gaming Arena 2026.", fromName: "Red Bull México", fromUsername: "redbull_mx", read: true, createdAt: "2026-04-07T10:00:00Z" },
  { id: "notif-010", type: "message", title: "Nuevo mensaje", body: "Pinnacle Talent: \"Podemos ayudarte a expandir tu presencia más allá de OnlyFans.\"", fromName: "Pinnacle Talent", fromUsername: "pinnacletalent", read: true, createdAt: "2026-04-06T15:00:00Z" },
];

// ─── Analytics Data ───────────────────────────────────────────────────────────

export const mockAnalytics: AnalyticsData = {
  profileViews: [120,145,132,178,201,189,234,267,245,312,289,334,401,378,456,423,489,512,478,534,567,589,623,645,612,678,701,689,734,812],
  searchAppearances: [45,52,48,67,71,63,89,94,87,112,108,124,138,131,156,149,167,178,165,189,201,198,213,224,218,234,247,241,259,278],
  messages: [3,2,5,4,7,3,8,6,9,11,8,13,10,12,15,11,14,17,13,16,19,15,18,21,17,20,23,19,22,25],
  deals: [0,0,1,0,1,0,1,1,0,2,1,2,1,2,2,1,2,3,2,3,2,3,3,2,3,4,3,4,3,5],
  revenueByService: [
    { name: "Posts Instagram", value: 8400 },
    { name: "Videos YouTube", value: 15200 },
    { name: "TikToks", value: 6800 },
    { name: "Stories Pack", value: 3600 },
    { name: "Reviews", value: 9100 },
  ],
  topCountries: [
    { country: "México", visits: 3240 },
    { country: "Colombia", visits: 2180 },
    { country: "Argentina", visits: 1560 },
    { country: "España", visits: 1230 },
    { country: "Venezuela", visits: 890 },
  ],
  weekLabels: ["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"],
  monthLabels: Array.from({ length: 30 }, (_, i) => `${i + 1} Abr`),
};
