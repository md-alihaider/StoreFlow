import { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import api from "../services/api";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { setAccessToken, setUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });
      setUser(response.data.data.user);
      setAccessToken(response.data.data.accessToken);
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error.response?.data);

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

      toast.error(error.response?.data?.message || "Login failed");
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
              Welcome back
            </h1>

            <p className="mt-3 text-sm text-neutral-500">
              Sign in to continue to your account.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
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
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);

                  setErrors((prev) => ({
                    ...prev,
                    email: "",
                  }));
                }}
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
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);

                    setErrors((prev) => ({
                      ...prev,
                      password: "",
                    }));
                  }}
                  placeholder="Enter your password"
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

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-lg bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-neutral-200"
            >
              Sign In
            </button>
          </form>

          {/* Register */}
          <p className="mt-8 text-center text-sm text-neutral-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-neutral-300 underline underline-offset-4 transition hover:text-white"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
