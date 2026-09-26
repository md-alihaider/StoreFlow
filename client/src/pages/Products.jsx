import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import api from "../services/api";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await api.get("/products");

        setProducts(response.data.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const query = search.toLowerCase();

    return (
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  });

  return (
    <>
      <main className="min-h-screen bg-[#0a0a0a] px-6 py-12 text-white">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-neutral-500">
                StoreFlow
              </p>

              <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                All Products
              </h1>

              <p className="mt-4 max-w-md text-sm leading-6 text-neutral-500">
                Explore our collection of modern essentials designed for
                everyday style.
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full md:max-w-sm">
              <Search
                size={18}
                strokeWidth={1.8}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-lg border border-neutral-800 bg-neutral-900/70 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-neutral-600"
              />
            </div>
          </div>

          {/* Product count */}
          <div className="mt-12 flex items-center justify-between border-b border-neutral-800 pb-4">
            <p className="text-sm text-neutral-500">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "product" : "products"}
            </p>

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="text-sm text-neutral-500 transition hover:text-white"
              >
                Clear search
              </button>
            )}
          </div>

          {/* Products */}
          {filteredProducts.length > 0 ? (
            <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            /* No results */
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="text-center">
                <p className="text-lg font-medium text-white">
                  No products found
                </p>

                <p className="mt-2 text-sm text-neutral-500">
                  Try searching with a different product name.
                </p>

                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="mt-6 text-sm text-neutral-300 underline underline-offset-4 transition hover:text-white"
                >
                  Clear search
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Products;
