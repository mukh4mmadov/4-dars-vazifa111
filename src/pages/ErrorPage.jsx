import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ErrorPage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white px-4">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          Oops! Page not found.
        </h2>
        <p className="text-lg mb-8">
          The page you are looking for does not exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-block bg-white text-purple-600 font-bold py-3 px-8 rounded-full shadow-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-500"
        >
          {t("BackHome")}
        </Link>
      </div>

      <div className="absolute bottom-6 text-white text-sm opacity-80 text-center">
        <p>© {new Date().getFullYear()} {t("MyWebsite")}. All rights reserved.</p>
      </div>
    </div>
  );
}

export default ErrorPage;
