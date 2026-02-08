import React from 'react';
import { useTranslations } from 'next-intl';
import Header from '@/components/Header'; // Import the new Header component

export default function AirportTranslatorPage() {
  const t = useTranslations('AirportTranslatorPage');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans" dir="rtl">
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
          <h2 className="text-2xl font-bold text-slate-800 mb-4">{t('translationTitle')}</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="sourceLanguage" className="block text-lg font-medium text-slate-700 mb-2">
                {t('sourceLanguageLabel')}
              </label>
              <select
                id="sourceLanguage"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="ar">{t('arabic')}</option>
                <option value="en">{t('english')}</option>
                <option value="es">{t('spanish')}</option>
                <option value="fr">{t('french')}</option>
                <option value="de">{t('german')}</option>
                <option value="zh">{t('chinese')}</option>
              </select>
            </div>
            <div>
              <label htmlFor="targetLanguage" className="block text-lg font-medium text-slate-700 mb-2">
                {t('targetLanguageLabel')}
              </label>
              <select
                id="targetLanguage"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="en">{t('english')}</option>
                <option value="ar">{t('arabic')}</option>
                <option value="es">{t('spanish')}</option>
                <option value="fr">{t('french')}</option>
                <option value="de">{t('german')}</option>
                <option value="zh">{t('chinese')}</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="inputText" className="block text-lg font-medium text-slate-700 mb-2">
              {t('inputTextLabel')}
            </label>
            <textarea
              id="inputText"
              rows={4}
              placeholder={t('inputTextPlaceholder')}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20">
              {t('translateButton')}
          </button>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">{t('translationResultTitle')}</h2>
          <div className="bg-slate-100 p-6 rounded-lg text-slate-700 min-h-[100px]">
            <p className="text-lg">{t('translationResultText')}</p>
            <p className="text-sm text-slate-500 mt-2">{t('translationDeveloping')}</p>
          </div>
        </section>
      </main>
    </div>
  );
}
