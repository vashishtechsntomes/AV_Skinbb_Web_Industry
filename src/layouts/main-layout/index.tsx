import Sidebar from "@/layouts/main-layout/Sidebar";
import { type ReactNode } from "react";
import { Outlet } from "react-router";
import Header from "./Header";

const MainLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="bg-background flex min-h-screen flex-1 flex-row">
      <Sidebar />
      <main className="h-screen w-full flex-1 overflow-auto">
        <Header />
        {children ?? <Outlet />}
      </main>
    </div>
  );
};

export default MainLayout;
