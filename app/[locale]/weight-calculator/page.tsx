import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Header from '@/components/Header';
import { supabase } from '@/lib/supabase';
import { WeightPolicy, CalculationResult, LocalWeightPolicy } from '@/types/weight';
import localWeightPolicies from '@/data/weight-policies.json';

export default function WeightCalculatorPage() {
  const t = useTranslations('WeightCalculatorPage');
  const [airline, setAirline] = useState('');
  const [ticketClass, setTicketClass] = useState('');
  const [totalWeight, setTotalWeight] = useState<number>(0);
  const [results, setResults] = useState<CalculationResult[]>([]);
  const [policies, setPolicies] = useState<WeightPolicy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // جلب بيانات سياسات الوزن من Supabase مع fallback إلى البيانات المحلية
  useEffect(() => {
    const fetchWeightPolicies = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('weight_policies')
          .select('*')
          .order('airline');

        if (error) {
          console.warn('Failed to fetch from Supabase, using local data:', error.message);
          // استخدام البيانات المحلية كخيار احتياطي
          const localPolicies: WeightPolicy[] = (localWeightPolicies as LocalWeightPolicy[]).map(policy => ({
            airline: policy.airline,
            economy_allowed: policy.economy.allowed,
            economy_extra_per_kg: policy.economy.extraPerKg,
            business_allowed: policy.business.allowed,
            business_extra_per_kg: policy.business.extraPerKg,
            first_allowed: policy.first.allowed,
            first_extra_per_kg: policy.first.extraPerKg
          }));
          setPolicies(localPolicies);
          setError('⚠️ متصل بالبيانات المحلية (Supabase غير متوفر)');
        } else if (data) {
          setPolicies(data);
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching weight policies:', err);
        // استخدام البيانات المحلية كخيار احتياطي
        const localPolicies: WeightPolicy[] = (localWeightPolicies as LocalWeightPolicy[]).map(policy => ({
          airline: policy.airline,
          economy_allowed: policy.economy.allowed,
          economy_extra_per_kg: policy.economy.extraPerKg,
          business_allowed: policy.business.allowed,
          business_extra_per_kg: policy.business.extraPerKg,
          first_allowed: policy.first.allowed,
          first_extra_per_kg: policy.first.extraPerKg
        }));
        setPolicies(localPolicies);
        setError('⚠️ متصل بالبيانات المحلية (خطأ في الاتصال)');
      } finally {
        setLoading(false);
      }
    };

    fetchWeightPolicies();
  }, []);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!airline || !ticketClass || totalWeight <= 0 || policies.length === 0) return;

    // تصفية السياسات حسب الخطوط الجوية المختارة
    const filtered = airline === 'all' 
      ? policies 
      : policies.filter(policy => policy.airline === airline);

    const calculated = filtered.map((policy) => {
      // تحديد الفئة المختارة وحساب القيم المناسبة
      let allowed = 0;
      let extraPerKg = 0;

      if (ticketClass === 'economy') {
        allowed = policy.economy_allowed;
        extraPerKg = policy.economy_extra_per_kg;
      } else if (ticketClass === 'business') {
        allowed = policy.business_allowed;
        extraPerKg = policy.business_extra_per_kg;
      } else if (ticketClass === 'first') {
        allowed = policy.first_allowed;
        extraPerKg = policy.first_extra_per_kg;
      }

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

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            ⚠️ {error}
          </div>
        )}

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
                disabled={loading}
              >
                <option value="">اختر الخطوط</option>
                <option value="all">جميع الخطوط (مقارنة)</option>
                {policies.map((policy) => (
                  <option key={policy.airline} value={policy.airline}>
                    {policy.airline}
                  </option>
                ))}
              </select>
              {loading && (
                <p className="text-sm text-slate-500 mt-1">جاري تحميل قائمة الخطوط الجوية...</p>
              )}
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
                disabled={loading}
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
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 disabled:bg-slate-400 disabled:cursor-not-allowed"
              disabled={loading || policies.length === 0}
            >
              {loading ? 'جاري التحميل...' : t('calculateFeesButton')}
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
              {loading ? (
                <p className="text-lg">جاري تحميل بيانات سياسات الوزن...</p>
              ) : policies.length === 0 ? (
                <p className="text-lg">لا توجد بيانات سياسات وزن متاحة حالياً.</p>
              ) : (
                <>
                  <p className="text-lg">{t('resultsText')}</p>
                  <p className="text-sm text-slate-500 mt-2">
                    ✅ متصل بقاعدة البيانات | ✅ {policies.length} سياسة وزن جاهزة
                  </p>
                </>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}