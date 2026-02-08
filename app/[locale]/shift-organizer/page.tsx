import React from 'react';
import { useTranslations } from 'next-intl';
import Header from '@/components/Header'; // Import the new Header component

export default function ShiftOrganizerPage() {
  const t = useTranslations('ShiftOrganizerPage');

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
          <h2 className="text-2xl font-bold text-slate-800 mb-4">{t('weeklySchedule')}</h2>
          <div className="bg-slate-100 p-6 rounded-lg text-slate-700 text-center">
            <p className="text-lg">{t('weeklyScheduleText')}</p>
            <p className="text-sm text-slate-500 mt-2">{t('featureDeveloping')}</p>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">{t('leaveManagement')}</h2>
            <div className="bg-slate-100 p-6 rounded-lg text-slate-700 text-center">
              <p className="text-lg">{t('leaveManagementText')}</p>
              <p className="text-sm text-slate-500 mt-2">{t('featureDeveloping')}</p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">{t('coworkerCoordination')}</h2>
            <div className="bg-slate-100 p-6 rounded-lg text-slate-700 text-center">
              <p className="text-lg">{t('coworkerCoordinationText')}</p>
              <p className="text-sm text-slate-500 mt-2">{t('featureDeveloping')}</p>
            </div>
          </div>
        </section>

        <section className="text-center">
          <p className="text-slate-500 italic">
            {t('pageNote')}
          </p>
        </section>
      </main>
    </div>
  );
}