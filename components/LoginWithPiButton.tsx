
import React, { useState } from 'react';
import { usePiSDKReady } from '../hooks/usePiSDKReady';
import { useAuthStore, verifyPiAuth } from '../services/authService';
import PiGuard from './PiGuard';

export const LoginWithPiButton: React.FC = () => {
  const sdkReady = usePiSDKReady();
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();

  const handleLogin = async () => {
    if (!sdkReady) {
        alert('Pi SDK is not ready. Please use the Pi Browser.');
        return;
    }

    setLoading(true);
    try {
      const authResult = await window.Pi.authenticate(['username', 'payments']);
      const user = await verifyPiAuth(authResult.accessToken, authResult.user);
      login(user);
    } catch (error) {
      console.error('Pi authentication failed', error);
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PiGuard>
        <button
          onClick={handleLogin}
          disabled={loading || !sdkReady}
          className="bg-black text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-800 transition duration-300 disabled:opacity-50"
        >
          {loading ? 'Authenticating...' : 'Sign In with Pi'}
        </button>
    </PiGuard>
  );
};
