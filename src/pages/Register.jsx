import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Register() {
  const [username, setUsername] = useState("");
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
    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      newErrors.username = t("ErrorUsernameRequired");
    }

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

  const handleRegister = async (e) => {
    e.preventDefault();
    setServerError(null);

    if (!validateFields()) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        "https://strapi-store-server.onrender.com/api/auth/local/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.trim(),
            email: email.trim(),
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
        setServerError(
          data.error.message || t("ErrorAuthInvalid")
        );
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
            {t("Register")}
          </h2>

          {serverError && (
            <div
              role="alert"
              className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md mb-4 text-sm"
            >
              {serverError}
            </div>
          )}

          <form onSubmit={handleRegister} noValidate>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="username"
              >
                {t("Username")} <span className="text-red-500">*</span>
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errors.username)
                    setErrors((prev) => ({ ...prev, username: null }));
                }}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.username
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }`}
                aria-invalid={!!errors.username}
                aria-describedby={
                  errors.username ? "username-error" : undefined
                }
              />
              {errors.username && (
                <p id="username-error" className="text-red-500 text-sm mt-1">
                  {errors.username}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="reg-email"
              >
                {t("Email")} <span className="text-red-500">*</span>
              </label>
              <input
                id="reg-email"
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
                aria-describedby={errors.email ? "reg-email-error" : undefined}
              />
              {errors.email && (
                <p id="reg-email-error" className="text-red-500 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="mb-5">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="reg-password"
              >
                {t("Password")} <span className="text-red-500">*</span>
              </label>
              <input
                id="reg-password"
                type="password"
                autoComplete="new-password"
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
                  errors.password ? "reg-password-error" : undefined
                }
              />
              {errors.password && (
                <p id="reg-password-error" className="text-red-500 text-sm mt-1">
                  {errors.password}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-2">
                {t("ErrorPasswordMin")}
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 text-white font-bold py-2.5 px-4 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? "..." : t("RegisterBtn")}
            </button>
          </form>

          <div className="mt-5 text-center text-sm">
            <p className="text-gray-600">{t("HasAccount")}</p>
            <Link
              to="/login"
              className="text-blue-500 hover:underline font-medium"
            >
              {t("LoginLink")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
