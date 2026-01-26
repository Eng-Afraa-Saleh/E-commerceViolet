
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, Heart, User, LayoutDashboard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAdmin } from '../context/AdminContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const { isAdmin } = useAdmin();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white shadow-sm border-b border-violet-50">
      {/* Top Banner */}
      <div className="bg-violet-600 py-2 text-center">
        <p className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">
          Free Express Shipping on orders over $99 • Use code: VIOLET20
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-black tracking-tighter text-slate-900">
              VIOLET<span className="text-violet-600">LUXE</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-10">
            <Link to="/" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-violet-600 transition-colors">Home</Link>
            <Link to="/shop" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-violet-600 transition-colors">Shop All</Link>
            {isAdmin && (
              <Link to="/dashboard" className="text-xs font-black uppercase tracking-widest text-violet-600 flex items-center">
                <LayoutDashboard size={14} className="mr-1.5" /> Dashboard
              </Link>
            )}
          </div>

          {/* Search Bar Placeholder */}
          <div className="hidden md:flex flex-1 max-w-sm mx-8 relative">
            <input 
              type="text" 
              placeholder="Search trendy fits..." 
              className="w-full bg-slate-50 border border-slate-100 rounded-full py-2 px-10 text-xs focus:outline-none focus:ring-2 focus:ring-violet-200 transition-all"
            />
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            {!isAdmin && (
              <Link to="/login" className="hidden sm:block text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-violet-600 transition-colors">
                Admin
              </Link>
            )}
            <Link to="/profile" className="hidden sm:block text-slate-500 hover:text-violet-600 transition-colors">
              <User size={20} />
            </Link>
            <Link to="/wishlist" className="relative hidden sm:block text-slate-500 hover:text-violet-600 transition-colors">
              <Heart size={20} className={wishlist.length > 0 ? "fill-violet-600 text-violet-600" : ""} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-violet-600 text-white text-[8px] font-black w-3.5 h-3.5 flex items-center justify-center rounded-full ring-2 ring-white">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative group">
              <ShoppingBag size={22} className="text-slate-800 group-hover:text-violet-600 transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-violet-600 text-white text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full ring-2 ring-white animate-bounce-short">
                  {totalItems}
                </span>
              )}
            </Link>
            <button 
              className="lg:hidden text-slate-800"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-100 px-4 py-8 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-6">
            <Link to="/" onClick={() => setIsOpen(false)} className="text-sm font-black uppercase tracking-widest text-slate-800">Home</Link>
            <Link to="/shop" onClick={() => setIsOpen(false)} className="text-sm font-black uppercase tracking-widest text-slate-800">Shop All</Link>
            {isAdmin && <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-sm font-black uppercase tracking-widest text-violet-600">Dashboard</Link>}
            <Link to="/wishlist" onClick={() => setIsOpen(false)} className="text-sm font-black uppercase tracking-widest text-slate-800">Wishlist</Link>
            <Link to="/profile" onClick={() => setIsOpen(false)} className="text-sm font-black uppercase tracking-widest text-slate-800">My Profile</Link>
            {!isAdmin && <Link to="/login" onClick={() => setIsOpen(false)} className="text-sm font-black uppercase tracking-widest text-slate-400">Admin Login</Link>}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
