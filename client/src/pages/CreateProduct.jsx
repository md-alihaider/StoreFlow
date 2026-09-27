import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import api from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const CreateProduct = () => {
  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const { accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [sizes, setSizes] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    currency: "INR",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Price validation
    if (!formData.price) {
      setErrors((prev) => ({
        ...prev,
        price: "Price is required",
      }));
      return;
    }

    if (images.length === 0) {
      setErrors((prev) => ({
        ...prev,
        images: "At least one image is required",
      }));
      return;
    }

    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);

    data.append(
      "price",
      JSON.stringify({
        amount: Number(formData.price),
        currency: formData.currency,
      }),
    );

    data.append("sizes", JSON.stringify(sizes));

    images.forEach((image) => {
      data.append("images", image);
    });

    try {
      setIsLoading(true);

      const response = await api.post("/products", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log(response.data);

      toast.success("Product created successfully");
      navigate("/products");
    } catch (error) {
      console.error("Create product error:", error.response?.data);

      // Validation errors
      if (error.response?.status === 400) {
        const validationErrors = error.response?.data?.errors;

        if (validationErrors) {
          const formattedErrors = {};

          validationErrors.forEach((error) => {
            formattedErrors[error.path] = error.msg;
          });

          setErrors(formattedErrors);
          return;
        }
      }

      // Authentication error
      if (error.response?.status === 401) {
        toast.error("Please login again");
        return;
      }

      // Other errors
      toast.error(error.response?.data?.message || "Failed to create product");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImagesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // Check number of images
    if (selectedFiles.length > 5) {
      setImages([]);
      setErrors((prev) => ({
        ...prev,
        images: "You can upload a maximum of 5 images",
      }));
      return;
    }

    // Check file size
    const hasLargeFile = selectedFiles.some(
      (file) => file.size > 2 * 1024 * 1024,
    );

    if (hasLargeFile) {
      setImages([]);
      setErrors((prev) => ({
        ...prev,
        images: "Each image must be less than 2MB",
      }));
      return;
    }

    setImages(selectedFiles);

    setErrors((prev) => ({
      ...prev,
      images: "",
    }));
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-12 text-white">
      <div className="mx-auto max-w-3xl">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-neutral-500">
            StoreFlow
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            Add Product
          </h1>

          <p className="mt-4 text-sm leading-6 text-neutral-500">
            Add a new product to your StoreFlow collection.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm text-neutral-300"
            >
              Product Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter product title"
              className="w-full rounded-lg border border-neutral-800 bg-neutral-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-neutral-600"
            />

            {errors.title && (
              <p className="mt-2 text-xs text-red-400">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm text-neutral-300"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your product..."
              rows={5}
              className="w-full resize-none rounded-lg border border-neutral-800 bg-neutral-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-neutral-600"
            />

            {errors.description && (
              <p className="mt-2 text-xs text-red-400">{errors.description}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="mb-2 block text-sm text-neutral-300"
            >
              Price
            </label>

            <div className="flex gap-3">
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full rounded-lg border border-neutral-800 bg-neutral-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-neutral-600"
              />

              <select
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="rounded-lg border border-neutral-800 bg-neutral-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-neutral-600"
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
              </select>
            </div>

            {errors.price && (
              <p className="mt-2 text-xs text-red-400">{errors.price}</p>
            )}
          </div>

          {/* Sizes */}
          <div>
            <label className="mb-3 block text-sm text-neutral-300">
              Sizes & Stock
            </label>

            <div className="space-y-3">
              {availableSizes.map((size) => {
                const selectedSize = sizes.find((item) => item.size === size);

                return (
                  <div
                    key={size}
                    className="flex items-center gap-4 rounded-lg border border-neutral-800 bg-neutral-900/50 p-3"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        if (selectedSize) {
                          setSizes((prev) =>
                            prev.filter((item) => item.size !== size),
                          );
                        } else {
                          setSizes((prev) => [
                            ...prev,
                            {
                              size,
                              stock: 0,
                            },
                          ]);
                        }

                        setErrors((prev) => ({
                          ...prev,
                          sizes: "",
                        }));
                      }}
                      className={`flex h-10 w-12 items-center justify-center rounded-md border text-sm transition ${
                        selectedSize
                          ? "border-white bg-white text-black"
                          : "border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:text-white"
                      }`}
                    >
                      {size}
                    </button>

                    {selectedSize && (
                      <input
                        type="number"
                        min="0"
                        value={selectedSize.stock}
                        onChange={(e) => {
                          const stock = Number(e.target.value);

                          setSizes((prev) =>
                            prev.map((item) =>
                              item.size === size
                                ? {
                                    ...item,
                                    stock,
                                  }
                                : item,
                            ),
                          );
                        }}
                        className="w-28 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white outline-none focus:border-neutral-600"
                        placeholder="Stock"
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {errors.sizes && (
              <p className="mt-2 text-xs text-red-400">{errors.sizes}</p>
            )}
          </div>

          {/* Images */}
          <div>
            <label
              htmlFor="images"
              className="mb-3 block text-sm text-neutral-300"
            >
              Product Images
            </label>

            <input
              id="images"
              name="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImagesChange}
              className="block w-full rounded-lg border border-neutral-800 bg-neutral-900/70 px-4 py-3 text-sm text-neutral-400 file:mr-4 file:rounded-md file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-medium file:text-black hover:file:bg-neutral-200"
            />

            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {images.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Product preview ${index + 1}`}
                      className="aspect-square w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {errors.images && (
              <p className="mt-2 text-xs text-red-400">{errors.images}</p>
            )}

            <p className="mt-2 text-xs text-neutral-600">
              Upload 1 to 5 images. Maximum 2MB per image.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Creating Product..." : "Create Product"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateProduct;
