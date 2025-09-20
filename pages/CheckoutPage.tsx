
import React, { useState } from 'react';
import { useCartStore } from '../hooks/useCart';
import { useAuthStore } from '../services/authService';
import PiPayButton from '../components/PiPayButton';
import { useNavigate, Link } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
  const { items, total, clearCart } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error' | 'cancelled'>('idle');
  const [txid, setTxid] = useState('');

  if (!isAuthenticated) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold mb-4">Please Sign In</h1>
        <p className="text-gray-600 mb-8">You need to be logged in to proceed to checkout.</p>
        <Link to="/account" className="bg-black text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-800 transition">
          Go to Account Page
        </Link>
      </div>
    );
  }
  
   if (items.length === 0 && paymentStatus !== 'success') {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Add some items to your cart before checking out.</p>
        <Link to="/products" className="bg-black text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-800 transition">
          Browse Products
        </Link>
      </div>
    );
  }
  
  const handlePaymentSuccess = (txid: string) => {
      setPaymentStatus('success');
      setTxid(txid);
      // In a real app, you'd create an order in your DB here.
      console.log(`Order placed for user ${user?.username} with TXID: ${txid}`);
      clearCart();
  };

  if (paymentStatus === 'success') {
      return (
          <div className="text-center py-20 bg-green-50 p-6 rounded-lg">
              <h1 className="text-3xl font-bold text-green-700 mb-4">Payment Successful!</h1>
              <p className="text-gray-600 mb-2">Thank you for your order.</p>
              <p className="text-sm text-gray-500 mb-8 break-all">Transaction ID: {txid}</p>
              <button onClick={() => navigate('/orders')} className="bg-black text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-800 transition">
                  View Your Orders
              </button>
          </div>
      );
  }


  const orderId = `order_${Date.now()}`;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2">
          {items.map(item => (
            <div key={item.id} className="flex justify-between">
              <span>{item.title} x {item.quantity}</span>
              <span>{(item.pricePi * item.quantity).toFixed(2)} π</span>
            </div>
          ))}
        </div>
        <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>{total.toFixed(2)} π</span>
        </div>
      </div>
      <div>
        <PiPayButton
            amount={total}
            orderId={orderId}
            memo={`Order from Daily Pi Mart for ${user?.username}`}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentError={() => setPaymentStatus('error')}
            onPaymentCancel={() => setPaymentStatus('cancelled')}
        >
          Confirm and Pay with Pi
        </PiPayButton>
         {paymentStatus === 'error' && <p className="text-red-500 text-sm mt-2 text-center">Payment failed. Please try again.</p>}
         {paymentStatus === 'cancelled' && <p className="text-yellow-600 text-sm mt-2 text-center">Payment was cancelled.</p>}
      </div>
    </div>
  );
};

export default CheckoutPage;