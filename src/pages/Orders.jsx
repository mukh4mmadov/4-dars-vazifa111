import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Orders() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 md:p-12">
          <div className="text-6xl mb-5">📦</div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            {t("OrdersSoon")}
          </h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            {t("OrdersSoonText")}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="px-6 py-2.5 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              {t("BackHome")}
            </Link>
            <Link
              to="/products"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {t("ContinueShopping")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
