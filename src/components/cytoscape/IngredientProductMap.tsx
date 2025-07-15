import type { Core, ElementDefinition } from "cytoscape";
import { useCallback, useEffect, useRef, useState } from "react";
import CytoscapeComponent from "react-cytoscapejs";

type NodeType = "ingredient" | "product";

type IngredientProductMapType = {
  ingredients: Record<string, string[]>;
  products: Record<string, string[]>;
};

const mockData: IngredientProductMapType = {
  ingredients: {
    "Aloe Vera": [
      "The Body Shop Aloe Soothing Day Cream",
      "Clinique Moisture Surge™",
      "COSRX Aloe Soothing Sun Cream",
    ],
    "Hyaluronic Acid": [
      "The Ordinary Hyaluronic Acid 2% + B5",
      "Neutrogena Hydro Boost Water Gel",
      "Peter Thomas Roth Water Drench Hyaluronic Cloud Cream",
    ],
    Niacinamide: [
      "The Ordinary Niacinamide 10% + Zinc 1%",
      "Paula’s Choice 10% Niacinamide Booster",
      "La Roche‑Posay Mela‑Derm Pigment Control Glycolic Acid Serum",
    ],
    "Salicylic Acid": [
      "Paula’s Choice Skin Perfecting 2% BHA Liquid Exfoliant",
      "CeraVe Renewing SA Cleanser",
      "La Roche‑Posay Effaclar Medicated Gel Cleanser",
    ],
    Ceramides: [
      "CeraVe Moisturizing Cream",
      "Elizabeth Arden Ceramide Capsules",
      "Dr. Jart+ Ceramidin™ Cream",
    ],
    Glycerin: [
      "Vaseline Intensive Care Advanced Repair Lotion",
      "Eucerin Advanced Repair Cream",
      "Aveeno Daily Moisturizing Lotion",
    ],
    "Vitamin C": [
      "SkinCeuticals C E Ferulic",
      "TruSkin Vitamin C Serum",
      "Drunk Elephant C‑Firma Day Serum",
    ],
  },
  products: {
    "The Body Shop Aloe Soothing Day Cream": ["Aloe Vera", "Glycerin"],
    "Clinique Moisture Surge™": ["Aloe Vera", "Hyaluronic Acid"],
    "COSRX Aloe Soothing Sun Cream": ["Aloe Vera", "Ceramides"],

    "The Ordinary Hyaluronic Acid 2% + B5": ["Hyaluronic Acid", "Vitamin B₅"],
    "Neutrogena Hydro Boost Water Gel": ["Hyaluronic Acid", "Glycerin"],
    "Peter Thomas Roth Water Drench Hyaluronic Cloud Cream": [
      "Hyaluronic Acid",
      "Ceramides",
    ],

    "The Ordinary Niacinamide 10% + Zinc 1%": ["Niacinamide", "Zinc PCA"],
    "Paula’s Choice 10% Niacinamide Booster": ["Niacinamide", "Ceramides"],
    "La Roche‑Posay Mela‑Derm Pigment Control Glycolic Acid Serum": [
      "Niacinamide",
      "Glycolic Acid",
    ],

    "Paula’s Choice Skin Perfecting 2% BHA Liquid Exfoliant": [
      "Salicylic Acid",
      "Green Tea",
    ],
    "CeraVe Renewing SA Cleanser": ["Salicylic Acid", "Ceramides"],
    "La Roche‑Posay Effaclar Medicated Gel Cleanser": [
      "Salicylic Acid",
      "Zinc PCA",
    ],

    "CeraVe Moisturizing Cream": ["Ceramides", "Glycerin"],
    "Elizabeth Arden Ceramide Capsules": ["Ceramides", "Vitamin E"],
    "Dr. Jart+ Ceramidin™ Cream": ["Ceramides", "Panthenol"],

    "Vaseline Intensive Care Advanced Repair Lotion": [
      "Glycerin",
      "Petrolatum",
    ],
    "Eucerin Advanced Repair Cream": ["Glycerin", "Urea"],
    "Aveeno Daily Moisturizing Lotion": ["Glycerin", "Colloidal Oatmeal"],

    "SkinCeuticals C E Ferulic": ["Vitamin C", "Vitamin E"],
    "TruSkin Vitamin C Serum": ["Vitamin C", "Hyaluronic Acid"],
    "Drunk Elephant C‑Firma Day Serum": ["Vitamin C", "Ferulic Acid"],
  },
};

