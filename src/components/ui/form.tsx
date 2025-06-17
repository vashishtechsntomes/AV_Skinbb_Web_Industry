import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type Control,
  type ControllerFieldState,
  type ControllerProps,
  type ControllerRenderProps,
  type FieldPath,
  type FieldValues,
  type RegisterOptions,
  type UseFormStateReturn,
} from "react-hook-form";

import { Label } from "@/components/ui/label";
import { cn } from "@/utils/index";
import { Checkbox } from "./checkbox";
import { Input, type InputProps } from "./input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  type SelectTriggerProps,
} from "./select";
import { Textarea, type TextareaProps } from "./textarea";

const Form = FormProvider;

type FormFieldContextValue<
  T extends FieldValues = FieldValues,
  N extends FieldPath<T> = FieldPath<T>,
> = {
  name: N;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

const FormField = <
  T extends FieldValues = FieldValues,
  N extends FieldPath<T> = FieldPath<T>,
>({
  ...props
}: ControllerProps<T, N>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState } = useFormContext();

  if (!fieldContext?.name) {
    throw new Error("useFormField must be used within a <FormField>");
  }

  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);
  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn("data-[error=true]:text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField();
  const content = error ? String(error?.message ?? "") : props.children;

  if (!content) return null;

  return (
    <p
      id={formMessageId}
      data-slot="form-message"
      className={cn("text-destructive text-sm", className)}
      {...props}
    >
      {content}
    </p>
  );
}

const INPUT_TYPES = {
  TEXT: "text",
  TEXTAREA: "textarea",
  CHECKBOX: "checkbox",
  PASSWORD: "password",
  FILE: "file",
  SELECT: "select",
  CUSTOM: "custom",
} as const;

interface BaseInputProps<T extends FieldValues, N extends FieldPath<T>>
  extends React.ComponentProps<"div"> {
  control: Control<T>;
  name: N;
  label?: string;
  description?: string;
  placeholder?: string;
  rules?: RegisterOptions<T, N>;
  formControlProps?: React.HTMLAttributes<HTMLDivElement>;
  disabled?: boolean;
  readOnly?: boolean;
}

type StandardInputProps = InputProps &
  TextareaProps &
  React.ComponentProps<typeof CheckboxPrimitive.Root>;

export type SelectOption = { value: string; label: string };
type SelectProps<
  T extends FieldValues,
  N extends FieldPath<T>,
> = BaseInputProps<T, N> & {
  type: typeof INPUT_TYPES.SELECT;
  options: SelectOption[];
  inputProps?: SelectTriggerProps;
};

type NonSelectProps<
  T extends FieldValues,
  N extends FieldPath<T>,
> = BaseInputProps<T, N> & {
  type:
    | typeof INPUT_TYPES.TEXT
    | typeof INPUT_TYPES.TEXTAREA
    | typeof INPUT_TYPES.CHECKBOX
    | typeof INPUT_TYPES.PASSWORD
    | typeof INPUT_TYPES.FILE;
  inputProps?: StandardInputProps;
};

// Custom element props
type CustomProps<
  T extends FieldValues,
  N extends FieldPath<T>,
> = BaseInputProps<T, N> & {
  type: "custom";
  render: (args: {
    field: ControllerRenderProps<T, N>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<T>;
  }) => React.ReactNode;
  inputProps?: never;
};

export type FormInputProps<T extends FieldValues, N extends FieldPath<T>> =
  | SelectProps<T, N>
  | NonSelectProps<T, N>
  | CustomProps<T, N>;

export type FormFieldConfig<T extends FieldValues> =
  | Omit<SelectProps<T, FieldPath<T>>, "control">
  | Omit<NonSelectProps<T, FieldPath<T>>, "control">
  | Omit<CustomProps<T, FieldPath<T>>, "control">;

function FormInput<T extends FieldValues, N extends FieldPath<T>>({
  control,
  name,
  type = INPUT_TYPES.TEXT,
  label = "",
  description = "",
  placeholder = "",
  rules,
  formControlProps,
  inputProps,
  className,
  disabled,
  readOnly,
  ...rest
}: FormInputProps<T, N>) {
  const inputId = React.useId();
  const { setValue } = useFormContext();

  const formItemPropsClass = cn(
    type === "checkbox" && "flex items-center flex-row-reverse justify-end",
    className,
  );

  function renderElement({
    field,
    formState,
    fieldState,
  }: {
    field: ControllerRenderProps<T, N>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<T>;
  }) {
    const sharedProps = {
      id: inputId,
      placeholder,
      disabled,
      readOnly,
      ...field,
    };

    if (type === INPUT_TYPES.TEXTAREA)
      return (
        <FormControl {...formControlProps}>
          <Textarea
            {...sharedProps}
            {...(inputProps as NonSelectProps<T, N>["inputProps"])}
          />
        </FormControl>
      );
    if (type === INPUT_TYPES.CHECKBOX)
      return (
        <FormControl {...formControlProps}>
          <Checkbox
            checked={field.value}
            onCheckedChange={field.onChange}
            {...sharedProps}
            {...(inputProps as NonSelectProps<T, N>["inputProps"])}
          />
        </FormControl>
      );
    if (type === INPUT_TYPES.SELECT)
      return (
        <Select onValueChange={field.onChange} value={field.value}>
          <FormControl {...formControlProps}>
            <SelectTrigger {...(inputProps as SelectProps<T, N>["inputProps"])}>
              <SelectValue {...sharedProps} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {"options" in rest &&
              rest?.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      );

    if (type === INPUT_TYPES.CUSTOM)
      return "render" in rest && rest?.render({ field, formState, fieldState });

    return (
      <FormControl {...formControlProps}>
        <Input
          type={type}
          {...sharedProps}
          {...field}
          onChange={(e) => {
            field.onChange(e);
            if (type === INPUT_TYPES.FILE) {
              setValue(`${String(name)}_files`, e.target.files);
            }
          }}
          {...(inputProps as InputProps)}
        />
      </FormControl>
    );
  }

  return (
    <FormField
      control={control}
      name={name}
      rules={rules}
      render={({ field, formState, fieldState }) => (
        <FormItem className={formItemPropsClass} {...rest}>
          {label && <FormLabel htmlFor={inputId}>{label}</FormLabel>}
          {renderElement({ field, formState, fieldState })}
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}


export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
};
