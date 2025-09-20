

import React from 'react';
import { useAuthStore } from '../services/authService';
// Fix: Using namespace import for react-router-dom to address module resolution errors.
import * as ReactRouterDOM from 'react-router-dom';

const OrdersPage: React.FC = () => {
    const { isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
        return (
             <div className="text-center py-20">
                <h1 className="text-3xl font-bold mb-4">Please Sign In</h1>
                <p className="text-gray-600 mb-8">You need to be logged in to view your orders.</p>
                <ReactRouterDOM.Link to="/account" className="bg-black text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-800 transition">
                    Go to Account Page
                </ReactRouterDOM.Link>
            </div>
        );
    }
    
  // In a real application, you would fetch and display a list of the user's orders.
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
      <div className="text-center py-10 border-2 border-dashed rounded-lg">
        <p className="text-gray-600">You have no orders yet.</p>
        <p className="text-sm text-gray-500 mt-2">When you make a purchase, it will appear here.</p>
      </div>
    </div>
  );
};

export default OrdersPage;