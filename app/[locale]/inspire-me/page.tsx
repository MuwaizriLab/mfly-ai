'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Header from '@/components/Header';

export default function InspireMePage() {
  const t = useTranslations('InspireMePage');
  const [mood, setMood] = useState('');
  const [budget, setBudget] = useState('');
  const [companions, setCompanions] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInspire = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mood || !budget || !companions) {
      setError('الرجاء اختيار جميع الخيارات.');
      return;
    }

    setLoading(true);
    setError('');
    setSuggestion('');

    try {
      const res = await fetch('/api/inspire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood, budget, companions }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'حدث خطأ في الخادم.');
      }

      setSuggestion(data.suggestion);
    } catch (err: any) {
      setError(err.message || 'تعذر الاتصال بالخادم. جرب مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 text-slate-900 font-sans" dir="rtl">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-blue-600 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-2xl border border-blue-200">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">{t('preferencesTitle')}</h2>
            <form className="space-y-6" onSubmit={handleInspire}>
              <div>
                <label htmlFor="mood" className="block text-lg font-medium text-slate-700 mb-2">
                  {t('moodLabel')}
                </label>
                <select
                  id="mood"
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">{t('selectMood')}</option>
                  <option value="استرخاء">{t('relaxation')}</option>
                  <option value="مغامرة">{t('adventure')}</option>
                  <option value="ثقافة">{t('culture')}</option>
                  <option value="تسوق">{t('shopping')}</option>
                  <option value="شاطئ">{t('beach')}</option>
                  <option value="جبال">{t('mountains')}</option>
                </select>
              </div>

              <div>
                <label htmlFor="budget" className="block text-lg font-medium text-slate-700 mb-2">
                  {t('budgetLabel')}
                </label>
                <select
                  id="budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">{t('selectBudget')}</option>
                  <option value="منخفضة">{t('lowBudget')}</option>
                  <option value="متوسطة">{t('mediumBudget')}</option>
                  <option value="عالية">{t('highBudget')}</option>
                </select>
              </div>

              <div>
                <label htmlFor="companions" className="block text-lg font-medium text-slate-700 mb-2">
                  {t('companionsLabel')}
                </label>
                <select
                  id="companions"
                  value={companions}
                  onChange={(e) => setCompanions(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">{t('selectCompanions')}</option>
                  <option value="منفرد">{t('solo')}</option>
                  <option value="عائلة">{t('family')}</option>
                  <option value="أصدقاء">{t('friends')}</option>
                  <option value="عشاق">{t('couple')}</option>
                </select>
              </div>

              {error && (
                <div className="p-4 bg-red-100 text-red-800 rounded-lg">
                  ⚠️ {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-2xl font-bold text-xl transition-all ${loading ? 'bg-slate-400' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'} text-white shadow-lg hover:shadow-xl`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-6 w-6 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    جاري توليد الاقتراح...
                  </span>
                ) : (
                  t('inspireMeButton')
                )}
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-green-200">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">💡 كيف يعمل؟</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mt-1 ml-3">1</div>
                  <span>اختر مزاجك، ميزانيتك، ورفقاء السفر.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center mt-1 ml-3">2</div>
                  <span>DeepSeek AI يحلل تفضيلاتك باستخدام قاعدة بيانات سياحية ضخمة.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center mt-1 ml-3">3</div>
                  <span>تظهر لك وجهة مخصصة مع تفاصيل دقيقة وتكاليف تقريبية.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-xl border border-amber-200">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">🎯 نصائح سريعة</h3>
              <ul className="space-y-3 text-slate-600">
                <li>• الميزانية المنخفضة: جرب دول الجوار (عُمان، البحرين).</li>
                <li>• المزاج المغامر: أنصحك بجبال الحجر أو الصحراء.</li>
                <li>• العائلة: وجهات آمنة ومرافق ترفيهية للأطفال.</li>
                <li>• شهر العسل: بحر الكاريبي أو جزر المالديف.</li>
              </ul>
            </div>
          </div>
        </section>

        {suggestion && (
          <section className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-3xl border border-green-300">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">✨ اقتراحنا الذكي لك</h2>
            <div className="prose prose-lg max-w-none text-slate-700 whitespace-pre-line">
              {suggestion}
            </div>
            <div className="mt-8 flex gap-4">
              <button
                onClick={() => navigator.clipboard.writeText(suggestion)}
                className="px-6 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-900 transition"
              >
                📋 نسخ الاقتراح
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold hover:from-blue-600 hover:to-purple-600 transition"
              >
                🔄 تجربة جديدة
              </button>
            </div>
          </section>
        )}

        {!suggestion && !loading && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">{t('suggestionsTitle')}</h2>
            <div className="bg-slate-100 p-8 rounded-2xl text-slate-700 text-center">
              <p className="text-lg">{t('suggestionsText')}</p>
              <p className="text-sm text-slate-500 mt-2">{t('suggestionsDeveloping')}</p>
            </div>
          </section>
        )}
      </main>

      <footer className="mt-16 text-center text-slate-500">
        <p>🤖 الاقتراحات تولّد باستخدام DeepSeek AI. الدقة عالية والتحديثات يومية.</p>
        <p className="text-sm mt-2">الخدمة مجانية حالياً. قد تصبح جزءاً من اشتراك Premium في المستقبل.</p>
      </footer>
    </div>
  );
}