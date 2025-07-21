import { GraphControls } from "@/components/cytoscape/GraphControls";
import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import useQuery from "@/hooks/useQuery";
import type { ApiResponse } from "@/services";
import { capitalize } from "@/utils";
import { CircleStackIcon } from "@heroicons/react/24/outline";
import type { Core, ElementDefinition, EventObject } from "cytoscape";
import { useCallback, useEffect, useRef, useState } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import DATA from "./cleaned-data.json";
import { relationshipLayouts, relationshipStyle } from "./data";

type Product = {
  brand_name: string;
  product_name: string;
  all_ingredients: string[];
  product_images: string;
};

// type TransformedProduct = {
//   [productName: string]: {
//     brand_name: string;
//     product_name: string;
//     all_ingredients: string[];
//     product_images: string[];
//   };
// };

const PRODUCT_INGREDIENT = DATA as Product[];

async function fetchData(): Promise<ApiResponse<Product[]>> {
  return new Promise((res) => {
    const data = PRODUCT_INGREDIENT?.map((item) => ({
      ...item,
      // product_name: item.product_name,
      // brand_name: item.brand_name,
      // product_images: item.product_images,
      // all_ingredients: item.all_ingredients
      // key_ingredients: item.key_ingredients
      //   .split("|")
      //   .map((val) => val.trim())
      //   .filter(Boolean),
      // "key_features_&_benefits": item["key_features_&_benefits"]
      //   .split("|")
      //   .map((val) => val.trim())
      //   .filter(Boolean),
    }));

    res({
      data: data,
      error: "",
    });
  });
}

type NodeType = "ingredient" | "product";

// ingredient → products
const fetchProductsByIngredient = async (
  ingredientId: string,
): Promise<string[]> => {
  console.log(`Fetching products for ingredient: ${ingredientId}`);
  await new Promise((res) => setTimeout(res, 300)); // simulate delay

  return PRODUCT_INGREDIENT.filter((product) =>
    product.all_ingredients.some(
      (ing) => ing.toLowerCase() === ingredientId.toLowerCase(),
    ),
  ).map((product) => product.product_name);
};

// product → ingredients
const fetchIngredientsByProduct = async (
  productId: string,
): Promise<string[]> => {
  console.log(`Fetching ingredients for product: ${productId}`);
  await new Promise((res) => setTimeout(res, 300)); // simulate delay

  const product = PRODUCT_INGREDIENT.find(
    (p) => p.product_name.toLowerCase() === productId.toLowerCase(),
  );

  return product?.all_ingredients || [];
};

const RelationshipPreview = () => {
  const { data } = useQuery(async () => await fetchData());
  const [elements, setElements] = useState<ElementDefinition[]>([]);
  const [layout, setLayout] =
    useState<keyof typeof relationshipLayouts>("concentric");
  const cyRef = useRef<Core | null>(null);
  const nodeSet = useRef<Set<string>>(new Set());
  const edgeSet = useRef<Set<string>>(new Set());

  const animateIn = useCallback((id: string) => {
    const cy = cyRef.current;
    if (!cy) return;

    const el = cy.getElementById(id);
    if (!el.empty()) {
      el.stop(true);
      el.animate(
        {
          style: {
            opacity: 1,
            width: el.data("width") || undefined,
            height: el.data("height") || undefined,
          },
        },
        { duration: 400 },
      );
    }
  }, []);

  const addNode = useCallback(
    async (id: string, type: NodeType): Promise<void> => {
      if (nodeSet.current.has(id)) return;
      nodeSet.current.add(id);

      const finalSize = type === "ingredient" ? 70 : 80;
      const node: ElementDefinition = {
        data: { id, label: id, width: finalSize, height: finalSize },
        classes: type,
      };

      setElements((prev) => [...prev, node]);

      await new Promise((resolve) => setTimeout(resolve, 50)); // small wait
    },
    [],
  );

  const addEdge = useCallback(
    async (source: string, target: string): Promise<void> => {
      const edgeId = `${source}-${target}`;
      if (edgeSet.current.has(edgeId)) return;
      edgeSet.current.add(edgeId);

      const edge: ElementDefinition = {
        data: { id: edgeId, source, target },
      };

      setElements((prev) => [...prev, edge]);

      await new Promise((resolve) => setTimeout(resolve, 50)); // small wait
    },
    [],
  );

  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;

    const handleTap = async (evt: EventObject) => {
      const node = evt.target;
      const id = node.id();
      cy.nodes().removeClass("highlighted");
      node.addClass("highlighted");
      const type = node.hasClass("ingredient") ? "ingredient" : "product";

      const relatedItems =
        type === "ingredient"
          ? await fetchProductsByIngredient(id)
          : await fetchIngredientsByProduct(id);

      console.log("🚀 ~ handleTap ~ relatedItems:", relatedItems);

      await Promise.all(
        relatedItems.map(async (item) => {
          const nodeType = type === "ingredient" ? "product" : "ingredient";
          await addNode(item, nodeType);
          await addEdge(id, item);
        }),
      );

      requestAnimationFrame(() => {
        const layoutInstance = cy.layout(relationshipLayouts[layout]);

        layoutInstance.on("layoutstop", () => {
          cy.animate(
            {
              center: { eles: node },
            },
            {
              duration: 500,
              easing: "ease-in-out",
            },
          );
        });

        layoutInstance.run();
      });
    };

    cy.on("tap", "node", handleTap);

    return () => {
      cy.off("tap", "node", handleTap);
    };
  }, [addNode, addEdge, layout]);

  useEffect(() => {
    if (data) {
      addNode(data[0].all_ingredients[0], "ingredient");
    }
  }, [addNode, data]);

  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;
    cy.layout(relationshipLayouts[layout]).run();
  }, [layout]);

  return (
    <div className="relative flex min-h-dvh justify-center">
      {cyRef.current && (
        <GraphControls cy={cyRef.current} layout={relationshipLayouts[layout]}>
          <hr />
          <DropdownMenu
            label="Layout"
            items={Object.entries(relationshipLayouts).map(([key]) => ({
              children: capitalize(key),
              type: "checkbox",
              checked: layout === key,
              onCheckedChange: () => {
                setLayout(key as keyof typeof relationshipLayouts);
              },
            }))}
            asChild
          >
            <Button size="icon" startIcon={<CircleStackIcon />}></Button>
          </DropdownMenu>
        </GraphControls>
      )}

      <CytoscapeComponent
        elements={CytoscapeComponent.normalizeElements(elements)}
        zoom={1}
        panningEnabled={true}
        cy={(cy: Core) => {
          cyRef.current = cy;
        }}
        minZoom={0.5}
        maxZoom={2}
        style={{ width: "100%", height: "100dvh" }}
        stylesheet={relationshipStyle}
      />
    </div>
  );
};

{
  /* <ComboBox
        options={[]}
        className="max-w-50"
        value={value}
        onChange={(val, row) => {
          console.log("🚀 ~ RelationshipPreview ~ val, row:", val, row);
          setValue(val);
        }}
      /> */
}
export default RelationshipPreview;
