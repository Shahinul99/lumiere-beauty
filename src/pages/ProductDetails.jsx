import { useState } from "react";
import { Link, useLoaderData, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useCart } from "../context/CartProvider";

export default function ProductDetails() {
  const product = useLoaderData();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [shade, setShade] = useState(product.shades[0] || null);
  const [added, setAdded] = useState(false);

  const handleAdd = async () => {
    if (!user) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    await addToCart(product, shade);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-5 py-12 md:grid-cols-2">
      <div className="overflow-hidden rounded-2xl border border-line bg-panel">
        <img src={product.image} alt={product.name} className="aspect-square w-full object-cover" />
      </div>

      <div>
        <Link to="/" className="text-sm text-muted transition hover:text-rose">Back to shop</Link>
        <p className="mt-6 text-sm text-muted">{product.brand}</p>
        <h1 className="mt-1 font-display text-5xl font-semibold leading-tight">{product.name}</h1>
        <p className="mt-4 text-3xl text-rose">${product.price}</p>
        <p className="mt-6 max-w-md leading-relaxed text-muted">{product.description}</p>

        {product.shades.length > 0 && (
          <div className="mt-8">
            <p className="mb-3 text-sm text-muted">Shade</p>
            <div className="flex gap-3">
              {product.shades.map((s) => (
                <button
                  key={s}
                  onClick={() => setShade(s)}
                  aria-label={`Shade ${s}`}
                  aria-pressed={shade === s}
                  className={`h-9 w-9 rounded-full border-2 transition ${
                    shade === s ? "scale-110 border-text" : "border-transparent"
                  }`}
                  style={{ background: s }}
                />
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleAdd}
          className="mt-10 w-full rounded-full bg-rose px-8 py-3.5 font-medium text-ink transition hover:bg-rose-deep sm:w-auto"
        >
          {added ? "Added to cart" : user ? "Add to cart" : "Log in to add to cart"}
        </button>
      </div>
    </div>
  );
}
