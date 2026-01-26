
import React from 'react';
import { useUser } from '../context/UserContext';
import { Package, MapPin, CreditCard, Settings, ChevronRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user, orders } = useUser();

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-center transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="relative inline-block mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto ring-4 ring-violet-50 transition-transform hover:scale-110 duration-500">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-0 right-0 bg-green-500 w-5 h-5 rounded-full border-4 border-white"></div>
            </div>
            <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter transform transition-transform hover:scale-105">{user.name}</h1>
            <p className="text-slate-500 text-sm font-medium mb-6">{user.email}</p>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-600 bg-violet-50 py-2 rounded-full px-4 inline-block animate-pulse">
              Member Since {user.memberSince}
            </p>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
            <nav className="flex flex-col">
              {[
                { icon: <Package size={20} />, label: 'Order History', active: true },
                { icon: <MapPin size={20} />, label: 'Saved Addresses', active: false },
                { icon: <CreditCard size={20} />, label: 'Payment Methods', active: false },
                { icon: <Settings size={20} />, label: 'Account Settings', active: false },
              ].map((item, idx) => (
                <button
                  key={idx}
                  className={`flex items-center justify-between p-5 text-sm font-bold uppercase tracking-widest transition-all border-b border-slate-50 last:border-0 transform hover:translate-x-2 ${
                    item.active ? 'text-violet-600 bg-violet-50/50' : 'text-slate-500 hover:text-violet-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <span className={`transition-transform duration-300 ${item.active ? 'text-violet-600 scale-110' : 'text-slate-400'}`}>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight size={16} className={`text-slate-300 transition-transform ${item.active ? 'translate-x-1' : ''}`} />
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-8 animate-in fade-in slide-in-from-right-8 duration-700">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Purchase History</h2>
            <Link to="/shop" className="text-xs font-black text-violet-600 uppercase tracking-widest hover:underline transform hover:translate-x-1 transition-transform inline-block">
              Continue Shopping
            </Link>
          </div>

          {orders.length === 0 ? (
            <div className="bg-slate-50 rounded-3xl p-12 text-center border-2 border-dashed border-slate-200 animate-in zoom-in duration-500">
              <ShoppingBag size={48} className="mx-auto text-slate-200 mb-4 animate-bounce-short" />
              <p className="text-slate-500 font-bold">No orders found yet. Time to change that!</p>
              <Link to="/shop" className="mt-6 inline-block bg-violet-600 text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-violet-100 hover:scale-105 active:scale-95 transition-all">
                Explore Shop
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order, index) => (
                <div 
                  key={order.id} 
                  className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col sm:flex-row justify-between mb-6 pb-6 border-b border-slate-50 space-y-4 sm:space-y-0">
                    <div className="space-y-1 group cursor-default">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-violet-400 transition-colors">Order ID</p>
                      <p className="text-sm font-black text-slate-900">{order.id}</p>
                    </div>
                    <div className="space-y-1 group cursor-default">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-violet-400 transition-colors">Date</p>
                      <p className="text-sm font-bold text-slate-900">{order.date}</p>
                    </div>
                    <div className="space-y-1 group cursor-default">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-violet-400 transition-colors">Status</p>
                      <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-green-50 text-green-600 rounded-full group-hover:bg-green-100 transition-all">
                        {order.status}
                      </span>
                    </div>
                    <div className="space-y-1 group cursor-default">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-violet-400 transition-colors">Total</p>
                      <p className="text-sm font-black text-violet-600 transform transition-transform group-hover:scale-110 origin-left">${order.total.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="group cursor-pointer">
                        <div className="aspect-[3/4] rounded-xl overflow-hidden bg-slate-50 mb-2 border border-slate-50 group-hover:border-violet-200 transition-all group-hover:shadow-md">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        </div>
                        <p className="text-[10px] font-bold text-slate-900 line-clamp-1 group-hover:text-violet-600 transition-colors">{item.name}</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest group-hover:text-violet-300 transition-colors">Qty: {item.quantity}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button className="text-[10px] font-black uppercase tracking-widest text-violet-600 border border-violet-100 px-6 py-2 rounded-full hover:bg-violet-600 hover:text-white hover:scale-105 active:scale-95 transition-all transform hover:shadow-lg shadow-violet-50">
                      View Order Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
