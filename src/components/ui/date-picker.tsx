"use client";

import { ChevronDownIcon } from "lucide-react";
import * as React from "react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/utils";
import { XMarkIcon } from "@heroicons/react/24/outline";
import type { DateRange, DayPicker, Mode } from "react-day-picker";
import type { Button } from "./button";
import { InputIcon, inputVariants } from "./input";

export interface DatePickerProps
  extends Omit<
    React.ComponentProps<"button">,
    "value" | "onChange" | "defaultValue"
  > {
  value?: Date;
  onChange?: (date?: Date) => void;
  clearable?: boolean;
  startIcon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  startIconProps?: React.HTMLAttributes<SVGSVGElement> & { className?: string };
  endIcon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  endIconProps?: React.HTMLAttributes<SVGSVGElement> & { className?: string };
  calendarProps?: React.ComponentProps<typeof Calendar>;
  placeholder?: string;
  defaultValue?: Date;
}
export function DatePicker({
  value,
  onChange,
  clearable = true,
  startIcon,
  startIconProps,
  endIcon,
  endIconProps,
  calendarProps,
  placeholder = "Select date",
  className,
  defaultValue,
  ...props
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(
    value ?? defaultValue,
  );

  React.useEffect(() => {
    if (value !== undefined) {
      setInternalDate(value);
    }
  }, [value]);

  const handleSelect = (date?: Date) => {
    setInternalDate(date);
    setOpen(false);
    onChange?.(date);
  };

  const handleClear = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    setInternalDate(undefined);
    onChange?.(undefined);
  };

  const displayText = internalDate
    ? internalDate.toLocaleDateString()
    : placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          id={props?.id || "date-picker"}
          className={cn(
            "relative flex cursor-pointer items-center [&_svg]:size-5",
            "rounded-md outline-none",
            "focus-visible:border-ring focus-visible:border-primary h-10 border",
            "focus-visible:ring-primary/50 focus-visible:ring-[3px]",
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="calendar-popover"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpen(false);
              e.stopPropagation();
            }
          }}
          {...props}
        >
          {startIcon && (
            <InputIcon icon={startIcon} position="left" {...startIconProps} />
          )}
          {endIcon ? (
            <InputIcon icon={endIcon} position="right" {...endIconProps} />
          ) : (
            <InputIcon
              icon={
                <div className="cursor-pointer space-x-1">
                  {clearable && internalDate && (
                    <XMarkIcon
                      tabIndex={0}
                      role="button"
                      aria-label="Clear date"
                      className="hover:text-foreground text-muted-foreground ml-auto cursor-pointer"
                      onClick={handleClear}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          handleClear(e);
                        }
                      }}
                    />
                  )}
                  <ChevronDownIcon />
                </div>
              }
              position="right"
              {...endIconProps}
            />
          )}
          <span
            className={inputVariants({
              withStartIcon: !!startIcon,
              withEndIcon: true,
              className: cn(
                "!block h-full truncate border-0 text-left",
                clearable && "pe-15",
              ),
            })}
          >
            {displayText}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto overflow-hidden p-0"
        align="start"
        id="calendar-popover"
        role="dialog"
        aria-modal="true"
      >
        <Calendar
          {...calendarProps}
          mode="single"
          selected={internalDate}
          captionLayout="dropdown"
          onSelect={handleSelect}
        />
      </PopoverContent>
    </Popover>
  );
}

export interface DateRangePickerProps
  extends Omit<
    React.ComponentProps<"button">,
    "value" | "onChange" | "defaultValue"
  > {
  value?: DateRange;
  onChange?: (value?: DateRange) => void;
  clearable?: boolean;
  startIcon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  startIconProps?: React.HTMLAttributes<SVGSVGElement> & { className?: string };
  endIcon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  endIconProps?: React.HTMLAttributes<SVGSVGElement> & { className?: string };
  calenderProps?: React.ComponentProps<typeof DayPicker> & {
    buttonVariant?: React.ComponentProps<typeof Button>["variant"];
  };
  placeholder?: string;
  defaultValue?: DateRange;
}

