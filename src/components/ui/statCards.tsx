import type { FC, ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  barColor: string;
  icon?: ReactNode;
}

export const StatCard: FC<StatCardProps> = ({
  title,
  value,
  barColor,
  icon,
}) => {
  return (
    <div className="bg-background flex gap-4 rounded-md px-4 py-6 shadow-md">
      <div className={`h-full w-2 rounded-md ${barColor}`}></div>
      <div className="flex-1">
        <p>{title}</p>
        <h4 className="font-bold">{value}</h4>
      </div>
      {icon && icon}
    </div>
  );
};

