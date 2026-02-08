import React from 'react';

export default function FareHunterPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-8" dir="rtl">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-4">
          صائد العروض 💸
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          لا تحجز غالي. نقارن لك الأسعار ونعطيك أرخص تذكرة باليوم والساعة.
        </p>
      </header>

      <main className="container mx-auto px-4 max-w-4xl bg-white p-8 rounded-xl shadow-lg border border-slate-200">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">ابحث عن أفضل العروض:</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="origin" className="block text-lg font-medium text-slate-700 mb-2">
                مدينة الإقلاع:
              </label>
              <input
                type="text"
                id="origin"
                placeholder="مثال: الكويت، دبي، القاهرة"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="destination" className="block text-lg font-medium text-slate-700 mb-2">
                مدينة الوصول:
              </label>
              <input
                type="text"
                id="destination"
                placeholder="مثال: لندن، بانكوك، الرياض"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="departureDate" className="block text-lg font-medium text-slate-700 mb-2">
                  تاريخ الذهاب:
                </label>
                <input
                  type="date"
                  id="departureDate"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="returnDate" className="block text-lg font-medium text-slate-700 mb-2">
                  تاريخ العودة (اختياري):
                </label>
                <input
                  type="date"
                  id="returnDate"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20">
              ابحث عن العروض!
            </button>
          </form>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">أفضل العروض المتاحة:</h2>
          <div className="bg-slate-100 p-6 rounded-lg text-slate-700 text-center">
            <p className="text-lg">سيتم عرض نتائج البحث هنا.</p>
            <p className="text-sm text-slate-500 mt-2">جاري تطوير محرك البحث عن العروض الذكي...</p>
          </div>
        </section>
      </main>
    </div>
  );
}
