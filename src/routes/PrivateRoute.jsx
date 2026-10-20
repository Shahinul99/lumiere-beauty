import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Spinner from "../components/Spinner";

// Only signed-in users can see the page inside
export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Spinner />;
  if (user) return children;
  return <Navigate to="/login" state={{ from: location.pathname }} replace />;
}
