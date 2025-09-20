
import React from 'react';
import { usePiSDKReady } from '../hooks/usePiSDKReady';
import { approvePayment, completePayment } from '../services/piAPI';
import PiGuard from './PiGuard';
import { useNavigate } from 'react-router-dom';

interface PiPayButtonProps {
  amount: number;
  orderId: string;
  memo: string;
  onPaymentSuccess: (txid: string) => void;
  onPaymentError: (error: Error) => void;
  onPaymentCancel: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
}

const PiPayButton: React.FC<PiPayButtonProps> = ({ amount, orderId, memo, onPaymentSuccess, onPaymentError, onPaymentCancel, children, disabled }) => {
  const sdkReady = usePiSDKReady();
  const navigate = useNavigate();

  const handlePayment = async () => {
    if (!sdkReady) {
        alert('Pi SDK is not ready. Please use the Pi Browser.');
        return;
    }

    const paymentData = {
      amount,
      memo,
      metadata: { orderId },
    };

    try {
      window.Pi.createPayment(paymentData, {
        onReadyForServerApproval: async (paymentId: string) => {
          console.log('onReadyForServerApproval', paymentId);
          await approvePayment(paymentId);
        },
        onReadyForServerCompletion: async (paymentId: string, txid: string) => {
          console.log('onReadyForServerCompletion', paymentId, txid);
          await completePayment(paymentId, txid);
          onPaymentSuccess(txid);
          // Typically navigate to an order success page
          navigate('/orders'); 
        },
        onCancelled: () => {
          console.log('Payment cancelled by user.');
          onPaymentCancel();
        },
        onError: (error: any) => {
          console.error('Payment error.', error);
          onPaymentError(new Error(error.message || 'An unknown payment error occurred.'));
        },
      });
    } catch (err) {
      console.error('Error creating payment.', err);
      onPaymentError(err instanceof Error ? err : new Error('Failed to create payment'));
    }
  };

  return (
    <PiGuard>
      <button
        onClick={handlePayment}
        disabled={disabled || !sdkReady}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-4 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {children ?? `Pay ${amount.toFixed(2)} π`}
      </button>
    </PiGuard>
  );
};

export default PiPayButton;
