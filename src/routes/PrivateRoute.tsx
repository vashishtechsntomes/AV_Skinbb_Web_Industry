import type { RootState } from "@/context/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { ROUTES } from "./routes.constant";

interface PrivateRouteProps {
  requiredRole?: string;
  requiredPage?: string;
  requiredAction?: string;
}

const PrivateRoute = ({
  requiredRole,
  requiredPage,
  requiredAction,
}: PrivateRouteProps) => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) {
    return <Navigate to={ROUTES.SIGN_IN} replace />;
  }

  // Role check
  if (requiredRole && user.roleValue !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Permission check
  if (requiredPage && requiredAction) {
    const hasPermission = user.permissions.some(
      (perm) =>
        perm.page === requiredPage && perm.action.includes(requiredAction),
    );

    if (!hasPermission) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <Outlet />;
};

export default PrivateRoute;
