import React, { useState, useEffect } from "react";
import { FaThLarge, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PRICE_MAX_API_CENTS = 25000 * 100;

function formatPrice(value) {
  const num = Number(value);
  return num.toLocaleString("en-US");
}

function Products() {
  const [cards, setCards] = useState([]);
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [company, setCompany] = useState("all");
  const [order, setOrder] = useState("a-z");
  const [price, setPrice] = useState(25000);
  const [freeShipping, setFreeShipping] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const { t } = useTranslation();
  const navigate = useNavigate();

  function handleRedirect(id) {
    navigate(`/products/${id}`);
  }

  function handleKeyDown(e, id) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleRedirect(id);
    }
  }

  function handleSearch() {
    const shippingStatus = freeShipping ? "on" : "off";
    const priceCents = Math.min(Number(price) * 100, PRICE_MAX_API_CENTS);
    const url = `https://strapi-store-server.onrender.com/api/products?search=${encodeURIComponent(
      search
    )}&category=${encodeURIComponent(category)}&company=${encodeURIComponent(
      company
    )}&order=${encodeURIComponent(order)}&price=${priceCents}&shipping=${shippingStatus}`;

    setLoading(true);
    setError(null);

    fetch(url)
      .then(function (response) {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error("Request failed");
      })
      .then((data) => {
        if (data && data.data) {
          setCards(data.data);
        } else {
          setCards([]);
        }
        setHasLoaded(true);
      })
      .catch((err) => {
        console.log("Error:", err);
        setError(err.message || "Network error");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleReset() {
    setSearch("");
    setCategory("all");
    setCompany("all");
    setOrder("a-z");
    setPrice(25000);
    setFreeShipping(false);
    setError(null);
    setTimeout(() => {
      handleSearch();
    }, 0);
  }

  function handleSearchKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  }

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="px-4 py-6 md:px-8 md:py-8">
      <div className="bg-gray-100 p-4 md:p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label
              htmlFor="productSearch"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("SearchLabel")}
            </label>
            <input
              id="productSearch"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder={t("Searchs")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="categorySelect"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("Categories")}
            </label>
            <select
              id="categorySelect"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">{t("Categories")}</option>
              <option value="Tables">{t("Tables")}</option>
              <option value="Chairs">{t("Chairs")}</option>
              <option value="Kids">{t("Kids")}</option>
              <option value="Sofas">{t("Sofas")}</option>
              <option value="Beds">{t("Beds")}</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="companySelect"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("Companies")}
            </label>
            <select
              id="companySelect"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">{t("Companies")}</option>
              <option value="Modenza">Modenza</option>
              <option value="Luxora">Luxora</option>
              <option value="Artifex">Artifex</option>
              <option value="Comfora">Comfora</option>
              <option value="Homestead">Homestead</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="sortSelect"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Sort
            </label>
            <select
              id="sortSelect"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="a-z">{t("SortAz")}</option>
              <option value="z-a">{t("SortZa")}</option>
              <option value="high">{t("SortHigh")}</option>
              <option value="low">{t("SortLow")}</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="priceRange"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("Select")}: ${formatPrice(price)}
            </label>
            <input
              id="priceRange"
              type="range"
              value={price}
              min="0"
              max="25000"
              step="50"
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="flex items-end">
            <label
              htmlFor="freeShipping"
              className="flex items-center p-2 cursor-pointer rounded hover:bg-gray-200 transition-colors"
            >
              <input
                id="freeShipping"
                type="checkbox"
                checked={freeShipping}
                onChange={() => setFreeShipping(!freeShipping)}
                className="h-6 w-6 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-3"
              />
              <span className="text-sm font-medium text-gray-700">
                {t("Free")}
              </span>
            </label>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 justify-between">
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {t("Search")}
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
          >
            {t("ResetFilters")}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {loading
            ? t("LoadingProducts")
            : `${cards.length} ${t("ProductResultCount")}`}
        </h2>

        <div className="flex space-x-4">
          <button
            className={`p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              view === "grid"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            onClick={() => setView("grid")}
            aria-label={t("GridView")}
            title={t("GridView")}
            aria-pressed={view === "grid"}
          >
            <FaThLarge />
          </button>
          <button
            className={`p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              view === "list"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            onClick={() => setView("list")}
            aria-label={t("ListView")}
            title={t("ListView")}
            aria-pressed={view === "list"}
          >
            <FaBars />
          </button>
        </div>
      </div>
      <hr className="mb-6" />

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white shadow-md rounded-lg overflow-hidden animate-pulse"
            >
              <div className="h-40 md:h-48 bg-gray-200"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-6 text-center max-w-lg mx-auto">
          <h3 className="font-semibold text-lg mb-2">{t("ProductsFailed")}</h3>
          <p className="text-sm text-red-600 mb-4">{error}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {t("Retry")}
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              {t("ResetSearch")}
            </button>
          </div>
        </div>
      )}

      {!loading && !error && view === "grid" && cards.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {cards.map((value) => (
            <article
              key={value.id}
              role="button"
              tabIndex={0}
              onClick={() => handleRedirect(value.id)}
              onKeyDown={(e) => handleKeyDown(e, value.id)}
              aria-label={`${t("ProductDetail")}: ${value.attributes.title}`}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <div className="flex justify-center pt-6">
                <img
                  src={value.attributes.image}
                  alt={value.attributes.title}
                  className="w-full max-w-[220px] h-40 md:h-48 object-cover rounded-md"
                />
              </div>
              <div className="p-4 text-center flex flex-col justify-center">
                <h3 className="text-xl font-semibold mb-2">
                  {value.attributes.title}
                </h3>
                <h4 className="text-gray-600">
                  ${formatPrice(value.attributes.price)}
                </h4>
              </div>
            </article>
          ))}
        </div>
      )}

      {!loading && !error && view === "list" && cards.length > 0 && (
        <div className="space-y-4">
          {cards.map((value) => (
            <article
              key={value.id}
              role="button"
              tabIndex={0}
              onClick={() => handleRedirect(value.id)}
              onKeyDown={(e) => handleKeyDown(e, value.id)}
              aria-label={`${t("ProductDetail")}: ${value.attributes.title}`}
              className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col sm:flex-row items-center hover:shadow-2xl transition-shadow duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <img
                src={value.attributes.image}
                alt={value.attributes.title}
                className="w-32 h-32 object-cover flex-shrink-0"
              />
              <div className="p-4 flex flex-col justify-center text-center sm:text-left">
                <h3 className="text-xl font-semibold mb-2">
                  {value.attributes.title}
                </h3>
                <h4 className="text-gray-600">
                  ${formatPrice(value.attributes.price)}
                </h4>
              </div>
            </article>
          ))}
        </div>
      )}

      {!loading && !error && cards.length === 0 && hasLoaded && (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-xl font-semibold text-gray-700 mb-2">
            {t("NoProductsFound")}
          </p>
          <button
            onClick={handleReset}
            className="mt-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {t("ResetSearch")}
          </button>
        </div>
      )}
    </div>
  );
}

export default Products;
