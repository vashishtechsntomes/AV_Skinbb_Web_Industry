import LineChart, {
  type LineChartWrapperProps,
} from "@/components/charts/LineChart";
import { BlobIcon } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig } from "@/components/ui/chart";
import { DatePicker } from "@/components/ui/date-picker";
import { StatCard, StatValue, type StatValueProps } from "@/components/ui/stat";
import { PageContent } from "@/components/ui/structure";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ROUTES } from "@/routes/routes.constant";
import { cn } from "@/utils";
import {
  CalendarDateRangeIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { type ComponentProps, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router";
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
    label: "Impression",
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
    label: "Clicks",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const chartData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
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

  const SharedLineProps: LineChartWrapperProps = {
    data: [],
    config: {},
    lineProps: [],
    xAxisProps: {
      // height: 20,
      // axisLine: true,
    },
    yAxisProps: {
      hide: true,
    },
    chartProps: {
      margin: { left: 0, right: 0 },
    },
    cartesianGridProps: {
      vertical: true,
      horizontal: false,
      strokeDasharray: "3 3",
    },
  };
  return (
    <div>
      <PageContent
        header={{
          title: "Brand Analytics",
          description: `Dive into user behavior, demographics,
and performance`,
          actions: (
            <div className="flex gap-4">
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
        <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-3">
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
              contentProps={{ className: "px-0" }}
            >
              <LineChart
                {...SharedLineProps}
                config={impressionChartConfig}
                data={impressionChartData}
                lineProps={[
                  {
                    dataKey: "desktop",
                  },
                ]}
              />
            </StatChart>
          </div>
          <StatChart
            name="Clicks"
            value={"6,200"}
            change={1.3}
            className=""
            contentProps={{ className: "px-0 w-full h-full" }}
          >
            <LineChart
              {...SharedLineProps}
              config={clickChartConfig}
              data={clickChartData}
              lineProps={[
                {
                  dataKey: "desktop",
                },
              ]}
            />
          </StatChart>
          <StatChart
            name="Sales"
            value={"₹18.2L"}
            change={9.4}
            contentProps={{ className: "px-0 flex-1 flex flex-col" }}
          >
            <div className="mb-5 flex justify-between gap-4 px-5">
              <StatValue title={"Net Sales"} value={"₹16.1L"} />
              <StatValue title={"Returns / RTO"} value={"₹2.1L"} />
            </div>

            <div className="flex-1">
              <LineChart
                {...SharedLineProps}
                config={chartConfig}
                data={chartData}
                lineProps={[
                  {
                    dataKey: "desktop",
                  },
                  {
                    dataKey: "mobile",
                  },
                ]}
              ></LineChart>
            </div>

            {/* <ChartContainer
              config={chartConfig}
              className=""
              // responsiveProps={{ height: 223 }}
            >
              <ReLineChart
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
                  // dot={false}
                />
                <Line
                  dataKey="mobile"
                  type="monotone"
                  stroke="var(--color-mobile)"
                  strokeWidth={2}
                  // dot={false}
                />
                <ChartLegend
                  payload={Object.entries(chartConfig).map(([key, value]) => ({
                    value: capitalize(key),
                    type: "circle",
                    color: value.color,
                  }))}
                />
              </ReLineChart>
            </ChartContainer> */}
          </StatChart>
        </div>
        <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-3">
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
  console.log("🚀 ~ contentProps:", contentProps);
  const { className: contentClassNameProps, ...contextPropsReset } =
    contentProps ?? {};
  return (
    <Card
      className={cn("flex w-full flex-col overflow-hidden", className)}
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
        className={cn("h-full w-full", contentClassNameProps)}
        {...contextPropsReset}
      >
        {children}
      </CardContent>
    </Card>
  );
};

export default BrandDashboard;
