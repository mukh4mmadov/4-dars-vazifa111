import React, { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CartContext } from "../App";

function formatPrice(value) {
  const num = Number(value);
  return num.toLocaleString("en-US");
}

function Checkout() {
  const { t } = useTranslation();
  const { cart } = useContext(CartContext);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      return sum + Number(item.product.attributes.price) * Number(item.count);
    }, 0);
  }, [cart]);

  const totalItems = useMemo(() => {
    return cart.reduce((sum, item) => sum + Number(item.count), 0);
  }, [cart]);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-2xl mx-auto text-center">
        <Link
          to="/cart"
          className="inline-block mb-6 text-sm text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 -ml-2"
        >
          {t("BackToCart")}
        </Link>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 md:p-12 shadow-sm">
          <div className="text-6xl mb-5">🚧</div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            {t("CheckoutSoon")}
          </h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            {t("CheckoutSoonText")}
          </p>

          {cart.length > 0 ? (
            <div className="bg-white rounded-xl p-5 text-left border border-gray-100 shadow-sm mb-8">
              <h2 className="font-semibold text-lg mb-4 text-gray-800">
                {t("Shopping")} ({totalItems}{" "}
                {totalItems === 1 ? t("Item") : t("Items")})
              </h2>
              <ul className="space-y-3 mb-4">
                {cart.slice(0, 3).map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-gray-700 truncate flex-1 mr-2">
                      {item.count}× {item.product.attributes.title}
                    </span>
                    <span className="font-medium text-gray-800 whitespace-nowrap">
                      $
                      {formatPrice(
                        Number(item.product.attributes.price) *
                          Number(item.count)
                      )}
                    </span>
                  </li>
                ))}
                {cart.length > 3 && (
                  <li className="text-xs text-gray-500 italic">
                    + {cart.length - 3} more items
                  </li>
                )}
              </ul>
              <div className="border-t border-gray-100 pt-3 flex justify-between font-semibold">
                <span>{t("Total")}</span>
                <span className="text-gray-900">${formatPrice(subtotal)}</span>
              </div>
              <div
                className="mt-4 px-3 py-2 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-sm"
                role="note"
              >
                <p className="font-semibold">{t("CheckoutDemoTitle")}</p>
                <p className="mt-1">{t("CheckoutDemoHint")}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 mb-6">
              {t("Your")} — add items first.
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/products"
              className="px-6 py-2.5 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              {t("ContinueShopping")}
            </Link>
            {cart.length > 0 && (
              <Link
                to="/cart"
                className="px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {t("View")}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
