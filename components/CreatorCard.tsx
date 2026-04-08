import Link from "next/link";
import { MapPin, Users, DollarSign, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { formatNumber, formatCurrency } from "@/lib/utils";

interface CreatorCardProps {
  creator: {
    id: string;
    username: string;
    avatar?: string | null;
    bio?: string | null;
    country?: string | null;
    niche: string[];
    followers: number;
    estimatedIncome: number;
    isVerified: boolean;
    isAvailable: boolean;
    user?: { name?: string | null; image?: string | null };
  };
  showApply?: boolean;
  onApply?: () => void;
}

export default function CreatorCard({ creator, showApply, onApply }: CreatorCardProps) {
  const displayName = creator.user?.name ?? creator.username;
  const avatar = creator.avatar ?? creator.user?.image;

  return (
    <Link href={`/profile/creator/${creator.id}`}>
      <Card className="group hover:border-violet-500/30 hover:bg-white/6 transition-all duration-200 cursor-pointer h-full">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar className="w-14 h-14">
                <AvatarImage src={avatar ?? ""} alt={displayName ?? ""} />
                <AvatarFallback className="text-lg">
                  {displayName?.[0]?.toUpperCase() ?? "C"}
                </AvatarFallback>
              </Avatar>
              {creator.isAvailable && (
                <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0a0a0f]" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-semibold text-white truncate">@{creator.username}</span>
                {creator.isVerified && (
                  <ShieldCheck className="w-4 h-4 text-violet-400 shrink-0" />
                )}
              </div>
              {creator.bio && (
                <p className="text-sm text-white/50 mt-0.5 line-clamp-2">{creator.bio}</p>
              )}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-1.5 text-white/60">
              <Users className="w-3.5 h-3.5 text-violet-400" />
              <span>{formatNumber(creator.followers)} followers</span>
            </div>
            {creator.estimatedIncome > 0 && (
              <div className="flex items-center gap-1.5 text-white/60">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                <span>{formatCurrency(creator.estimatedIncome)}/mo</span>
              </div>
            )}
            {creator.country && (
              <div className="flex items-center gap-1.5 text-white/60">
                <MapPin className="w-3.5 h-3.5 text-pink-400" />
                <span>{creator.country}</span>
              </div>
            )}
          </div>

          {creator.niche.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {creator.niche.slice(0, 3).map((n) => (
                <Badge key={n} variant="default" className="text-xs">
                  {n}
                </Badge>
              ))}
              {creator.niche.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{creator.niche.length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
