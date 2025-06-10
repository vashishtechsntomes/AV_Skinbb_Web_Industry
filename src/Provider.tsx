import React from "react";
import { ThemeProvider } from "./context/theme-provider";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default Provider;