export function DateRangePicker({
  className,
  value,
  onChange,
  clearable = true,
  startIcon,
  startIconProps,
  endIcon,
  endIconProps,
  calenderProps,
  placeholder = "Select date",
  defaultValue,
  ...props
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [internalDate, setInternalDate] = React.useState<DateRange | undefined>(
    value ?? defaultValue,
  );

  React.useEffect(() => {
    if (value !== undefined) {
      setInternalDate(value);
    }
  }, [value]);

  const handleSelect = React.useCallback(
    (range?: DateRange) => {
      setInternalDate(range);
      onChange?.(range);
    },
    [onChange],
  );

  const handleClear = React.useCallback(
    (e: React.MouseEvent | React.KeyboardEvent) => {
      e.stopPropagation();
      setInternalDate(undefined);
      onChange?.(undefined);
    },
    [onChange],
  );

  const displayText =
    internalDate?.from && internalDate?.to
      ? `${internalDate.from.toLocaleDateString()} - ${internalDate.to.toLocaleDateString()}`
      : internalDate?.from
        ? internalDate.from.toLocaleDateString()
        : placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          id={props?.id || "date-picker"}
          className={cn(
            "relative flex cursor-pointer items-center [&_svg]:size-5",
            "rounded-md outline-none",
            "focus-visible:border-ring focus-visible:border-primary h-10 border",
            "focus-visible:ring-primary/50 focus-visible:ring-[3px]",
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="calendar-popover"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpen(false);
              e.stopPropagation();
            }
          }}
          {...props}
        >
          {startIcon && (
            <InputIcon icon={startIcon} position="left" {...startIconProps} />
          )}

          {endIcon ? (
            <InputIcon icon={endIcon} position="right" {...endIconProps} />
          ) : (
            <InputIcon
              icon={
                <div className="cursor-pointer space-x-1">
                  {clearable && internalDate && (
                    <XMarkIcon
                      tabIndex={-1}
                      role="button"
                      aria-label="Clear date range"
                      className="hover:text-foreground text-muted-foreground ml-auto cursor-pointer"
                      onClick={handleClear}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          handleClear(e);
                        }
                      }}
                    />
                  )}
                  <ChevronDownIcon />
                </div>
              }
              position="right"
              {...endIconProps}
            />
          )}
          <span
            className={inputVariants({
              withStartIcon: !!startIcon,
              withEndIcon: true,
              className: cn(
                "!block h-full truncate border-0 text-left",
                clearable && "pe-15",
              ),
            })}
          >
            {displayText}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto overflow-hidden p-0"
        align="start"
        id="calendar-popover"
        role="dialog"
        aria-modal="true"
      >
        <Calendar
          {...calenderProps}
          mode="range"
          selected={internalDate}
          captionLayout="dropdown"
          onSelect={handleSelect}
        />
      </PopoverContent>
    </Popover>
  );
}

type ValueForMode<M extends Mode> = M extends "single"
  ? Date | undefined
  : M extends "multiple"
    ? Date[] | undefined
    : M extends "range"
      ? DateRange | undefined
      : never;

interface BaseProps<M extends Mode = "single">
  extends Omit<
    React.ComponentProps<"button">,
    "value" | "onChange" | "defaultValue"
  > {
  mode: M;
  value?: ValueForMode<M>;
  defaultValue?: ValueForMode<M>;
  onChange?: (value: ValueForMode<M>) => void;
  clearable?: boolean;
  startIcon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  startIconProps?: React.HTMLAttributes<SVGSVGElement> & { className?: string };
  endIcon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  endIconProps?: React.HTMLAttributes<SVGSVGElement> & { className?: string };
  placeholder?: string;
  calendarProps?: React.ComponentProps<typeof DayPicker>;
}

