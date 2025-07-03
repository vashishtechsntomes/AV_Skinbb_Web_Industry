import { BlobIcon } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { DatePicker } from "@/components/ui/date-picker";
import { StatCard, StatValue, type StatValueProps } from "@/components/ui/stat";
import { PageContent } from "@/components/ui/structure";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ROUTES } from "@/routes/routes.constant";
import { capitalize, cn } from "@/utils";
import {
  CalendarDateRangeIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { type ComponentProps, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router";
import { Area, CartesianGrid, Line, LineChart, XAxis } from "recharts";
import ActiveCarts from "./ActiveCarts";
import Products from "./Products";

const impressionChartData = [
  { month: "1 May", desktop: 186 },
  { month: "8 May", desktop: 305 },
  { month: "15 May", desktop: 237 },
  { month: "22 May", desktop: 73 },
  { month: "29 May", desktop: 209 },
];
const impressionChartConfig = {
  desktop: {
    label: "Value",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const clickChartData = [
  { month: "1 May", desktop: 186 },
  { month: "8 May", desktop: 305 },
  { month: "15 May", desktop: 237 },
  { month: "22 May", desktop: 73 },
  { month: "29 May", desktop: 209 },
];
const clickChartConfig = {
  desktop: {
    label: "Value",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const BrandDashboard = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <div>
      <PageContent
        header={{
          title: "Brand Analytics",
          description: `Dive into user behavior, demographics,
and performance`,
          actions: (
            <div className="flex gap-2">
              <DatePicker
                className="max-w-69"
                startIcon={<CalendarDateRangeIcon />}
                mode="range"
              />

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
        <div className="grid grid-cols-1 gap-2 md:gap-5 lg:grid-cols-3">
          <div className="space-y-2 md:space-y-5">
            <StatCard
              title={"Listed Products"}
              value={"150"}
              barColor={"bg-primary"}
              className="relative"
              icon={
                <BlobIcon
                  className="absolute right-3"
                  icon={<ShoppingBagIcon />}
                />
              }
            />
            <StatChart
              name="Impressions"
              value={"45,000"}
              change={20}
              className=""
              contentProps={{ className: "px-0" }}
            >
              <ChartContainer
                config={impressionChartConfig}
                className="h-full w-full"
                responsiveProps={{ height: 160 }}
              >
                <LineChart
                  accessibilityLayer
                  data={impressionChartData}
                  margin={{
                    left: 0,
                    right: 0,
                  }}
                  height={100}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                  />
                  <Line
                    dataKey="desktop"
                    type="linear"
                    stroke="var(--color-desktop)"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </StatChart>
          </div>
          <StatChart
            name="Clicks"
            value={"6,200"}
            change={1.3}
            className=""
            contentProps={{ className: "px-0" }}
          >
            <ChartContainer
              config={clickChartConfig}
              responsiveProps={{ height: 280 }}
            >
              <LineChart
                accessibilityLayer
                data={clickChartData}
                margin={{
                  left: 0,
                  right: 0,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  dataKey="desktop"
                  type="linear"
                  stroke="var(--color-desktop)"
                  strokeWidth={2}
                  dot={true}
                />
                <Area
                  dataKey="desktop"
                  type="natural"
                  fill="var(--color-desktop)"
                  fillOpacity={0.4}
                  stroke="var(--color-desktop)"
                />
              </LineChart>
            </ChartContainer>
          </StatChart>
          <StatChart
            name="Sales"
            value={"₹18.2L"}
            change={9.4}
            contentProps={{ className: "px-0" }}
          >
            <div className="mb-5 flex justify-between gap-2 px-5">
              <StatValue title={"Net Sales"} value={"₹16.1L"} />
              <StatValue title={"Returns / RTO"} value={"₹2.1L"} />
            </div>

            <ChartContainer
              config={chartConfig}
              responsiveProps={{ height: 223 }}
            >
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={
                  {
                    // left: 12,
                    // right: 12,
                  }
                }
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Line
                  dataKey="desktop"
                  type="monotone"
                  stroke="var(--color-desktop)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="mobile"
                  type="monotone"
                  stroke="var(--color-mobile)"
                  strokeWidth={2}
                  dot={false}
                />
                <ChartLegend
                  payload={Object.entries(chartConfig).map(([key, value]) => ({
                    value: capitalize(key),
                    type: "circle",
                    color: value.color,
                  }))}
                />
              </LineChart>
            </ChartContainer>
          </StatChart>
        </div>
        <div className="grid grid-cols-1 gap-2 md:gap-5 lg:grid-cols-3">
          <StatChart
            name="Active Carts"
            value={"1.2K"}
            change={3.2}
            className="col-span-3"
            contentProps={{ className: "px-0" }}
          >
            <ActiveCarts />
          </StatChart>
          <StatChart
            name={"Products Table"}
            className="col-span-3"
            contentProps={{ className: "px-0" }}
            statValueProps={{
              titleProps: {
                className: "font-medium text-foreground text-lg",
              },
            }}
          >
            <Products />
          </StatChart>
        </div>
      </PageContent>
    </div>
  );
};

interface StatChartProps extends ComponentProps<"div"> {
  name?: string;
  className?: string;
  value?: string;
  change?: number;
  children?: ReactNode;
  contentProps?: ComponentProps<"div">;
  statValueProps?: StatValueProps;
}

const StatChart = ({
  name,
  value,
  children,
  change,
  className,
  contentProps,
  statValueProps,
  ...props
}: StatChartProps) => {
  const { className: contentClassNameProps } = contentProps ?? {};
  return (
    <Card
      className={cn(
        "flex w-full max-w-full flex-col overflow-hidden",
        className,
      )}
      {...props}
    >
      <CardHeader className="items-center pb-0">
        <CardTitle className="">
          <StatValue
            title={name}
            value={value}
            change={change}
            {...statValueProps}
          />
        </CardTitle>
      </CardHeader>
      <CardContent
        className={cn("flex-1", contentClassNameProps)}
        {...contentProps}
      >
        {children}
      </CardContent>
    </Card>
  );
};

export default BrandDashboard;
