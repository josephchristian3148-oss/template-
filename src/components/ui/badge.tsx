import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.6875rem] font-medium tracking-wide tabular-nums",
  {
    variants: {
      variant: {
        default: "bg-surface-2 text-muted shadow-border",
        solid: "bg-primary text-primary-fg",
        pos: "bg-sage/15 text-sage",
        mid: "bg-sand/15 text-sand",
        neg: "bg-clay/15 text-clay",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  ...props
}: ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
