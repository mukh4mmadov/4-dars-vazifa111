import React, { createContext, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Products from "./pages/Products";
import Details from "./pages/Details";
import ErrorPage from "./pages/ErrorPage";
import MainLayout from "./layouts/MainLayout";

export const CartContext = createContext();
export const ThemeContext = createContext();

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation();
  const [cart, setCart] = useState([]);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    let storage = [];
    if (localStorage.getItem("cart")) {
      setCart(JSON.parse(localStorage.getItem("cart")));
    }
  }, []);

  function PrivateRoute({ isAuth, children }) {
    useEffect(() => {
      if (!isAuth) {
        navigate("/login");
      }
    }, [isAuth, navigate]);

    return isAuth ? children : null;
  }

  useEffect(() => {
    if (
      !token &&
      location.pathname !== "/register" &&
      location.pathname !== "/login" &&
      location.pathname !== "/about" &&
      location.pathname !== "/cart" &&
      location.pathname !== "/details" &&
      location.pathname !== "/" &&
      location.pathname !== "/products"
    ) {
      navigate("/login");
    }
  }, [token, navigate, location]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && storedToken !== token) {
      setToken(storedToken);
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <CartContext.Provider value={{ cart, setCart }}>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          ></Route>
          <Route
            path="/about"
            element={
              <MainLayout>
                <About />
              </MainLayout>
            }
          ></Route>
          <Route
            path="/cart"
            element={
              <MainLayout>
                <Cart />
              </MainLayout>
            }
          ></Route>

          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>

          <Route
            path="/products"
            element={
              <MainLayout>
                <Products />
              </MainLayout>
            }
          ></Route>
          <Route
            path="/products/:id"
            element={
              <MainLayout>
                <Details />
              </MainLayout>
            }
          />

          <Route path="*" element={<ErrorPage />}></Route>

          <Route
            path="/checkout"
            element={
              <PrivateRoute isAuth={!!token}>
                <MainLayout>
                  <Checkout />
                </MainLayout>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/orders"
            element={
              <PrivateRoute isAuth={!!token}>
                <MainLayout>
                  <Orders />
                </MainLayout>
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </CartContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
