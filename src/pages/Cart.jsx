import React, { useContext } from "react";
import { CartContext } from "../App";

function Cart() {
  const { cart, setCart } = useContext(CartContext);
  console.log(cart);

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
      if (value.id == id && value.color == color) {
        value.count = Number(count);
      }

      return value;
    });

    setCart(copied);
    localStorage.setItem("cart", JSON.stringify(copied));
  }

  return (
    <div>
      {cart.length > 0 &&
        cart.map(function (value, index) {
          return (
            <div key={index}>
              <div className="image">
                <img
                  width={250}
                  height={200}
                  src={value.product.attributes.image}
                  alt="image"
                />
              </div>
              <div className="name">
                <h3>{value.product.attributes.title}</h3>
                <strong>Color:</strong>
                <span
                  style={{
                    backgroundColor: value.color,
                    display: "inline-block",
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                    border: "2px solid black",
                  }}
                  className="mt-4"
                ></span>
              </div>
              <div className="amount">
                <select
                  value={value.count}
                  onChange={() => {
                    handleChangeCount(e.target.value, value.id, value.color);
                  }}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                </select>
                <h3>{value.count}</h3>
                <span
                  onClick={() => {
                    handleRemove(value.id, value.color);
                  }}
                  className="cursor-pointer"
                >
                  remove
                </span>
              </div>
              <h3>{value.product.attributes.price}</h3>
            </div>
          );
        })}
    </div>
  );
}

export default Cart;
