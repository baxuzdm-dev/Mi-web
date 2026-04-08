import Link from "next/link";
import { MapPin, Percent, Globe, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface AgencyCardProps {
  agency: {
    id: string;
    name: string;
    logo?: string | null;
    description?: string | null;
    services: string[];
    commission: number;
    website?: string | null;
    country?: string | null;
    isVerified: boolean;
    user?: { name?: string | null; image?: string | null };
  };
}

export default function AgencyCard({ agency }: AgencyCardProps) {
  const logo = agency.logo ?? agency.user?.image;

  return (
    <Link href={`/profile/agency/${agency.id}`}>
      <Card className="group hover:border-violet-500/30 hover:bg-white/6 transition-all duration-200 cursor-pointer h-full">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <Avatar className="w-14 h-14 rounded-xl">
              <AvatarImage src={logo ?? ""} alt={agency.name} />
              <AvatarFallback className="rounded-xl text-lg">
                {agency.name[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-semibold text-white truncate">{agency.name}</span>
                {agency.isVerified && (
                  <ShieldCheck className="w-4 h-4 text-violet-400 shrink-0" />
                )}
              </div>
              {agency.description && (
                <p className="text-sm text-white/50 mt-0.5 line-clamp-2">{agency.description}</p>
              )}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-1.5 text-white/60">
              <Percent className="w-3.5 h-3.5 text-violet-400" />
              <span>{agency.commission}% commission</span>
            </div>
            {agency.country && (
              <div className="flex items-center gap-1.5 text-white/60">
                <MapPin className="w-3.5 h-3.5 text-pink-400" />
                <span>{agency.country}</span>
              </div>
            )}
            {agency.website && (
              <div className="flex items-center gap-1.5 text-white/60 col-span-2">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span className="truncate">{agency.website}</span>
              </div>
            )}
          </div>

          {agency.services.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {agency.services.slice(0, 3).map((s) => (
                <Badge key={s} variant="pink" className="text-xs">
                  {s}
                </Badge>
              ))}
              {agency.services.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{agency.services.length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
