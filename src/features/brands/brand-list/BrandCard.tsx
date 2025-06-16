import { StatusBadge } from "@/components/ui/badge";
import type { Brand } from "@/types/brand.type";
import { memo, type FC } from "react";

const Stat = memo(
  ({ label, value }: { label: string; value: string | number }) => (
    <div>
      <p className="text-sm">{label}</p>
      <p className="text-foreground font-medium">{value}</p>
    </div>
  ),
);
Stat.displayName = "Stat";

interface BrandCardProps {
  brand: Brand;
}

export const BrandCard: FC<BrandCardProps> = ({ brand }) => {
  return (
    <article className="bg-background hover:ring-primary flex flex-col gap-4 rounded-md p-5 shadow-md hover:ring-3">
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
