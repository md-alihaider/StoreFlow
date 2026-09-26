import { Link } from "react-router";

const ProductCard = ({ product }) => {
  return (
    <article className="group max-w-sm">
      <Link to={`/products/${product._id}`}>
        {/* Product Image */}
        <div className="aspect-4/5 overflow-hidden rounded-xl bg-neutral-900">
          <img
            src={product.images?.[0]}
            alt={product.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        {/* Product Info */}
        <div className="pt-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-medium text-white">
                {product.title}
              </h3>

              <p className="mt-1 line-clamp-1 text-sm text-neutral-500">
                {product.description}
              </p>
            </div>

            <p className="whitespace-nowrap text-sm font-medium text-white">
              {product.price.amount} {product.price.currency}
            </p>
          </div>

          {/* Sizes */}
          <div className="mt-4 flex gap-2">
            {product.sizes?.map((item) => (
              <span
                key={item.size}
                className="text-xs text-neutral-500 transition group-hover:text-neutral-300"
              >
                {item.size}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;
