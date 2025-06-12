import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { STATUS_MAP, type ModuleType } from "@/config/status";
import { cn } from "@/utils/index";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
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
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

type StatusBadgeVariant = "default" | "label";

interface StatusBadgeProps {
  module: ModuleType;
  status: string;
  variant?: StatusBadgeVariant;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  module,
  status,
  variant = "default",
}) => {
  const statusInfo = STATUS_MAP[module]?.[status];

  if (!statusInfo) return null;

  const { label, textColor, bgColor } = statusInfo;
  const colorClasses = cn(textColor, bgColor);

  switch (variant) {
    case "default":
      return (
        <div
          className={cn(
            "flex items-center gap-2",
            colorClasses,
            "bg-transparent",
          )}
        >
          <span className="h-2 w-2 rounded-full bg-current" />
          <span className="text-sm capitalize">{label}</span>
        </div>
      );

    case "label":
      return (
        <span className={cn("text-sm font-medium capitalize", colorClasses)}>
          {label}
        </span>
      );

    default:
      return null;
  }
};

export { Badge, badgeVariants, StatusBadge };
