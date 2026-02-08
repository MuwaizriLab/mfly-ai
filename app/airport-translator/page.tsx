import React from 'react';

export default function AirportTranslatorPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-8" dir="rtl">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-4">
          مترجم المطار 🗣️
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          تواصل بسهولة في المطار. ترجم فورياً النصوص أو الأصوات بين اللغات المختلفة.
        </p>
      </header>

      <main className="container mx-auto px-4 max-w-4xl bg-white p-8 rounded-xl shadow-lg border border-slate-200">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">الترجمة الفورية:</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="sourceLanguage" className="block text-lg font-medium text-slate-700 mb-2">
                من لغة:
              </label>
              <select
                id="sourceLanguage"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="ar">العربية</option>
                <option value="en">الإنجليزية</option>
                <option value="es">الإسبانية</option>
                <option value="fr">الفرنسية</option>
                <option value="de">الألمانية</option>
                <option value="zh">الصينية</option>
              </select>
            </div>
            <div>
              <label htmlFor="targetLanguage" className="block text-lg font-medium text-slate-700 mb-2">
                إلى لغة:
              </label>
              <select
                id="targetLanguage"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="en">الإنجليزية</option>
                <option value="ar">العربية</option>
                <option value="es">الإسبانية</option>
                <option value="fr">الفرنسية</option>
                <option value="de">الألمانية</option>
                <option value="zh">الصينية</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="inputText" className="block text-lg font-medium text-slate-700 mb-2">
              النص المراد ترجمته:
            </label>
            <textarea
              id="inputText"
              rows={4}
              placeholder="اكتب النص هنا..."
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20">
            ترجم الآن!
          </button>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">الترجمة:</h2>
          <div className="bg-slate-100 p-6 rounded-lg text-slate-700 min-h-[100px]">
            <p className="text-lg">الترجمة ستظهر هنا.</p>
            <p className="text-sm text-slate-500 mt-2">جاري تطوير محرك الترجمة الذكي...</p>
          </div>
        </section>
      </main>
    </div>
  );
}
