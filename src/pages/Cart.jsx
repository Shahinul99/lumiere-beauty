import { Link } from "react-router-dom";
import { useCart } from "../context/CartProvider";

export default function Cart() {
  const { items, total, changeQty, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <h1 className="font-display text-4xl font-semibold">Your cart is empty</h1>
        <p className="mt-3 text-muted">Add a lipstick or serum and it will show up here instantly.</p>
        <Link to="/" className="mt-8 inline-block rounded-full bg-rose px-8 py-3 font-medium text-ink transition hover:bg-rose-deep">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="font-display text-5xl font-semibold">Your cart</h1>

      <ul className="mt-8 space-y-4">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-4 rounded-2xl border border-line bg-panel p-4">
            <img src={item.image} alt={item.name} className="h-20 w-20 rounded-xl object-cover" />
            <div className="flex-1">
              <p className="text-xs text-muted">{item.brand}</p>
              <p className="font-display text-xl font-semibold leading-tight">{item.name}</p>
              {item.shade && (
                <span className="mt-1 inline-flex items-center gap-2 text-xs text-muted">
                  <span className="h-3 w-3 rounded-full border border-line" style={{ background: item.shade }} />
                  Selected shade
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => changeQty(item, -1)} aria-label="Decrease quantity" className="h-8 w-8 rounded-full border border-line transition hover:border-rose">-</button>
              <span className="w-6 text-center">{item.qty}</span>
              <button onClick={() => changeQty(item, 1)} aria-label="Increase quantity" className="h-8 w-8 rounded-full border border-line transition hover:border-rose">+</button>
            </div>
            <p className="w-16 text-right text-rose">${item.price * item.qty}</p>
            <button onClick={() => removeItem(item.id)} className="text-sm text-muted underline transition hover:text-text">Remove</button>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center justify-between border-t border-line pt-6">
        <span className="text-muted">Total</span>
        <span className="font-display text-4xl font-semibold text-rose">${total}</span>
      </div>
    </div>
  );
}
