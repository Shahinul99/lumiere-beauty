import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
import { useAuth } from "../context/AuthProvider";

export default function MainLayout() {
  const navigation = useNavigation();
  const { user, resendVerification } = useAuth();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {user && !user.emailVerified && user.providerData[0]?.providerId === "password" && (
        <div className="bg-raised px-5 py-2 text-center text-sm text-muted">
          Check your inbox to verify your email.{" "}
          <button onClick={resendVerification} className="text-rose underline">
            Send the link again
          </button>
        </div>
      )}

      <main className="flex-1">{navigation.state === "loading" ? <Spinner /> : <Outlet />}</main>

      <footer className="border-t border-line px-5 py-8 text-center text-sm text-muted">
        © {new Date().getFullYear()} Lumière Beauty. A demo project.
      </footer>
    </div>
  );
}
