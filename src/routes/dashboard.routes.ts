// routes/auth.routes.ts
import { lazy } from "react";
import type { RouteObject } from "react-router";

export const DASHBOARD_ROUTES = {
  dashboard: "/",
};
export const dashboardRoutes: RouteObject[] = [
  {
    path: DASHBOARD_ROUTES.dashboard,
    Component: lazy(() => import("@/features/dashboard/index")),
  },
];