export function UnifiedDatePicker<M extends Mode = "single">({
  mode,
  value,
  defaultValue,
  onChange,
  clearable = true,
  startIcon,
  startIconProps,
  endIcon,
  endIconProps,
  calendarProps,
  placeholder = "Select date",
  className,
  ...props
}: BaseProps<M>) {
  const [open, setOpen] = React.useState(false);
  const [internalDate, setInternalDate] = React.useState<ValueForMode<M>>(
    () => value ?? defaultValue ?? (undefined as ValueForMode<M>),
  );
  React.useEffect(() => {
    if (value !== undefined) {
      setInternalDate(value);
    }
  }, [value]);

  const handleSelect = (date: ValueForMode<M>) => {
    setInternalDate(date as ValueForMode<M>);
    onChange?.(date);
    if (mode === "single") {
      setOpen(false);
    }
  };

  const handleClear = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    setInternalDate(undefined as ValueForMode<M>);
    onChange?.(undefined as ValueForMode<M>);
  };

  const getDisplayText = (
    value: Date | Date[] | DateRange | undefined,
  ): string => {
    if (!value) return placeholder;

    if (mode === "single" && value instanceof Date) {
      return value.toLocaleDateString();
    }

    if (mode === "multiple" && Array.isArray(value)) {
      return value.length > 0
        ? value.map((d) => d.toLocaleDateString()).join(", ")
        : placeholder;
    }

    if (mode === "range" && typeof value === "object" && "from" in value) {
      if (value.from && value.to) {
        return `${value.from.toLocaleDateString()} - ${value.to.toLocaleDateString()}`;
      }
      return value.from?.toLocaleDateString() ?? placeholder;
    }

    return placeholder;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          id={props?.id || "date-picker"}
          className={cn(
            "relative flex cursor-pointer items-center [&_svg]:size-5",
            "rounded-md outline-none",
            "focus-visible:border-ring focus-visible:border-primary h-10 border",
            "focus-visible:ring-primary/50 focus-visible:ring-[3px]",
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="calendar-popover"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpen(false);
              e.stopPropagation();
            }
          }}
          {...props}
        >
          {startIcon && (
            <InputIcon icon={startIcon} position="left" {...startIconProps} />
          )}
          {endIcon ? (
            <InputIcon icon={endIcon} position="right" {...endIconProps} />
          ) : (
            <InputIcon
              icon={
                <div className="cursor-pointer space-x-1">
                  {clearable && internalDate && (
                    <XMarkIcon
                      tabIndex={0}
                      role="button"
                      aria-label="Clear date"
                      className="hover:text-foreground text-muted-foreground ml-auto cursor-pointer"
                      onClick={handleClear}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          handleClear(e);
                        }
                      }}
                    />
                  )}
                  <ChevronDownIcon />
                </div>
              }
              position="right"
              {...endIconProps}
            />
          )}
          <span
            className={inputVariants({
              withStartIcon: !!startIcon,
              withEndIcon: true,
              className: cn(
                "!block h-full truncate border-0 text-left",
                clearable && "pe-15",
              ),
            })}
          >
            {getDisplayText(internalDate)}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto overflow-hidden p-0"
        align="start"
        id="calendar-popover"
        role="dialog"
        aria-modal="true"
      >
        {mode === "single" && (
          <Calendar
            {...calendarProps}
            mode="single"
            selected={internalDate as unknown as Date | undefined}
            onSelect={handleSelect as (date: Date | undefined) => void}
            captionLayout="dropdown"
          />
        )}
        {mode === "multiple" && (
          <Calendar
            {...calendarProps}
            mode="multiple"
            selected={internalDate as Date[] | undefined}
            onSelect={handleSelect as (dates: Date[] | undefined) => void}
            captionLayout="dropdown"
          />
        )}
        {mode === "range" && (
          <Calendar
            {...calendarProps}
            mode="range"
            selected={internalDate as DateRange | undefined}
            onSelect={handleSelect as (range: DateRange | undefined) => void}
            captionLayout="dropdown"
          />
        )}
      </PopoverContent>
    </Popover>
  );
}
