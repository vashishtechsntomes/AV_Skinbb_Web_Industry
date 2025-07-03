import DonutPieChart from "@/components/charts/DonutPieChart";
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

const DonutPieChart6 = () => {
  return (
    <DonutPieChart
      pieProps={{
        innerRadius: 60,
        paddingAngle: 5,
      }}
      config={config}
      data={chartData}
      showTooltip={false}
      showLegend={true}
      showFullDonut={true}
    />
  );
};

export default DonutPieChart6;
