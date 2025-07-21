// routes/auth.routes.ts
import { lazy } from "react";
import type { RouteObject } from "react-router";
import AuthLayout from "@/layouts/AuthLayout";
import { ROUTES } from "./routes.constant";
import PublicRoute from "./PublicRoute";

export const authRoutes: RouteObject[] = [
  {
    Component: PublicRoute,
    children: [
      {
        path: "/",
        Component: AuthLayout,
        children: [
          {
            path: `${ROUTES.SIGN_IN}-main`,
            Component: lazy(() => import("@/features/auth/sign-in")),
          },
          {
            path: ROUTES.SIGN_UP,
            Component: lazy(() => import("@/features/auth/sign-up")),
          },
        ],
      },
      {
        path: `${ROUTES.SIGN_IN}`,
        Component: lazy(() => import("@/features/auth/sign-in-simple")),
      },
    ],
  },
];
