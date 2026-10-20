import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <h1 className="font-display text-6xl font-semibold">Page not found</h1>
      <p className="mt-3 text-muted">That page doesn't exist or has moved.</p>
      <Link to="/" className="mt-8 rounded-full bg-rose px-8 py-3 font-medium text-ink transition hover:bg-rose-deep">
        Back to shop
      </Link>
    </div>
  );
}
