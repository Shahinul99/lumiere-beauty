import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth, friendlyError } from "../context/AuthProvider";
import AuthShell, { inputClass, FormError, GoogleButton, Divider } from "../components/AuthShell";

const validate = ({ name, email, password, confirm }) => {
  if (!name.trim()) return "Enter your name.";
  if (!/^\S+@\S+\.\S+$/.test(email)) return "Enter a valid email address.";
  if (password.length < 6) return "Password must be at least 6 characters.";
  if (!/[A-Z]/.test(password)) return "Password needs at least one uppercase letter.";
  if (!/[a-z]/.test(password)) return "Password needs at least one lowercase letter.";
  if (!/[0-9]/.test(password)) return "Password needs at least one number.";
  if (password !== confirm) return "Passwords don't match.";
  return "";
};

export default function Register() {
  const { register, googleLogin } = useAuth();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = Object.fromEntries(new FormData(e.target));
    const problem = validate(form);
    if (problem) return setError(problem);

    setError("");
    setBusy(true);
    try {
      await register(form.name.trim(), form.email, form.password);
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
    <AuthShell title="Create your account" subtitle="Shop faster and keep your cart on every device.">
      <FormError message={error} />
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="name" className="mb-1 block text-sm text-muted">Full name</label>
          <input id="name" name="name" type="text" autoComplete="name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm text-muted">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" className={inputClass} placeholder="you@example.com" />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm text-muted">Password</label>
          <input id="password" name="password" type="password" autoComplete="new-password" className={inputClass} />
          <p className="mt-1 text-xs text-muted">6+ characters with an uppercase letter, a lowercase letter, and a number.</p>
        </div>
        <div>
          <label htmlFor="confirm" className="mb-1 block text-sm text-muted">Confirm password</label>
          <input id="confirm" name="confirm" type="password" autoComplete="new-password" className={inputClass} />
        </div>
        <button disabled={busy} className="w-full rounded-full bg-rose px-6 py-3 font-medium text-ink transition hover:bg-rose-deep disabled:opacity-60">
          {busy ? "Creating account..." : "Create account"}
        </button>
      </form>
      <Divider />
      <GoogleButton onClick={handleGoogle} disabled={busy} />
      <p className="mt-6 text-center text-sm text-muted">
        Already have an account? <Link to="/login" className="text-rose hover:underline">Log in</Link>
      </p>
    </AuthShell>
  );
}
