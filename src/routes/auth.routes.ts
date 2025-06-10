// routes/auth.routes.ts
import { lazy } from "react";
import type { RouteObject } from "react-router";

export const AUTH_ROUTES = {
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  FORGOT_PASSWORD: "/forgot-password",
};

export const authRoutes: RouteObject[] = [
  {
    path: AUTH_ROUTES.SIGN_IN,
    Component: lazy(() => import("@/features/auth/sign-in")),
  },
  {
    path: AUTH_ROUTES.SIGN_UP,
    Component: lazy(() => import("@/features/auth/sign-up")),
  },
];
