import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Header from '@/components/Header'; // Import the new Header component
import weightPolicies from '@/data/weight-policies.json';
import { WeightPolicy, CalculationResult } from '@/types/weight';

export default function WeightCalculatorPage() {
  const t = useTranslations('WeightCalculatorPage');
  const [airline, setAirline] = useState('');
  const [ticketClass, setTicketClass] = useState('');
  const [totalWeight, setTotalWeight] = useState<number>(0);
  const [results, setResults] = useState<CalculationResult[]>([]);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!airline || !ticketClass || totalWeight <= 0) return;

    const filtered = weightPolicies.filter(
      (policy: WeightPolicy) =>
        airline === 'all' || policy.airline === airline
    );

    const calculated = filtered.map((policy) => {
      const allowed = policy[ticketClass as keyof WeightPolicy]?.allowed || 0;
      const extraPerKg = policy[ticketClass as keyof WeightPolicy]?.extraPerKg || 0;
      const extraWeight = Math.max(0, totalWeight - allowed);
      const extraCharge = extraWeight * extraPerKg;
      const totalCharge = extraCharge;

      return {
        airline: policy.airline,
        allowedWeight: allowed,
        extraWeight,
        extraCharge,
        totalCharge,
      };
    });

    setResults(calculated);
  };

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
          <h2 className="text-2xl font-bold text-slate-800 mb-4">{t('baggageDetailsTitle')}</h2>
          <form className="space-y-6" onSubmit={handleCalculate}>
            <div>
              <label htmlFor="airline" className="block text-lg font-medium text-slate-700 mb-2">
                الخطوط الجوية
              </label>
              <select
                id="airline"
                value={airline}
                onChange={(e) => setAirline(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">اختر الخطوط</option>
                <option value="all">جميع الخطوط (مقارنة)</option>
                {weightPolicies.map((policy) => (
                  <option key={policy.airline} value={policy.airline}>
                    {policy.airline}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="ticketClass" className="block text-lg font-medium text-slate-700 mb-2">
                {t('ticketClassLabel')}
              </label>
              <select
                id="ticketClass"
                value={ticketClass}
                onChange={(e) => setTicketClass(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">{t('selectTicketClass')}</option>
                <option value="economy">{t('economy')}</option>
                <option value="business">{t('business')}</option>
                <option value="first">{t('firstClass')}</option>
              </select>
            </div>

            <div>
              <label htmlFor="totalWeight" className="block text-lg font-medium text-slate-700 mb-2">
                {t('totalWeightLabel')} (كيلوغرام)
              </label>
              <input
                type="number"
                id="totalWeight"
                min="0"
                value={totalWeight}
                onChange={(e) => setTotalWeight(Number(e.target.value))}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20"
            >
              {t('calculateFeesButton')}
            </button>
          </form>
        </section>

        {results.length > 0 ? (
          <section className="mt-12 p-6 bg-gradient-to-r from-amber-50 to-blue-50 rounded-2xl border border-amber-200">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">نتائج الحساب</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border border-slate-300 p-3 text-right">الخطوط</th>
                    <th className="border border-slate-300 p-3 text-right">الوزن المسموح (كغ)</th>
                    <th className="border border-slate-300 p-3 text-right">الوزن الزائد (كغ)</th>
                    <th className="border border-slate-300 p-3 text-right">الرسوم الزائدة (د.ك)</th>
                    <th className="border border-slate-300 p-3 text-right">إجمالي الرسوم (د.ك)</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((res, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="border border-slate-300 p-3 font-bold">{res.airline}</td>
                      <td className="border border-slate-300 p-3">{res.allowedWeight}</td>
                      <td className={`border border-slate-300 p-3 ${res.extraWeight > 0 ? 'text-red-600 font-bold' : 'text-green-600'}`}>
                        {res.extraWeight}
                      </td>
                      <td className="border border-slate-300 p-3">{res.extraCharge.toFixed(2)}</td>
                      <td className="border border-slate-300 p-3 font-bold">{res.totalCharge.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-500 mt-4">* الأسعار بالدينار الكويتي، قد تختلف حسب المسار والتوقيت.</p>
          </section>
        ) : (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">{t('resultsTitle')}</h2>
            <div className="bg-slate-100 p-6 rounded-lg text-slate-700 min-h-[100px]">
              <p className="text-lg">{t('resultsText')}</p>
              <p className="text-sm text-slate-500 mt-2">{t('resultsDeveloping')}</p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
