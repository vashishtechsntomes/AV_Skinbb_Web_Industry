import PieChart from "@/components/charts/PieChart";
import {
  type ChartConfig
} from "@/components/ui/chart";

const configData = [
  { key: "male", value: 275, fill: "var(--chart-1)" },
  { key: "female", value: 200, fill: "var(--chart-2)" },
  { key: "unknown", value: 187, fill: "var(--chart-3)" },
];
const config = {
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

const PieChart4 = () => {
  return (
    <PieChart
      config={config}
      data={configData}
      showLegend={false}
      showTooltip={false}
      showLabels={true}
      showOuterLabel={false}
      showActive={false}
    />
  );
};

export default PieChart4;
