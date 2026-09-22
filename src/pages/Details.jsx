import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { http } from "../axios";
import { CartContext } from "../App";
import { useTranslation } from "react-i18next";

const COLOR_NAMES = {
  en: {
    "#000000": "Black",
    "#ffffff": "White",
    "#ffffff": "White",
    "#808080": "Gray",
    "#a9a9a9": "Dark gray",
    "#d3d3d3": "Light gray",
    "#c0c0c0": "Silver",
    "#8b4513": "Brown",
    "#d2b48c": "Tan",
    "#f5deb3": "Wheat",
    "#f5f5dc": "Beige",
    "#daa520": "Goldenrod",
    "#b8860b": "Dark goldenrod",
    "#cd853f": "Peru",
    "#a0522d": "Sienna",
    "#8b0000": "Dark red",
    "#dc143c": "Crimson",
    "#ff0000": "Red",
    "#ff6347": "Tomato",
    "#ff8c00": "Dark orange",
    "#ffa500": "Orange",
    "#ffd700": "Gold",
    "#ffff00": "Yellow",
    "#9acd32": "Yellow green",
    "#808000": "Olive",
    "#556b2f": "Dark olive green",
    "#006400": "Dark green",
    "#228b22": "Forest green",
    "#2e8b57": "Sea green",
    "#3cb371": "Medium sea green",
    "#00fa9a": "Medium spring green",
    "#90ee90": "Light green",
    "#008080": "Teal",
    "#2f4f4f": "Dark slate gray",
    "#708090": "Slate gray",
    "#778899": "Light slate gray",
    "#4682b4": "Steel blue",
    "#000080": "Navy",
    "#0000cd": "Medium blue",
    "#0000ff": "Blue",
    "#1e90ff": "Dodger blue",
    "#87ceeb": "Sky blue",
    "#add8e6": "Light blue",
    "#b0e0e6": "Powder blue",
    "#e6e6fa": "Lavender",
    "#9370db": "Medium purple",
    "#6a5acd": "Slate blue",
    "#483d8b": "Dark slate blue",
    "#800080": "Purple",
    "#9932cc": "Dark orchid",
    "#c71585": "Medium violet red",
    "#ff1493": "Deep pink",
    "#ff69b4": "Hot pink",
    "#ffc0cb": "Pink",
    "#ffe4e1": "Misty rose",
    "#fffaf0": "Floral white",
    "#f0f8ff": "Alice blue",
    "#f8f8ff": "Ghost white",
  },
  uz: {
    "#000000": "Qora",
    "#ffffff": "Oq",
    "#808080": "Kulrang",
    "#a9a9a9": "Tovuq kulrang",
    "#d3d3d3": "Yengil kulrang",
    "#c0c0c0": "Kumush",
    "#8b4513": "Jigarrang",
    "#d2b48c": "Tabiiy kulrang-jigarrang",
    "#f5deb3": "Bug'doy",
    "#f5f5dc": "Bej",
    "#daa520": "Oltin",
    "#b8860b": "To'q oltin",
    "#cd853f": "Shokolad",
    "#a0522d": "Siena",
    "#8b0000": "To'q qizil",
    "#dc143c": "Qarmin qizil",
    "#ff0000": "Qizil",
    "#ff6347": "Qizil pomidor",
    "#ff8c00": "To'q to'q sariq",
    "#ffa500": "To'q sariq",
    "#ffd700": "Oltin-sariq",
    "#ffff00": "Sariq",
    "#9acd32": "Sariq-yashil",
    "#808000": "Zaytun",
    "#556b2f": "To'q zaytun",
    "#006400": "To'q yashil",
    "#228b22": "O'rmon yashil",
    "#2e8b57": "Dengiz yashil",
    "#3cb371": "O'rtacha dengiz yashil",
    "#90ee90": "Yengil yashil",
    "#008080": "Firuza",
    "#4682b4": "Po'lat ko'k",
    "#000080": "To'q ko'k",
    "#0000cd": "O'rtacha ko'k",
    "#0000ff": "Ko'k",
    "#1e90ff": "Osmon ko'k",
    "#87ceeb": "Muhit ko'k",
    "#add8e6": "Yengil ko'k",
    "#e6e6fa": "Lavanta",
    "#9370db": "O'rtacha binafsha",
    "#6a5acd": "Shifer ko'k",
    "#800080": "Binafsha",
    "#ff1493": "To'q pushti",
    "#ff69b4": "Pushti",
    "#ffc0cb": "Kichkina pushti",
    "#fffaf0": "Qulay oq",
  },
  ru: {
    "#000000": "Чёрный",
    "#ffffff": "Белый",
    "#808080": "Серый",
    "#a9a9a9": "Тёмно-серый",
    "#d3d3d3": "Светло-серый",
    "#c0c0c0": "Серебристый",
    "#8b4513": "Коричневый",
    "#d2b48c": "Желтовато-коричневый",
    "#f5deb3": "Пшеничный",
    "#f5f5dc": "Бежевый",
    "#daa520": "Золотистый",
    "#b8860b": "Тёмный золотой",
    "#cd853f": "Шоколадный",
    "#a0522d": "Сиена",
    "#8b0000": "Тёмно-красный",
    "#dc143c": "Малиновый",
    "#ff0000": "Красный",
    "#ff6347": "Томатный",
    "#ff8c00": "Тёмно-оранжевый",
    "#ffa500": "Оранжевый",
    "#ffd700": "Золотой",
    "#ffff00": "Жёлтый",
    "#9acd32": "Жёлто-зелёный",
    "#808000": "Оливковый",
    "#556b2f": "Тёмно-оливковый",
    "#006400": "Тёмно-зелёный",
    "#228b22": "Лесной зелёный",
    "#2e8b57": "Морской зелёный",
    "#3cb371": "Средний морской зелёный",
    "#90ee90": "Светло-зелёный",
    "#008080": "Бирюзовый",
    "#4682b4": "Серо-голубой",
    "#000080": "Тёмно-синий",
    "#0000cd": "Средний синий",
    "#0000ff": "Синий",
    "#1e90ff": "Голубой",
    "#87ceeb": "Небесно-голубой",
    "#add8e6": "Светло-голубой",
    "#e6e6fa": "Лавандовый",
    "#9370db": "Средний фиолетовый",
    "#6a5acd": "Сланцево-синий",
    "#800080": "Фиолетовый",
    "#ff1493": "Тёмно-розовый",
    "#ff69b4": "Ярко-розовый",
    "#ffc0cb": "Розовый",
    "#fffaf0": "Светло-бежевый",
  },
};

