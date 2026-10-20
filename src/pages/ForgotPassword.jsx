import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth, friendlyError } from "../context/AuthProvider";
import AuthShell, { inputClass, FormError } from "../components/AuthShell";

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = new FormData(e.target).get("email");
    setError("");
    setBusy(true);
    try {
      await resetPassword(email);
      setSent(true);
    } catch (err) {
      setError(friendlyError(err));
    }
    setBusy(false);
  };

  return (
    <AuthShell title="Reset your password" subtitle="We'll email you a link to choose a new one.">
      {sent ? (
        <p role="status" className="rounded-xl border border-line bg-ink px-4 py-4 text-muted">
          If an account exists for that email, a reset link is on its way. Check your spam folder too.
        </p>
      ) : (
        <>
          <FormError message={error} />
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm text-muted">Email</label>
              <input id="email" name="email" type="email" required className={inputClass} placeholder="you@example.com" />
            </div>
            <button disabled={busy} className="w-full rounded-full bg-rose px-6 py-3 font-medium text-ink transition hover:bg-rose-deep disabled:opacity-60">
              {busy ? "Sending..." : "Send reset link"}
            </button>
          </form>
        </>
      )}
      <p className="mt-6 text-center text-sm text-muted">
        <Link to="/login" className="text-rose hover:underline">Back to log in</Link>
      </p>
    </AuthShell>
  );
}
