import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import PieChart from "./pie";
import { useState } from "react";
import BarChart from "./bar";
import RadialChart from "./radial";

enum CHARTTYPE {
  "pie" = "pie",
  "bar" = "bar",
  "radial" = "radial",
}
const CHARTS: (keyof typeof CHARTTYPE)[] = [
  CHARTTYPE.bar,
  CHARTTYPE.pie,
  CHARTTYPE.radial,
];

const DummyCharts = () => {
  const [activeTab, setActiveTab] = useState<CHARTTYPE>(CHARTTYPE.radial);
  return (
    <div className="">
      <br />
      <div className="flex w-full justify-center">
        <ToggleGroup
          type="single"
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as CHARTTYPE)}
        >
          {CHARTS.map((url) => (
            <ToggleGroupItem
              className="border p-5 capitalize"
              key={url}
              value={url}
            >
              {url}
              {/* {routeLabel(url)} */}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <br />
      {activeTab === CHARTTYPE.pie && <PieChart />}
      {activeTab === CHARTTYPE.bar && <BarChart />}
      {activeTab === CHARTTYPE.radial && <RadialChart />}
    </div>
  );
};

export default DummyCharts;
