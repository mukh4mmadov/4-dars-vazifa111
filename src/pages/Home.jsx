import React, { useEffect, useState } from "react";
import { http } from "../axios";
import { Link, useNavigate } from "react-router-dom";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import { useTranslation } from "react-i18next";

function formatPrice(value) {
  const num = Number(value);
  return num.toLocaleString("en-US");
}

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  function load() {
    setLoading(true);
    setError(null);
    http
      .get("products?featured=true")
      .then((data) => {
        if (data.status === 200) {
          setProducts(data.data.data);
        } else {
          setError("Unexpected response");
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err.message || "Network error");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    load();
  }, []);

  function handleRedirect(id) {
    navigate(`/products/${id}`);
  }

  function handleKeyDown(e, id) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleRedirect(id);
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-10">
      <div className="flex flex-col md:flex-row items-center justify-between bg-white p-6 md:p-10 rounded-xl shadow-xl mb-10 gap-8">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 leading-snug">
            {t("We")}
          </h1>
          <p className="text-gray-600 mb-6 text-base md:text-lg">
            {t("Lorem")}
          </p>
          <Link
            to="/products"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {t("Our")}
          </Link>
        </div>
        <div className="w-full md:w-1/2 flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
          <img
            className="rounded-2xl shadow-xl w-full sm:w-1/2 object-cover h-48 md:h-64"
            src={image1}
            alt="Furniture showroom"
          />
          <img
            className="rounded-2xl shadow-xl w-full sm:w-1/2 object-cover h-48 md:h-64"
            src={image2}
            alt="Interior with sofa"
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-end mb-4 gap-3">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
          {t("Featured")}
        </h2>
        {error && (
          <button
            onClick={load}
            className="px-4 py-1.5 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {t("Retry")}
          </button>
        )}
      </div>
      <hr className="mb-8" />

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md p-6 animate-pulse"
            >
              <div className="w-full h-40 md:h-48 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-5 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-6 text-center max-w-lg mx-auto">
          <h3 className="font-semibold text-lg mb-2">{t("ProductsFailed")}</h3>
          <p className="text-sm text-red-600 mb-4">{error}</p>
          <button
            onClick={load}
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {t("Retry")}
          </button>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => (
            <article
              key={product.id}
              role="button"
              tabIndex={0}
              onClick={() => handleRedirect(product.id)}
              onKeyDown={(e) => handleKeyDown(e, product.id)}
              aria-label={`${t("ProductDetail")}: ${product.attributes.title}`}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <img
                src={product.attributes.image}
                alt={product.attributes.title}
                className="w-full h-40 md:h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {product.attributes.title}
              </h3>
              <p className="text-blue-600 font-medium text-lg">
                ${formatPrice(product.attributes.price)}
              </p>
            </article>
          ))}
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="text-center py-10 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-xl font-semibold text-gray-600 mb-4">
            {t("NoItems")}
          </p>
          <Link
            to="/products"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {t("ContinueShopping")}
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
