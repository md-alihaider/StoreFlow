import { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router";
import AuthContext from "../context/AuthContext";
import { toast } from "react-hot-toast";
import api from "../services/api";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { accessToken } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    currency: "INR",
    sizes: [],
    images: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleImagesChange = (e) => {
    const selectedImages = Array.from(e.target.files);

    if (selectedImages.length > 5) {
      toast.error("You can select a maximum of 5 images");
      return;
    }

    const invalidImage = selectedImages.find(
      (image) => image.size > 2 * 1024 * 1024,
    );

    if (invalidImage) {
      toast.error(`${invalidImage.name} is larger than 2MB`);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      images: selectedImages,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setErrors({});

      const formDataToSend = new FormData();

      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);

      formDataToSend.append(
        "price",
        JSON.stringify({
          amount: Number(formData.price),
          currency: formData.currency,
        }),
      );

      formDataToSend.append("sizes", JSON.stringify(formData.sizes));

      formData.images.forEach((image) => {
        formDataToSend.append("images", image);
      });

      const response = await api.put(`/products/${id}`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      toast.success(response.data.message || "Product updated successfully");

      navigate(`/products/${id}`);
    } catch (error) {
      console.error("Error updating product:", error);

      if (error.response?.status === 400) {
        const validationErrors = error.response?.data?.errors;

        if (validationErrors) {
          const fieldErrors = {};

          validationErrors.forEach((item) => {
            fieldErrors[item.path] = item.msg;
          });

          setErrors(fieldErrors);
        } else {
          toast.error(error.response?.data?.message || "Invalid request");
        }
      } else if (error.response?.status === 401) {
        toast.error("You are not authorized to update this product");
      } else {
        toast.error("Failed to update product");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);

        const fetchedProduct = response.data.data.product;

        setProduct(fetchedProduct);

        setFormData({
          title: fetchedProduct.title,
          description: fetchedProduct.description,
          price: fetchedProduct.price.amount,
          currency: fetchedProduct.price.currency,
          sizes: fetchedProduct.sizes || [],
          images: [],
        });
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
        <div className="mx-auto max-w-3xl">
          <p className="text-neutral-500">Loading product...</p>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] px-6 py-20 text-white">
        <div className="mx-auto max-w-3xl">
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
      <div className="mx-auto max-w-3xl">
        <Link
          to={`/products/${product._id}`}
          className="text-sm text-neutral-500 transition hover:text-white"
        >
          ← Back to Product
        </Link>

        <div className="mt-10">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-neutral-500">
            StoreFlow
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            Edit Product
          </h1>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="text-sm text-neutral-500">Title</label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3 text-white outline-none focus:border-neutral-600"
              />
            </div>

            <div>
              <label className="text-sm text-neutral-500">Description</label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className="mt-2 w-full resize-none rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3 text-white outline-none focus:border-neutral-600"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm text-neutral-500">Price</label>

                <input
                  type="number"
                  name="price"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3 text-white outline-none focus:border-neutral-600"
                />
              </div>

              <div>
                <label className="text-sm text-neutral-500">Currency</label>

                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3 text-white outline-none focus:border-neutral-600"
                >
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm text-neutral-500">Sizes & Stock</label>

              <div className="mt-3 space-y-3">
                {formData.sizes.map((item, index) => (
                  <div key={item.size} className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-neutral-500">Size</label>

                      <select
                        value={item.size}
                        onChange={(e) => {
                          const updatedSizes = [...formData.sizes];

                          updatedSizes[index] = {
                            ...updatedSizes[index],
                            size: e.target.value,
                          };

                          setFormData((prev) => ({
                            ...prev,
                            sizes: updatedSizes,
                          }));
                        }}
                        className="mt-2 w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3 text-white outline-none focus:border-neutral-600"
                      >
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-neutral-500">Stock</label>

                      <input
                        type="number"
                        min="0"
                        value={item.stock}
                        onChange={(e) => {
                          const updatedSizes = [...formData.sizes];

                          updatedSizes[index] = {
                            ...updatedSizes[index],
                            stock: Number(e.target.value),
                          };

                          setFormData((prev) => ({
                            ...prev,
                            sizes: updatedSizes,
                          }));
                        }}
                        className="mt-2 w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3 text-white outline-none focus:border-neutral-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm text-neutral-500">Product Images</label>

              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {product.images?.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-4/5 overflow-hidden rounded-lg bg-neutral-900"
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImagesChange}
                className="mt-4 block w-full text-sm text-neutral-400 file:mr-4 file:rounded-lg file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-medium file:text-black hover:file:bg-neutral-200"
              />

              <p className="mt-2 text-xs text-neutral-500">
                Select up to 5 images. Each image must be 2MB or smaller.
                Selecting new images will replace the existing images.
              </p>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Updating Product..." : "Update Product"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default EditProduct;
