
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { UserProvider } from './context/UserContext';
import { AdminProvider } from './context/AdminContext';
import { ProductProvider } from './context/ProductContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <AdminProvider>
      <ProductProvider>
        <UserProvider>
          <CartProvider>
            <WishlistProvider>
              <Router>
                <div className="min-h-screen flex flex-col">
                  <ScrollToTop />
                  <Navbar />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/wishlist" element={<Wishlist />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/login" element={<AdminLogin />} />
                      <Route path="/dashboard" element={<AdminDashboard />} />
                      <Route path="/about" element={
                        <div className="pt-40 pb-24 max-w-3xl mx-auto px-4 text-center">
                          <h1 className="text-4xl font-bold mb-8">Our Philosophy</h1>
                          <p className="text-lg text-slate-600 leading-relaxed">
                            Lumina was founded on the belief that everyday objects should be as beautiful as they are functional. 
                            We partner with independent designers and craftspeople to bring you items that stand the test of time, 
                            rejecting the culture of disposability in favor of meaningful quality.
                          </p>
                        </div>
                      } />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </Router>
            </WishlistProvider>
          </CartProvider>
        </UserProvider>
      </ProductProvider>
    </AdminProvider>
  );
};

export default App;
