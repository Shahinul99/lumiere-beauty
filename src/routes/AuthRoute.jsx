import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Spinner from "../components/Spinner";

// Login and register pages: signed-in users get sent back to where they came from
export default function AuthRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Spinner />;
  if (user) return <Navigate to={location.state?.from || "/"} replace />;
  return children;
}
