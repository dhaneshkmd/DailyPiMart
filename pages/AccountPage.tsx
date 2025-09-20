
import React from 'react';
import { useAuthStore } from '../services/authService';
import { LoginWithPiButton } from '../components/LoginWithPiButton';

const AccountPage: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">My Account</h1>
      {isAuthenticated && user ? (
        <div className="text-center">
          <p className="text-xl mb-2">Welcome, <span className="font-semibold">{user.username}</span>!</p>
          <p className="text-sm text-gray-500 mb-6">Pi User ID: {user.piUid}</p>
          <button
            onClick={logout}
            className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-600 mb-6">Sign in with your Pi account to manage your orders and checkout faster.</p>
          <LoginWithPiButton />
        </div>
      )}
    </div>
  );
};

export default AccountPage;
