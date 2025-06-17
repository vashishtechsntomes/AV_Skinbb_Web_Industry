import { createBrowserRouter } from "react-router";
import { authRoutes } from "./auth.routes";
import { dashboardRoutes } from "./dashboard.routes";
import MainLayout from "@/layouts/MainLayout";
import { PageContent } from "@/components/ui/structure";

// later you can import dashboardRoutes, brandRoutes, etc.
export const appRoutes = createBrowserRouter([
  ...dashboardRoutes,
  ...authRoutes,
  {
    path: "*",
    element: (
      <MainLayout>
        <PageContent className="text-muted-foreground items-center justify-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-30"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
          <h3 className="te">Page Not Found</h3>
        </PageContent>
      </MainLayout>
    ),
  },
]);
