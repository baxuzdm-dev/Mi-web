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
