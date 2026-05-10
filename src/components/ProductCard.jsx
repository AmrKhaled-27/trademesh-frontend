import React, { useState } from 'react';
import { ShoppingCart, CheckCircle2 } from 'lucide-react';
import { Typography } from './Typography';
import { Button } from './Button';
import { Link } from 'react-router-dom';
export default function ProductCard({ product }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <Link to={`/products/${product.id}`}>
      <div className="group flex flex-col rounded-2xl border border-zinc-200 bg-white transition-all duration-300 hover:border-[#10b981]/30 hover:shadow-xl hover:shadow-[#10b981]/5 overflow-hidden cursor-pointer">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-zinc-100 aspect-[4/3]">
          {!imageLoaded && <div className="absolute inset-0 animate-pulse bg-zinc-200" />}
          <img
            src={product.mainImage}
            alt={product.name || 'Product Image'}
            onLoad={() => setImageLoaded(true)}
            className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        {/* Content Container */}
        <div className="flex flex-1 flex-col p-5">
          {/* Brand */}
          <div className="flex items-center gap-1.5 mb-2">
            <Typography variant="label" className="text-zinc-500 line-clamp-1">
              {product.brand}
            </Typography>
          </div>

          {/* Title */}
          <Typography
            variant="body-lg"
            className="line-clamp-2 font-semibold text-zinc-900 group-hover:text-[#10b981] transition-colors mb-4 leading-snug"
          >
            {product.name}
          </Typography>

          {/* Footer info */}
          <div className="mt-auto flex items-end justify-between border-t border-zinc-100 pt-4">
            <div>
              <Typography variant="label" className="text-zinc-500 mb-0.5">
                PRICE
              </Typography>
              <Typography variant="h3" className="text-zinc-900">
                ${Number(product.price).toFixed(2)}
              </Typography>
            </div>

            <Button
              onClick={handleAddToCart}
              className={`!h-10 !w-10 !p-0 !min-w-[40px] rounded-xl transition-all duration-200 border-none flex items-center justify-center ${
                addedToCart
                  ? '!bg-[#10b981] !text-white'
                  : '!bg-zinc-100 !text-zinc-600 hover:!bg-[#10b981] hover:!text-white'
              }`}
              title="Add to Cart"
            >
              {addedToCart ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <ShoppingCart className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
