import React, { useContext, useEffect, useMemo, useState } from "react";
import { CartContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function formatPrice(value) {
  const num = Number(value);
  return num.toLocaleString("en-US");
}

function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      return sum + Number(item.product.attributes.price) * Number(item.count);
    }, 0);
  }, [cart]);

  const totalItems = useMemo(() => {
    return cart.reduce((sum, item) => sum + Number(item.count), 0);
  }, [cart]);

  function handleRemove(id, color) {
    let copied = [...cart];
    copied = copied.filter(function (value) {
      return !(value.id === id && value.color === color);
    });

    setCart(copied);
    localStorage.setItem("cart", JSON.stringify(copied));
  }

  function handleChangeCount(count, id, color) {
    let copied = [...cart];
    copied = copied.map(function (value) {
      if (value.id === id && value.color === color) {
        value.count = Number(count);
      }

      return value;
    });

    setCart(copied);
    localStorage.setItem("cart", JSON.stringify(copied));
  }

  function handleCheckout() {
    if (token) {
      navigate("/checkout");
    } else {
      navigate("/login", { state: { from: "/checkout" } });
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      {cart.length > 0 ? (
        <>
          <div className="flex flex-wrap justify-between items-end mb-6 gap-3">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                {t("Shopping")}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {totalItems} {totalItems === 1 ? t("Item") : t("Items")}
              </p>
            </div>
            <Link
              to="/products"
              className="text-sm text-blue-600 hover:underline"
            >
              {t("ContinueShopping")} →
            </Link>
          </div>

          <div className="space-y-3">
            {cart.map((value, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-b border-gray-200 bg-white rounded-lg gap-4"
              >
                <div className="flex items-start w-full sm:w-auto flex-1">
                  <img
                    width={100}
                    height={100}
                    src={value.product.attributes.image}
                    alt={value.product.attributes.title}
                    className="mr-4 rounded-md object-cover flex-shrink-0"
                  />
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold">
                      {value.product.attributes.title}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {value.product.attributes.company}
                    </p>
                    <div className="flex items-center mt-2">
                      <strong className="mr-2 text-sm">
                        {t("Color")}:
                      </strong>
                      <span
                        style={{
                          backgroundColor: value.color,
                          display: "inline-block",
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          border: "2px solid #374151",
                        }}
                        aria-label={`${t("SelectColor")}: ${value.color}`}
                      ></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center w-full sm:w-auto justify-between sm:justify-end gap-4 sm:gap-6">
                  <div>
                    <label
                      htmlFor={`qty-${value.id}-${value.color}`}
                      className="sr-only"
                    >
                      {t("SelectQuantity")}
                    </label>
                    <select
                      id={`qty-${value.id}-${value.color}`}
                      value={value.count}
                      onChange={(e) => {
                        handleChangeCount(
                          e.target.value,
                          value.id,
                          value.color
                        );
                      }}
                      className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {[...Array(20).keys()].map((num) => (
                        <option key={num + 1} value={num + 1}>
                          {num + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemove(value.id, value.color)}
                    className="text-blue-500 hover:text-blue-700 underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                  >
                    {t("remove")}
                  </button>

                  <h3 className="text-lg md:text-xl font-semibold whitespace-nowrap">
                    ${formatPrice(value.product.attributes.price)}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white p-6 rounded-xl shadow-md max-w-md ml-auto border border-gray-100">
            <div
              className="px-3 py-2 mb-4 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-sm"
              role="note"
            >
              <p className="font-semibold">{t("CheckoutDemoTitle")}</p>
              <p className="mt-1">{t("CheckoutDemoHint")}</p>
            </div>

            <div className="flex justify-between items-center mb-3 text-lg">
              <span className="text-gray-600">{t("Subtotal")}</span>
              <span className="font-semibold">
                ${formatPrice(subtotal)}
              </span>
            </div>
            <hr className="mb-4" />
            <div className="flex justify-between items-center mb-6 text-xl">
              <span className="font-semibold text-gray-800">{t("Total")}</span>
              <span className="font-bold text-gray-900">
                ${formatPrice(subtotal)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-semibold"
            >
              {token ? t("ProceedCheckout") : t("SignInToCheckout")}
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-16 md:py-24">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-xl md:text-2xl font-bold text-gray-700 mb-2">
            {t("Your")}
          </p>
          <p className="text-gray-500 mb-8">
            Add some products to get started.
          </p>
          <Link
            to="/products"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {t("ContinueShopping")}
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
