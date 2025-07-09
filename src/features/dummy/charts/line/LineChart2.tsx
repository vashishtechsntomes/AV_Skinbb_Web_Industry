import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];
const config = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const LineChart2 = () => {
  return (
    <div>
      <ChartContainer
        config={config}
        className="h-full w-full"
        // responsiveProps={{ height: 160 }}
      >
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={
            {
              // left: 0,
              // right: 0,
            }
          }
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
            // dot={true}
          />
          <Line
            dataKey="mobile"
            type="linear"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            // dot={true}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
};

export default LineChart2;
