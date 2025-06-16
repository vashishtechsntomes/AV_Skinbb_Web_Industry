import { Button } from "@/components/ui/button";
import { Form, FormConditionRender } from "@/components/ui/form";
import { Container, PageContent } from "@/components/ui/structure";
import { type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { brandFormSchema, type BrandFormData } from "./formSchema";

const BrandForm = () => {
  const form = useForm<BrandFormData>({
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
            <Card name={"Brand Information"}>
              <FormConditionRender
                control={control}
                formSchema={brandFormSchema.brand_information}
              />
            </Card>
            <Card name={"Personal Information"}>
              <FormConditionRender
                control={control}
                formSchema={brandFormSchema.personal_information}
              />
            </Card>
            <Card name={"Password"}>
              <FormConditionRender
                control={control}
                formSchema={brandFormSchema.password}
                className="lg:grid-cols-2"
              />
            </Card>
            <Card name={"Address"}>
              <FormConditionRender
                control={control}
                formSchema={brandFormSchema.address}
              />
            </Card>

            <div className="flex justify-end gap-4">
              <Button
                variant={"outlined"}
                type="reset"
              >
                Reset
              </Button>
              <Button color={"primary"} type="submit">Save</Button>
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
