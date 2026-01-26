
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { useProducts } from '../context/ProductContext';
import { 
  Plus, 
  LayoutDashboard, 
  Package, 
  Trash2, 
  Search, 
  X, 
   
  Image as ImageIcon,
  DollarSign,
  Tag,
  LogOut
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { isAdmin, logout } = useAdmin();
  const { products, addProduct, removeProduct } = useProducts();
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Form State
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: 'Streetwear',
    image: '',
    originalPrice: '',
    featured: false
  });

  if (!isAdmin) {
    React.useEffect(() => {
      navigate('/login');
    }, [navigate]);
    return null;
  }

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      description: newProduct.description,
      category: newProduct.category,
      image: newProduct.image || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800',
      originalPrice: newProduct.originalPrice ? parseFloat(newProduct.originalPrice) : undefined,
      discountPercentage: newProduct.originalPrice ? Math.round(((parseFloat(newProduct.originalPrice) - parseFloat(newProduct.price)) / parseFloat(newProduct.originalPrice)) * 100) : undefined,
      featured: newProduct.featured
    });
    setShowModal(false);
    setNewProduct({ name: '', price: '', description: '', category: 'Streetwear', image: '', originalPrice: '', featured: false });
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 space-y-4 md:space-y-0">
        <div>
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter flex items-center">
            <LayoutDashboard size={32} className="mr-3 text-violet-600" /> Control Panel
          </h1>
          <p className="text-slate-500 font-medium mt-1">Manage your violet store catalog</p>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setShowModal(true)}
            className="bg-violet-600 text-white px-8 py-3 rounded-full font-black text-xs hover:bg-violet-700 transition-all shadow-xl shadow-violet-100 flex items-center uppercase tracking-widest"
          >
            <Plus size={18} className="mr-2" /> Add Material
          </button>
          <button 
            onClick={() => { logout(); navigate('/'); }}
            className="bg-slate-100 text-slate-600 p-3 rounded-full hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Total Items', value: products.length, icon: <Package size={20} /> },
          { label: 'Featured', value: products.filter(p => p.featured).length, icon: <Tag size={20} /> },
          { label: 'Sales', value: products.filter(p => p.originalPrice).length, icon: <DollarSign size={20} /> },
          { label: 'Views Today', value: '1.2k', icon: <Search size={20} /> },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-xl font-black text-slate-900 tracking-tight">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-lg font-black text-slate-900 uppercase tracking-tighter">Product Catalog</h2>
          <div className="relative max-w-md w-full">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
            <input 
              type="text" 
              placeholder="Search materials..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-2 pl-12 pr-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-violet-200 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Material</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Price</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img src={p.image} className="w-10 h-10 rounded-lg object-cover bg-slate-100" />
                      <div>
                        <p className="text-sm font-black text-slate-900 line-clamp-1">{p.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">ID: #{p.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-black text-violet-600 bg-violet-50 px-3 py-1 rounded-full uppercase tracking-widest">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-black text-slate-900">${p.price.toFixed(2)}</p>
                  </td>
                  <td className="px-6 py-4">
                    {p.featured ? (
                      <span className="text-[9px] font-black uppercase tracking-widest text-amber-600 flex items-center">
                        <Tag size={12} className="mr-1" /> Featured
                      </span>
                    ) : (
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">Standard</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => removeProduct(p.id)}
                      className="text-slate-300 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredProducts.length === 0 && (
            <div className="p-20 text-center">
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No materials match your search</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Product Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowModal(false)} />
          <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-6">
              <div className="flex justify-between items-center  ">
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Add New Material</h2>
                <button onClick={() => setShowModal(false)} className="text-slate-300 hover:text-slate-900 transition-colors"><X size={24} /></button>
              </div>

              <form onSubmit={handleAddProduct} className="space-y-2">
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-2 px-1">Product Name</label>
                    <input 
                      required type="text" 
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      placeholder="e.g. Violet Silk Blouse" 
                      className="w-full bg-slate-50 border border-slate-100 rounded-md py-2 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-200 transition-all" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-2 px-1">Sale Price ($)</label>
                    <input 
                      required type="number" step="0.01"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      placeholder="49.99" 
                      className="w-full bg-slate-50 border border-slate-100 rounded-md py-2 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-200 transition-all" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-2 px-1">Original Price ($)</label>
                    <input 
                      type="number" step="0.01"
                      value={newProduct.originalPrice}
                      onChange={(e) => setNewProduct({...newProduct, originalPrice: e.target.value})}
                      placeholder="Optional" 
                      className="w-full bg-slate-50 border border-slate-100 rounded-md py-2 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-200 transition-all" 
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-2 px-1">Category</label>
                    <select 
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-100 rounded-md py-2 px-4 text-sm font-black uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-violet-200 transition-all"
                    >
                      {['Streetwear', 'Occasion', 'Shoes', 'Jewelry', 'Dresses', 'Accessories', 'Bags', 'Outerwear'].map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-2 px-1">Image URL</label>
                    <div className="relative">
                      <ImageIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                      <input 
                        type="url" 
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                        placeholder="https://images.unsplash.com/..." 
                        className="w-full bg-slate-50 border border-slate-100 rounded-md   py-2 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-200 transition-all" 
                      />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-2 px-1">Description</label>
                    <textarea 
                      required rows={3}
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-100 rounded-md py-2 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-200 transition-all" 
                    />
                  </div>
                  <div className="col-span-2 flex items-center px-1">
                    <input 
                      type="checkbox" 
                      id="featured" 
                      checked={newProduct.featured}
                      onChange={(e) => setNewProduct({...newProduct, featured: e.target.checked})}
                      className="w-4 h-4 text-violet-600 focus:ring-violet-500 border-slate-300 rounded"
                    />
                    <label htmlFor="featured" className="ml-3 text-xs font-black uppercase tracking-widest text-slate-600">Feature this material on Homepage</label>
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    type="submit"
                    className="w-full bg-violet-600 text-white py-2 rounded-md font-black text-sm hover:bg-violet-700 transition-all shadow-xl shadow-violet-100 flex items-center justify-center uppercase tracking-widest"
                  >
                    Create Material Entry
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
