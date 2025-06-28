import HalfDonutChart from "@/components/charts/HalfDonutChart";
import { type ChartConfig } from "@/components/ui/chart";

const chartData = [
  {
    key: "male",
    value: 275,
    fill: "var(--chart-1)",
    // showKey: true,
    // showValue: false,
  },
  {
    key: "female",
    value: 200,
    fill: "var(--chart-2)",
    // showKey: true,
    // showValue: false,
  },
  {
    key: "unknown",
    value: 187,
    fill: "var(--chart-3)",
    // showKey: true,
    // showValue: false,
  },
];
const config = {
  value: {
    label: "Total",
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

const RadialChart1 = () => {
  return (
    <div>
      <HalfDonutChart
        // className="[&_.recharts-pie-label-text]:!fill-foreground"
        config={config}
        data={chartData}
        // showLegend={false}
        showTooltip={false}
        // showLabels={false}
        // showActive={false}
      />
    </div>
  );
};

export default RadialChart1;
