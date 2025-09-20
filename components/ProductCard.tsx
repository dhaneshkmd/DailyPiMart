

import React from 'react';
// Fix: Using namespace import for react-router-dom to address module resolution errors.
import * as ReactRouterDOM from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <ReactRouterDOM.Link to={`/product/${product.slug}`} className="group block overflow-hidden border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
      <div className="relative h-64">
        <img
          src={product.images[0]}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.title}</h3>
        <p className="text-sm text-gray-500 mb-3">{product.category}</p>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-gray-900">{product.pricePi.toFixed(2)} π</p>
          <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded">View Details</span>
        </div>
      </div>
    </ReactRouterDOM.Link>
  );
};