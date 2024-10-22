import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../App";

function MainLayout({ children }) {
  const { cart, setCart } = useContext(CartContext);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let sum = 0;
    cart.forEach((c) => {
      sum += Number(c.count);
    });

    setCount(sum);
  }, [cart]);
  return (
    <div>
      <header>
        <h1>HEADER</h1>
        <h4 className="bg-blue-600 text-white w-4 rounded-full justify-center">
          {count}
        </h4>
      </header>
      {children}
    </div>
  );
}

export default MainLayout;
