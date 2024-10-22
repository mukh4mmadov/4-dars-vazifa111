import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-6">Oops! Sahifa topilmadi.</h2>
        <p className="text-lg mb-8">Kechirasiz, siz qidirgan sahifa mavjud emas.</p>

        <Link to="/" className="bg-white text-purple-600 font-bold py-3 px-6 rounded-full shadow-md hover:bg-gray-100 transition-colors">
          Bosh sahifaga qaytish
        </Link>
      </div>

      <div className="absolute bottom-10 text-white text-sm opacity-70">
        <p>© 2024 Sizning Loyihangiz. Barcha huquqlar himoyalangan.</p>
      </div>
    </div>
  );
}

export default ErrorPage;
