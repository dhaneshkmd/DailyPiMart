
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-8">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="bg-black text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-800 transition">
        Return to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
