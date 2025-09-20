

import React from 'react';
// Fix: Using namespace import for react-router-dom to address module resolution errors.
import * as ReactRouterDOM from 'react-router-dom';
import { MOCK_PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';

const HomePage: React.FC = () => {
  const featuredProducts = MOCK_PRODUCTS.slice(0, 6);

  return (
    <div>
      <section className="text-center py-16 px-4 bg-green-50 rounded-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Fresh Groceries, Delivered Fast</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Your one-stop shop for fresh fruits, vegetables, dairy, and pantry staples, powered by the Pi Network.
        </p>
        <ReactRouterDOM.Link
          to="/products"
          className="inline-block bg-black text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-800 transition-colors duration-300"
        >
          Shop Now
        </ReactRouterDOM.Link>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;