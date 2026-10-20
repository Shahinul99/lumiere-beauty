import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { categories } from "../data/products";

export default function Home() {
  const products = useLoaderData();
  const [category, setCategory] = useState("All");

  const visible = category === "All" ? products : products.filter((p) => p.category === category);

  return (
    <>
      <section className="border-b border-line bg-gradient-to-b from-raised/60 to-ink px-5 py-20 text-center sm:py-28">
        <h1 className="hero-in font-display text-6xl font-semibold leading-none tracking-wide sm:text-8xl">
          Lumière
        </h1>
        <p className="hero-in mx-auto mt-6 max-w-xl text-lg text-muted" style={{ animationDelay: "0.15s" }}>
          Lipsticks, skincare, and everyday glow, chosen for skin that looks like yours.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Product categories">
          {categories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={category === c}
              onClick={() => setCategory(c)}
              className={`rounded-full border px-5 py-2 text-sm transition ${
                category === c
                  ? "border-rose bg-rose text-ink"
                  : "border-line text-muted hover:border-rose hover:text-text"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
