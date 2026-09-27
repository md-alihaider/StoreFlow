import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import api from "../services/api";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear the error for the field being edited
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", formData);
      toast.success("Account created successfully");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error.response?.data);

      // Duplicate email
      if (error.response?.status === 409) {
        toast.error("Email is already registered");
        return;
      }

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

      // Other errors
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-16 text-white">
      <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center">
        <div className="w-full">
          {/* Header */}
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-neutral-500">
              StoreFlow
            </p>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight">
              Create your account
            </h1>

            <p className="mt-3 text-sm text-neutral-500">
              Sign up to get started with StoreFlow.
            </p>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm text-neutral-300"
              >
                Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full rounded-lg border border-neutral-800 bg-neutral-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-neutral-600"
              />

              {errors.name && (
                <p className="mt-2 text-xs text-red-400">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm text-neutral-300"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-neutral-800 bg-neutral-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-neutral-600"
              />

              {errors.email && (
                <p className="mt-2 text-xs text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm text-neutral-300"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-900/70 px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-neutral-600"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 transition hover:text-white"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.password && (
                <p className="mt-2 text-xs text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm text-neutral-300"
              >
                Confirm Password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-900/70 px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-neutral-600"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 transition hover:text-white"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="mt-2 text-xs text-red-400">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-lg bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-neutral-200"
            >
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-8 text-center text-sm text-neutral-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-neutral-300 underline underline-offset-4 transition hover:text-white"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Register;
