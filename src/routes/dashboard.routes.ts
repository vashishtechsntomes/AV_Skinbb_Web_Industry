// routes/auth.routes.ts
import MainLayout from "@/layouts/main-layout";
import { lazy } from "react";
import type { RouteObject } from "react-router";
import PrivateRoute from "./PrivateRoute";
import { ROUTES } from "./routes.constant";

export const dashboardRoutes: RouteObject[] = [
  {
    Component: PrivateRoute,
    children: [
      {
        Component: MainLayout,
        children: [
          {
            index: true,
            Component: lazy(() => import("@/features/dashboard/index")),
          },
          {
            path: ROUTES.BRAND_LIST,
            Component: lazy(() => import("@/features/brands/brand-list")),
          },
          {
            path: ROUTES.BRAND_CREATE,
            Component: lazy(() => import("@/features/brands/brand-form")),
          },
          {
            path: `${ROUTES.BRAND_EDIT}/:id`,
            Component: lazy(() => import("@/features/brands/brand-form")),
          },
          {
            path: ROUTES.ANALYTIC,
            Component: lazy(() => import("@/features/analytics/dashboard")),
            children: [
              {
                path: ROUTES.PLATFORM.slice(1),
                Component: lazy(
                  () => import("@/features/analytics/dashboard/platform"),
                ),
              },
              {
                path: ROUTES.BRAND.slice(1),
                Component: lazy(
                  () => import("@/features/analytics/dashboard/brand"),
                ),
              },
              {
                path: ROUTES.INGREDIENT.slice(1),
                Component: lazy(
                  () => import("@/features/analytics/dashboard/ingredient"),
                ),
              },
            ],
          },
          {
            path: ROUTES.MARKET_RESEARCH,
            Component: lazy(
              () => import("@/features/market-research/market-research-list"),
            ),
          },
          {
            path: ROUTES.MARKET_RESEARCH_CREATE,
            Component: lazy(
              () => import("@/features/market-research/market-research-create"),
            ),
          },
          {
            path: `${ROUTES.MARKET_RESEARCH_EDIT}/:id`,
            Component: lazy(
              () => import("@/features/market-research/market-research-create"),
            ),
          },
          {
            path: `${ROUTES.MARKET_RESEARCH}/:id`,
            Component: lazy(
              () => import("@/features/market-research/market-research-detail"),
            ),
          },
        ],
      },
    ],
  },
];
