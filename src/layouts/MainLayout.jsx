import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../App";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiMenu, FiX, FiShoppingCart } from "react-icons/fi";

function MainLayout({ children }) {
  const { cart } = useContext(CartContext);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || "en");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let sum = 0;
    cart.forEach((c) => {
      sum += Number(c.count);
    });
    setCount(sum);
  }, [cart]);

  function handleCart() {
    navigate("/cart");
    setMenuOpen(false);
  }

  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setMenuOpen(false);
    navigate("/");
  }

  function handleChange(e) {
    setLang(e.target.value);
  }

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const publicLinks = [
    { to: "/", label: t("Home") },
    { to: "/about", label: t("About") },
    { to: "/products", label: t("Products") },
    { to: "/cart", label: t("Cart") },
  ];

  const authLinks = [
    { to: "/", label: t("Home") },
    { to: "/about", label: t("About") },
    { to: "/products", label: t("Products") },
    { to: "/cart", label: t("Cart") },
    { to: "/checkout", label: t("Checkout") },
    { to: "/orders", label: t("Orders") },
  ];

  const navLinks = token ? authLinks : publicLinks;
  const itemWord = count === 1 ? t("Item") : t("Items");

  function isActive(path) {
    return location.pathname === path;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-200 py-2 border-b border-gray-300">
        <div className="flex flex-wrap justify-between max-w-6xl mx-auto px-4 items-center gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {token ? (
              <>
                <span className="btn btn-ghost text-gray-700 hover:bg-gray-300 text-sm px-3 py-1 rounded">
                  {t("Profile")}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn btn-ghost text-gray-700 hover:bg-gray-300 text-sm px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {t("LogOut")}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn btn-ghost text-gray-700 hover:bg-gray-300 text-sm px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {t("SignIn")}
                </Link>
                <Link
                  to="/register"
                  className="btn btn-ghost text-gray-700 hover:bg-gray-300 text-sm px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {t("Create")}
                </Link>
              </>
            )}
          </div>
          <div>
            <label htmlFor="language-select" className="sr-only">
              Language
            </label>
            <select
              id="language-select"
              onChange={handleChange}
              value={lang}
              className="p-2 rounded-md border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="en">English</option>
              <option value="uz">Uzbek</option>
              <option value="ru">Russian</option>
            </select>
          </div>
        </div>
      </header>

      <header className="bg-blue-100 shadow-sm">
        <div className="navbar bg-blue-100 max-w-6xl mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="lg:hidden p-2 rounded-md hover:bg-blue-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={menuOpen ? t("CloseMenu") : t("OpenMenu")}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
            <Link to="/" className="btn btn-ghost text-lg md:text-xl font-bold">
              {t("MyWebsite")}
            </Link>
          </div>

          <nav
            aria-label="Main navigation"
            className="hidden lg:block flex-1"
          >
            <ul className="flex flex-wrap justify-center gap-2 mx-auto">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`px-4 py-2 rounded transition-all duration-200 block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      isActive(link.to)
                        ? "bg-black text-white"
                        : "text-gray-700 hover:text-black hover:bg-gray-200"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="dropdown dropdown-end relative">
              <button
                type="button"
                onClick={handleCart}
                aria-label={`${t("CartIconLabel")} — ${count} ${itemWord}`}
                title={t("CartIconLabel")}
                className="btn btn-ghost btn-circle p-2 rounded-full hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <div className="indicator relative inline-block">
                  <FiShoppingCart size={20} className="text-gray-800" />
                  {count > 0 && (
                    <span className="badge badge-sm indicator-item absolute -top-1 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {count}
                    </span>
                  )}
                </div>
              </button>
              <div className="card card-compact dropdown-content bg-base-100 z-[1] mt-2 w-56 shadow-lg rounded-lg border border-gray-100 right-0 absolute hidden group-hover:block hover:block">
                <div className="card-body bg-white rounded-lg p-4">
                  <span className="text-lg font-bold mb-2">
                    {count} {itemWord}
                  </span>
                  <div className="card-actions">
                    {location.pathname !== "/cart" && (
                      <button
                        onClick={handleCart}
                        className="btn btn-primary btn-block w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {t("View")}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {menuOpen && (
          <nav
            id="mobile-menu"
            aria-label="Mobile navigation"
            className="lg:hidden bg-blue-100 border-t border-blue-200 px-4 py-3"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`px-4 py-2.5 rounded-md transition-all duration-200 block focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isActive(link.to)
                        ? "bg-black text-white"
                        : "text-gray-700 hover:text-black hover:bg-gray-200"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-gray-800 text-gray-300 mt-12 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
          <p className="mb-2 font-semibold">{t("MyWebsite")}</p>
          <p className="text-gray-400">
            © {new Date().getFullYear()} {t("MyWebsite")}. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;
