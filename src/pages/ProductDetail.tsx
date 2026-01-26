
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ChevronLeft, Truck, RefreshCw, Heart, Share2, Star } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products } = useProducts();
  const [selectedSize, setSelectedSize] = useState('M');
  
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="pt-40 pb-24 text-center animate-in fade-in">
        <h1 className="text-2xl font-black uppercase">Oops! Out of Style</h1>
        <Link to="/shop" className="text-violet-600 font-bold hover:underline mt-4 inline-block transform hover:scale-105 transition-transform">Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 overflow-hidden">
      <button onClick={() => navigate(-1)} className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-violet-600 mb-8 transition-all hover:translate-x-1"><ChevronLeft size={14} className="mr-1" /> Back to Trends</button>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
        <div className="lg:col-span-7 flex flex-col md:flex-row gap-4 animate-in fade-in slide-in-from-left-8 duration-700">
          <div className="hidden md:flex flex-col gap-4 w-24">
             {[1, 2, 3].map((_, i) => (
               <div key={i} className="aspect-square bg-slate-100 rounded-lg overflow-hidden border border-transparent hover:border-violet-300 cursor-pointer transition-all hover:scale-105">
                 <img src={product.image} className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" />
               </div>
             ))}
          </div>
          <div className="flex-1 aspect-[3/4] bg-slate-50 rounded-3xl overflow-hidden shadow-inner group relative">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          </div>
        </div>
        <div className="lg:col-span-5 flex flex-col animate-in fade-in slide-in-from-right-8 duration-700">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-600 animate-pulse">{product.category}</span>
            <div className="flex space-x-3">
              <button className="text-slate-300 hover:text-red-500 transition-all transform hover:scale-110 active:scale-90"><Heart size={20} /></button>
              <button className="text-slate-300 hover:text-violet-600 transition-all transform hover:scale-110 active:scale-90"><Share2 size={20} /></button>
            </div>
          </div>
          <h1 className="text-3xl lg:text-4xl font-black text-slate-900 uppercase tracking-tighter mb-4 transform transition-transform hover:translate-x-1">{product.name}</h1>
          <div className="flex items-center space-x-3 mb-8">
            <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-amber-400 text-amber-400" />)}</div>
            <span className="text-xs font-bold text-slate-400 underline underline-offset-4 decoration-slate-200 cursor-pointer">128 Verified Reviews</span>
          </div>
          <div className="flex items-baseline space-x-4 mb-8">
            <span className="text-4xl font-black text-slate-900">${product.price.toFixed(2)}</span>
            {product.originalPrice && <><span className="text-xl text-slate-400 line-through">${product.originalPrice.toFixed(2)}</span><span className="bg-red-50 text-red-500 text-[10px] font-black px-2 py-1 rounded-md uppercase animate-bounce-short">Save {product.discountPercentage}%</span></>}
          </div>
          <p className="text-slate-500 leading-relaxed mb-10 font-medium">{product.description}</p>
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4"><label className="text-xs font-black uppercase tracking-widest text-slate-900">Select Size</label></div>
            <div className="flex gap-3">
              {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                <button key={size} onClick={() => setSelectedSize(size)} className={`w-12 h-12 rounded-xl border-2 font-black text-xs transition-all transform hover:scale-110 active:scale-95 ${selectedSize === size ? 'border-violet-600 bg-violet-50 text-violet-600 shadow-lg shadow-violet-100' : 'border-slate-100 text-slate-500 hover:border-slate-300'}`}>{size}</button>
              ))}
            </div>
          </div>
          <button onClick={() => addToCart(product)} className="bg-violet-600 text-white py-5 rounded-2xl font-black text-base hover:bg-violet-700 transition-all transform hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center shadow-xl shadow-violet-200 group">
            <ShoppingBag size={20} className="mr-3 transform group-hover:rotate-12 transition-transform" /> Add to Shopping Bag
          </button>
          <div className="space-y-6 pt-10 border-t border-slate-100 mt-10">
            <div className="flex items-start group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600 mr-4 flex-shrink-0 transition-all group-hover:scale-110"><Truck size={20} /></div>
              <div><p className="text-xs font-black uppercase tracking-widest text-slate-900">Flash Shipping</p><p className="text-[11px] text-slate-400 mt-1">Free delivery arriving by Thu, Oct 24</p></div>
            </div>
            <div className="flex items-start group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600 mr-4 flex-shrink-0 transition-all group-hover:scale-110"><RefreshCw size={20} /></div>
              <div><p className="text-xs font-black uppercase tracking-widest text-slate-900">90-Day Returns</p><p className="text-[11px] text-slate-400 mt-1">Hassle-free money back guarantee</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
