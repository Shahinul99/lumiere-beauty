import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth, friendlyError } from "../context/AuthProvider";
import AuthShell, { inputClass, FormError, GoogleButton, Divider } from "../components/AuthShell";

export default function Login() {
  const { login, googleLogin } = useAuth();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // After a successful login, AuthRoute sees the user and redirects automatically
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    setError("");
    setBusy(true);
    try {
      await login(form.get("email"), form.get("password"));
    } catch (err) {
      setError(friendlyError(err));
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setBusy(true);
    try {
      await googleLogin();
    } catch (err) {
      setError(friendlyError(err));
      setBusy(false);
    }
  };

  return (
    <AuthShell title="Welcome back" subtitle="Log in to see your cart and saved picks.">
      <FormError message={error} />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm text-muted">Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} placeholder="you@example.com" />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm text-muted">Password</label>
          <input id="password" name="password" type="password" required autoComplete="current-password" className={inputClass} />
        </div>
        <div className="text-right">
          <Link to="/forgot-password" className="text-sm text-rose hover:underline">Forgot your password?</Link>
        </div>
        <button disabled={busy} className="w-full rounded-full bg-rose px-6 py-3 font-medium text-ink transition hover:bg-rose-deep disabled:opacity-60">
          {busy ? "Logging in..." : "Log in"}
        </button>
      </form>
      <Divider />
      <GoogleButton onClick={handleGoogle} disabled={busy} />
      <p className="mt-6 text-center text-sm text-muted">
        New here? <Link to="/register" className="text-rose hover:underline">Create an account</Link>
      </p>
    </AuthShell>
  );
}
