import { Navigate } from "react-router-dom";
import { useAuth } from "./UseAuth";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  return user ? <>{children}</> : <Navigate to="/connexion" replace />;
};
