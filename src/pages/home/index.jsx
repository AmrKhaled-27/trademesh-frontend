import React, { useState } from 'react';
import { Search, Loader, AlertCircle, TrendingUp } from 'lucide-react';
import ProductCard from '../../components/ProductCard';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { useProductsQuery } from '../../hooks/useProducts';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [brandFilter, setBrandFilter] = useState('');

  const {
    data: products = [],
    isLoading: loading,
    error,
  } = useProductsQuery({
    name: searchQuery,
    brand: brandFilter,
  });

  const handleDiscovery = () => {
    console.log('Discovery clicked');
  };

  return (
    <div className="w-full min-h-screen bg-white text-zinc-900 flex flex-col overflow-x-hidden">
      {/* Hero Section */}
      <section className="w-full border-b border-zinc-200 bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 text-center sm:text-left">
            <Typography variant="display-md" className="text-zinc-900 mb-4">
              Architectural <span className="text-[#10b981]">Sourcing</span>
            </Typography>
            <Typography variant="body-lg" className="text-zinc-600 max-w-2xl mx-auto sm:mx-0">
              Precision trade platform for verified merchants. Discover premium inventory with
              industrial-grade transparency and seamless architectural workflows.
            </Typography>
          </div>

          {/* Search Section */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-white py-3.5 pl-12 pr-4 text-zinc-900 placeholder-zinc-400 focus:border-[#10b981] focus:outline-none focus:ring-1 focus:ring-[#10b981]/50 transition-all shadow-sm"
              />
            </div>

            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Filter by brand..."
                value={brandFilter}
                onChange={(e) => setBrandFilter(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-white py-3.5 pl-12 pr-4 text-zinc-900 placeholder-zinc-400 focus:border-[#10b981] focus:outline-none focus:ring-1 focus:ring-[#10b981]/50 transition-all shadow-sm"
              />
            </div>

            <Button
              onClick={handleDiscovery}
              className="!bg-[#10b981] !text-white hover:!bg-[#059669] shadow-lg shadow-[#10b981]/20 gap-2 whitespace-nowrap !rounded-xl border-none"
            >
              <TrendingUp className="h-5 w-5" />
              Discovery
            </Button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="w-full flex-1 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          {/* Loading State */}
          {loading && (
            <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
              <Loader className="h-10 w-10 animate-spin text-[#10b981]" />
              <Typography
                variant="body-md"
                className="text-zinc-500 font-medium tracking-wide animate-pulse"
              >
                Fetching inventory...
              </Typography>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 flex items-start gap-4 max-w-3xl mx-auto shadow-sm">
              <AlertCircle className="h-6 w-6 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <Typography variant="h3" className="text-red-700 mb-1">
                  Connection Error
                </Typography>
                <Typography variant="body-sm" className="text-red-600/80">
                  {error.message}
                </Typography>
              </div>
            </div>
          )}

          {/* Products Grid */}
          {!loading && products.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}

          {/* Empty State */}
          {!loading && !error && products.length === 0 && (
            <div className="flex min-h-[400px] flex-col items-center justify-center gap-5 text-center">
              <div className="rounded-full bg-white border border-zinc-200 p-6 shadow-sm">
                <Search className="h-10 w-10 text-zinc-400" />
              </div>
              <div>
                <Typography variant="h3" className="text-zinc-900 mb-2">
                  No items found
                </Typography>
                <Typography variant="body-md" className="text-zinc-500 max-w-md mx-auto">
                  We couldn't find any inventory matching your current search criteria.
                </Typography>
              </div>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setBrandFilter('');
                }}
                className="mt-2 text-sm !font-medium !text-[#10b981] hover:!text-[#059669] transition-colors !bg-[#10b981]/10 hover:!bg-[#10b981]/20 px-6 py-2.5 rounded-full"
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-200 bg-white py-8 mt-auto">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-zinc-500">
          <p>© 2024 TradeMesh. Industrial-grade architectural sourcing.</p>
        </div>
      </footer>
    </div>
  );
}
