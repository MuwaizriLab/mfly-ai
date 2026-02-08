import React from 'react';
import { useTranslations } from 'next-intl';
import Header from '@/components/Header'; // Import the new Header component

export default function VisaCheckerPage() {
  const t = useTranslations('VisaCheckerPage');

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
          <h2 className="text-2xl font-bold text-slate-800 mb-4">{t('destinationSelectionTitle')}</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="nationality" className="block text-lg font-medium text-slate-700 mb-2">
                {t('nationalityLabel')}
              </label>
              <select
                id="nationality"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">{t('selectNationality')}</option>
                <option value="KW">{t('kuwait')}</option>
                <option value="SA">{t('saudi')}</option>
                <option value="AE">{t('emirates')}</option>
                <option value="QA">{t('qatar')}</option>
                <option value="BH">{t('bahrain')}</option>
                <option value="OM">{t('oman')}</option>
                <option value="US">{t('usa')}</option>
                <option value="GB">{t('uk')}</option>
                <option value="DE">{t('germany')}</option>
              </select>
            </div>

            <div>
              <label htmlFor="destinationCountry" className="block text-lg font-medium text-slate-700 mb-2">
                {t('destinationCountryLabel')}
              </label>
              <input
                type="text"
                id="destinationCountry"
                placeholder={t('destinationCountryPlaceholder')}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20">
              {t('checkVisaButton')}
            </button>
          </form>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">{t('requirementsTitle')}</h2>
          <div className="bg-slate-100 p-6 rounded-lg text-slate-700 min-h-[100px]">
            <p className="text-lg">{t('requirementsText')}</p>
            <p className="text-sm text-slate-500 mt-2">{t('requirementsDeveloping')}</p>
          </div>
        </section>
      </main>
    </div>
  );
}