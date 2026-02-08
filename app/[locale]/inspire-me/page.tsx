import React from 'react';
import { useTranslations } from 'next-intl';
import Header from '@/components/Header'; // Import the new Header component

export default function InspireMePage() {
  const t = useTranslations('InspireMePage');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-8" dir="rtl">
      <Header />

      <main className="container mx-auto px-4 max-w-4xl bg-white p-8 rounded-xl shadow-lg border border-slate-200 mt-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-4">
            {t('title')}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </header>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">{t('preferencesTitle')}</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="mood" className="block text-lg font-medium text-slate-700 mb-2">
                {t('moodLabel')}
              </label>
              <select
                id="mood"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">{t('selectCompanions')}</option>
                <option value="منفرد">{t('solo')}</option>
                <option value="عائلة">{t('family')}</option>
                <option value="أصدقاء">{t('friends')}</option>
                <option value="عشاق">{t('couple')}</option>
              </select>
            </div>

            <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20">
              {t('inspireMeButton')}
            </button>
          </form>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">{t('suggestionsTitle')}</h2>
          <div className="bg-slate-100 p-6 rounded-lg text-slate-700 text-center">
            <p className="text-lg">{t('suggestionsText')}</p>
            <p className="text-sm text-slate-500 mt-2">{t('suggestionsDeveloping')}</p>
          </div>
        </section>
      </main>
    </div>
  );
}