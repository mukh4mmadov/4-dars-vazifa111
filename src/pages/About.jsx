import React from "react";
import { useTranslation } from "react-i18next";

function About() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            {t("AboutTitle")}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            {t("AboutStory")}
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="font-semibold text-xl text-gray-800 mb-3">🛋</h3>
            <p className="text-gray-600">{t("AboutTrust1")}</p>
          </div>
          <div className="bg-green-50 p-6 rounded-xl border border-green-100">
            <h3 className="font-semibold text-xl text-gray-800 mb-3">✅</h3>
            <p className="text-gray-600">{t("AboutTrust2")}</p>
          </div>
          <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
            <h3 className="font-semibold text-xl text-gray-800 mb-3">🧾</h3>
            <p className="text-gray-600">{t("AboutTrust3")}</p>
          </div>
        </section>

        <section className="space-y-6">
          <article className="bg-white p-6 md:p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              {t("AboutPromise")}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {t("AboutPromiseText")}
            </p>
          </article>

          <article className="bg-white p-6 md:p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              {t("AboutDelivery")}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {t("AboutDeliveryText")}
            </p>
          </article>

          <article className="bg-white p-6 md:p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              {t("AboutContact")}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {t("AboutContactText")}
            </p>
          </article>
        </section>
      </div>
    </div>
  );
}

export default About;
