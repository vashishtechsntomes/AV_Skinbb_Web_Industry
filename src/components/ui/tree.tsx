"use client";

import * as React from "react";
import type { ItemInstance } from "@headless-tree/core";
import { Slot } from "@radix-ui/react-slot";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/utils/index";

// Define a generic tree interface
interface TreeInstance<T = unknown> {
  getContainerProps?: () => Record<string, T>;
  getDragLineStyle?: () => React.CSSProperties;
}

interface TreeContextValue<T = unknown> {
  indent: number;
  currentItem?: ItemInstance<T>;
  tree?: TreeInstance<T>;
}

const TreeContext = React.createContext<TreeContextValue<unknown>>({
  indent: 20,
  currentItem: undefined,
  tree: undefined,
});

function useTreeContext<T = unknown>() {
  return React.useContext(TreeContext) as TreeContextValue<T>;
}

interface TreeProps<T = unknown> extends React.HTMLAttributes<HTMLDivElement> {
  indent?: number;
  tree?: TreeInstance<T>;
}

function Tree<T = unknown>({
  indent = 20,
  tree,
  className,
  ...props
}: TreeProps<T>) {
  const containerProps =
    tree && typeof tree.getContainerProps === "function"
      ? tree.getContainerProps()
      : {};
  const mergedProps = { ...props, ...containerProps };

  // Extract style from mergedProps to merge with our custom styles
  const { style: propStyle, ...otherProps } = mergedProps;

  // Merge styles
  const mergedStyle = {
    ...propStyle,
    "--tree-indent": `${indent}px`,
  } as React.CSSProperties;

  return (
    <TreeContext.Provider value={{ indent, tree } as TreeContextValue<unknown>}>
      <div
        data-slot="tree"
        style={mergedStyle}
        className={cn("flex flex-col", className)}
        {...otherProps}
      />
    </TreeContext.Provider>
  );
}

interface TreeItemProps<T = unknown>
  extends React.HTMLAttributes<HTMLButtonElement> {
  item: ItemInstance<T>;
  indent?: number;
  asChild?: boolean;
}

function TreeItem<T = unknown>({
  item,
  className,
  asChild,
  children,
  ...props
}: Omit<TreeItemProps<T>, "indent">) {
  const { indent } = useTreeContext<T>();

  const itemProps = typeof item.getProps === "function" ? item.getProps() : {};
  const mergedProps = { ...props, ...itemProps };

  // Extract style from mergedProps to merge with our custom styles
  const { style: propStyle, ...otherProps } = mergedProps;

  // Merge styles
  const mergedStyle = {
    ...propStyle,
    "--tree-padding": `${item.getItemMeta().level * indent}px`,
  } as React.CSSProperties;

  const Comp = asChild ? Slot : "button";

  return (
    <TreeContext.Provider
      value={{ indent, currentItem: item } as TreeContextValue<unknown>}
    >
      <Comp
        data-slot="tree-item"
        style={mergedStyle}
        className={cn(
          "z-[1] ps-(--tree-padding) outline-hidden select-none not-last:pb-0.5 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          className,
        )}
        data-focus={
          typeof item.isFocused === "function"
            ? item.isFocused() || false
            : undefined
        }
        data-folder={
          typeof item.isFolder === "function"
            ? item.isFolder() || false
            : undefined
        }
        data-selected={
          typeof item.isSelected === "function"
            ? item.isSelected() || false
            : undefined
        }
        data-drag-target={
          typeof item.isDragTarget === "function"
            ? item.isDragTarget() || false
            : undefined
        }
        data-search-match={
          typeof item.isMatchingSearch === "function"
            ? item.isMatchingSearch() || false
            : undefined
        }
        aria-expanded={item.isExpanded()}
        {...otherProps}
      >
        {children}
      </Comp>
    </TreeContext.Provider>
  );
}

interface TreeItemLabelProps<T = unknown>
  extends React.HTMLAttributes<HTMLSpanElement> {
  item?: ItemInstance<T>;
}

function TreeItemLabel<T = unknown>({
  item: propItem,
  children,
  className,
  ...props
}: TreeItemLabelProps<T>) {
  const { currentItem } = useTreeContext<T>();
  const item = propItem ?? currentItem;

  if (!item) {
    console.warn("TreeItemLabel: No item provided via props or context");
    return null;
  }

  return (
    <span
      data-slot="tree-item-label"
      className={cn(
        "in-focus-visible:bg-accent text-muted-foreground hover:bg-accent in-data-[selected=true]:bg-primary in-data-[selected=true]:hover:bg-primary in-data-[selected=true]:text-primary-foreground in-data-[drag-target=true]:bg-primary flex items-center gap-1 rounded-md px-2 py-1.5 transition-colors not-in-data-[folder=true]:ps-7 in-data-[search-match=true]:bg-blue-400/20! [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      {item.isFolder() && (
        <ChevronDownIcon className="size-4 in-aria-[expanded=false]:-rotate-90" />
      )}
      {children ??
        (typeof item.getItemName === "function" ? item.getItemName() : null)}
    </span>
  );
}

function TreeDragLine({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { tree } = useTreeContext();

  if (!tree || typeof tree.getDragLineStyle !== "function") {
    console.warn(
      "TreeDragLine: No tree provided via context or tree does not have getDragLineStyle method",
    );
    return null;
  }

  const dragLine = tree.getDragLineStyle();
  return (
    <div
      style={dragLine}
      className={cn(
        "b1g-primary before:bg-background before:border-primary absolute -mt-px h-0.5 w-[unset] before:absolute before:-top-[3px] before:left-0 before:size-2 before:rounded-full before:border-2",
        className,
      )}
      {...props}
    />
  );
}

export { Tree, TreeItem, TreeItemLabel, TreeDragLine };
