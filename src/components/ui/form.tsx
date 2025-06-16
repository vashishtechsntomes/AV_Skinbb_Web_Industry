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
  type Path,
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
} from "./select";
import { Textarea, type TextareaProps } from "./textarea";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
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
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

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
  const body = error ? String(error?.message ?? "") : props.children;

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-destructive text-sm", className)}
      {...props}
    >
      {body}
    </p>
  );
}

interface BaseProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> extends React.ComponentProps<"div"> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  description?: string;
  placeholder?: string;
  rules?: RegisterOptions<TFieldValues, TName>;
  inputProps?: InputProps & TextareaProps;
  formControlProps?: React.HTMLAttributes<HTMLDivElement>;
}

type SelectProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = BaseProps<TFieldValues, TName> & {
  type: "select";
  options: { value: string; label: string }[];
};

type NonSelectProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = BaseProps<TFieldValues, TName> & {
  type: "text" | "textarea" | "checkbox" | "password";
};

// Custom element props
type CustomProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = BaseProps<TFieldValues, TName> & {
  type: "custom";
  render: (args: {
    field: ControllerRenderProps<TFieldValues, TName>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<TFieldValues>;
  }) => React.ReactNode;
};

export type FormInputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> =
  | SelectProps<TFieldValues, TName>
  | NonSelectProps<TFieldValues, TName>
  | CustomProps<TFieldValues, TName>;

export type FormFieldConfig<TFieldValues extends FieldValues> =
  | Omit<SelectProps<TFieldValues, FieldPath<TFieldValues>>, "control">
  | Omit<NonSelectProps<TFieldValues, FieldPath<TFieldValues>>, "control">
  | Omit<CustomProps<TFieldValues, FieldPath<TFieldValues>>, "control">;

function FormInput<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(props: FormInputProps<TFieldValues, TName>) {
  const inputId = React.useId();
  const {
    control,
    name,
    type = "text",
    label = "",
    description = "",
    placeholder = "",
    rules,
    formControlProps,
    inputProps,
    className,
    ...rest
  } = props;

  const formItemPropsClass = cn(
    type === "checkbox" && "flex items-center flex-row-reverse justify-end",
    className,
  );

  return (
    <FormField
      control={control}
      name={name}
      rules={rules}
      render={({ field, formState, fieldState }) => (
        <FormItem className={formItemPropsClass} {...rest}>
          {label && <FormLabel htmlFor={inputId}>{label}</FormLabel>}

          {(type === "text" || type === "password") && (
            <FormControl {...formControlProps}>
              <Input
                id={inputId}
                type={type}
                placeholder={placeholder}
                {...field}
                {...inputProps}
              />
            </FormControl>
          )}

          {type === "textarea" && (
            <FormControl {...formControlProps}>
              <Textarea
                id={inputId}
                {...field}
                placeholder={placeholder}
                {...inputProps}
              />
            </FormControl>
          )}

          {type === "checkbox" && (
            <FormControl {...formControlProps}>
              <Checkbox
                id={inputId}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          )}

          {type === "select" && (
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl {...formControlProps}>
                <SelectTrigger>
                  <SelectValue id={inputId} placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {"options" in props &&
                  props?.options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          )}

          {type === "custom" &&
            "render" in props &&
            props?.render({ field, formState, fieldState })}

          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

interface FormConditionRenderProps<TFieldValues extends FieldValues>
  extends React.ComponentProps<"div"> {
  formSchema: FormFieldConfig<TFieldValues>[];
  control: Control<TFieldValues>;
}

function FormConditionRender<TFieldValues extends FieldValues>({
  formSchema,
  control,
  className,
  ...props
}: FormConditionRenderProps<TFieldValues>) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
      {...props}
    >
      {formSchema.map((item: FormFieldConfig<TFieldValues>) => {
        const basicProps = {
          name: item.name,
          className: item.className,
          placeholder: item.placeholder,
          label: item.label,
          control,
        };

        switch (item.type) {
          case "text":
          case "password":
          case "textarea":
          case "checkbox":
            return (
              <FormInput key={item.name} type={item.type} {...basicProps} />
            );

          case "select":
            return (
              <FormInput
                key={item.name}
                type="select"
                options={item.options}
                {...basicProps}
              />
            );

          case "custom":
            return (
              <FormInput
                key={item.name}
                type="custom"
                render={
                  (item as CustomProps<TFieldValues, Path<TFieldValues>>).render
                }
                {...basicProps}
              />
            );

          default:
            throw new Error("Unsupported input type");
        }
      })}
    </div>
  );
}

export {
  Form,
  FormConditionRender,
  FormControl,
  FormDescription,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
};
