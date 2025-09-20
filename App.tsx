
import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Outlet, NavLink } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PiBanner } from './components/PiBanner';
import { TestnetBadge } from './components/TestnetBadge';
import { useCartStore } from './hooks/useCart';

const HomePage = lazy(() => import('./pages/HomePage'));
const BrowsePage = lazy(() => import('./pages/BrowsePage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const OrdersPage = lazy(() => import('./pages/OrdersPage'));
const AccountPage = lazy(() => import('./pages/AccountPage'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const PI_ENV = 'testnet'; // Can be 'testnet' or 'mainnet'

const AppLayout: React.FC = () => {
    const { items } = useCartStore();
    const cartItemCount = items.reduce((count, item) => count + item.quantity, 0);

    return (
        <div className="min-h-screen flex flex-col font-sans">
            {PI_ENV === 'testnet' && <TestnetBadge />}
            <PiBanner />
            <Header>
                <nav className="flex items-center space-x-6 text-sm font-medium text-gray-600">
                    <NavLink to="/" className={({ isActive }) => isActive ? "text-black" : "hover:text-black"}>Home</NavLink>
                    <NavLink to="/products" className={({ isActive }) => isActive ? "text-black" : "hover:text-black"}>Products</NavLink>
                    <NavLink to="/orders" className={({ isActive }) => isActive ? "text-black" : "hover:text-black"}>Orders</NavLink>
                    <NavLink to="/account" className={({ isActive }) => isActive ? "text-black" : "hover:text-black"}>Account</NavLink>
                </nav>
                 <NavLink to="/cart" className="relative text-gray-600 hover:text-black">
                    <ShoppingCart size={24} />
                    {cartItemCount > 0 && (
                        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                            {cartItemCount}
                        </span>
                    )}
                </NavLink>
            </Header>
            <main className="flex-grow container mx-auto px-4 py-8">
                <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
                    <Outlet />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<BrowsePage />} />
          <Route path="product/:slug" element={<ProductPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="legal/:topic" element={<LegalPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;