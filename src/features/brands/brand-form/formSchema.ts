import type { FormFieldConfig } from "@/components/ui/form";

export type BrandFormData = {
  brandName: string;
  businessType: string;
  category: string;
  registeredBusinessNumber: string;
  taxIdNumber: string;
  establishedIn: string;
  website: string;
  description: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  sendPassword: boolean;
  password: string;
  confirmPassword: string;
  country: string;
  state: string;
  city: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
};

export type BrandFormSchema = Record<string, FormFieldConfig<BrandFormData>[]>;

export const brandFormSchema: BrandFormSchema = {
  brand_information: [
    {
      type: "text",
      name: "brandName",
      label: "Brand Name",
      placeholder: "Enter brand name",
    },
    {
      type: "select",
      name: "businessType",
      label: "Business Type",
      placeholder: "Select business type",
      options: [
        { label: "Private", value: "private" },
        { label: "Public", value: "public" },
      ],
    },
    {
      type: "select",
      name: "category",
      label: "Category",
      placeholder: "Enter category",
      options: [
        { label: "Skincare", value: "skincare" },
        { label: "Healthcare", value: "healthcare" },
      ],
    },
    {
      type: "text",
      name: "registeredBusinessNumber",
      label: "Registered Business Number",
      placeholder: "Enter registered business number",
    },
    {
      type: "text",
      name: "taxIdNumber",
      label: "Tax Identification Number",
      placeholder: "Enter tax identification number",
    },
    {
      type: "text",
      name: "establishedIn",
      label: "Established In",
      placeholder: "Enter established in",
    },
    {
      type: "text",
      name: "website",
      label: "Website",
      placeholder: "Enter website",
      className: "md:col-span-3",
    },
    {
      type: "textarea",
      name: "description",
      label: "Description",
      placeholder: "Enter description",
      className: "md:col-span-3",
    },
  ],
  personal_information: [
    {
      type: "text",
      name: "firstName",
      label: "First Name",
      placeholder: "Enter first name",
    },
    {
      type: "text",
      name: "lastName",
      label: "Last Name",
      placeholder: "Enter last name",
    },
    {
      type: "text",
      name: "email",
      label: "Email",
      placeholder: "Enter email",
    },
    {
      type: "text",
      name: "phoneNo",
      label: "Phone No",
      placeholder: "Enter phone no",
    },
  ],
  password: [
    {
      type: "checkbox",
      name: "sendPassword",
      label: "Send the password via email",
      className: "md:col-span-3",
    },
    {
      type: "password",
      name: "password",
      label: "Password",
      placeholder: "Enter password",
    },
    {
      type: "password",
      name: "confirmPassword",
      label: "Confirm Password",
      placeholder: "Confirm password",
    },
  ],
  address: [
    {
      type: "select",
      name: "country",
      label: "Country",
      placeholder: "Select country",
      options: [
        { label: "India", value: "IN" },
        { label: "United States", value: "US" },
      ],
    },
    {
      type: "select",
      name: "state",
      label: "State",
      placeholder: "Select state",
      options: [
        { label: "Delhi", value: "DL" },
        { label: "California", value: "CA" },
      ],
    },
    { type: "text", name: "city", label: "City", placeholder: "Enter city" },
    {
      type: "text",
      name: "addressLine1",
      label: "Line 1",
      placeholder: "Enter address line 1",
    },
    {
      type: "text",
      name: "addressLine2",
      label: "Line 2",
      placeholder: "Enter address line 2",
    },
    {
      type: "text",
      name: "postalCode",
      label: "Postal Code",
      placeholder: "Enter postal code",
    },
  ],
};
