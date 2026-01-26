
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-bold tracking-tighter text-slate-900">
              violet<span className="text-indigo-600">.</span>
            </Link>
            <p className="mt-4 text-sm text-slate-500 leading-relaxed">
              Curating high-quality, minimalist essentials for modern living. Designed with purpose, built for longevity.
            </p>
            <div className="flex space-x-4 mt-6">
              <Instagram size={20} className="text-slate-400 hover:text-indigo-600 cursor-pointer" />
              <Twitter size={20} className="text-slate-400 hover:text-indigo-600 cursor-pointer" />
              <Facebook size={20} className="text-slate-400 hover:text-indigo-600 cursor-pointer" />
            </div>
          </div>
          
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6">Shop</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><Link to="/shop" className="hover:text-indigo-600">New Arrivals</Link></li>
              <li><Link to="/shop" className="hover:text-indigo-600">Best Sellers</Link></li>
              <li><Link to="/shop" className="hover:text-indigo-600">Accessories</Link></li>
              <li><Link to="/shop" className="hover:text-indigo-600">Home Decor</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><Link to="/about" className="hover:text-indigo-600">About Us</Link></li>
              <li><Link to="#" className="hover:text-indigo-600">Shipping Policy</Link></li>
              <li><Link to="#" className="hover:text-indigo-600">Returns & Exchanges</Link></li>
              <li><Link to="#" className="hover:text-indigo-600">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6">Join Our Newsletter</h4>
            <p className="text-sm text-slate-500 mb-4">Get early access to drops and exclusive offers.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-white border border-slate-200 px-4 py-2 rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
              />
              <button className="bg-slate-900 text-white px-4 py-2 rounded-r-md text-sm hover:bg-slate-800 transition-colors">Join</button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400">
          <p>© 2024 violet Essentials. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="#" className="hover:text-indigo-600">Privacy Policy</Link>
            <Link to="#" className="hover:text-indigo-600">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
