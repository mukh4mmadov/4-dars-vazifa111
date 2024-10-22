import React from "react";

function About() {
  return (
    <div className="max-w-2xl mx-auto p-5 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">
        Osh tayyorlash
      </h1>
      <p className="text-lg text-gray-700 leading-relaxed">
        <strong>Kerakli Ingredientlar:</strong>
        <ul className="list-disc list-inside my-2">
          <li>Guruch: 500 gram</li>
          <li>Go'sht: 500 gram (qo'y go'shti yoki mol go'shti)</li>
          <li>Sabzi: 2 dona</li>
          <li>Piyoz: 2 dona</li>
          <li>Sarimsoq: 5-6 dona</li>
          <li>Zira: 1 choy qoshiq</li>
          <li>Tuz: ta'bga ko'ra</li>
          <li>Piyoz yog'i: 100 ml (yoki boshqa yog'lar)</li>
          <li>Suv: 1 litr (guruchni yuvish va tayyorlash uchun)</li>
        </ul>
        <strong>Tayyorlash Tartibi:</strong>
        <ol className="list-decimal list-inside my-2 space-y-2">
          <li>
            <strong>Guruchni tayyorlash:</strong> Guruchni yaxshilab yuvib, 30
            daqiqa davomida suvda namlayin.
          </li>
          <li>
            <strong>Go'shtni tayyorlash:</strong> Go'shtni kublarga kesing.
            Piyozni halqaga, sabzini esa uzun qilib to'g'rang.
          </li>
          <li>
            <strong>Yog'ni qizdirish:</strong> Katta qozonda yog'ni qizdiring.
            Qizdirilgan yog'ga piyozni solib, oltin ranggacha qovuring.
          </li>
          <li>
            <strong>Go'shtni qo'shish:</strong> Piyozga go'shtni qo'shing va
            go'sht qizarguncha qovuring.
          </li>
          <li>
            <strong>Sabzini qo'shish:</strong> Go'sht qizarganidan keyin sabzini
            qo'shing va 5-7 daqiqa davomida qovurishda davom eting.
          </li>
          <li>
            <strong>Guruchni qo'shish:</strong> Namlangan guruchni qo'shing,
            ustidan zira va tuzni sepib, yaxshilab aralashtiring.
          </li>
          <li>
            <strong>Suvni qo'shish:</strong> Guruch ustiga 1 litr suv qo'shing.
            Suv qaynagach, olovni pasaytirib, qozonning qopqog'ini yopib, 20-25
            daqiqa davomida pishiring.
          </li>
          <li>
            <strong>Sarimsoq qo'shish:</strong> Oxirida sarimsoqni qo'shing va
            yana 10 daqiqa davomida pishiring.
          </li>
          <li>
            <strong>Oshni xizmat qilish:</strong> Osh tayyor bo'lgach, uni katta
            idishga chiqarib, issiq holda xizmat qiling.
          </li>
        </ol>
      </p>
    </div>
  );
}

export default About;
