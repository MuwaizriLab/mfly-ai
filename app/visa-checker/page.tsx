import React from 'react';

export default function VisaCheckerPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-8" dir="rtl">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-4">
          فاحص الفيزا 🛂
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          صور الجواز واعرف المطلوب فوراً بدون تعقيد السيستم. متطلبات التأشيرة لجميع الوجهات.
        </p>
      </header>

      <main className="container mx-auto px-4 max-w-4xl bg-white p-8 rounded-xl shadow-lg border border-slate-200">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">اختر وجهتك:</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="nationality" className="block text-lg font-medium text-slate-700 mb-2">
                جنسيتك:
              </label>
              <select
                id="nationality"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">اختر الجنسية...</option>
                <option value="KW">الكويت</option>
                <option value="SA">السعودية</option>
                <option value="AE">الإمارات</option>
                <option value="QA">قطر</option>
                <option value="BH">البحرين</option>
                <option value="OM">عُمان</option>
                <option value="US">الولايات المتحدة</option>
                <option value="GB">المملكة المتحدة</option>
                <option value="DE">ألمانيا</option>
              </select>
            </div>

            <div>
              <label htmlFor="destinationCountry" className="block text-lg font-medium text-slate-700 mb-2">
                بلد الوجهة:
              </label>
              <input
                type="text"
                id="destinationCountry"
                placeholder="مثال: تايلاند، فرنسا، كندا"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20">
              افحص متطلبات الفيزا!
            </button>
          </form>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">متطلبات التأشيرة:</h2>
          <div className="bg-slate-100 p-6 rounded-lg text-slate-700 min-h-[100px]">
            <p className="text-lg">سيتم عرض المتطلبات هنا.</p>
            <p className="text-sm text-slate-500 mt-2">جاري تطوير محرك فحص الفيزا الذكي...</p>
          </div>
        </section>
      </main>
    </div>
  );
}