function lookupColor(colorHex, langKey) {
  const key = (colorHex || "").toLowerCase();
  const dict = COLOR_NAMES[langKey] || COLOR_NAMES.en;
  if (dict[key]) return dict[key];
  for (const hex in dict) {
    if (hex.toLowerCase() === key) return dict[hex];
  }
  if (COLOR_NAMES.en[key]) return COLOR_NAMES.en[key];
  return colorHex;
}

function formatPrice(value) {
  const num = Number(value);
  return num.toLocaleString("en-US");
}

function buildDescription(title, company) {
  const t = String(title || "").toLowerCase();
  if (t.includes("stool") || t.includes("bar") || t.includes("chair")) {
    return "Bring a polished look to your kitchen island or breakfast bar with this comfortable seating set. The sturdy frame is designed for everyday use, while the compact shape fits easily in smaller dining areas. Built with durable fabric and a stable base for long-term comfort.";
  }
  if (t.includes("sofa") || t.includes("couch") || t.includes("loveseat")) {
    return "A cozy sofa built for movie nights, guests and slow weekends. Deep cushions offer soft support, and the fabric cleans up quickly from spills. Neutral upholstery pairs easily with area rugs, coffee tables and lamps you already own.";
  }
  if (t.includes("bed") || t.includes("mattress") || t.includes("platform")) {
    return "A simple, supportive bed frame built for restful nights. Slats remove the need for a box spring, and the low-profile silhouette works well in bedrooms of any size. Finish with your favourite mattress, linens and pillows.";
  }
  if (t.includes("table") || t.includes("desk") || t.includes("coffee")) {
    return "A strong, flat surface ready for meals, homework, coffee or a keyboard. The clean top and minimalist legs fit classic, modern and industrial rooms, while the durable finish stands up to daily use.";
  }
  if (t.includes("book") || t.includes("shelf") || t.includes("storage") || t.includes("tv")) {
    return "Open, simple storage that works in a living room, bedroom or hallway. Sturdy shelves hold books, plants, décor and media consoles while keeping the room feeling light and organized.";
  }
  return "A versatile furniture piece designed for everyday use. Made with durable materials and a silhouette that fits both small apartments and larger rooms — add cushions, throws or your favourite décor to make it feel like home.";
}

