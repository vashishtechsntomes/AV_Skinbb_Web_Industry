import * as React from "react";

import { cn } from "@/utils/index";
import type { InputProps } from "./input";

type IconProps = Pick<
  InputProps,
  "startIcon" | "endIcon" | "startIconProps" | "endIconProps"
>;

export interface TextareaProps
  extends React.ComponentProps<"textarea">,
    IconProps {}

function Textarea({
  className,
  startIcon,
  startIconProps,
  endIcon,
  endIconProps,
  ...props
}: TextareaProps) {
  const inputElement = (
    <textarea
      data-slot="textarea"
      className={cn(
        "bg-background placeholder:text-muted-foreground/50 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex min-h-10 w-full min-w-0 rounded-md border py-2 text-base transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
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
    <div className="relative flex">
      {startIcon && React.isValidElement(startIcon)
        ? React.cloneElement(startIcon, {
            ...startIconProps,
            className: cn(
              "text-muted-foreground pointer-events-none absolute left-0 mx-3 my-3 flex h-full items-center size-5",
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
              "text-muted-foreground pointer-events-none absolute right-0 mx-3 my-3 flex h-full items-center size-5",
              endIconProps?.className,
              endIcon.props.className,
            ),
          })
        : endIcon}
    </div>
  );
}

export { Textarea };
