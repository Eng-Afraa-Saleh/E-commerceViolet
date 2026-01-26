
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { Lock, Mail, ArrowRight, ShieldAlert } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/dashboard');
    } else {
      setError(true);
    }
  };

  return (
    <div className="pt-40 pb-24 min-h-screen flex items-center justify-center px-4 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-500">
        <div className="p-8 sm:p-12">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-xl shadow-violet-200">
              <Lock size={32} />
            </div>
            <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Admin Portal</h1>
            <p className="text-slate-500 text-sm mt-2 font-medium">Access your Lumina control panel</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-2 px-1">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@lumina.com"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-violet-200 transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-2 px-1">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-violet-200 transition-all font-medium"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center text-xs font-bold animate-in fade-in duration-300">
                <ShieldAlert size={16} className="mr-2 flex-shrink-0" />
                Invalid credentials. Please try again.
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-violet-600 text-white py-4 rounded-2xl font-black text-sm hover:bg-violet-700 transition-all shadow-xl shadow-violet-100 flex items-center justify-center uppercase tracking-widest group"
            >
              Enter Dashboard <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
          
          <p className="mt-10 text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest">
            SECURE ACCESS ONLY • LUMINA E-COMMERCE
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
