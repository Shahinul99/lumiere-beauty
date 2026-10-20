import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="product-card block rounded-2xl border border-line bg-panel"
    >
      <div className="relative aspect-square overflow-hidden bg-raised">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="card-img h-full w-full object-cover"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-rose px-3 py-1 text-xs font-semibold text-ink">
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-muted">{product.brand}</p>
        <h3 className="mt-1 font-display text-xl font-semibold leading-tight">{product.name}</h3>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-medium text-rose">${product.price}</span>
          {product.shades.length > 0 && (
            <div className="flex -space-x-1">
              {product.shades.slice(0, 4).map((s) => (
                <span key={s} className="h-4 w-4 rounded-full border border-panel" style={{ background: s }} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
