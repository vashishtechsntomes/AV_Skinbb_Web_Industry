import { StatChartCard } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

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
const surveyProgressionChartData = [
  { key: "Opened", value: 141 },
  { key: "Started", value: 159 },
  { key: "Completed", value: 126 },
];
const surveyProgressionChartConfig = {
  value: {
    label: "value",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const SurveySummary = () => {
  return (
    <div className="grid grid-cols-3 gap-5">
      <StatChartCard name="Survey Progression">
        <ChartContainer
          config={surveyProgressionChartConfig}
          className={"h-full w-full"}
        >
          <BarChart
            data={surveyProgressionChartData}
            barGap={0}
            barCategoryGap="20%"
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
              //   barSize={40}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </StatChartCard>
      <StatChartCard name="Gender Distribution">
        <ChartContainer config={genderConfig} className={"h-full w-full"}>
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
        </ChartContainer>
      </StatChartCard>

      <StatChartCard name="Gender Distribution">
        <ChartContainer config={ageChartConfig} className={"h-full w-full"}>
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
        </ChartContainer>
      </StatChartCard>
    </div>
  );
};

export default SurveySummary;
