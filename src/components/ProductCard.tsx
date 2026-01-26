
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Heart, X, Eye, Maximize2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, layout = 'grid' }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const favorite = isInWishlist(product.id);

  const toggleModal = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsQuickViewOpen(!isQuickViewOpen);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const QuickViewModal = () => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={toggleModal}
      />

      {/* Modal Container */}
      <div className="relative top-8 bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 fade-in duration-300">
        {/* Close Button */}
        <button
          onClick={toggleModal}
          className="absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur-md text-slate-500 hover:text-violet-600 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95"
        >
          <X size={20} />
        </button>

        {/* Image Section */}
        <div className="md:w-1/2 bg-slate-50 relative aspect-[4/5] md:aspect-auto">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.discountPercentage && (
            <div className="absolute top-8 left-8 bg-violet-600 text-white text-xs font-black px-3 py-1.5 rounded-lg shadow-xl uppercase tracking-widest">
              -{product.discountPercentage}% OFF
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="  p-8   flex flex-col justify-center">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-violet-600  ">{product.category}</p>
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4 leading-tight">{product.name}</h2>

          <div className="flex items-center space-x-2  ">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className={i < 4 ? "fill-amber-400 text-amber-400" : "text-slate-200"} />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-400">(128 reviews)</span>
          </div>

          <div className="flex items-baseline space-x-4 mb-8">
            <span className="text-4xl font-black text-slate-900">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xl text-slate-400 line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          <p className="text-slate-500 text-sm leading-relaxed mb-10">
            {product.description}
          </p>

          <div className="space-y-4">
            <button
              onClick={handleAddToCart}
              className="w-full bg-violet-600 text-white py-5 rounded-2xl font-black text-sm hover:bg-violet-700 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center shadow-xl shadow-violet-100 uppercase tracking-widest"
            >
              <ShoppingBag size={18} className="mr-3" /> Add to Shopping Bag
            </button>
            <Link
              to={`/product/${product.id}`}
              onClick={toggleModal}
              className="w-full bg-slate-50 text-slate-600 py-4 rounded-2xl font-black text-[10px] hover:bg-slate-100 transition-all flex items-center justify-center uppercase tracking-[0.2em]"
            >
              View Full Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  if (layout === 'list') {
    return (
      <>
        <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 border border-slate-50 flex h-48 sm:h-64 animate-in fade-in slide-in-from-bottom-4">
          {/* Image Section */}
          <div
            className="relative w-40 sm:w-64 flex-shrink-0 p-4 bg-slate-50 overflow-hidden cursor-pointer"
            onClick={toggleModal}
          >
            <div className="block h-full overflow-hidden rounded-xl relative group/img">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-violet-900/10 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                <Maximize2 className="text-white drop-shadow-lg" size={32} />
              </div>
            </div>
            {product.discountPercentage && (
              <div className="absolute top-6 left-6 bg-violet-600 text-white text-[10px] font-black px-2 py-1 rounded-md shadow-lg uppercase tracking-wider animate-bounce-short">
                -{product.discountPercentage}%
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-black mb-1 transform group-hover:translate-x-1 transition-transform">{product.category}</p>
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-violet-600 transition-colors">
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                  </h3>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleWishlist(product);
                  }}
                  className={`p-2 rounded-full shadow-sm transition-all transform hover:scale-110 active:scale-90 ${favorite ? 'bg-violet-600 text-white' : 'bg-white text-slate-300 hover:text-violet-600'
                    }`}
                >
                  <Heart size={16} className={favorite ? "fill-white" : ""} />
                </button>
              </div>

              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className={i < 4 ? "fill-amber-400 text-amber-400" : "text-slate-200"} />
                ))}
                <span className="text-[10px] text-slate-400 ml-2 group-hover:text-violet-400 transition-colors">(42)</span>
              </div>

              <p className="text-sm text-slate-500 line-clamp-2 hidden sm:block opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                {product.description}
              </p>
            </div>

            <div className="flex justify-between items-end">
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-black text-slate-900">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">${product.originalPrice.toFixed(2)}</span>
                )}
              </div>
              <button
                onClick={handleAddToCart}
                className="bg-violet-600 text-white px-6 py-3 rounded-full font-black text-xs hover:bg-violet-700 hover:scale-105 active:scale-95 transition-all flex items-center shadow-lg shadow-violet-100"
              >
                <ShoppingBag size={16} className="mr-2" /> Add
              </button>
            </div>
          </div>
        </div>
        {isQuickViewOpen && <QuickViewModal />}
      </>
    );
  }

  return (
    <>
      <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-50 flex flex-col animate-in fade-in slide-in-from-bottom-4">
        <div
          className="relative p-4 bg-slate-50 overflow-hidden cursor-pointer"
          onClick={toggleModal}
        >
          <div className="block aspect-[3/4] overflow-hidden rounded-xl relative group/img">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-violet-900/10 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-md p-4 rounded-full shadow-xl transform scale-50 group-hover/img:scale-100 transition-transform duration-300">
                <Eye className="text-violet-600" size={24} />
              </div>
            </div>
          </div>

          {product.discountPercentage && (
            <div className="absolute top-6 left-6 bg-violet-600 text-white text-[10px] font-black px-2 py-1 rounded-md shadow-lg uppercase tracking-wider animate-in zoom-in duration-300">
              -{product.discountPercentage}%
            </div>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`absolute top-6 right-6 p-2.5 rounded-full shadow-md transition-all transform hover:scale-110 active:scale-90 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 ${favorite ? 'bg-violet-600 text-white' : 'bg-white text-slate-300 hover:text-violet-600'
              }`}
          >
            <Heart size={16} className={favorite ? "fill-white" : ""} />
          </button>

          <button
            onClick={handleAddToCart}
            className="absolute bottom-6 right-6 bg-white text-violet-600 p-3 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:bg-violet-600 hover:text-white transform hover:scale-110 active:scale-90"
          >
            <ShoppingBag size={18} />
          </button>
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <div className="flex items-center space-x-1 mb-2 transform group-hover:translate-x-1 transition-transform duration-300">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={10} className={i < 4 ? "fill-amber-400 text-amber-400" : "text-slate-200"} />
            ))}
            <span className="text-[10px] text-slate-400 ml-1">(42)</span>
          </div>

          <h3 className="text-sm font-semibold text-slate-800 line-clamp-1 mb-1 group-hover:text-violet-600 transition-colors">
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h3>
          <p className="text-[11px] text-slate-400 uppercase tracking-widest font-medium mb-3 group-hover:text-violet-300 transition-colors">{product.category}</p>

          <div className="mt-auto flex items-baseline space-x-2">
            <span className="text-lg font-bold text-slate-900 group-hover:scale-110 transition-transform origin-left">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>
      {isQuickViewOpen && <QuickViewModal />}
    </>
  );
};

export default ProductCard;
