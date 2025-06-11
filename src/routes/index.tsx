import { createBrowserRouter } from "react-router";
import { authRoutes } from "./auth.routes";
import { dashboardRoutes } from "./dashboard.routes";

// later you can import dashboardRoutes, brandRoutes, etc.
export const appRoutes = createBrowserRouter([
  ...dashboardRoutes,
  ...authRoutes,
]);
