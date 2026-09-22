import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const redirectTarget =
    (location.state && location.state.from) ||
    "/";

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate(redirectTarget, { replace: true });
    }
  }, [navigate, redirectTarget]);

  function validateFields() {
    const newErrors = {};
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      newErrors.email = t("ErrorEmailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email = t("ErrorEmailInvalid");
    }

    if (!password) {
      newErrors.password = t("ErrorPasswordRequired");
    } else if (password.length < 6) {
      newErrors.password = t("ErrorPasswordMin");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setServerError(null);

    if (!validateFields()) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        "https://strapi-store-server.onrender.com/api/auth/local",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (data.jwt) {
        localStorage.setItem("token", data.jwt);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate(redirectTarget, { replace: true });
      } else if (data.error) {
        setServerError(t("ErrorAuthInvalid"));
      }
    } catch (err) {
      console.error("Xatolik yuz berdi:", err);
      setServerError(t("ErrorAuthInvalid"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
      <div className="w-full max-w-sm">
        <Link
          to="/"
          className="inline-block mb-6 text-sm text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 -ml-2"
        >
          {t("BackHome")}
        </Link>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            {t("Login")}
          </h2>

          {serverError && (
            <div
              role="alert"
              className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md mb-4 text-sm"
            >
              {serverError}
            </div>
          )}

          <form onSubmit={handleLogin} noValidate>
            <div className="mb-5">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="email"
              >
                {t("Email")} <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email)
                    setErrors((prev) => ({ ...prev, email: null }));
                }}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-red-500 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="mb-5">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="password"
              >
                {t("Password")} <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password)
                    setErrors((prev) => ({ ...prev, password: null }));
                }}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }`}
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
              />
              {errors.password && (
                <p id="password-error" className="text-red-500 text-sm mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 text-white font-bold py-2.5 px-4 rounded-md hover:bg-blue-600 transition-colors mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? "..." : t("LoginBtn")}
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full bg-gray-500 text-white font-bold py-2.5 px-4 rounded-md hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              {t("GuestBtn")}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              {t("NoAccount")}{" "}
              <Link
                to="/register"
                className="text-blue-500 hover:underline font-medium"
              >
                {t("RegisterLink")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
