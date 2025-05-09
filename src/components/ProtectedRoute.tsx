
import { Navigate, useLocation } from "react-router-dom";
import { useAuth, UserRole } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Show loading state if auth is being checked
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Check for required role
  if (requiredRole && user?.role !== requiredRole) {
    // Redirect based on role
    const redirectPath = user?.role === UserRole.ADMIN ? "/admin/dashboard" : "/employee/profile";
    return <Navigate to={redirectPath} replace />;
  }

  // Render children if all checks pass
  return <>{children}</>;
};

export default ProtectedRoute;
