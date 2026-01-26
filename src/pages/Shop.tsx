
import React, { useState, useMemo } from 'react';
import { Filter, ChevronDown, Grid, List, X, Search } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

const categories = ['All', 'Streetwear', 'Occasion', 'Shoes', 'Jewelry', 'Dresses', 'Accessories', 'Bags', 'Outerwear'];
const priceOptions = [
  { label: 'Under $25', min: 0, max: 25 },
  { label: '$25 to $50', min: 25, max: 50 },
  { label: '$50 to $100', min: 50, max: 100 },
  { label: 'Over $100', min: 100, max: 9999 },
];

type SortOption = 'trending' | 'price-low-high' | 'price-high-low' | 'newest';

const Shop: React.FC = () => {
  const { products } = useProducts();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('trending');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isSortOpen, setIsSortOpen] = useState(false);

  const togglePriceFilter = (label: string) => {
    setSelectedPrices(prev => 
      prev.includes(label) ? prev.filter(p => p !== label) : [...prev, label]
    );
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // 1. Category Filter
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }

    // 2. Price Filter
    if (selectedPrices.length > 0) {
      result = result.filter(product => {
        return selectedPrices.some(label => {
          const option = priceOptions.find(o => o.label === label);
          if (!option) return false;
          return product.price >= option.min && product.price < option.max;
        });
      });
    }

    // 3. Sorting
    switch (sortBy) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      case 'trending':
      default:
        break;
    }

    return result;
  }, [products, activeCategory, selectedPrices, sortBy]);

  const clearFilters = () => {
    setActiveCategory('All');
    setSelectedPrices([]);
  };

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0">
        <div>
          <nav className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-4">
            Home / Shop / {activeCategory}
          </nav>
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">
            {activeCategory === 'All' ? 'Every Style' : activeCategory}
          </h1>
          <p className="text-slate-500 mt-2 font-medium">{filteredAndSortedProducts.length} items found</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center border border-slate-200 rounded-lg p-1 bg-white shadow-sm">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'text-violet-600 bg-violet-50' : 'text-slate-400 hover:text-slate-600'}`}><Grid size={18} /></button>
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'text-violet-600 bg-violet-50' : 'text-slate-400 hover:text-slate-600'}`}><List size={18} /></button>
          </div>

          <div className="relative">
            <button onClick={() => setIsSortOpen(!isSortOpen)} className="flex items-center space-x-2 border border-slate-200 bg-white rounded-lg px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
              <span>Sort by: {sortBy === 'trending' ? 'Trending' : sortBy === 'price-low-high' ? 'Price: Low-High' : sortBy === 'price-high-low' ? 'Price: High-Low' : 'Newest'}</span>
              <ChevronDown size={16} className={`transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
            </button>
            {isSortOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl z-20 py-2 animate-in fade-in zoom-in-95 duration-200">
                {(['trending', 'newest', 'price-low-high', 'price-high-low'] as SortOption[]).map((opt) => (
                  <button key={opt} onClick={() => { setSortBy(opt); setIsSortOpen(false); }} className={`w-full text-left px-4 py-2 text-sm font-bold transition-colors ${sortBy === opt ? 'text-violet-600 bg-violet-50' : 'text-slate-600 hover:bg-slate-50'}`}>
                    {opt === 'trending' ? 'Trending' : opt === 'price-low-high' ? 'Price: Low-High' : opt === 'price-high-low' ? 'Price: High-Low' : 'Newest'}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-64 flex-shrink-0 space-y-10">
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-6 flex items-center"><Filter size={14} className="mr-2" /> Categories</h3>
            <div className="flex flex-wrap lg:flex-col gap-2">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={`text-left px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-violet-600 text-white shadow-lg shadow-violet-200' : 'bg-white text-slate-500 hover:text-violet-600 hover:bg-violet-50 border border-slate-100 shadow-sm'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="border-t border-slate-100 pt-10">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-6">Price Range</h3>
            <div className="space-y-4">
              {priceOptions.map((option) => (
                <div key={option.label} className="flex items-center group cursor-pointer" onClick={() => togglePriceFilter(option.label)}>
                  <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center transition-all ${selectedPrices.includes(option.label) ? 'bg-violet-600 border-violet-600' : 'border-slate-200 bg-white group-hover:border-violet-300'}`}>
                    {selectedPrices.includes(option.label) && <X size={12} className="text-white" />}
                  </div>
                  <span className={`text-sm font-bold transition-colors ${selectedPrices.includes(option.label) ? 'text-violet-600' : 'text-slate-600'}`}>{option.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className={`grid gap-x-6 gap-y-10 animate-in fade-in duration-700 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} layout={viewMode} />
            ))}
          </div>
          {filteredAndSortedProducts.length === 0 && (
            <div className="py-32 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 text-slate-400 mb-6"><Search size={32} /></div>
              <p className="text-slate-500 font-black uppercase tracking-widest">No matching styles found</p>
              <button onClick={clearFilters} className="mt-6 text-violet-600 font-bold hover:underline">Reset all filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
