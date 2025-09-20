
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../constants';
// Fix: Use a default import for NotFoundPage as it is a default export.
import NotFoundPage from './NotFoundPage';
import { useCartStore } from '../hooks/useCart';

const ProductPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = MOCK_PRODUCTS.find(p => p.slug === slug);
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <NotFoundPage />;
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    alert(`${quantity} of ${product.title} added to cart!`);
    // Optionally navigate to cart page: navigate('/cart');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
                <h1 className="text-4xl font-bold mb-2">{product.title}</h1>
                <p className="text-md text-gray-500 mb-4">{product.category}</p>
                <p className="text-3xl font-bold text-gray-900 mb-6">{product.pricePi.toFixed(2)} π</p>
                <p className="text-gray-700 mb-6 flex-grow">{product.description}</p>
                <div className="flex items-center gap-4 mb-6">
                    <label htmlFor="quantity" className="font-semibold">Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
                        min="1"
                        max={product.stock}
                        className="w-20 p-2 border border-gray-300 rounded-md"
                    />
                    <span className="text-sm text-gray-500">{product.stock} in stock</span>
                </div>
                <div className="flex gap-4">
                    <button onClick={handleAddToCart} className="flex-1 bg-black text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-800 transition">
                        Add to Cart
                    </button>
                     <button onClick={() => { handleAddToCart(); navigate('/checkout'); }} className="flex-1 bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg hover:bg-yellow-600 transition">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ProductPage;