const IngredientProductMap = () => {
  const [elements, setElements] = useState<ElementDefinition[]>([]);
  const cyRef = useRef<Core | null>(null);
  const nodeSet = useRef<Set<string>>(new Set());
  const edgeSet = useRef<Set<string>>(new Set());

  const animateIn = useCallback((id: string) => {
    const cy = cyRef.current;
    if (!cy) return;

    const el = cy.getElementById(id);
    if (!el.empty()) {
      el.stop(true);
      // fade in
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

  const addNode = (id: string, type: NodeType): boolean => {
    if (nodeSet.current.has(id)) return false;
    nodeSet.current.add(id);

    // note: we stash the intended final size in data() so we can animate back to it after fade
    const finalSize = type === "ingredient" ? 70 : 80;
    const node: ElementDefinition = {
      data: { id, label: id, width: finalSize, height: finalSize },
      classes: type,
    };

    setElements((prev) => [...prev, node]);

    // wait a tick for Cytoscape to render it, then animate in
    setTimeout(() => animateIn(id), 50);
    return true;
  };

  const addEdge = useCallback(
    (source: string, target: string): boolean => {
      const edgeId = `${source}-${target}`;
      if (edgeSet.current.has(edgeId)) return false;
      edgeSet.current.add(edgeId);

      const edge: ElementDefinition = {
        data: { id: edgeId, source, target },
      };

      setElements((prev) => [...prev, edge]);

      setTimeout(() => animateIn(edgeId), 50);
      return true;
    },
    [setElements, animateIn],
  );

  const handleNodeClick = (id: string): boolean => {
    const cy = cyRef.current!;
    let didAdd = false;

    cy.batch(() => {
      if (mockData.ingredients[id]) {
        mockData.ingredients[id].forEach((product) => {
          didAdd = addNode(product, "product") || didAdd;
          didAdd = addEdge(id, product) || didAdd;
        });
      } else if (mockData.products[id]) {
        mockData.products[id].forEach((ingredient) => {
          didAdd = addNode(ingredient, "ingredient") || didAdd;
          didAdd = addEdge(id, ingredient) || didAdd;
        });
      }
    });

    return didAdd;
  };

  useEffect(() => {
    addNode("Aloe Vera", "ingredient");
    // animateIn();
  }, []);

  return (
    <div className="bg-muted rounded-lg border inset-shadow-sm">
      <CytoscapeComponent
        elements={CytoscapeComponent.normalizeElements(elements)}
        zoom={1}
        cy={(cy: Core) => {
          cyRef.current = cy;

          cy.on("tap", "node", (evt) => {
            const node = evt.target;
            const id = node.id();

            const didAddSomething = handleNodeClick(id);
            if (!didAddSomething) {
              // nothing new—skip layout/center/animation
              return;
            }
            cy.layout({
              name: "breadthfirst",
              fit: false,
              animate: false,
            }).run();
            cy.center(node);
            animateIn(id);
            // cy.stop(true);
            // cy.animate(
            //   {
            //     center: { eles: node },
            //   },
            //   { duration: 300 },
            // );
          });

          cy.layout({
            name: "breadthfirst",
            // directed: true,
            // padding: 30,
            // spacingFactor: 1.3,
            animate: false,
            fit: false,
          }).run();
        }}
        style={{ width: "100%", height: "430px" }}
        stylesheet={[
          // base rule to ensure new items start out hidden
          {
            selector: "node, edge",
            style: {
              opacity: 0,
            },
          },
          {
            selector: "node.ingredient",
            style: {
              shape: "ellipse",
              "background-color": "#ffffff",
              "border-color": "#93aafd",
              "border-width": 3,
              width: 70,
              height: 70,
              "background-image": "url('/flusk.svg')",
              "background-fit": "contain",
              "background-clip": "none",
              "background-opacity": 0,
              label: "data(label)",
              "text-valign": "bottom",
              "text-halign": "center",
              "font-size": 12,
              color: "#333",
              "text-margin-y": 6,
            },
          },
          {
            selector: "node.product",
            style: {
              shape: "diamond",
              "background-color": "#FCE4EC",
              "border-color": "#f08484",
              "border-width": 2,
              width: 80,
              height: 80,
              "background-image": "url('/ingredient.svg')",
              "background-fit": "contain",
              "background-clip": "none",
              "background-opacity": 0,
              label: "data(label)",
              "text-valign": "bottom",
              "text-halign": "center",
              "font-size": 12,
              color: "#333",
              "text-margin-y": 6,
            },
          },
          {
            selector: "edge",
            style: {
              width: 2,
              "line-color": "#ccc",
              "target-arrow-shape": "triangle",
              "target-arrow-color": "#ccc",
              "curve-style": "bezier",
            },
          },
        ]}
      />
    </div>
  );
};

export default IngredientProductMap;
