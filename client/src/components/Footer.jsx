import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="border-t border-neutral-800 bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="text-xl font-bold tracking-tight text-white"
            >
              Store<span className="text-neutral-500">Flow</span>
            </Link>

            <p className="mt-3 max-w-xs text-sm leading-6 text-neutral-500">
              Discover your style. Modern essentials designed for everyday life.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-medium text-white">Explore</h3>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                to="/"
                className="text-sm text-neutral-500 transition hover:text-white"
              >
                Home
              </Link>

              <Link
                to="/products"
                className="text-sm text-neutral-500 transition hover:text-white"
              >
                Products
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-3 border-t border-neutral-800 pt-6 text-xs text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 StoreFlow. All rights reserved.</p>

          <p>Built with React & Node.js</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
