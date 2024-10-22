import React, { useEffect, useState } from "react";
import { http } from "../axios";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    http
      .get("products?featured=true")
      .then((data) => {
        if (data.status === 200) {
          setProducts(data.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigate = useNavigate();

  function handleRedirect(id) {
    navigate(`/products/${id}`);
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between bg-white p-8 rounded-xl shadow-xl mb-12">
        <div className="w-1/2">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4 leading-snug">
            We are changing the way people shop
          </h1>
          <p className="mt-10 text-gray-600 mb-6 text-lg">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Tempore
            repellat explicabo enim soluta temporibus asperiores.
          </p>
          <button className="mt-10 px-8 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all">
            OUR PRODUCTS
          </button>
        </div>
        <div className="w-1/2 flex gap-6">
          <img
            className="rounded-2xl shadow-xl w-1/2 object-cover h-64"
            src={image1}
            alt="Shop Image 1"
          />
          <img
            className="rounded-2xl shadow-xl w-1/2 object-cover h-64"
            src={image2}
            alt="Shop Image 2"
          />
        </div>
      </div>

      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Featured Products
      </h2>
      <hr />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.length > 0 &&
          products.map((product) => (
            <div
              key={product.id}
              onClick={() => handleRedirect(product.id)}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
            >
              <img
                src={product.attributes.image}
                alt={product.attributes.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {product.attributes.title}
              </h3>
              <p className="text-blue-600 font-medium text-lg">
                ${product.attributes.price}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
