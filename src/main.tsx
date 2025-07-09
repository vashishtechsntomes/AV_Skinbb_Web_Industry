import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import Provider from "./Provider";
import { FullLoader } from "./components/ui/loader";
import { appRoutes } from "./routes";
import "./styles/index.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  // <StrictMode>
  <Provider>
    <Suspense fallback={<FullLoader />}>
      <RouterProvider router={appRoutes} />
    </Suspense>
  </Provider>,
  // </StrictMode>,
);
