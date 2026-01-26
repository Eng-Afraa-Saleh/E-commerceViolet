
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, TrendingUp, Sparkles, Clock, Crown, Laptop, Gift } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

const categories = [
  { name: 'Dresses', icon: <Sparkles size={24} />, color: 'bg-pink-100 text-pink-600' },
  { name: 'Deals', icon: <Zap size={24} />, color: 'bg-amber-100 text-amber-600' },
  { name: 'Shoes', icon: <TrendingUp size={24} />, color: 'bg-violet-100 text-violet-600' },
  { name: 'Tops', icon: <Crown size={24} />, color: 'bg-blue-100 text-blue-600' },
  { name: 'Electronics', icon: <Laptop size={24} />, color: 'bg-slate-100 text-slate-600' },
  { name: 'Gifts', icon: <Gift size={24} />, color: 'bg-red-100 text-red-600' },
];

const Home: React.FC = () => {
  const { products } = useProducts();
  const flashDeals = products.filter(p => p.discountPercentage && p.discountPercentage >= 40);
  const forYou = products.slice(0, 8);

  return (
    <div className="pt-24 lg:pt-32 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-4 mb-16 h-auto lg:h-[500px] animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="lg:col-span-8 relative group rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-violet-200">
          <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200" alt="Main Promo" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-violet-900/60 to-transparent flex flex-col justify-center p-8 lg:p-16">
            <span className="bg-white text-violet-600 text-[10px] font-black px-3 py-1 rounded-full w-fit mb-4 uppercase tracking-[0.2em] shadow-lg animate-pulse">Limited Time</span>
            <h1 className="text-4xl lg:text-6xl font-black text-white mb-6 leading-tight drop-shadow-md transform transition-transform group-hover:translate-x-2">SUMMER<br/>FINALE 70%</h1>
            <Link to="/shop" className="bg-white text-violet-600 px-8 py-3 rounded-full font-black text-sm w-fit hover:bg-violet-50 transition-all flex items-center shadow-xl hover:-translate-y-1 hover:scale-105 active:scale-95">
              Shop Now <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="flex-1 relative rounded-3xl overflow-hidden group shadow-lg transition-all duration-500 hover:shadow-xl">
            <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600" alt="Flash Sale 1" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors p-6 flex flex-col justify-end">
              <h3 className="text-white text-xl font-black uppercase tracking-tighter">Flash Sale</h3>
            </div>
          </div>
          <div className="flex-1 relative rounded-3xl overflow-hidden group shadow-lg transition-all duration-500 hover:shadow-xl">
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600" alt="Flash Sale 2" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors p-6 flex flex-col justify-end">
              <h3 className="text-white text-xl font-black uppercase tracking-tighter">Bestsellers</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 mb-20 overflow-x-auto no-scrollbar animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
        <div className="flex justify-between items-center gap-8 min-w-[700px] lg:min-w-0">
          {categories.map((cat, idx) => (
            <div key={idx} className="flex flex-col items-center group cursor-pointer">
              <div className={`${cat.color} w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center mb-3 shadow-md group-hover:-translate-y-2 group-hover:scale-110 transition-all`}>
                <span className="transform group-hover:rotate-12 transition-transform">{cat.icon}</span>
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-700 group-hover:text-violet-600 transition-colors">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Flash Deals */}
      <section className="bg-violet-50 py-20 mb-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center space-x-3 transform transition-transform hover:scale-105">
              <div className="bg-violet-600 p-2 rounded-lg text-white animate-bounce-short"><Clock size={24} /></div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Flash Deals</h2>
                <div className="flex items-center text-xs text-violet-600 font-bold uppercase tracking-widest mt-1">Ends in 03:45:12</div>
              </div>
            </div>
            <Link to="/shop" className="text-sm font-black text-violet-600 flex items-center hover:translate-x-1 transition-all uppercase tracking-widest group">See All <ArrowRight size={16} className="ml-1 group-hover:translate-x-2" /></Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {flashDeals.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      {/* Recommendation */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <span className="text-violet-600 font-black text-xs uppercase tracking-[0.3em] mb-4 flex items-center animate-pulse"><TrendingUp size={14} className="mr-2" /> Trending Now</span>
          <h2 className="text-3xl lg:text-4xl font-black text-slate-900 uppercase tracking-tighter text-center">Just For You</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {forYou.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
    </div>
  );
};

export default Home;
