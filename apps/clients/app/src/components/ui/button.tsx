// NextJs Imports
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
// Shared
import {
  // Utils
  CnU,
} from "@crud1/shared/frontend";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-150 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-foreground text-background hover:bg-foreground/85 shadow-sm",
        secondary:
          "bg-surface text-foreground border border-border hover:bg-surface-hover shadow-sm",
        ghost: "text-foreground hover:bg-surface hover:text-foreground",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-surface",
        destructive: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
        link: "text-foreground underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 rounded-lg px-3 text-xs",
        default: "h-10 rounded-xl px-5 py-2 text-sm",
        lg: "h-12 rounded-xl px-7 py-3 text-sm",
        icon: "h-10 w-10 rounded-xl",
        "icon-sm": "h-8 w-8 rounded-lg",
        "icon-lg": "h-12 w-12 rounded-xl",
        pill: "h-10 rounded-full px-5 py-2 text-sm",
        "pill-sm": "h-8 rounded-full px-4 text-xs",
        "pill-lg": "h-12 rounded-full px-7 py-3 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={CnU(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
