import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
import { appRoutes } from "./routes";
import Provider from "./Provider";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Provider>
      <RouterProvider router={appRoutes} />
    </Provider>
  </StrictMode>,
);
