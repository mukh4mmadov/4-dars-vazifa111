import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../App";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

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
      navigate("/login");
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>

      {cart.length > 0 &&
        cart.map((value, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border-b border-gray-200"
          >
            <div className="flex items-center">
              <img
                width={120}
                height={100}
                src={value.product.attributes.image}
                alt="image"
                className="mr-4"
              />
              <div>
                <h3 className="text-xl font-semibold">{value.product.attributes.title}</h3>
                <p className="text-gray-500">{value.product.attributes.brand}</p>
                <div className="flex items-center mt-2">
                  <strong className="mr-2">Color:</strong>
                  <span
                    style={{
                      backgroundColor: value.color,
                      display: "inline-block",
                      width: "15px",
                      height: "15px",
                      borderRadius: "50%",
                      border: "2px solid black",
                    }}
                  ></span>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <select
                value={value.count}
                onChange={(e) => {
                  handleChangeCount(e.target.value, value.id, value.color);
                }}
                className="mr-4 border border-gray-300 rounded-md p-1"
              >
                {[...Array(7).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>
              <span
                onClick={() => handleRemove(value.id, value.color)}
                className="text-blue-500 cursor-pointer"
              >
                remove
              </span>
            </div>

            <h3 className="text-xl font-semibold">${value.product.attributes.price}</h3>
          </div>
        ))}

      <div className="flex justify-end mt-4">
        <button
          onClick={handleCheckout}
          className="px-6 py-2 bg-blue-600 text-white rounded-md"
        >
          {token ? "PROCEED TO CHECKOUT" : "PLEASE LOGIN"}
        </button>
      </div>
    </div>
  );
}

export default Cart;
