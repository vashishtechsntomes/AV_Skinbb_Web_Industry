import React from "react";
import { ThemeProvider } from "./context/theme-provider";
import { Toaster } from "./components/ui/sonner";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <Toaster richColors position="top-right" />
      {children}
    </ThemeProvider>
  );
};

export default Provider;
