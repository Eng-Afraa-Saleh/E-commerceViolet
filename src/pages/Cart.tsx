
import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="pt-40 pb-24 text-center px-4">
        <div className="bg-violet-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-violet-200">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-900 mb-4">Your bag is lonely</h2>
        <p className="text-slate-500 mb-10 max-w-sm mx-auto font-medium">Add some heat to your wardrobe and let's get you styled up.</p>
        <Link to="/shop" className="bg-violet-600 text-white px-10 py-4 rounded-full font-black text-sm inline-block hover:bg-violet-700 transition-all shadow-xl shadow-violet-100">
          Explore Best Sellers
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4">
      <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-12">Shopping Bag ({totalItems})</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-8">
          {cart.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center py-8 border-b border-slate-50 last:border-0 group">
              <div className="w-24 h-32 bg-slate-50 rounded-2xl overflow-hidden flex-shrink-0 mb-4 sm:mb-0 border border-slate-100 group-hover:border-violet-200 transition-colors">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="sm:ml-8 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-black text-slate-900 text-lg uppercase tracking-tight">{item.name}</h3>
                    <p className="text-[10px] font-black text-violet-600 mt-1 uppercase tracking-widest">{item.category}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-slate-300 hover:text-red-500 transition-colors p-2"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <div className="flex items-center bg-slate-50 rounded-full p-1 border border-slate-100">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-full transition-colors text-slate-500"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-4 text-xs font-black text-slate-900">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-full transition-colors text-slate-500"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-slate-900 text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                    {item.originalPrice && (
                      <p className="text-[10px] text-red-500 font-bold uppercase">Saved ${( (item.originalPrice - item.price) * item.quantity ).toFixed(2)}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-96">
          <div className="bg-slate-50 p-8 rounded-3xl sticky top-32 border border-slate-100 shadow-sm">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-8">Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate-500 text-xs font-black uppercase tracking-widest">
                <span>Subtotal</span>
                <span className="text-slate-900">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500 text-xs font-black uppercase tracking-widest">
                <span>Express Shipping</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="flex justify-between text-slate-500 text-xs font-black uppercase tracking-widest">
                <span>Coupon (VIOLET20)</span>
                <span className="text-violet-600">-$0.00</span>
              </div>
              <div className="border-t border-slate-200 pt-6 flex justify-between items-center">
                <span className="font-black text-slate-900 uppercase tracking-widest">Total</span>
                <span className="text-3xl font-black text-slate-900">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <Link 
              to="/checkout" 
              className="w-full bg-violet-600 text-white py-5 rounded-2xl font-black text-center block hover:bg-violet-700 transition-all flex items-center justify-center shadow-xl shadow-violet-100 uppercase tracking-widest text-sm"
            >
              Checkout Now <ArrowRight size={18} className="ml-2" />
            </Link>
            
            <div className="mt-8 flex items-center justify-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.1em]">
              <ShieldCheck size={14} className="mr-2 text-green-500" /> Secure SSL Payment
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
