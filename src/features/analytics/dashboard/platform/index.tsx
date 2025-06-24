import { StatCard } from "@/components/ui/stat";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  LabelList,
  Pie,
  PieChart,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  type ResponsiveContainerProps,
} from "recharts";

import { BlobIcon, Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { PageContent } from "@/components/ui/structure";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DASHBOARD_ROUTES } from "@/routes/dashboard.routes";
import { cn } from "@/utils";
import {
  CalendarDaysIcon,
  FunnelIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useState, type ComponentProps } from "react";
import { useLocation, useNavigate } from "react-router";
import { AnalyticsFilterForm } from "./AnalyticsFilterForm";

const genderData = [
  { key: "male", value: 275, fill: "var(--chart-1)" },
  { key: "female", value: 200, fill: "var(--chart-2)" },
  { key: "unknown", value: 187, fill: "var(--chart-3)" },
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
    label: "value",
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
  {
    dry: 1260,
    normal: 570,
    oily: 890,
    combination: 420,
    unknown: 130,
  },
];
const skinChartConfig = {
  dry: {
    label: "Dry",
    color: "var(--chart-1)",
  },
  normal: {
    label: "Normal",
    color: "var(--chart-2)",
  },
  oily: {
    label: "Oily",
    color: "var(--chart-3)",
  },
  combination: {
    label: "Combination",
    color: "var(--chart-4)",
  },
  unknown: {
    label: "Unknown",
    color: "var(--chart-5)",
  },
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
  {
    // name: "Usage",
    acne: 1260,
    dullness: 570,
    roughness: 890,
    wrinkles: 420,
    // "sagging skin": 130,
  },
];
const concernChartConfig = {
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
  const totalVisitors = skinChartData[0].dry + skinChartData[0].normal;

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
                value={`${DASHBOARD_ROUTES.analytics}${DASHBOARD_ROUTES.analyticsPlatform}`}
                aria-label="Toggle Platform"
              >
                Platform
              </ToggleGroupItem>
              <ToggleGroupItem
                className="aspect-auto h-full flex-auto px-3"
                value={`${DASHBOARD_ROUTES.analytics}${DASHBOARD_ROUTES.analyticsBrand}`}
                aria-label="Toggle Brand"
              >
                Brand
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        ),
      }}
    >
      {isFilter && (
        <>
          <AnalyticsFilterForm onSubmit={onSubmit} />
        </>
      )}

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
      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
        <StatChart
          name="Gender Distribution"
          config={genderConfig}
          containerClassName="[&_.recharts-text]:fill-foreground mx-auto"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="key" hideLabel />}
            />
            <Pie data={genderData} dataKey="value" label nameKey="key">
              <LabelList
                dataKey="key"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof genderConfig) =>
                  genderConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </StatChart>
        <StatChart name="Age Distribution" config={ageChartConfig}>
          <BarChart
            data={ageChartData}
            barGap={0}
            barCategoryGap="0"
            margin={{ top: 10, right: 0, left: 0, bottom: 10 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="key"
              tickLine={false}
              axisLine={false}
              height={10}
            />
            <YAxis tickLine={false} axisLine={false} width={30} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent nameKey="key" />}
            />
            <Bar
              dataKey="value"
              fill="var(--color-primary)"
              barSize={20}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </StatChart>
        <StatChart
          name="Skin Type Distribution"
          config={skinChartConfig}
          containerClassName="mx-auto !p-0 !m-0"
        >
          <RadialBarChart
            data={skinChartData}
            cy="90%"
            endAngle={180}
            innerRadius={100}
            outerRadius={150}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Total Count
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>

            {Object.entries(skinChartConfig).map(([key, value]) => (
              <RadialBar
                key={key}
                dataKey={key}
                stackId="a"
                cornerRadius={3}
                fill={value?.color}
                className="stroke-transparent stroke-2"
              />
            ))}

            <ChartLegend
              iconSize={15}
              align="center"
              verticalAlign="top"
              wrapperStyle={{ marginTop: 10 }}
              payload={Object.entries(skinChartConfig).map(([key, value]) => ({
                value: key,
                type: "circle",
                color: value.color,
              }))}
            />
          </RadialBarChart>
        </StatChart>
        <StatChart
          name="Concern Distribution"
          config={concernChartConfig}
          containerClassName="mx-auto aspect-square w-full !p-0 !m-0"
        >
          <RadialBarChart
            data={concernChartData}
            innerRadius={80}
            outerRadius={130}
            cy="60%"
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <ChartLegend
              iconSize={15}
              align="center"
              verticalAlign="top"
              payload={Object.entries(concernChartConfig).map(
                ([key, value]) => ({
                  value: key,
                  type: "circle",
                  color: value.color,
                }),
              )}
            />

            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy || 0}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 16}
                          className="fill-muted-foreground"
                        >
                          Total Count
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>

            {Object.entries(concernChartConfig).map(([key, value]) => (
              <RadialBar
                key={key}
                dataKey={key}
                stackId="a"
                cornerRadius={3}
                fill={value?.color}
                className="stroke-transparent stroke-2"
              />
            ))}
          </RadialBarChart>
        </StatChart>
        <StatChart
          name="State Distribution"
          config={stateChartConfig}
          className="col-span-2 md:aspect-auto"
          containerClassName="mx-auto w-full overflow-auto !p-0 !m-0"
          responsiveProps={{}}
        >
          <BarChart
            accessibilityLayer
            barCategoryGap="20%"
            data={stateChartData}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="key"
              tickLine={false}
              axisLine={false}
              height={15}
            />
            <YAxis tickLine={false} axisLine={false} width={22} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent nameKey="key" />}
            />
            <Bar
              dataKey="value"
              fill="var(--color-primary)"
              barSize={10}
              radius={[8, 8, 0, 0]}
            >
              {/* <LabelList
                dataKey="value"
                position="top"
                offset={8}
                className="fill-(--color-label)"
              /> */}
            </Bar>
          </BarChart>
        </StatChart>
      </div>
    </PageContent>
  );
};

const StatChart = ({
  name,
  children,
  config,
  containerClassName,
  className,
  responsiveProps,
}: {
  config: ChartConfig;
  name: string;
  containerClassName?: string;
  className?: string;
  children: ComponentProps<typeof ResponsiveContainer>["children"];
  responsiveProps?: Omit<ResponsiveContainerProps, "children">;
}) => {
  return (
    <Card
      className={cn("flex max-h-86 min-h-82 max-w-full flex-col", className)}
    >
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-muted-foreground text-lg leading-none">
          {name}
        </CardTitle>
      </CardHeader>
      <hr className="mx-4" />
      <CardContent className="flex-1 overflow-x-auto">
        <ChartContainer
          config={config}
          className={cn("h-full w-full", containerClassName)}
          responsiveProps={responsiveProps as ResponsiveContainerProps}
        >
          {children}
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PlatformDashboard;
