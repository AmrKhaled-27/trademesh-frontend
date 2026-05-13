import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useProductDetailsQuery } from '../../hooks/useProducts';
import { ChevronLeft, AlertCircle } from 'lucide-react';
import { CheckoutModal } from '../../components/CheckoutModal';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useProductDetailsQuery(id);

  const [selectedImage, setSelectedImage] = useState(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const product = data?.data?.product;

  useEffect(() => {
    if (product) {
      setSelectedImage(product.mainImage);
    }
  }, [product?.id]);

  const allImages = product ? [product.mainImage, ...(product.images || [])].filter(Boolean) : [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <div className="max-w-6xl w-full mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-14">
          <div className="aspect-[4/3] bg-gray-200 animate-pulse rounded-xl" />
          <div className="space-y-4 pt-2">
            <div className="h-4 w-1/4 bg-gray-200 animate-pulse rounded-md" />
            <div className="h-10 w-3/4 bg-gray-200 animate-pulse rounded-md" />
            <div className="h-8 w-1/3 bg-gray-200 animate-pulse rounded-md" />
            <div className="h-24 w-full bg-gray-200 animate-pulse rounded-md" />
            <div className="h-14 w-full bg-gray-200 animate-pulse rounded-md" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="text-gray-500 w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-[#191c1d] mb-2">Product not found</h2>
        <p className="text-[#555f6f] mb-6 max-w-md">
          {error?.message || 'The product you are looking for does not exist or has been removed.'}
        </p>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white bg-[#006c49] px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Market
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-9 px-7 pb-20 font-body">
      <div className="max-w-[1140px] mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[13px] mb-8 font-medium">
          <button onClick={() => navigate('/')} className="text-[#006c49] hover:underline">
            Market
          </button>
          <span className="text-gray-400">/</span>
          <span className="text-[#555f6f] truncate max-w-[300px] font-normal">{product.name}</span>
        </nav>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-14 items-start">
          {/* Left: Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-200 shadow-sm border border-gray-100">
              <img
                src={selectedImage || product.mainImage}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://placehold.co/700x520?text=No+Image';
                }}
              />
            </div>

            {allImages.length > 1 && (
              <div className="flex gap-2 flex-wrap">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`w-[70px] h-[70px] rounded-lg overflow-hidden border-2 transition-all p-0 cursor-pointer ${
                      selectedImage === img
                        ? 'border-[#006c49] scale-[0.98]'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`View ${i + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://placehold.co/80x80?text=X';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="flex flex-col pt-1">
            {/* Status + Brand Chips */}
            <div className="flex items-center gap-3 mb-6">
              {product.brand && (
                <div className="bg-gray-200/60 text-[#555f6f] px-3 py-1.5 rounded-full text-xs font-bold">
                  {product.brand}
                </div>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-[#191c1d] leading-tight tracking-tight mb-4 font-display">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-xl font-bold text-[#006c49] font-display">$</span>
              <span className="text-4xl font-extrabold text-[#191c1d] tracking-tight font-display">
                {Number(product.price).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            {product.description && (
              <div className="bg-gray-100/70 rounded-xl p-5 mb-6 border border-gray-200/50">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#555f6f] mb-2 opacity-70">
                  About this product
                </p>
                <p className="text-sm leading-relaxed text-gray-700">{product.description}</p>
              </div>
            )}

            {/* Meta Table */}
            <div className="rounded-xl overflow-hidden shadow-ambient mb-6 border border-gray-100 bg-white">
              <div className="flex justify-between items-center p-4 text-sm border-b border-gray-50">
                <span className="text-[#555f6f]">Product ID</span>
                <span className="text-[#191c1d] font-medium">#{product.id}</span>
              </div>
              {product.brand && (
                <div className="flex justify-between items-center p-4 bg-gray-50/30 text-sm border-b border-gray-50">
                  <span className="text-[#555f6f]">Brand</span>
                  <span className="text-[#191c1d] font-medium">{product.brand}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => setIsCheckoutModalOpen(true)}
                className="w-full bg-gradient-to-br from-[#006c49] to-[#10b981] text-white py-[15px] px-6 rounded-lg font-bold text-[15px] shadow-[0_4px_14px_rgba(0,108,73,0.25)] hover:brightness-105 active:scale-[0.99] transition-all font-display tracking-[0.2px] cursor-pointer"
              >
                Buy Now · $
                {Number(product.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </button>

              <button
                onClick={() => navigate('/')}
                className="text-[#555f6f] text-[13px] font-medium hover:text-[#006c49] transition-colors w-fit py-1.5 text-left cursor-pointer"
              >
                ← Back to Market
              </button>
            </div>
          </div>
        </div>
      </div>

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        product={product}
        onSuccess={() => navigate('/')}
      />
    </div>
  );
};
