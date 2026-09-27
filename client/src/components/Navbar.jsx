import { Search, Menu, X, ChevronDown } from "lucide-react";

import { Link, NavLink } from "react-router";

import { useContext, useState } from "react";

import AuthContext from "../context/AuthContext";
import api from "../services/api";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { user, setUser, accessToken, setAccessToken } =
    useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUser(null);
      setAccessToken(null);

      setIsProfileOpen(false);
      setIsMenuOpen(false);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `relative py-2 text-sm transition ${
      isActive
        ? "text-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-white"
        : "text-neutral-400 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-[#0a0a0a]">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-tight text-white">
          Store<span className="text-neutral-500">Flow</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/products" className={navLinkClass}>
            Products
          </NavLink>
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-5 md:flex">
          {/* Search */}
          <button
            type="button"
            className="text-neutral-400 transition hover:text-white"
            aria-label="Search"
          >
            <Search size={20} strokeWidth={1.8} />
          </button>

          {/* User / Login */}
          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsProfileOpen((prev) => !prev)}
                className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition hover:bg-neutral-900"
              >
                {/* Avatar */}
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-medium text-black">
                  {user.name?.charAt(0).toUpperCase()}
                </span>

                {/* Name */}
                <span className="max-w-28 truncate text-sm text-neutral-300">
                  {user.name}
                </span>

                {/* Arrow */}
                <ChevronDown
                  size={16}
                  className={`text-neutral-500 transition-transform ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 top-12 w-56 rounded-xl border border-neutral-800 bg-[#111111] p-2 shadow-xl">
                  {/* User Information */}
                  <div className="border-b border-neutral-800 px-3 py-3">
                    <p className="text-sm font-medium text-white">
                      {user.name}
                    </p>

                    <p className="mt-1 truncate text-xs text-neutral-500">
                      {user.email}
                    </p>
                  </div>

                  {/* Profile */}
                  <Link
                    to="/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="mt-1 block rounded-lg px-3 py-2 text-sm text-neutral-400 transition hover:bg-neutral-900 hover:text-white"
                  >
                    Profile
                  </Link>

                  {/* Logout */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full rounded-lg px-3 py-2 text-left text-sm text-neutral-400 transition hover:bg-neutral-900 hover:text-white"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm text-neutral-400 transition hover:text-white"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-neutral-200"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="text-neutral-300 transition hover:text-white md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-neutral-800 bg-[#0a0a0a] md:hidden">
          <div className="flex flex-col px-6 py-5">
            {/* Home */}
            <NavLink
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `border-b border-neutral-800 py-4 text-sm transition ${
                  isActive
                    ? "font-medium text-white"
                    : "text-neutral-300 hover:text-white"
                }`
              }
            >
              Home
            </NavLink>

            {/* Products */}
            <NavLink
              to="/products"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `border-b border-neutral-800 py-4 text-sm transition ${
                  isActive
                    ? "font-medium text-white"
                    : "text-neutral-300 hover:text-white"
                }`
              }
            >
              Products
            </NavLink>

            {/* Mobile Auth */}
            {user ? (
              <div className="mt-5 rounded-xl border border-neutral-800 bg-neutral-900/50 p-3">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-medium text-black">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">
                      {user.name}
                    </p>

                    <p className="truncate text-xs text-neutral-500">
                      {user.email}
                    </p>
                  </div>
                </div>

                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-4 block rounded-lg px-3 py-2 text-sm text-neutral-400 transition hover:bg-neutral-800 hover:text-white"
                >
                  Profile
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-1 w-full rounded-lg px-3 py-2 text-left text-sm text-neutral-400 transition hover:bg-neutral-800 hover:text-white"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="mt-4 w-fit rounded-lg border border-neutral-700 px-4 py-2 text-sm text-white transition hover:bg-white hover:text-black"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
