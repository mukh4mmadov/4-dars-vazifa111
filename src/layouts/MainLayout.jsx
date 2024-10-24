import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../App";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

function MainLayout({ children }) {
  const { cart } = useContext(CartContext);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState("en");

  useEffect(() => {
    let sum = 0;
    cart.forEach((c) => {
      sum += Number(c.count);
    });

    setCount(sum);
  }, [cart]);

  function handleCart() {
    navigate("/cart");
  }

  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  function handleChange(e) {
    setLang(e.target.value);
  }

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <div>
      <header className="bg-gray-200 py-2">
        <div className="flex justify-between max-w-6xl mx-auto px-4 items-center">
          <div className="flex space-x-4 items-center">
            {token ? (
              <>
                <Link className="btn btn-ghost text-gray-700 hover:bg-gray-300">
                  {t("Profile")}
                </Link>
                <Link
                  onClick={handleLogout}
                  className="btn btn-ghost text-gray-700 hover:bg-gray-300"
                >
                  {t("LogOut")}
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn btn-ghost text-gray-700 hover:bg-gray-300"
                >
                  {t("SignIn")}
                </Link>
                <Link
                  to="/register"
                  className="btn btn-ghost text-gray-700 hover:bg-gray-300"
                >
                  {t("Create")}
                </Link>
              </>
            )}
          </div>
          <div className="ml-4">
            <select
              onChange={handleChange}
              value={lang}
              className="p-2 rounded-md border-gray-300 bg-white text-gray-700"
            >
              <option value="en">English</option>
              <option value="uz">Uzbek</option>
              <option value="ru">Russian</option>
            </select>
          </div>
        </div>
      </header>

      <header className="bg-blue-100">
        <div className="navbar bg-blue-100 flex justify-between items-center">
          <div className="flex-1">
            <Link to="/" className="btn btn-ghost text-xl">
              {t("MyWebsite")}
            </Link>
          </div>
          <ul className="flex space-x-6 mx-auto">
            {token ? (
              <>
                <li>
                  <Link
                    to="/"
                    className={`px-4 py-2 rounded transition-all duration-200 ${
                      location.pathname === "/"
                        ? "bg-black text-white"
                        : "text-gray-700 hover:text-black hover:bg-gray-200"
                    }`}
                  >
                    {t("Home")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className={`px-4 py-2 rounded transition-all duration-200 ${
                      location.pathname === "/about"
                        ? "bg-black text-white"
                        : "text-gray-700 hover:text-black hover:bg-gray-200"
                    }`}
                  >
                    {t("About")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className={`px-4 py-2 rounded transition-all duration-200 ${
                      location.pathname === "/products"
                        ? "bg-black text-white"
                        : "text-gray-700 hover:text-black hover:bg-gray-200"
                    }`}
                  >
                    {t("Products")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cart"
                    className={`px-4 py-2 rounded transition-all duration-200 ${
                      location.pathname === "/cart"
                        ? "bg-black text-white"
                        : "text-gray-700 hover:text-black hover:bg-gray-200"
                    }`}
                  >
                    {t("Cart")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/checkout"
                    className={`px-4 py-2 rounded transition-all duration-200 ${
                      location.pathname === "/checkout"
                        ? "bg-black text-white"
                        : "text-gray-700 hover:text-black hover:bg-gray-200"
                    }`}
                  >
                    {t("Checkout")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/orders"
                    className={`px-4 py-2 rounded transition-all duration-200 ${
                      location.pathname === "/orders"
                        ? "bg-black text-white"
                        : "text-gray-700 hover:text-black hover:bg-gray-200"
                    }`}
                  >
                    {t("Orders")}
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className={`px-4 py-2 rounded transition-all duration-200 ${
                      location.pathname === "/"
                        ? "bg-black text-white"
                        : "text-gray-700 hover:text-black hover:bg-gray-200"
                    }`}
                  >
                    {t("Home")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className={`px-4 py-2 rounded transition-all duration-200 ${
                      location.pathname === "/about"
                        ? "bg-black text-white"
                        : "text-gray-700 hover:text-black hover:bg-gray-200"
                    }`}
                  >
                    {t("About")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className={`px-4 py-2 rounded transition-all duration-200 ${
                      location.pathname === "/products"
                        ? "bg-black text-white"
                        : "text-gray-700 hover:text-black hover:bg-gray-200"
                    }`}
                  >
                    {t("Products")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cart"
                    className={`px-4 py-2 rounded transition-all duration-200 ${
                      location.pathname === "/cart"
                        ? "bg-black text-white"
                        : "text-gray-700 hover:text-black hover:bg-gray-200"
                    }`}
                  >
                    {t("Cart")}
                  </Link>
                </li>
              </>
            )}
          </ul>
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">{count}</span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
              >
                <div className="card-body">
                  <span className="text-lg font-bold">
                    {count} {t("Items")}
                  </span>
                  <div className="card-actions">
                    {window.location.pathname !== "/cart" && (
                      <button
                        onClick={handleCart}
                        className="btn btn-primary btn-block"
                      >
                        {t("View")}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown dropdown-end"></div>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}

export default MainLayout;
