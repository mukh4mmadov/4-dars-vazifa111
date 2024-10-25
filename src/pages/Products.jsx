import React, { useState, useEffect } from "react";
import { FaThLarge, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Products() {
  const [cards, setCards] = useState([]);
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [company, setCompany] = useState("all");
  const [order, setOrder] = useState("a-z");
  const [price, setPrice] = useState(1000);
  const [freeShipping, setFreeShipping] = useState(false);
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  function handleRedirect(id) {
    navigate(`/products/${id}`);
  }

  function handleSearch() {
    const shippingStatus = freeShipping ? "on" : "off";
    const url = `https://strapi-store-server.onrender.com/api/products?search=${search}&category=${category}&company=${company}&order=${order}&price=${
      price * 100
    }&shipping=${shippingStatus}`;

    fetch(url)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        setCards(data.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  function handleReset() {
    setSearch("");
    setCategory("all");
    setCompany("all");
    setOrder("a-z");
    setPrice(1000);
    setFreeShipping(false);
    handleSearch();
  }

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="p-8">
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("Searchs")}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">{t("Categories")}</option>
            <option value="Tables">{t("Tables")}</option>
            <option value="Chairs">{t("Chairs")}</option>
            <option value="Kids">{t("Kids")}</option>
            <option value="Sofas">{t("Sofas")}</option>
            <option value="Beds">{t("Beds")}</option>
          </select>
          <select
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">{t("Companies")}</option>
            <option value="Modenza">Modenza</option>
            <option value="Luxora">Luxora</option>
            <option value="Artifex">Artifex</option>
            <option value="Comfora">Comfora</option>
            <option value="Homestead">Homestead</option>
          </select>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="a-z">Sort A-Z</option>
            <option value="z-a">Sort Z-A</option>
            <option value="high">Price High to Low</option>
            <option value="low">Price Low to High</option>
          </select>
          <div className="flex items-center">
            <label htmlFor="priceRange" className="mr-3">
              Select Price: ${price}
            </label>
            <input
              id="priceRange"
              type="range"
              value={price}
              min="0"
              max="1000"
              onChange={(e) => setPrice(e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="freeShipping" className="mr-3">
              {t("Free")}
            </label>
            <input
              id="freeShipping"
              type="checkbox"
              checked={freeShipping}
              onChange={() => setFreeShipping(!freeShipping)}
              className="h-6 w-6 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {t("Search")}
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
          >
            {t("Reset")}
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          {cards.length} {t("Products")}
        </h2>

        <div className="flex space-x-4">
          <button
            className={`p-2 rounded ${
              view === "grid"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setView("grid")}
          >
            <FaThLarge />
          </button>
          <button
            className={`p-2 rounded ${
              view === "list"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setView("list")}
          >
            <FaBars />
          </button>
        </div>
      </div>
      <hr />

      {view === "grid" && cards.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((value, index) => (
            <div
              key={index}
              onClick={() => handleRedirect(value.id)}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
            >
              <img
                src={value.attributes.image}
                alt={value.attributes.title}
                className="mt-10 w-full h-48 object-cover"
              />
              <div className="p-4 text-center flex flex-col justify-center">
                <h3 className="text-xl font-semibold mb-2">
                  {value.attributes.title}
                </h3>
                <h4 className="text-gray-600">${value.attributes.price}</h4>
              </div>
            </div>
          ))}
        </div>
      )}

      {view === "list" && cards.length > 0 && (
        <div className="space-y-4">
          {cards.map((value, index) => (
            <div
              key={index}
              onClick={() => handleRedirect(value.id)}
              className="bg-white shadow-lg rounded-lg overflow-hidden flex items-center hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
            >
              <img
                src={value.attributes.image}
                alt={value.attributes.title}
                className="w-32 h-32 object-cover"
              />
              <div className="p-4 flex flex-col justify-center">
                <h3 className="text-xl font-semibold mb-2">
                  {value.attributes.title}
                </h3>
                <h4 className="text-gray-600">${value.attributes.price}</h4>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
