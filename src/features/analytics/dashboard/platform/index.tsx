import { StatCard } from "@/components/ui/stat";
import BarChart from "@/components/charts/BarChart";
import DonutPieChart from "@/components/charts/DonutPieChart";
import PieChart from "@/components/charts/PieChart";
import { BlobIcon, Button } from "@/components/ui/button";
import { StatChartCard } from "@/components/ui/card";
import { type ChartConfig } from "@/components/ui/chart";
import { PageContent } from "@/components/ui/structure";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ROUTES } from "@/routes/routes.constant";
import {
  CalendarDaysIcon,
  FunnelIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { AnalyticsFilterForm } from "./AnalyticsFilterForm";

const genderData = [
  { key: "male", value: 275, fill: "var(--chart-1)", showValue: false },
  { key: "female", value: 200, fill: "var(--chart-2)", showValue: false },
  { key: "unknown", value: 187, fill: "var(--chart-3)", showValue: false },
];
const genderConfig = {
  value: {
    label: "value",
  },
  male: {
    label: "Male",
  },
  female: {
    label: "Female",
  },
  unknown: {
    label: "Unknown",
  },
} satisfies ChartConfig;

const ageChartData = [
  { key: "18–24", value: 141 },
  { key: "25–32", value: 159 },
  { key: "33–50", value: 126 },
  { key: "51–More", value: 147 },
  { key: "Unknown", value: 38 },
];
const ageChartConfig = {
  value: {
    label: "Age",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const stateChartData = [
  { key: "UP", value: 220 }, // Uttar Pradesh
  { key: "MH", value: 198 }, // Maharashtra
  { key: "BR", value: 174 }, // Bihar
  { key: "WB", value: 150 }, // West Bengal
  { key: "MP", value: 139 }, // Madhya Pradesh
  { key: "TN", value: 127 }, // Tamil Nadu
  { key: "RJ", value: 120 }, // Rajasthan
  { key: "KA", value: 118 }, // Karnataka
  { key: "GJ", value: 115 }, // Gujarat
  { key: "AP", value: 110 }, // Andhra Pradesh
  { key: "TG", value: 105 }, // Telangana
  { key: "OD", value: 98 }, // Odisha
  { key: "KL", value: 92 }, // Kerala
  { key: "JH", value: 89 }, // Jharkhand
  { key: "AS", value: 87 }, // Assam
  { key: "PB", value: 82 }, // Punjab
  { key: "CT", value: 78 }, // Chhattisgarh
  { key: "HR", value: 76 }, // Haryana
  { key: "DL", value: 70 }, // Delhi
  { key: "JK", value: 60 }, // Jammu & Kashmir
  { key: "UK", value: 55 }, // Uttarakhand
  { key: "HP", value: 47 }, // Himachal Pradesh
  { key: "TR", value: 42 }, // Tripura
  { key: "ML", value: 35 }, // Meghalaya
  { key: "MN", value: 30 }, // Manipur
  { key: "NL", value: 25 }, // Nagaland
  { key: "GA", value: 22 }, // Goa
  { key: "AR", value: 20 }, // Arunachal Pradesh
  { key: "MZ", value: 18 }, // Mizoram
  { key: "SK", value: 12 }, // Sikkim
  { key: "PY", value: 10 }, // Puducherry
  { key: "CH", value: 9 }, // Chandigarh
  { key: "AN", value: 6 }, // Andaman & Nicobar Islands
  { key: "LA", value: 5 }, // Ladakh
  { key: "DN", value: 4 }, // Dadra & Nagar Haveli and Daman & Diu
  { key: "LD", value: 2 }, // Lakshadweep
  { key: "Unknown", value: 1 },
];
const stateChartConfig = {
  value: {
    label: "value",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const skinChartData = [
  { key: "dry", value: 1260, fill: "var(--chart-1)" },
  { key: "normal", value: 570, fill: "var(--chart-2)" },
  { key: "oily", value: 890, fill: "var(--chart-3)" },
  { key: "combination", value: 420, fill: "var(--chart-4)" },
  { key: "unknown", value: 130, fill: "var(--chart-5)" },
  // {
  //   dry: 1260,
  //   normal: 570,
  //   oily: 890,
  //   combination: 420,
  //   unknown: 130,
  // },
];
const skinChartConfig = {
  value: {
    label: "Total Skin Type",
    color: "var(--chart-1)",
  },
  dry: {
    label: "Dry",
  },
  normal: {
    label: "Nemale",
  },
  oily: {
    label: "Oily",
  },
  combination: {
    label: "Combination",
  },
  unknown: {
    label: "Unknown",
  },
  // dry: {
  //   label: "Dry",
  //   color: "var(--chart-1)",
  // },
  // normal: {
  //   label: "Normal",
  //   color: "var(--chart-2)",
  // },
  // oily: {
  //   label: "Oily",
  //   color: "var(--chart-3)",
  // },
  // combination: {
  //   label: "Combination",
  //   color: "var(--chart-4)",
  // },
  // unknown: {
  //   label: "Unknown",
  //   color: "var(--chart-5)",
  // },
} satisfies ChartConfig;

const statsData = [
  {
    title: "Active Users",
    value: 1250,
    barColor: "bg-primary",
    icon: <UserIcon />,
  },
  {
    title: "Number of Routines",
    value: 3400,
    barColor: "bg-blue-300",
    icon: <CalendarDaysIcon />,
  },
  {
    title: "Avg Routines per User",
    value: 1.7,
    barColor: "bg-violet-300",
    icon: <UserIcon />,
  },
  {
    title: "Avg Products of Routine",
    value: 4.3,
    barColor: "bg-red-300",
    icon: <CalendarDaysIcon />,
  },
];

const concernChartData = [
  { key: "acne", value: 1260, fill: "var(--chart-1)" },
  { key: "dullness", value: 570, fill: "var(--chart-2)" },
  { key: "roughness", value: 890, fill: "var(--chart-3)" },
  { key: "wrinkles", value: 420, fill: "var(--chart-4)" },

  // {
  //   // name: "Usage",
  //   acne: 1260,
  //   dullness: 570,
  //   roughness: 890,
  //   wrinkles: 420,
  //   // "sagging skin": 130,
  // },
];
const concernChartConfig = {
  value: {
    label: "Total Concern",
  },
  acne: {
    label: "acne",
    color: "var(--chart-1)",
  },
  dullness: {
    label: "dullness",
    color: "var(--chart-2)",
  },
  roughness: {
    label: "roughness",
    color: "var(--chart-3)",
  },
  wrinkles: {
    label: "wrinkles",
    color: "var(--chart-4)",
  },
  // "sagging skin": {
  //   label: "sagging skin",
  //   color: "var(--chart-5)",
  // },
} satisfies ChartConfig;

const PlatformDashboard = () => {
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // const totalVisitors = skinChartData[0].dry + skinChartData[0].normal;

  function onSubmit(data: {
    category: string;
    concern: string;
    skinType: string;
  }) {
    console.log("🚀 ~ onSubmit ~ data:", data);
  }

  return (
    <PageContent
      header={{
        title: "Platform Analytics",
        description: `Dive into user behavior, demographics,
and performance`,
        actions: (
          <div className="flex gap-2">
            {
              <Button
                color={isFilter ? "primary" : "default"}
                startIcon={<FunnelIcon />}
                variant={isFilter ? "contained" : "outlined"}
                onClick={() => setIsFilter((val) => !val)}
              >
                Filter
              </Button>
            }

            <ToggleGroup
              type="single"
              variant={"outlined"}
              size={"lg"}
              className="bg-card h-10"
              value={pathname}
              onValueChange={(value) => {
                if (!value) return;
                navigate(`${value}`);
              }}
            >
              <ToggleGroupItem
                className="aspect-auto h-full flex-auto px-3"
                value={`${ROUTES.ANALYTICS_PLATFORM}`}
                aria-label="Toggle Platform"
              >
                Platform
              </ToggleGroupItem>
              <ToggleGroupItem
                className="aspect-auto h-full flex-auto px-3"
                value={`${ROUTES.ANALYTICS_BRAND}`}
                aria-label="Toggle Brand"
              >
                Brand
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        ),
      }}
    >
      {isFilter && <AnalyticsFilterForm onSubmit={onSubmit} />}

      <div className="grid gap-2 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
        {statsData.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            barColor={item.barColor}
            className="relative md:flex-1"
            icon={
              item.icon && (
                <BlobIcon className="absolute right-3" icon={item.icon} />
              )
            }
          />
        ))}
      </div>
      <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2 md:grid-cols-3 md:gap-6">
        <StatChartCard name="Gender Distribution">
          <PieChart
            config={genderConfig}
            data={genderData}
            showLegend={false}
          />
        </StatChartCard>
        <StatChartCard name="Age Distribution">
          <BarChart config={ageChartConfig} data={ageChartData} />
        </StatChartCard>
        <StatChartCard name="Skin Type Distribution">
          <DonutPieChart
            config={skinChartConfig}
            data={skinChartData}
            showLegend={false}
            showOuterLabel={false}
            showTooltip={false}
            showFullDonut
          />
        </StatChartCard>
        <StatChartCard name="Concern Distribution">
          <DonutPieChart
            config={concernChartConfig}
            data={concernChartData}
            showLegend={false}
            showOuterLabel={false}
            showTooltip={false}
            showFullDonut
          />
        </StatChartCard>

        <StatChartCard name="State Distribution" className="col-span-2">
          <BarChart
            config={stateChartConfig}
            data={stateChartData}
            barSize={15}
            chartProps={{
              barGap: 20,
            }}
          />
        </StatChartCard>
      </div>
    </PageContent>
  );
};

// const StatChart = ({
//   name,
//   children,
//   config,
//   containerClassName,
//   className,
//   responsiveProps,
// }: {
//   config: ChartConfig;
//   name: string;
//   containerClassName?: string;
//   className?: string;
//   children: ComponentProps<typeof ResponsiveContainer>["children"];
//   responsiveProps?: Omit<ResponsiveContainerProps, "children">;
// }) => {
//   return (
//     <Card
//       className={cn("flex max-h-86 min-h-82 max-w-full flex-col", className)}
//     >
//       <CardHeader className="items-center pb-0">
//         <CardTitle className="text-muted-foreground text-lg leading-none">
//           {name}
//         </CardTitle>
//       </CardHeader>
//       <hr className="mx-4" />
//       <CardContent className="flex-1 overflow-x-auto">
//         <ChartContainer
//           config={config}
//           className={cn("h-full w-full", containerClassName)}
//           responsiveProps={responsiveProps as ResponsiveContainerProps}
//         >
//           {children}
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   );
// };

export default PlatformDashboard;
