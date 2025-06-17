import * as React from "react";

import { cn } from "@/utils";

export interface InputProps extends React.ComponentProps<"input"> {
  startIcon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  endIcon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  startIconProps?: React.HTMLAttributes<SVGSVGElement> & { className?: string };
  endIconProps?: React.HTMLAttributes<SVGSVGElement> & { className?: string };
  className?: string;
  type?: string;
  containerProps?: React.ComponentProps<"div">;
}

function Input({
  className,
  startIcon,
  endIcon,
  startIconProps,
  endIconProps,
  containerProps,
  ...props
}: InputProps) {
  const { className: containerClassName, ...rest } = containerProps ?? {};
  const inputElement = (
    <input
      data-slot="input"
      className={cn(
        // Base styling
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

        // Dynamic padding based on icons
        startIcon ? "ps-10 pe-4" : "px-4",
        endIcon ? "pe-10" : startIcon ? "ps-10" : "px-4",
        className,
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
      {startIcon && React.isValidElement(startIcon)
        ? React.cloneElement(startIcon, {
            ...startIconProps,
            className: cn(
              "text-muted-foreground pointer-events-none absolute left-0 mx-3 flex h-full items-center",
              startIconProps?.className,
              startIcon.props.className,
            ),
          })
        : startIcon}

      {inputElement}

      {endIcon && React.isValidElement(endIcon)
        ? React.cloneElement(endIcon, {
            ...endIconProps,
            className: cn(
              "text-muted-foreground pointer-events-none absolute right-0 mx-3 flex h-full items-center",
              endIconProps?.className,
              endIcon.props.className,
            ),
          })
        : endIcon}
    </div>
  );
}

export { Input };

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
