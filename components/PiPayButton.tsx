import React from 'react';
import { usePiSDKReady } from '../hooks/usePiSDKReady';
import { approvePayment, completePayment } from '../services/piAPI';
import PiGuard from './PiGuard';
// Fix: Using namespace import for react-router-dom to address module resolution errors.
import * as ReactRouterDOM from 'react-router-dom';

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
  const navigate = ReactRouterDOM.useNavigate();

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
        // onReadyForServerApproval is called when the payment is created on the Pi Server.
        // The client's job is to send the `paymentId` to its OWN backend server.
        // The backend server then calls the Pi API to approve the payment.
        onReadyForServerApproval: async (paymentId: string) => {
          console.log('Client received onReadyForServerApproval with paymentId:', paymentId);
          // This function now represents a fetch call to your own backend.
          await approvePayment(paymentId);
        },
        // onReadyForServerCompletion is called after the user signs the transaction.
        // The client's job is to send the `paymentId` and `txid` to its OWN backend.
        // The backend then calls the Pi API to complete the payment.
        onReadyForServerCompletion: async (paymentId: string, txid: string) => {
          console.log('Client received onReadyForServerCompletion with paymentId and txid:', paymentId, txid);
          // This function now represents a fetch call to your own backend.
          await completePayment(paymentId, txid);
          onPaymentSuccess(txid);
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