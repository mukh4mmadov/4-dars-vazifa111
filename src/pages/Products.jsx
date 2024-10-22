import React, { useState, useEffect } from "react";
import { FaThLarge, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Products() {
  const [cards, setCards] = useState([]);
  const [view, setView] = useState("grid");

  const navigate = useNavigate();

  function handleRedirect(id) {
    navigate(`/products/${id}`);
  }

  useEffect(() => {
    fetch("https://strapi-store-server.onrender.com/api/products")
      .then(function (response) {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        setCards(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          {cards.length} products
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
          {cards.map((value, index) => {
            return (
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
            );
          })}
        </div>
      )}

      {view === "list" && cards.length > 0 && (
        <div className="space-y-4">
          {cards.map((value, index) => {
            return (
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
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Products;
