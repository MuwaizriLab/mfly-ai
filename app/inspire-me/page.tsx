import React from 'react';

export default function InspireMePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-8" dir="rtl">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-4">
          ألهمني 🌍
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          محتار وين تروح؟ دع الذكاء الاصطناعي يقترح عليك وجهات سفر تناسب مزاجك وميزانيتك.
        </p>
      </header>

      <main className="container mx-auto px-4 max-w-4xl bg-white p-8 rounded-xl shadow-lg border border-slate-200">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">اخبرني عن تفضيلاتك:</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="mood" className="block text-lg font-medium text-slate-700 mb-2">
                المزاج العام للرحلة:
              </label>
              <select
                id="mood"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">اختر مزاجاً...</option>
                <option value="استرخاء">استرخاء وهدوء</option>
                <option value="مغامرة">مغامرة واكتشاف</option>
                <option value="ثقافة">ثقافة وتاريخ</option>
                <option value="تسوق">تسوق ومتعة</option>
                <option value="شاطئ">شاطئ وبحر</option>
                <option value="جبال">جبال وطبيعة</option>
              </select>
            </div>

            <div>
              <label htmlFor="budget" className="block text-lg font-medium text-slate-700 mb-2">
                الميزانية المتوقعة:
              </label>
              <select
                id="budget"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">اختر ميزانية...</option>
                <option value="منخفضة">منخفضة (أقل من 500 دينار)</option>
                <option value="متوسطة">متوسطة (500 - 1500 دينار)</option>
                <option value="عالية">عالية (أكثر من 1500 دينار)</option>
              </select>
            </div>

            <div>
              <label htmlFor="companions" className="block text-lg font-medium text-slate-700 mb-2">
                مع من تسافر؟
              </label>
              <select
                id="companions"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">اختر رفقاء السفر...</option>
                <option value="منفرد">بمفردي</option>
                <option value="عائلة">مع العائلة</option>
                <option value="أصدقاء">مع الأصدقاء</option>
                <option value="عشاق">مع شريك الحياة</option>
              </select>
            </div>

            <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20">
              ألهمني بوجهة سفر!
            </button>
          </form>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">اقتراحاتنا لك:</h2>
          <div className="bg-slate-100 p-6 rounded-lg text-slate-700 text-center">
            <p className="text-lg">سيتم عرض اقتراحات الوجهات هنا بعد إدخال تفضيلاتك.</p>
            <p className="text-sm text-slate-500 mt-2">جاري تطوير محرك الاقتراحات الذكي...</p>
          </div>
        </section>
      </main>
    </div>
  );
}
