import React from 'react';

export default function ShiftOrganizerPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-8" dir="rtl">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-4">
          منظم الشفتات 🗓️
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          نظم جدول دوامك، تابع إجازاتك، ونسق مع زملائك بكل سهولة وذكاء.
        </p>
      </header>

      <main className="container mx-auto px-4 max-w-4xl bg-white p-8 rounded-xl shadow-lg border border-slate-200">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">الجدول الأسبوعي</h2>
          <div className="bg-slate-100 p-6 rounded-lg text-slate-700 text-center">
            <p className="text-lg">هنا سيتم عرض جدول شفتاتك الأسبوعي.</p>
            <p className="text-sm text-slate-500 mt-2">جاري تطوير هذه الميزة...</p>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">إدارة الإجازات</h2>
            <div className="bg-slate-100 p-6 rounded-lg text-slate-700 text-center">
              <p className="text-lg">اطلب إجازة أو راجع رصيدك.</p>
              <p className="text-sm text-slate-500 mt-2">جاري تطوير هذه الميزة...</p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">تنسيق مع الزملاء</h2>
            <div className="bg-slate-100 p-6 rounded-lg text-slate-700 text-center">
              <p className="text-lg">تبادل الشفتات أو تواصل مع فريقك.</p>
              <p className="text-sm text-slate-500 mt-2">جاري تطوير هذه الميزة...</p>
            </div>
          </div>
        </section>

        <section className="text-center">
          <p className="text-slate-500 italic">
            هذه الصفحة هي بداية لخدمة متكاملة. ترقبوا المزيد من الميزات قريباً!
          </p>
        </section>
      </main>
    </div>
  );
}
