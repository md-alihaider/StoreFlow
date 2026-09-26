import { useEffect, useState } from "react";
import { Link } from "react-router";

import api from "../services/api";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getFeaturedProducts = async () => {
      try {
        const response = await api.get("/products");

        setProducts(response.data.data.products.slice(0, 4));
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };

    getFeaturedProducts();
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-8 pb-16 md:pt-12 md:pb-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Hero Content */}
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-neutral-500">
              New Collection
            </p>

            <h1 className="max-w-xl text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
              Discover your style.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-neutral-400 md:text-lg">
              Modern essentials designed for everyday style. Explore the latest
              collection from StoreFlow.
            </p>

            <div className="mt-8">
              <Link
                to="/products"
                className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-neutral-200"
              >
                Explore Products
                <span className="ml-2">→</span>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-900">
              <img
                src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80"
                alt="StoreFlow fashion collection"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-neutral-500">
            Our Collection
          </p>

          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Featured Products
          </h2>

          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-neutral-500">
            Discover pieces designed for everyday style.
          </p>
        </div>

        {/* Product Grid */}
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="inline-flex items-center border-b border-neutral-600 pb-1 text-sm text-neutral-300 transition hover:border-white hover:text-white"
          >
            View All Products
            <span className="ml-2">→</span>
          </Link>
        </div>

        {/* Mobile View All */}
        <div className="mt-8 sm:hidden">
          <Link
            to="/products"
            className="text-sm text-neutral-400 transition hover:text-white"
          >
            View All Products →
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
