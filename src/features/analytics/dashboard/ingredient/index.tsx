import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageContent } from "@/components/ui/structure";
import FocusIngredients from "./FocusIngredients";
import FunctionalTrends from "./FunctionalTrends";
import IngredientOvertime from "./IngredientOvertime";
import TopCategoryTrends from "./TopCategoryTrends";
import { StatChartCard } from "@/components/ui/card";
import IngredientProductMap from "@/components/cytoscape/IngredientProductMap";
// import FunctionalTrends from "./FunctionalTrends";

const Ingredient = () => {
  return (
    <PageContent
      header={{
        title: "Ingredients",
        description: "Discover top brands from around the world.",
        actions: (
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2">
              <Label>Age</Label>
              <Select defaultValue="All">
                <SelectTrigger className="bg-background w-full truncate">
                  <SelectValue placeholder="Select a age" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Age</SelectLabel>
                    {["All", "18–24", "25–32", "33–50", "51+", "Unknown"].map(
                      (item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ),
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Label>Gender</Label>
              <Select defaultValue="All">
                <SelectTrigger className="bg-background w-full truncate">
                  <SelectValue placeholder="Select a gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Gender</SelectLabel>
                    {["All", "Male", "Female", "Unknown"].map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" variant={"outlined"} color={"primary"}>
              Apply
            </Button>
          </div>
        ),
      }}
    >
      <IngredientOvertime />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FocusIngredients />
        <TopCategoryTrends />
      </div>
      <FunctionalTrends />
      <StatChartCard name="Top Ingredients" className="md:max-h-full">
        <IngredientProductMap />
      </StatChartCard>
    </PageContent>
  );
};

export default Ingredient;
