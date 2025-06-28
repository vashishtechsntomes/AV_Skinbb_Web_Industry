import BarChart from "@/components/charts/BarChart";
import {
  type ChartConfig
} from "@/components/ui/chart";

const chartData = [
  { key: "18–24", value: 141 },
  { key: "25–32", value: 159 },
  { key: "33–50", value: 126 },
  { key: "51–More", value: 147 },
  { key: "Unknown", value: 38 },
];
const config = {
  value: {
    label: "Age",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const BarChart4 = () => {
  return <BarChart barSize={50} config={config} data={chartData} />;
};

export default BarChart4;