function Details() {
  const [product, setProduct] = useState(null);
  const [color, setColor] = useState("");
  const params = useParams();
  const { id } = params;
  const [count, setCount] = useState(1);
  const { cart, setCart } = useContext(CartContext);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [addedMsg, setAddedMsg] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const langKey = (i18n.language || "en").substring(0, 2);

  const description = useMemo(() => {
    if (!product || !product.attributes) return "";
    const at = product.attributes;
    if (at.description) {
      const raw = String(at.description);
      if (
        !raw.includes("Cloud bread") &&
        !raw.includes("banjo") &&
        !raw.includes("bicycle rights") &&
        raw.length > 50
      ) {
        return raw;
      }
    }
    return buildDescription(at.title, at.company);
  }, [product]);

  function load() {
    setLoading(true);
    setError(null);
    http
      .get(`products/${id}`)
      .then((data) => {
        if (data.status === 200) {
          const p = data.data.data;
          setProduct(p);
          if (
            p &&
            p.attributes &&
            p.attributes.colors &&
            p.attributes.colors.length > 0
          ) {
            setColor(p.attributes.colors[0]);
          }
        } else {
          setError("Unexpected response");
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err.message || "Network error");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    load();
  }, [id]);

  function handleSetCard(e) {
    e.preventDefault();
    if (!product || !product.id) return;

    const data = {
      product: product,
      color: color,
      count: Number(count),
      id: product.id,
    };

    let copied = [...cart];

    let isExist = copied.find(function (c) {
      return c.id === data.id && c.color === data.color;
    });

    if (!isExist) {
      copied = [...copied, data];
    } else {
      copied = copied.map(function (value) {
        if (value.id === data.id && value.color === data.color) {
          value.count = Number(value.count) + Number(data.count);
        }
        return value;
      });
    }

    setCart(copied);
    localStorage.setItem("cart", JSON.stringify(copied));

    setAddedMsg({
      title: product.attributes.title,
      count: Number(count),
    });
    setTimeout(() => setAddedMsg(null), 3500);
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-10">
      <Link
        to="/products"
        className="inline-block mb-6 text-sm text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 -ml-2"
      >
        ← {t("Products")}
      </Link>

      {loading && (
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
            <div className="w-full lg:w-2/5 animate-pulse">
              <div className="w-full aspect-square bg-gray-200 rounded-2xl"></div>
            </div>
            <div className="w-full lg:w-3/5 space-y-5 animate-pulse">
              <div className="h-10 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3"></div>
              <div className="h-20 bg-gray-200 rounded w-full"></div>
              <div className="h-48 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      )}

      {!loading && error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-6 text-center max-w-lg mx-auto">
          <h3 className="font-semibold text-lg mb-2">{t("ProductsFailed")}</h3>
          <p className="text-sm text-red-600 mb-4">{error}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={load}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {t("Retry")}
            </button>
            <Link
              to="/products"
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              {t("ContinueShopping")}
            </Link>
          </div>
        </div>
      )}

      {!loading && !error && product && product.attributes && (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start justify-center max-w-5xl mx-auto">
          <div className="w-full lg:w-2/5 flex justify-center">
            <img
              src={product.attributes.image}
              alt={product.attributes.title}
              className="w-full max-w-sm rounded-2xl shadow-xl object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'><rect width='100%25' height='100%25' fill='%23f3f4f6'/><text x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-family='sans-serif' font-size='18'>Product image</text></svg>";
              }}
            />
          </div>

          <form
            onSubmit={handleSetCard}
            className="w-full lg:w-3/5 space-y-5"
          >
            <div>
              <p className="text-sm text-gray-500 mb-1">
                {product.attributes.company}
              </p>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-800">
                {product.attributes.title}
              </h3>
            </div>
            <h3 className="text-3xl font-semibold text-gray-900">
              ${formatPrice(product.attributes.price)}
            </h3>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <li className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-3">
                <span className="block text-gray-500 mb-1">
                  {t("StockIn")}
                </span>
                <span className="font-semibold text-green-700">
                  {t("StockIn")}
                </span>
              </li>
              <li className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-3">
                <span className="block text-gray-500 mb-1">
                  {t("DeliveryEstimate")}
                </span>
                <span className="font-semibold text-gray-800">
                  {t("DaysRange")}
                </span>
              </li>
            </ul>

            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {description}
            </p>

            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold text-gray-800 mb-2">
                {t("Color")}
                {color && (
                  <span className="ml-2 font-normal text-sm text-gray-500">
                    — {lookupColor(color, langKey)}
                  </span>
                )}
              </legend>
              <div className="flex flex-wrap gap-3">
                {product.attributes.colors &&
                  product.attributes.colors.map((colorProduct, index) => {
                    const isSelected = color === colorProduct;
                    const humanName = lookupColor(colorProduct, langKey);
                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setColor(colorProduct)}
                        aria-label={`${
                          isSelected
                            ? t("SelectedColorSwatch")
                            : t("SelectColorSwatch")
                        }: ${humanName}`}
                        aria-pressed={isSelected}
                        title={humanName}
                        className={`w-10 h-10 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                          isSelected
                            ? "ring-2 ring-black ring-offset-2"
                            : ""
                        }`}
                        style={{
                          backgroundColor: colorProduct,
                        }}
                      ></button>
                    );
                  })}
              </div>
            </fieldset>

            <div>
              <label
                htmlFor="quantity-select"
                className="block text-lg font-semibold text-gray-800 mb-2"
              >
                {t("Amount")}
              </label>
              <select
                id="quantity-select"
                value={count}
                onChange={(e) => {
                  setCount(Number(e.target.value));
                }}
                className="w-full sm:w-60 p-3 border border-gray-300 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {[...Array(20).keys()].map((n) => (
                  <option key={n + 1} value={n + 1}>
                    {n + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                className="w-full sm:w-60 bg-purple-600 text-white py-3 rounded-lg shadow-md hover:bg-purple-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 font-semibold"
              >
                {t("Add")}
              </button>
              <button
                type="button"
                onClick={() => navigate("/cart")}
                className="w-full sm:w-60 bg-gray-100 text-gray-800 py-3 rounded-lg border border-gray-300 hover:bg-gray-200 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 font-semibold"
              >
                {t("View")}
              </button>
            </div>

            {addedMsg && (
              <div
                role="status"
                aria-live="polite"
                className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm shadow-sm inline-block"
              >
                ✓{" "}
                {t("AddedToCartTemplate", {
                  count: addedMsg.count,
                  title: addedMsg.title,
                })}
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
}

export default Details;
