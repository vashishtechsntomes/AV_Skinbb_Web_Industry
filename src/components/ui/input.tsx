import * as React from "react";

import { cn } from "@/utils";

export interface InputProps extends React.ComponentProps<"input"> {
  startIcon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  endIcon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  startIconProps?: React.HTMLAttributes<SVGSVGElement> & { className?: string };
  endIconProps?: React.HTMLAttributes<SVGSVGElement> & { className?: string };
  className?: string;
  type?: string;
}

function Input({
  className,
  startIcon,
  endIcon,
  startIconProps,
  endIconProps,
  ...props
}: InputProps) {
  const inputElement = (
    <input
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-11 w-full min-w-0 rounded-md border bg-transparent py-2 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-ring focus-visible:border-primary focus-visible:ring-primary/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        // Dynamic padding based on icons
        startIcon ? "pl-10" : "px-4",
        endIcon ? "pr-10" : startIcon ? "" : "px-4",
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
    <div className="relative flex items-center">
      {startIcon && React.isValidElement(startIcon)
        ? React.cloneElement(startIcon, {
            ...startIconProps,
            className: cn(
              "text-muted-foreground pointer-events-none absolute left-0 mx-3 flex h-full items-center size-5",
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
              "text-muted-foreground pointer-events-none absolute right-0 mx-3 flex h-full items-center size-5",
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
