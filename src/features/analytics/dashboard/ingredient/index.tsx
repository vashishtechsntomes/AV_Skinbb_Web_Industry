import IngredientProductMap from "@/components/cytoscape/IngredientProductMap";
import { Button } from "@/components/ui/button";
import { StatChartCard } from "@/components/ui/card";
import { PageContent } from "@/components/ui/structure";
import { ROUTES } from "@/routes/routes.constant";
import { NavLink } from "react-router";

const Ingredient = () => {
  return (
    <PageContent
      header={{
        title: "Ingredients",
        description: "Discover top brands from around the world.",
        actions: (
          <Button color={"primary"} asChild>
            <NavLink to={ROUTES.BRAND_CREATE}>Ingredients</NavLink>
          </Button>
        ),
      }}
    >
      <StatChartCard name="Top Ingredients" className="md:max-h-full">
        <IngredientProductMap />
      </StatChartCard>
    </PageContent>
  );
};

export default Ingredient;
