
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft, ShieldCheck, Lock, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const Checkout: React.FC = () => {
  const [isOrdered, setIsOrdered] = useState(false);
  const { cart, totalPrice, clearCart } = useCart();
  const { addOrder } = useUser();
  const navigate = useNavigate();

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Save order to profile
    addOrder(cart, totalPrice);
    setIsOrdered(true);
    setTimeout(() => {
      clearCart();
    }, 500);
  };

  if (isOrdered) {
    return (
      <div className="pt-40 pb-24 text-center px-4 max-w-md mx-auto animate-in zoom-in duration-500">
        <div className="text-green-500 mb-6 flex justify-center">
          <CheckCircle size={80} className="drop-shadow-lg" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4">You're All Set!</h1>
        <p className="text-slate-500 mb-10 leading-relaxed font-medium">
          Order #8273615 is being processed. We'll send you a tracking link as soon as your violet fits hit the road.
        </p>
        <div className="space-y-4">
          <button 
            onClick={() => navigate('/profile')}
            className="bg-violet-600 text-white px-10 py-4 rounded-full font-black text-sm w-full hover:bg-violet-700 transition-all shadow-xl shadow-violet-100 uppercase tracking-widest"
          >
            View My Orders
          </button>
          <button 
            onClick={() => navigate('/')}
            className="text-slate-400 font-black text-[10px] w-full hover:text-violet-600 transition-all uppercase tracking-widest"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4">
      <button 
        onClick={() => navigate('/cart')}
        className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-violet-600 mb-8 transition-colors"
      >
        <ArrowLeft size={14} className="mr-1" /> Back to Bag
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <div className="flex items-center space-x-3 mb-10">
            <Lock size={20} className="text-violet-600" />
            <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Secure Checkout</h1>
          </div>
          
          <form onSubmit={handleOrder} className="space-y-12">
            {/* Shipping Info */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-violet-600 mb-8">1. Shipping Destination</h2>
              <div className="grid grid-cols-2 gap-6">
                <input required type="text" placeholder="First Name" className="w-full border-b border-slate-100 py-3 focus:outline-none focus:border-violet-600 transition-colors text-sm font-medium" />
                <input required type="text" placeholder="Last Name" className="w-full border-b border-slate-100 py-3 focus:outline-none focus:border-violet-600 transition-colors text-sm font-medium" />
                <input required type="email" placeholder="Email Address" className="w-full border-b border-slate-100 py-3 focus:outline-none focus:border-violet-600 transition-colors text-sm font-medium col-span-2" />
                <input required type="text" placeholder="Street Address" className="w-full border-b border-slate-100 py-3 focus:outline-none focus:border-violet-600 transition-colors text-sm font-medium col-span-2" />
                <input required type="text" placeholder="City" className="w-full border-b border-slate-100 py-3 focus:outline-none focus:border-violet-600 transition-colors text-sm font-medium" />
                <input required type="text" placeholder="ZIP Code" className="w-full border-b border-slate-100 py-3 focus:outline-none focus:border-violet-600 transition-colors text-sm font-medium" />
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-violet-600 mb-8">2. Payment Method</h2>
              <div className="space-y-6">
                <input required type="text" placeholder="Card Number" className="w-full border-b border-slate-100 py-3 focus:outline-none focus:border-violet-600 transition-colors text-sm font-medium" />
                <div className="grid grid-cols-2 gap-6">
                  <input required type="text" placeholder="MM / YY" className="w-full border-b border-slate-100 py-3 focus:outline-none focus:border-violet-600 transition-colors text-sm font-medium" />
                  <input required type="text" placeholder="CVC" className="w-full border-b border-slate-100 py-3 focus:outline-none focus:border-violet-600 transition-colors text-sm font-medium" />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-violet-600 text-white py-6 rounded-2xl font-black text-lg hover:bg-violet-700 transition-all shadow-2xl shadow-violet-200 uppercase tracking-widest"
            >
              Confirm & Pay ${totalPrice.toFixed(2)}
            </button>
          </form>
        </div>

        <div className="lg:pl-16">
          <div className="bg-slate-900 p-10 rounded-[2.5rem] sticky top-32 text-white shadow-2xl">
            <h2 className="text-xl font-black uppercase tracking-tighter mb-8 text-violet-300">Order Summary</h2>
            <div className="space-y-5 border-b border-white/10 pb-8 mb-8">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-white/60">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-white/60">
                <span>Shipping</span>
                <span className="text-violet-400">FREE</span>
              </div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-white/60">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
            </div>
            <div className="flex justify-between items-center mb-10">
              <span className="text-lg font-black uppercase tracking-widest">Total</span>
              <span className="text-4xl font-black text-violet-400">${totalPrice.toFixed(2)}</span>
            </div>
            
            <div className="space-y-4">
               <div className="flex items-center text-[10px] font-black uppercase tracking-[0.1em] text-white/40">
                <ShieldCheck size={14} className="mr-3 text-violet-400" /> Secure Encryption Active
               </div>
               <div className="flex items-center text-[10px] font-black uppercase tracking-[0.1em] text-white/40">
                <Truck size={14} className="mr-3 text-violet-400" /> Free Returns within 90 days
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
