import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await api.get("/products");

        console.log("Products:", response.data.data.products);

        setProducts(response.data.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-white">StoreFlow Products</h1>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Products;
