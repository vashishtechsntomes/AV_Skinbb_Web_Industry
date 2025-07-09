import React from "react";
import { ThemeProvider } from "./context/theme-provider";
import { Toaster } from "./components/ui/sonner";
import { persistor, store } from "./context/store";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

store.subscribe(() => console.log(store.getState(), "store"));

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <Toaster richColors position="top-right" />
          {children}
        </ThemeProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default Provider;
