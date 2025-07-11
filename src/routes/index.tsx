import { createBrowserRouter } from "react-router";
import { authRoutes } from "./auth.routes";
import { dashboardRoutes } from "./dashboard.routes";
import MainLayout from "@/layouts/main-layout";
import { PageContent } from "@/components/ui/structure";
import { dummyRoutes } from "./dummy.routes";
import NotFound from "@/features/not-found";

// later you can import dashboardRoutes, brandRoutes, etc.
export const appRoutes = createBrowserRouter([
  ...dashboardRoutes,
  ...authRoutes,
  ...dummyRoutes,
  {
    path: "*",
    element: (
      <MainLayout>
        <PageContent className="text-muted-foreground items-center justify-center gap-2">
         <NotFound/>
        </PageContent>
      </MainLayout>
    ),
  },
]);
