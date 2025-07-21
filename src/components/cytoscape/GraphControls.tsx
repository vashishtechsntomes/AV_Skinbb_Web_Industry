import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/utils";
import {
  ArrowPathIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import type { Core, LayoutOptions } from "cytoscape";
import type { ReactNode } from "react";
import type React from "react";

interface GraphControlsProps {
  cy?: Core | null;
  className?: string;
  layout?: LayoutOptions;
  children?: ReactNode;
}

export const GraphControls: React.FC<GraphControlsProps> = ({
  cy,
  className,
  layout,
  children,
}) => {
  const zoomIn = () => {
    if (!cy) return;
    cy.zoom({
      level: cy.zoom() * 1.2,
      renderedPosition: { x: cy.width() / 2, y: cy.height() / 2 },
    });
  };

  const zoomOut = () => {
    if (!cy) return;
    cy.zoom({
      level: cy.zoom() * 0.8,
      renderedPosition: { x: cy.width() / 2, y: cy.height() / 2 },
    });
  };

  const refresh = () => {
    if (!cy) return;
    cy.layout(layout ?? { name: "breadthfirst", animate: true }).run();
  };

  return (
    <div
      className={cn(
        "[&>button]:text-muted-foreground absolute right-2 bottom-2 z-50 flex flex-col overflow-hidden rounded-md border shadow-md [&>button]:size-9 [&>button]:rounded-none [&>button]:shadow-none",
        className,
      )}
    >
      <Tooltip title="Zoom In" side="left">
        <Button size="icon" onClick={zoomIn} startIcon={<PlusIcon />} />
      </Tooltip>
      <hr />
      <Tooltip title="Zoom Out" side="left">
        <Button size="icon" onClick={zoomOut} startIcon={<MinusIcon />} />
      </Tooltip>
      <hr />
      <Tooltip title="Refresh" side="left">
        <Button size="icon" onClick={refresh} startIcon={<ArrowPathIcon />} />
      </Tooltip>
      {children}
    </div>
  );
};
