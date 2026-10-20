import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useCart } from "../context/CartProvider";

const linkClass = ({ isActive }) =>
  `px-1 pb-1 text-sm transition-colors border-b-2 ${
    isActive ? "border-rose text-rose" : "border-transparent text-muted hover:text-text"
  }`;

export default function Navbar() {
  const { user, logout } = useAuth();
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4">
        <Link to="/" className="font-display text-3xl font-semibold tracking-wide text-text sm:text-4xl">
          Lumière <span className="text-rose">Beauty</span>
        </Link>

        <nav className="flex items-center gap-6">
          <NavLink to="/" className={linkClass} end>Shop</NavLink>
          <NavLink to="/cart" className={linkClass}>
            Cart
            {count > 0 && (
              <span className="ml-2 rounded-full bg-rose px-2 py-0.5 text-xs font-semibold text-ink">
                {count}
              </span>
            )}
          </NavLink>

          {user ? (
            <div className="flex items-center gap-3">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "Your profile"}
                  referrerPolicy="no-referrer"
                  className="h-9 w-9 rounded-full border-2 border-rose object-cover"
                />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-rose bg-panel text-sm font-semibold text-rose">
                  {(user.displayName || user.email || "?")[0].toUpperCase()}
                </div>
              )}
              <span className="hidden text-sm text-muted md:inline">{user.displayName || user.email}</span>
              <button
                onClick={logout}
                className="rounded-full border border-line px-4 py-1.5 text-sm text-text transition hover:border-rose hover:text-rose"
              >
                Log out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-sm text-muted transition hover:text-text">Log in</Link>
              <Link
                to="/register"
                className="rounded-full bg-rose px-4 py-1.5 text-sm font-medium text-ink transition hover:bg-rose-deep"
              >
                Create account
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
