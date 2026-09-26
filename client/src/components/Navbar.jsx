import { Search, Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

          {/* Login */}
          <Link
            to="/login"
            className="rounded-lg border border-neutral-700 px-4 py-2 text-sm text-white transition hover:bg-white hover:text-black"
          >
            Login
          </Link>
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

            {/* Login */}
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="mt-4 w-fit rounded-lg border border-neutral-700 px-4 py-2 text-sm text-white transition hover:bg-white hover:text-black"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
