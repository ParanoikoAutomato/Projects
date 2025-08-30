import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/hooks/use-auth";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export const RedirectRoute = () => {
  const { isAuthenticated } = useAuth();

  return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export const RoleProtectedRoute = ({ allowedRoles }) => {
  const {
    user: { role },
  } = useAuth();

  return allowedRoles.includes(role) ? (
    <Outlet />
  ) : (
    <div className="flex items-center justify-center">
      <h1 className="text-2xl text-red-700 ">Forbidden</h1>
    </div>
  );
};
