// NextJs Imports
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
// Shared
import {
  // Utils
  CnU,
} from "@crud1/shared/frontend";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-medium transition-colors duration-150 select-none",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background",
        secondary: "bg-surface text-foreground border border-border",
        outline: "border border-border text-foreground bg-transparent",
        muted: "bg-surface-hover text-muted",
        success: "bg-green-100 text-green-800",
        warning: "bg-amber-100 text-amber-800",
      },
      size: {
        sm: "px-2.5 py-0.5 text-xs",
        default: "px-3 py-1 text-xs",
        lg: "px-4 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span
      className={CnU(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
