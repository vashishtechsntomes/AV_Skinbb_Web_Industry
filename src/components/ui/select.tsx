import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/utils/index";

function SelectRoot({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("text-left")}
      {...props}
    />
  );
}

export interface SelectTriggerProps
  extends React.ComponentProps<typeof SelectPrimitive.Trigger> {
  startIcon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  endIcon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  startIconProps?: React.HTMLAttributes<SVGSVGElement> & { className?: string };
  endIconProps?: React.HTMLAttributes<SVGSVGElement> & { className?: string };
  size?: "sm" | "default";
}

function SelectTrigger({
  className,
  size = "default",
  children,
  startIcon,
  endIcon,
  startIconProps,
  endIconProps,
  ...props
}: SelectTriggerProps) {
  let paddingClass = "px-4"; // default

  if (startIcon && endIcon) {
    paddingClass = "ps-10 pe-10";
  } else if (startIcon) {
    paddingClass = "ps-10 pe-4";
  } else if (endIcon) {
    paddingClass = "ps-4 pe-10";
  }
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        // Layout & Box Model
        "flex w-full items-center justify-between gap-2",
        "relative rounded-md border bg-transparent px-4 py-2",

        // Height based on size variant
        "data-[size=default]:h-10 data-[size=sm]:h-9",

        // Borders & Colors
        "border-input focus-visible:border-primary",
        "focus-visible:ring-primary/50 focus-visible:ring-[3px]",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20",

        // Text & Color
        "data-[placeholder]:text-muted-foreground/50",
        "transition-[color,box-shadow] outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",

        // Child & Slot Styling
        "*:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:text-left",
        "*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:gap-2",

        // SVG Styling
        "[&_svg]:pointer-events-none [&_svg]:shrink-0",
        "[&_svg:not([class*='text-'])]:text-muted-foreground",
        "[&_svg:not([class*='size-'])]:size-5",

        paddingClass,
        className,
      )}
      {...props}
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

      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-5 opacity-50" />
      </SelectPrimitive.Icon>
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
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className,
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1",
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className,
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className,
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className,
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

interface BaseSelectOption {
  value: string;
  label: string;
}

interface SelectProps<T = BaseSelectOption>
  extends React.ComponentProps<typeof SelectPrimitive.Root> {
  options: T[];
  placeholder?: string;
  className?: string;
  optionHeading?: string;
  optionLabel?: keyof T;
  optionValue?: keyof T;
  selectValueProps?: React.ComponentProps<typeof SelectPrimitive.Value>;
}

const Select: React.FC<SelectProps> = ({
  options,
  optionLabel = "label",
  optionValue = "value",
  optionHeading = "",
  placeholder = "Select...",
  className = "w-[180px]",
  selectValueProps,
  ...props
}) => {
  return (
    <SelectRoot {...props}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} {...selectValueProps} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {optionHeading && <SelectLabel>{optionHeading}</SelectLabel>}
          {options.map((option) => (
            <SelectItem key={option[optionValue]} value={option[optionValue]}>
              {option[optionLabel]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectRoot>
  );
};

export {
  Select,
  SelectRoot,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
