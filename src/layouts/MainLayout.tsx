import logo from "@/assets/images/logo-icon.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Sidebar from "@/components/ui/sidebar";
import { useSidebar } from "@/context/theme-provider";
import { cn } from "@/utils";
import {
  BellIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";
import type { ReactNode } from "react";
import { NavLink, Outlet } from "react-router";

const MainLayout = ({ children }: { children?: ReactNode }) => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  return (
    <div className="bg-background flex min-h-screen flex-1 flex-row">
      <Sidebar />
      <main className="w-full flex-1 overflow-x-hidden">
        <header className="header-main sticky1 bg-background top-0">
          <div
            className={cn(
              "w-ful flex h-14 items-center justify-between p-2 md:p-4 [&_svg]:size-6",
              !isSidebarOpen && "md:ps-0",
            )}
          >
            <div className="flex">
              <Button
                variant="ghost"
                className="text-muted-foreground"
                size="icon"
                onClick={toggleSidebar}
              >
                {isSidebarOpen && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                    />
                  </svg>
                )}
                {!isSidebarOpen && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
                    />
                  </svg>
                )}
              </Button>
              <NavLink
                to="/"
                className="flex items-center no-underline transition-all active:scale-98 md:hidden"
              >
                <img src={logo} alt="logo" className="h-10" />
              </NavLink>
            </div>
            <div className="flex items-center gap-1">
              <Input
                containerProps={{
                  className: "hidden md:flex",
                }}
                startIcon={<MagnifyingGlassIcon />}
                placeholder="Search..."
              />
              <div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground md:hidden"
                  startIcon={<MagnifyingGlassIcon />}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground"
                  startIcon={<BellIcon />}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </Button>
              </div>
              <Avatar className="size-10 shadow">
                <AvatarImage src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>
        {children ? children : <Outlet />}
      </main>
    </div>
  );
};

export default MainLayout;
