import { Form, FormInput, type FormInputProps } from "@/components/ui/form";
import { Container, PageContent } from "@/components/ui/structure";
import {
  useForm,
  type FieldPath,
  type FieldValues,
  type Path,
} from "react-hook-form";
import {
  brandFormSchema,
  type BrandFormData,
  type BrandFormSchema,
} from "./formSchema";
import { Fragment, type ReactNode } from "react";

const BrandForm = () => {
  const form = useForm<Partial<BrandFormData>>({
    defaultValues: {},
  });
  const { control, handleSubmit } = form;

  const onSubmit = (data: unknown) => {
    console.log(data);
  };

  return (
    <PageContent header={{ title: "Add Brand" }}>
      <Container>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {brandFormSchema.map((item) => (
              <Card name={item.section}>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 ">
                  {item.fields.map((field) => (
                    <Fragment key={field.name}>
                      {field.type === "select" && (
                        <FormInput
                          control={control}
                          label={field.label}
                          type="select"
                          name={field.name as any}
                          options={field.options}
                          placeholder={field.placeholder}
                        />
                      )}

                      {["text", "password", "textarea", "checkbox"].includes(
                        field.type,
                      ) && (
                        <FormInput
                          control={control}
                          label={field.label}
                          type={
                            field.type as
                              | "text"
                              | "password"
                              | "textarea"
                              | "checkbox"
                          }
                          name={field.name as keyof BrandFormData}
                          placeholder={field.placeholder}
                        />
                      )}
                    </Fragment>
                  ))}
                </div>
              </Card>
            ))}

            {/* <Card name="Personal Information">
              {renderFields(brandFormSchema.personalInformation)}
            </Card>

            <Card name="Password">
              {renderFields(brandFormSchema.passwordInformation)}
            </Card>

            <Card name="Address">
              {renderFields(brandFormSchema.addressInformation)}
            </Card> */}

            <div className="flex justify-end gap-4">
              <button
                type="reset"
                className="rounded-md border px-6 py-2 text-sm"
              >
                Reset
              </button>
              <button
                type="submit"
                className="rounded-md bg-pink-400 px-6 py-2 text-sm text-white"
              >
                Save
              </button>
            </div>
          </form>
        </Form>
      </Container>
    </PageContent>
  );
};

function Card({ children, name }: { children: ReactNode; name: string }) {
  return (
    <section>
      <h2 className="text-lg font-medium">{name}</h2>
      <hr className="mt-2 mb-5" />
      {children}
    </section>
  );
}

export default BrandForm;
