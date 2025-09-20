
import React, { useState, useMemo } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';

const BrowsePage: React.FC = () => {
  const [products] = useState<Product[]>(MOCK_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const allCategories = new Set(products.map(p => p.category));
    return ['All', ...Array.from(allCategories)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') {
      return products;
    }
    return products.filter(p => p.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Our Products</h1>
      <div className="flex flex-wrap gap-2 mb-6 border-b pb-4">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              selectedCategory === category
                ? 'bg-black text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
        {filteredProducts.length === 0 && (
            <p className="col-span-full text-center text-gray-500 py-10">No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default BrowsePage;
