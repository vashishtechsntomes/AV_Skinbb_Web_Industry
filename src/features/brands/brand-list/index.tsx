import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenuCheckboxItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { StatCard } from "@/components/ui/statCards";
import { PageContent } from "@/components/ui/structure";
import { DataTable, useTable } from "@/components/ui/table/data-table";
import type { Brand } from "@/types/brand.type";
import { formatCurrency } from "@/utils";
import { EyeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import type { ColumnDef, Table } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, type FC } from "react";

const statsData = [
  {
    title: "Listed brands",
    value: 380,
    barColor: "bg-primary",
    icon: true,
  },
  {
    title: "Inactive Brands",
    value: 350,
    barColor: "bg-blue-300",
    icon: false,
  },
  {
    title: "Total Surveys",
    value: 550,
    barColor: "bg-violet-300",
    icon: false,
  },
  {
    title: "Total Products",
    value: 860,
    barColor: "bg-red-300",
    icon: true,
  },
];

export const brandData: Brand[] = [
  {
    id: 1,
    name: "The Derma",
    category: "Sensitive Skin",
    image: "https://images.thedermaco.com/TheDermaCoLogo2-min.png",
    status: "active",
    products: 50,
    surveys: 50,
    promotions: 50,
    earnings: 125500,
  },
  {
    id: 2,
    name: "Glow Essentials",
    category: "Oily Skin",
    image:
      "https://glow-essentials.com/cdn/shop/files/1_8d8dcce1-c8f8-4b82-a871-9144ca10035b_360x.png",
    status: "inactive",
    products: 32,
    surveys: 25,
    promotions: 12,
    earnings: 64040,
  },
  {
    id: 3,
    name: "AcneFix Labs",
    category: "Acne Treatment",
    image:
      "https://www.acnefix.com/cdn/shop/files/ACNEFIX_logo_black_web_ready.png?height=168&v=1681153016",
    status: "active",
    products: 35,
    surveys: 42,
    promotions: 20,
    earnings: 94002,
  },
  {
    id: 4,
    name: "SkinScience Pro",
    category: "Medical Skincare",
    image:
      "https://skinscience.md/wp-content/uploads/2022/07/ss-logo-2022-retina.png",
    status: "inactive",
    products: 40,
    surveys: 38,
    promotions: 15,
    earnings: 87000,
  },
  {
    id: 5,
    name: "EpiGlow",
    category: "Pigmentation Care",
    image:
      "https://images.apollo247.in/images/pharmacy_logo.svg?tr=q-80,w-100,dpr-2,c-at_max",
    status: "active",
    products: 28,
    surveys: 30,
    promotions: 18,
    earnings: 65000,
  },
  {
    id: 6,
    name: "RejuvaDerm",
    category: "Anti-Aging",
    image:
      "https://www.rejuvaderm.ca/wp-content/uploads/2024/04/logonew@1x.png",
    status: "active",
    products: 60,
    surveys: 55,
    promotions: 40,
    earnings: 160000,
  },
  {
    id: 7,
    name: "RejuvaDerm1",
    category: "Anti-Aging",
    image:
      "https://www.rejuvaderm.ca/wp-content/uploads/2024/04/logonew@1x.png",
    status: "active",
    products: 60,
    surveys: 55,
    promotions: 40,
    earnings: 160000,
  },
  {
    id: 8,
    name: "RejuvaDerm2",
    category: "Anti-Aging",
    image:
      "https://www.rejuvaderm.ca/wp-content/uploads/2024/04/logonew@1x.png",
    status: "active",
    products: 60,
    surveys: 55,
    promotions: 40,
    earnings: 160000,
  },
];

const columns: ColumnDef<Brand>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ getValue }) => <div>{getValue() as string}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <StatusBadge module="brand" status={row.original.status} />;
    },
  },
  {
    accessorKey: "products",
    header: "Products",
    meta: {
      type: "number",
    },
  },
  {
    accessorKey: "surveys",
    header: "Surveys",
  },
  {
    accessorKey: "promotions",
    header: "Promotions",
  },
  {
    accessorKey: "earnings",
    header: "Earnings",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("earnings"));
      return formatCurrency(amount, { useAbbreviation: false });
    },
  },
  {
    header: "Action",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const _payment = row.original;
      return (
        <Button variant="ghost" size="icon" className="">
          <span className="sr-only">Open Brand Details</span>
          <EyeIcon />
        </Button>
      );
    },
  },
];
const BrandList = () => {
  const { table } = useTable({
    rows: brandData,
    columns,
    // pageSize: 10,
    // filterableKeys: ["name", "email"],
  });

  return (
    <PageContent
      header={{
        title: "Brands",
        description: "Discover top brands from around the world.",
        actions: <Button color={"primary"}>Add Brand</Button>,
      }}
    >
      <section className="grid grid-cols-2 gap-2 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
        {statsData.map((item, index) => (
          <StatCard
            key={index}
            title={item.title}
            value={item.value}
            barColor={item.barColor}
          />
        ))}
      </section>
      <div className="flex items-center justify-between">
        <div></div>
        <div className="flex flex-wrap gap-2 md:gap-4">
          <Input
            startIcon={<MagnifyingGlassIcon />}
            placeholder="Search..."
            onChange={(event) => table?.setGlobalFilter(event.target.value)}
            className="max-w-52"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outlined" className="ml-auto">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                ?.getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="bg-background1 shadow-lg1 overflow-hidden rounded-md">
        <DataTable table={table} />
        {/* <DataTable
          ref={tableRef}
          columns={columns}
          rows={brandData}
          pageSize={5}
          containerProps={{
            className: "rounded-md",
          }}
          // filterableKeys={["products"]}
        /> */}
      </div>
      <section className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
        {brandData.map((brand) => (
          <BrandCard key={brand.name} brand={brand} />
        ))}
      </section>
      ``
    </PageContent>
  );
};

export default BrandList;

interface StatProps {
  label: string;
  value: string | number;
}

const Stat: FC<StatProps> = ({ label, value }) => (
  <div>
    <p className="text-sm">{label}</p>
    <p className="text-foreground font-medium">{value}</p>
  </div>
);

interface BrandCardProps {
  brand: Brand;
}

export const BrandCard: FC<BrandCardProps> = ({ brand }) => {
  return (
    <article className="bg-background flex flex-col gap-4 rounded-md p-5 shadow-md">
      <header className="flex items-center gap-2">
        <img
          src={brand.image}
          alt={`${brand.name} logo`}
          className="h-15 w-15 rounded-md border object-contain p-1"
        />
        <div>
          <h6 className="font-medium">{brand.name}</h6>
          <p>{brand.category}</p>
        </div>
      </header>

      <hr />

      <section className="flex justify-around gap-2 text-center">
        <Stat label="Products" value={brand.products} />
        <Stat label="Surveys" value={brand.surveys} />
        <Stat label="Promotions" value={brand.promotions} />
      </section>

      <hr />

      <section className="flex justify-around gap-2 text-center">
        <Stat label="Earnings" value={`₹${brand.earnings.toLocaleString()}`} />
        <div>
          <p className="text-sm">Status</p>
          <StatusBadge module="brand" status={brand.status} />
        </div>
      </section>
    </article>
  );
};
