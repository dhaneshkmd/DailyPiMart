

import React from 'react';
import { useCartStore } from '../hooks/useCart';
// Fix: Using namespace import for react-router-dom to address module resolution errors.
import * as ReactRouterDOM from 'react-router-dom';
import { Trash2 } from 'lucide-react';

const CartPage: React.FC = () => {
  const { items, total, updateItemQuantity, removeItem, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <ReactRouterDOM.Link to="/products" className="bg-black text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-800 transition">
          Start Shopping
        </ReactRouterDOM.Link>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 border-b pb-4">Your Shopping Cart</h1>
      <div className="space-y-4 mb-6">
        {items.map(item => (
          <div key={item.id} className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-4">
              <img src={item.images[0]} alt={item.title} className="w-20 h-20 object-cover rounded-md" />
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-500">{item.pricePi.toFixed(2)} π</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateItemQuantity(item.id, parseInt(e.target.value, 10))}
                min="1"
                className="w-16 p-2 border rounded-md"
              />
              <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mb-6">
        <button onClick={clearCart} className="text-sm text-gray-600 hover:underline">Clear Cart</button>
        <div className="text-right">
          <p className="text-xl font-bold">Total: {total.toFixed(2)} π</p>
        </div>
      </div>
      <div className="text-right">
        <ReactRouterDOM.Link to="/checkout" className="bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg hover:bg-yellow-600 transition">
          Proceed to Checkout
        </ReactRouterDOM.Link>
      </div>
    </div>
  );
};

export default CartPage;