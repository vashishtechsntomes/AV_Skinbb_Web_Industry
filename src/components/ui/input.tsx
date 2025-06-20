import * as React from "react";

import { cn } from "@/utils";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
  [
    //  Base styling
    "border-input flex h-10 w-full min-w-0 rounded-md border py-2 text-base",
    "bg-background text-foreground placeholder:text-muted-foreground/50",
    "transition-[color,box-shadow] outline-none",
    "selection:bg-primary selection:text-primary-foreground",

    // Dark mode adjustments
    "dark:bg-input/30",

    // File input styling
    "file:border-border file:text-muted-foreground file:inline-flex file:border-0 file:border-e file:bg-transparent file:py-0 file:pe-1 file:font-normal",

    // Disabled state
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",

    // Focus state
    "focus-visible:border-ring focus-visible:border-primary",
    "focus-visible:ring-primary/50 focus-visible:ring-[3px]",

    // Invalid/aria-invalid state
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
    "aria-invalid:border-destructive",
  ],
  {
    variants: {
      size: {
        sm: "h-8 text-sm",
        md: "h-10 text-base", // default
        lg: "h-12 text-lg",
      },
      withStartIcon: {
        true: "ps-10 pe-4",
        false: "px-4",
      },
      withEndIcon: {
        true: "pe-10",
        false: "",
      },
    },
    compoundVariants: [
      {
        withStartIcon: false,
        withEndIcon: false,
        className: "px-4",
      },
    ],
    defaultVariants: {
      size: "md",
    },
  },
);

export interface InputProps
  extends Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {
  startIcon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  endIcon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  startIconProps?: React.HTMLAttributes<SVGSVGElement> & { className?: string };
  endIconProps?: React.HTMLAttributes<SVGSVGElement> & { className?: string };
  className?: string;
  containerProps?: React.ComponentProps<"div">;
}

function Input({
  className,
  startIcon,
  endIcon,
  startIconProps,
  endIconProps,
  containerProps,
  size,
  ...props
}: InputProps) {
  const { className: containerClassName, ...rest } = containerProps ?? {};

  const inputElement = (
    <input
      data-slot="input"
      className={cn(
        inputVariants({
          size,
          withStartIcon: !!startIcon,
          withEndIcon: !!endIcon,
          className,
        }),
      )}
      {...props}
    />
  );

  // If no icons, return just the input
  if (!startIcon && !endIcon) {
    return inputElement;
  }

  // Return wrapped input with icons
  return (
    <div
      className={cn(
        "relative flex items-center [&_svg]:size-5",
        containerClassName,
      )}
      {...rest}
    >
      {startIcon && (
        <InputIcon icon={startIcon} position="left" {...startIconProps} />
      )}

      {inputElement}

      {endIcon && (
        <InputIcon icon={endIcon} position="right" {...endIconProps} />
      )}
    </div>
  );
}

export interface InputIconProps extends React.HTMLAttributes<SVGSVGElement> {
  // icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  icon:
    | React.ReactElement<React.SVGProps<SVGSVGElement>>
    | React.ComponentProps<"div">;
  position: "left" | "right";
}

export function InputIcon({
  icon,
  position,
  className,
  ...rest
}: InputIconProps) {
  if (!React.isValidElement(icon)) return null;

  return React.cloneElement(icon, {
    ...rest,
    className: cn(
      "pointer-events-none1 absolute mx-3 flex h-full items-center text-muted-foreground",
      position === "left" ? "left-0" : "right-0",
      className,
      icon.props.className,
    ),
  });
}

export { Input, inputVariants };

// Usage Examples with SVG icons:
//
// With start icon (SVG):
// <Input
//   startIcon={<svg>...</svg>}
//   placeholder="Enter your mail"
// />
//
// With Lucide React icons:
// <Input
//   startIcon={<Mail className="text-blue-500" />}
//   placeholder="Enter your mail"
// />
//
// With end icon and custom props:
// <Input
//   endIcon={<EyeIcon />}
//   endIconProps={{
//     onClick: () => togglePassword(),
//     className: "cursor-pointer hover:text-foreground"
//   }}
//   placeholder="Enter password"
// />
//
// With both icons and custom styling:
// <Input
//   startIcon={<MailIcon />}
//   startIconProps={{ className: "text-blue-500" }}
//   endIcon={<SearchIcon />}
//   endIconProps={{
//     onClick: handleSearch,
//     className: "cursor-pointer"
//   }}
//   placeholder="Search emails"
// />
//
// Without icons (returns clean <input /> element):
// <Input placeholder="Regular input" />
