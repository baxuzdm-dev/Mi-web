import { Role, ApplicationStatus } from "@prisma/client";

export type { Role, ApplicationStatus };

export interface CreatorWithProfile {
  id: string;
  name: string | null;
  image: string | null;
  creatorProfile: {
    id: string;
    username: string;
    avatar: string | null;
    bio: string | null;
    country: string | null;
    niche: string[];
    followers: number;
    estimatedIncome: number;
    platforms: string[];
    isVerified: boolean;
    isAvailable: boolean;
  } | null;
}

export interface AgencyWithProfile {
  id: string;
  name: string | null;
  image: string | null;
  agencyProfile: {
    id: string;
    name: string;
    logo: string | null;
    description: string | null;
    services: string[];
    commission: number;
    website: string | null;
    country: string | null;
    isVerified: boolean;
  } | null;
}

export interface ApplicationWithRelations {
  id: string;
  status: ApplicationStatus;
  message: string | null;
  createdAt: Date;
  creator: {
    id: string;
    username: string;
    avatar: string | null;
    isVerified: boolean;
    niche: string[];
    followers: number;
    user: { name: string | null; image: string | null };
  };
  agency: {
    id: string;
    name: string;
    logo: string | null;
    isVerified: boolean;
    commission: number;
    user: { name: string | null };
  };
}

export interface MessageWithSender {
  id: string;
  content: string;
  createdAt: Date;
  sender: {
    id: string;
    name: string | null;
    image: string | null;
  };
}

// Extend next-auth session types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null;
    };
  }
}
