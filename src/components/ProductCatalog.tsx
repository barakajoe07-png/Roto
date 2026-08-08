import React, { useState, useMemo } from 'react';
import { Product, CategoryId, RFQItem } from '../types';
import { CATEGORIES } from '../data/rotomouldersData';
import { Search, ChevronRight, SlidersHorizontal, Layers, Sparkles, Heart, ChevronLeft, ArrowUpDown, Droplets, Box, Shield, Tractor, Recycle, Wrench, ShoppingCart, Check } from 'lucide-react';
import { CustomSelect } from './CustomSelect';

interface ProductCatalogProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddRfqItem: (product: Product, quantity: number, color: string) => void;
  rfqItems: RFQItem[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenAdvisor: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onSelectProduct,
  onAddRfqItem,
  rfqItems,
  searchQuery,
  setSearchQuery,
  onOpenAdvisor,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [capacityFilter, setCapacityFilter] = useState<'all' | 'small' | 'medium' | 'large' | 'mega'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'capacity-desc'>('featured');
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('roto_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Persist wishlist
  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlistIds(prev => {
      const next = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      try { localStorage.setItem('roto_wishlist', JSON.stringify(next)); } catch {}
      return next;
    });
  };

  // Filter products based on category, search query, and capacity
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category match
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;

      // Search match
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchSku = p.sku.toLowerCase().includes(q);
        const matchCategory = p.category.toLowerCase().includes(q);
        const matchApps = p.applications.some(a => a.toLowerCase().includes(q));
        if (!matchName && !matchSku && !matchCategory && !matchApps) return false;
      }

      // Capacity match
      if (capacityFilter === 'small' && p.capacityLiters > 1000) return false;
      if (capacityFilter === 'medium' && (p.capacityLiters <= 1000 || p.capacityLiters > 4000)) return false;
      if (capacityFilter === 'large' && (p.capacityLiters <= 4000 || p.capacityLiters > 8000)) return false;
      if (capacityFilter === 'mega' && p.capacityLiters <= 8000) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceKsh - b.priceKsh;
      if (sortBy === 'price-desc') return b.priceKsh - a.priceKsh;
      if (sortBy === 'capacity-desc') return b.capacityLiters - a.capacityLiters;
      return 0;
    });
  }, [products, selectedCategory, searchQuery, capacityFilter, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddRfqItem(product, 1, product.colorOptions[0]);
    setAddedAnimationId(product.id);
    setTimeout(() => setAddedAnimationId(null), 1500);
  };

  const isProductInRfq = (id: string) => rfqItems.some((item) => item.product.id === id);

  return (
    <section className="py-8 sm:py-12 bg-[#f8f9fa] text-slate-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Category Header Banner */}
        <div className="bg-gradient-to-r from-sky-900 via-slate-900 to-sky-950 text-white p-6 sm:p-8 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden border border-slate-800">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-sky-300 text-xs font-semibold mb-2">
              <span>Home</span>
              <ChevronRight className="w-3 h-3 text-sky-400" />
              <span>Water Storage</span>
              <ChevronRight className="w-3 h-3 text-sky-400" />
              <span className="text-white font-medium">Page {currentPage}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Water Storage Tanks Kenya – High-Quality Roto Tanks
            </h1>
            <p className="text-sky-100 text-xs sm:text-sm mt-1.5 max-w-2xl">
              Buy certified food-grade water storage tanks in Kenya with 10–15 year warranty guarantees and free factory delivery options.
            </p>
          </div>

          <button
            onClick={onOpenAdvisor}
            className="relative z-10 flex items-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer self-start md:self-auto uppercase tracking-wide shrink-0"
          >
            <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
            <span>AI Capacity Calculator</span>
          </button>
        </div>

        {/* Scrollable Category Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none flex-nowrap">
          <button
            onClick={() => { setSelectedCategory('all'); setCurrentPage(1); }}
            className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border flex items-center gap-1.5 ${
              selectedCategory === 'all'
                ? 'bg-red-600 text-white border-red-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Droplets className="w-3.5 h-3.5" />
            <span>All Products ({products.length})</span>
          </button>
          {CATEGORIES.map((cat) => {
            const count = products.filter(p => p.category === cat.id).length;
            const iconMap: Record<string, React.ElementType> = {
              'water-storage': Droplets,
              'material-handling': Box,
              'road-safety': Shield,
              'farming': Tractor,
              'waste-sanitation': Recycle,
              'custom-moulding': Wrench,
            };
            const IconComponent = iconMap[cat.id] || Layers;

            return (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategory(cat.id); setCurrentPage(1); }}
                className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-red-600 text-white border-red-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{cat.name} ({count})</span>
              </button>
            );
          })}
        </div>

        {/* Filter & Controls Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-600 font-medium">
            Showing <span className="font-bold text-slate-900">{(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, filteredProducts.length)}</span> of <span className="font-bold text-slate-900">{filteredProducts.length}</span> results
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Size Quick Filter */}
            <div className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
              {[
                { id: 'all', label: 'All Sizes' },
                { id: 'small', label: '100L – 1,000L' },
                { id: 'medium', label: '1,000L – 4,000L' },
                { id: 'large', label: '4,000L+' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => { setCapacityFilter(f.id as any); setCurrentPage(1); }}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    capacityFilter === f.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="w-48 shrink-0">
              <CustomSelect
                value={sortBy}
                onChange={(val) => setSortBy(val as any)}
                dark={false}
                icon={<ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />}
                options={[
                  { value: 'featured', label: 'Default sorting' },
                  { value: 'capacity-desc', label: 'Sort by capacity' },
                  { value: 'price-asc', label: 'Sort by price: low to high' },
                  { value: 'price-desc', label: 'Sort by price: high to low' },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 shadow-sm">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
              <Search className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No matching products found</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try adjusting your capacity filter or clearing search terms.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setCapacityFilter('all');
                setSearchQuery('');
                setCurrentPage(1);
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {paginatedProducts.map((product) => {
              const inRfq = isProductInRfq(product.id);
              const isJustAdded = addedAnimationId === product.id;
              const isWishlisted = wishlistIds.includes(product.id);

              return (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between relative group cursor-pointer"
                >
                  {/* Badge & Quick Add Cart */}
                  <div className="flex items-center justify-between z-10">
                    {product.badge ? (
                      <span className="bg-red-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-xs tracking-wider">
                        {product.badge}
                      </span>
                    ) : (
                      <span />
                    )}

                    <button
                      onClick={(e) => handleQuickAdd(product, e)}
                      className={`w-8 h-8 rounded-full border shadow-xs flex items-center justify-center transition-colors cursor-pointer ${
                        isJustAdded
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : inRfq
                          ? 'bg-red-600 text-white border-red-600'
                          : 'bg-white text-slate-600 border-slate-200 hover:text-red-600 hover:border-red-300'
                      }`}
                      title="Add to quotation cart"
                    >
                      {isJustAdded ? (
                        <Check className="w-4 h-4 stroke-[3]" />
                      ) : (
                        <ShoppingCart className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Product Image */}
                  <div className="h-44 sm:h-48 my-2 bg-white flex items-center justify-center p-2 rounded-xl">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="eager"
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Product Title & Details */}
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>In stock</span>
                    </div>

                    <div className="text-sm sm:text-base font-extrabold text-red-600 font-sans pt-1">
                      {product.priceMaxKsh ? (
                        <span>KShs {product.priceKsh.toLocaleString()}.00 – KShs {product.priceMaxKsh.toLocaleString()}.00</span>
                      ) : (
                        <span>KShs {product.priceKsh.toLocaleString()}.00</span>
                      )}
                    </div>
                  </div>

                  {/* Wishlist Link */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                    <button
                      onClick={(e) => toggleWishlist(product.id, e)}
                      className={`font-medium flex items-center gap-1 transition-colors cursor-pointer ${
                        isWishlisted ? 'text-red-600 font-bold' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-600 text-red-600' : ''}`} />
                      <span>{isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}</span>
                    </button>

                    <span className="text-slate-400 text-[11px] font-mono">
                      {product.sku}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1.5 pt-6 pb-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 disabled:opacity-40 cursor-pointer text-xs font-semibold flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg font-bold text-xs transition-all cursor-pointer flex items-center justify-center ${
                  currentPage === page
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 disabled:opacity-40 cursor-pointer text-xs font-semibold flex items-center gap-1"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
