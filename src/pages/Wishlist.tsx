
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

const Wishlist: React.FC = () => {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="pt-40 pb-24 text-center px-4">
        <div className="bg-violet-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-violet-200">
          <Heart size={48} />
        </div>
        <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-900 mb-4">Your wishlist is empty</h2>
        <p className="text-slate-500 mb-10 max-w-sm mx-auto font-medium">Save items you love to keep an eye on them. Let's find some favorites!</p>
        <Link to="/shop" className="bg-violet-600 text-white px-10 py-4 rounded-full font-black text-sm inline-block hover:bg-violet-700 transition-all shadow-xl shadow-violet-100">
          Start Exploring
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 space-y-4 md:space-y-0">
        <div>
          <nav className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-4">
            Home / Wishlist
          </nav>
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">My Favorites</h1>
          <p className="text-slate-500 mt-2 font-medium">{wishlist.length} saved styles</p>
        </div>
        <Link to="/shop" className="text-sm font-black text-violet-600 flex items-center hover:underline uppercase tracking-widest">
          Continue Shopping <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 animate-in fade-in duration-700">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
