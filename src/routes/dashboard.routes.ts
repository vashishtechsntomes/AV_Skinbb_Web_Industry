// routes/auth.routes.ts
import MainLayout from "@/layouts/MainLayout";
import { lazy } from "react";
import type { RouteObject } from "react-router";

export const DASHBOARD_ROUTES = {
  dashboard: "/",
};
export const dashboardRoutes: RouteObject[] = [
  {
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: lazy(() => import("@/features/dashboard/index")),
      },
    ],
  },
];
