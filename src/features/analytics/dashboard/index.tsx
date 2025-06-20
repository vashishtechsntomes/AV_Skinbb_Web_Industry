import { Button } from "@/components/ui/button";
import { PageContent } from "@/components/ui/structure";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DASHBOARD_ROUTES } from "@/routes/dashboard.routes";
import { FunnelIcon } from "@heroicons/react/24/outline";
import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

export const AnalysisContext = createContext<{
  isFilter: boolean;
  setIsFilter?: Dispatch<SetStateAction<boolean>>;
}>({
  isFilter: false,
});

const AnalyticsDashboard = () => {
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <AnalysisContext value={{ isFilter, setIsFilter }}>
      {/* <PageContent
        header={{
          title:
            `${DASHBOARD_ROUTES.analytics}${DASHBOARD_ROUTES.analyticsPlatform}` ===
            pathname
              ? "Platform Analytics"
              : "Brand Analytics",
          description: `Dive into user behavior, demographics,
and performance`,
          actions: (
            <div className="flex gap-2">
              {`${DASHBOARD_ROUTES.analytics}${DASHBOARD_ROUTES.analyticsPlatform}` ===
                pathname && (
                <Button
                  color={isFilter ? "primary" : "default"}
                  startIcon={<FunnelIcon />}
                  variant={"outlined"}
                  onClick={() => setIsFilter((val) => !val)}
                >
                  Filter
                </Button>
              )}

              <ToggleGroup
                type="single"
                variant={"outline"}
                size={"lg"}
                className="h-10"
                value={pathname}
                onValueChange={(value) => {
                  if (!value) return;
                  navigate(`${value}`);
                }}
              >
                <ToggleGroupItem
                  className="aspect-auto h-full flex-auto px-3"
                  value={`${DASHBOARD_ROUTES.analytics}${DASHBOARD_ROUTES.analyticsPlatform}`}
                  aria-label="Toggle Platform"
                >
                  Platform
                </ToggleGroupItem>
                <ToggleGroupItem
                  className="aspect-auto h-full flex-auto px-3"
                  value={`${DASHBOARD_ROUTES.analytics}${DASHBOARD_ROUTES.analyticsBrand}`}
                  aria-label="Toggle Brand"
                >
                  Brand
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          ),
        }}
      > */}
        <Outlet />
      {/* </PageContent> */}
    </AnalysisContext>
  );
};

export default AnalyticsDashboard;
