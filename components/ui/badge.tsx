import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-violet-500/20 text-violet-300 border border-violet-500/30",
        secondary: "bg-white/10 text-white/70 border border-white/10",
        success: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
        destructive: "bg-red-500/20 text-red-300 border border-red-500/30",
        warning: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
        pink: "bg-pink-500/20 text-pink-300 border border-pink-500/30",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
