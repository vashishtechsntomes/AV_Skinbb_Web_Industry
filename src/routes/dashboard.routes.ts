// routes/auth.routes.ts
import MainLayout from "@/layouts/MainLayout";
import { lazy } from "react";
import type { RouteObject } from "react-router";

export const DASHBOARD_ROUTES = {
  dashboard: "/",
  brandLists: "/brands",
  addBrand: "/brand/create",
  editBrand: "/brand/edit",
  analytics: "/analytics",
  analyticsPlatform: "/platform",
  analyticsBrand: "/brand",
  marketResearch: "/market-research",
  marketResearchAdd: "/market-research/add",
  marketResearchEdit: "/market-research/edit",
};

export const dashboardRoutes: RouteObject[] = [
  {
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: lazy(() => import("@/features/dashboard/index")),
      },
      {
        path: DASHBOARD_ROUTES.brandLists,
        Component: lazy(() => import("@/features/brands/brand-list")),
      },
      {
        path: DASHBOARD_ROUTES.addBrand,
        Component: lazy(() => import("@/features/brands/brand-form")),
      },
      {
        path: `${DASHBOARD_ROUTES.editBrand}/:id`,
        Component: lazy(() => import("@/features/brands/brand-form")),
      },
      {
        path: DASHBOARD_ROUTES.analytics,
        Component: lazy(() => import("@/features/analytics/dashboard")),
        children: [
          {
            path: DASHBOARD_ROUTES.analyticsPlatform.slice(1),
            Component: lazy(
              () => import("@/features/analytics/dashboard/platform"),
            ),
          },
          {
            path: DASHBOARD_ROUTES.analyticsBrand.slice(1),
            Component: lazy(
              () => import("@/features/analytics/dashboard/brand"),
            ),
          },
        ],
      },
      {
        path: DASHBOARD_ROUTES.marketResearch,
        Component: lazy(
          () => import("@/features/market-research/market-research-list"),
        ),
      },
      {
        path: DASHBOARD_ROUTES.marketResearchAdd,
        Component: lazy(
          () => import("@/features/market-research/market-research-create"),
        ),
      },
      {
        path: `${DASHBOARD_ROUTES.marketResearchEdit}/:id`,
        Component: lazy(
          () => import("@/features/market-research/market-research-create"),
        ),
      },
    ],
  },
];
