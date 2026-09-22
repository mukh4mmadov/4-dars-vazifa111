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

function PrivateRoute({ isAuth, children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login", { replace: true });
    }
  }, [isAuth, navigate]);

  return isAuth ? children : null;
}

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation();
  const [cart, setCart] = useState([]);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (localStorage.getItem("cart")) {
      try {
        setCart(JSON.parse(localStorage.getItem("cart")));
      } catch (err) {
        console.error("Cart parse error:", err);
      }
    }
  }, []);

  useEffect(() => {
    if (
      !token &&
      location.pathname !== "/register" &&
      location.pathname !== "/login" &&
      location.pathname !== "/about" &&
      location.pathname !== "/cart" &&
      location.pathname !== "/" &&
      !location.pathname.startsWith("/products")
    ) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate, location.pathname]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && storedToken !== token) {
      setToken(storedToken);
    }
  }, [token]);

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
          />
          <Route
            path="/about"
            element={
              <MainLayout>
                <About />
              </MainLayout>
            }
          />
          <Route
            path="/cart"
            element={
              <MainLayout>
                <Cart />
              </MainLayout>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/products"
            element={
              <MainLayout>
                <Products />
              </MainLayout>
            }
          />
          <Route
            path="/products/:id"
            element={
              <MainLayout>
                <Details />
              </MainLayout>
            }
          />

          <Route
            path="/checkout"
            element={
              <PrivateRoute isAuth={!!token}>
                <MainLayout>
                  <Checkout />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <PrivateRoute isAuth={!!token}>
                <MainLayout>
                  <Orders />
                </MainLayout>
              </PrivateRoute>
            }
          />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </CartContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
