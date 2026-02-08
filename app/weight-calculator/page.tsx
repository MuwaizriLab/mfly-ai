import React from 'react';

export default function WeightCalculatorPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-8" dir="rtl">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-4">
          حاسبة الوزن ⚖️
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          احسب الغرامات بدقة لكل الدرجات والعملات، وريح راسك من الجدال.
        </p>
      </header>

      <main className="container mx-auto px-4 max-w-4xl bg-white p-8 rounded-xl shadow-lg border border-slate-200">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">أدخل تفاصيل الأمتعة:</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="ticketClass" className="block text-lg font-medium text-slate-700 mb-2">
                درجة التذكرة:
              </label>
              <select
                id="ticketClass"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">اختر درجة التذكرة...</option>
                <option value="economy">سياحية (Economy)</option>
                <option value="business">رجال أعمال (Business)</option>
                <option value="first">أولى (First Class)</option>
              </select>
            </div>

            <div>
              <label htmlFor="bagCount" className="block text-lg font-medium text-slate-700 mb-2">
                عدد الحقائب:
              </label>
              <input
                type="number"
                id="bagCount"
                min="1"
                defaultValue="1"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="totalWeight" className="block text-lg font-medium text-slate-700 mb-2">
                الوزن الإجمالي (كيلوجرام):
              </label>
              <input
                type="number"
                id="totalWeight"
                min="0"
                defaultValue="0"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20">
              احسب الغرامات!
            </button>
          </form>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">النتائج:</h2>
          <div className="bg-slate-100 p-6 rounded-lg text-slate-700 min-h-[100px]">
            <p className="text-lg">سيتم عرض رسوم الوزن الزائد هنا.</p>
            <p className="text-sm text-slate-500 mt-2">جاري تطوير محرك الحساب الذكي...</p>
          </div>
        </section>
      </main>
    </div>
  );
}
