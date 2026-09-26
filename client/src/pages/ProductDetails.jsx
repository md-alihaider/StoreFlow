import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import api from "../services/api";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);

        const fetchedProduct = response.data.data.product;

        setProduct(fetchedProduct);
        setSelectedImage(fetchedProduct.images?.[0] || "");
      } catch (error) {
        console.error("Error fetching product:", error);

        setError(error.response?.data?.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-neutral-500">Loading product...</p>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-neutral-500">{error || "Product not found"}</p>

          <Link
            to="/products"
            className="mt-6 inline-block text-sm text-white underline"
          >
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Back */}
        <Link
          to="/products"
          className="text-sm text-neutral-500 transition hover:text-white"
        >
          ← Back to Products
        </Link>

        <div className="mt-10 grid gap-12 md:grid-cols-2">
          {/* Images */}
          <div>
            {/* Main Image */}
            <div className="aspect-4/5 overflow-hidden rounded-xl bg-neutral-900">
              <img
                src={selectedImage}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Thumbnails */}
            {product.images?.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setSelectedImage(image)}
                    className={`h-20 w-16 shrink-0 overflow-hidden rounded-md border ${
                      selectedImage === image
                        ? "border-white"
                        : "border-neutral-800"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {product.title}
            </h1>

            <p className="mt-4 max-w-xl leading-7 text-neutral-400">
              {product.description}
            </p>

            <p className="mt-8 text-xl font-medium">
              {product.price.amount} {product.price.currency}
            </p>

            {/* Sizes */}
            <div className="mt-8">
              <h2 className="text-sm font-medium text-white">
                Available Sizes
              </h2>

              <div className="mt-4 flex flex-wrap gap-2">
                {product.sizes?.map((item) => (
                  <div
                    key={item.size}
                    className="border border-neutral-800 px-4 py-3"
                  >
                    <span className="text-sm">{item.size}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stock */}
            <div className="mt-8">
              <h2 className="text-sm font-medium text-white">Stock</h2>

              <div className="mt-3 space-y-2">
                {product.sizes?.map((item) => (
                  <div
                    key={item.size}
                    className="flex max-w-sm justify-between text-sm"
                  >
                    <span className="text-neutral-400">Size {item.size}</span>

                    <span className="text-neutral-300">
                      {item.stock} available
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
