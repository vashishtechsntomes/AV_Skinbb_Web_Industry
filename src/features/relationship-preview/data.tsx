import type { LayoutOptions } from "cytoscape";

export const relationshipStyle = [
  {
    selector: "node, edge",
    style: {
      opacity: 1,
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
      "text-max-width": "100px",
      "text-wrap": "wrap",
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
      "text-max-width": "100px",
      "text-wrap": "wrap",
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
  {
    selector: "node.highlighted",
    style: {
      "overlay-color": "#1e1b39",
      "overlay-padding": 5,
      //   "overlay-radius": 10,
      "overlay-opacity": 0.1,
      // shape: "ellipse",
      "transition-property": "border-width, border-color, shape",
      "transition-duration": "100ms",
    },
  },
  {
    selector: "node.has-children",
    style: {
      "border-color": "#10b981",
      "border-width": 4,
      "border-opacity": 1,
      "overlay-opacity": 0,
    },
  },
];

export const relationshipLayouts: Record<LayoutOptions["name"], LayoutOptions> =
  {
    concentric: {
      name: "concentric",
      fit: false,
      animate: true,
      animationDuration: 500,
      animationEasing: "ease-in-out",
      padding: 50,
      startAngle: (3 / 2) * Math.PI,
      spacingFactor: 1.25,
      avoidOverlap: true,
      concentric: (node) => node.degree(),
      levelWidth: () => 2,
    },
    cose: {
      name: "cose",
      animate: true,
      animationDuration: 500,
      animationEasing: "ease-in-out",
      fit: false,
      padding: 50,
      nodeRepulsion: 400000,
      idealEdgeLength: 100,
      edgeElasticity: 100,
      gravity: 80,
      numIter: 1000,
      initialTemp: 200,
      coolingFactor: 0.95,
      componentSpacing: 100,
      nestingFactor: 5,
    },
    breadthfirst: {
      name: "breadthfirst",
      fit: false, // Do not auto-zoom on layout
      directed: false, // Allows branching instead of flattening
      padding: 50, // Adds breathing room
      spacingFactor: 1.25, // Controls distance between nodes
      avoidOverlap: true, // Prevents overlapping nodes
      circle: false, // Tree-style layout
      animate: true, // Smooth transitions
      animationDuration: 500,
      animationEasing: "ease-in-out",
    },
    circle: {
      name: "circle",
      fit: false,
      animate: true,
      animationDuration: 500,
      animationEasing: "ease-in-out",
      padding: 50,
      spacingFactor: 1.5,
      avoidOverlap: true,
      clockwise: true,
      startAngle: (3 / 2) * Math.PI, // start from top center
    },
    grid: {
      name: "grid",
      fit: false,
      padding: 50,
      avoidOverlap: true,
      spacingFactor: 1.76,
      animate: true,
      animationDuration: 500,
      animationEasing: "ease-in-out",
      rows: undefined, // Auto-calculate rows
      cols: undefined, // Auto-calculate columns
      // position: (node) => {
      //   const index = parseInt(node.id().replace(/\D/g, ""), 10); // example logic
      //   return {
      //     row: Math.floor(index / 5),
      //     col: index % 5,
      //   };
      // },
    },
  };
