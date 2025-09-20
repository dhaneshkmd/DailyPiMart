


import React, { Suspense, lazy } from 'react';
// Fix: Using namespace import for react-router-dom to address module resolution errors.
import * as ReactRouterDOM from 'react-router-dom';
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
                <div className="flex items-center gap-6">
                    <nav className="flex items-center space-x-6 text-sm font-medium text-gray-600">
                        <ReactRouterDOM.NavLink to="/" className={({ isActive }) => isActive ? "text-black" : "hover:text-black"}>Home</ReactRouterDOM.NavLink>
                        <ReactRouterDOM.NavLink to="/products" className={({ isActive }) => isActive ? "text-black" : "hover:text-black"}>Products</ReactRouterDOM.NavLink>
                        <ReactRouterDOM.NavLink to="/orders" className={({ isActive }) => isActive ? "text-black" : "hover:text-black"}>Orders</ReactRouterDOM.NavLink>
                        <ReactRouterDOM.NavLink to="/account" className={({ isActive }) => isActive ? "text-black" : "hover:text-black"}>Account</ReactRouterDOM.NavLink>
                    </nav>
                    <ReactRouterDOM.NavLink to="/cart" className="relative text-gray-600 hover:text-black">
                        <ShoppingCart size={24} />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                {cartItemCount}
                            </span>
                        )}
                    </ReactRouterDOM.NavLink>
                </div>
            </Header>
            <main className="flex-grow container mx-auto px-4 py-8">
                <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
                    <ReactRouterDOM.Outlet />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
};

const App: React.FC = () => {
  return (
    <ReactRouterDOM.HashRouter>
      <ReactRouterDOM.Routes>
        <ReactRouterDOM.Route path="/" element={<AppLayout />}>
          <ReactRouterDOM.Route index element={<HomePage />} />
          <ReactRouterDOM.Route path="products" element={<BrowsePage />} />
          <ReactRouterDOM.Route path="product/:slug" element={<ProductPage />} />
          <ReactRouterDOM.Route path="cart" element={<CartPage />} />
          <ReactRouterDOM.Route path="checkout" element={<CheckoutPage />} />
          <ReactRouterDOM.Route path="orders" element={<OrdersPage />} />
          <ReactRouterDOM.Route path="account" element={<AccountPage />} />
          <ReactRouterDOM.Route path="legal/:topic" element={<LegalPage />} />
          <ReactRouterDOM.Route path="*" element={<NotFoundPage />} />
        </ReactRouterDOM.Route>
      </ReactRouterDOM.Routes>
    </ReactRouterDOM.HashRouter>
  );
};

export default App;