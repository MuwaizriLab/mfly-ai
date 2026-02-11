import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Header from '@/components/Header';
import { VisaRule } from '@/types/visa';

export default function VisaCheckerPage() {
  const t = useTranslations('VisaCheckerPage');
  const [nationality, setNationality] = useState('');
  const [destination, setDestination] = useState('');
  const [result, setResult] = useState<VisaRule | null>(null);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nationality || !destination) return;

    try {
      const res = await fetch(
        `https://nbumeglrzwwhtjwdkdya.supabase.co/rest/v1/visa_rules?nationality=eq.${nationality}&destination_country=eq.${destination.toUpperCase()}`,
        {
          headers: {
            apikey: 'sb_publishable_N0C35kKr_aif8GFlzLDa2g_PtujIK4M',
            Authorization: 'Bearer sb_publishable_N0C35kKr_aif8GFlzLDa2g_PtujIK4M',
          },
        }
      );
      const data = await res.json();
      if (data && data.length > 0) {
        const rule = data[0];
        setResult({
          nationality: rule.nationality,
          destination: rule.destination_country,
          visaRequired: rule.visa_required,
          duration: rule.duration || 'غير محدد',
          notes: rule.notes,
          updatedAt: rule.created_at?.split('T')[0] || '2026-02-11',
        });
      } else {
        setResult(null); // لا يوجد نتيجة
      }
    } catch (err) {
      console.error('فشل جلب البيانات:', err);
      // Fallback إلى البيانات المحلية
      const fallbackData = [
        { nationality: 'KW', destination: 'TR', visaRequired: false, duration: '90 يوم', notes: 'دخول بدون فيزا لمدة 90 يوم خلال 180 يوم.', updatedAt: '2026-02-01' },
        { nationality: 'KW', destination: 'US', visaRequired: true, duration: '10 سنوات', notes: 'فيزا B1/B2، مقابلة في السفارة مطلوبة.', updatedAt: '2026-01-15' },
        { nationality: 'KW', destination: 'GB', visaRequired: false, duration: '6 أشهر', notes: 'دخول كزائر بدون فيزا.', updatedAt: '2026-02-10' },
      ];
      const found = fallbackData.find(
        rule => rule.nationality === nationality && rule.destination === destination.toUpperCase()
      );
      setResult(found || null);
    }
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
          <h2 className="text-2xl font-bold text-slate-800 mb-4">{t('destinationSelectionTitle')}</h2>
          <form className="space-y-6" onSubmit={handleCheck}>
            <div>
              <label htmlFor="nationality" className="block text-lg font-medium text-slate-700 mb-2">
                {t('nationalityLabel')}
              </label>
              <select
                id="nationality"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
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
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder={t('destinationCountryPlaceholder')}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <p className="text-sm text-slate-500 mt-1">أدخل رمز البلد (مثال: TR لتركيا، US لأمريكا، GB لبريطانيا)</p>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20"
            >
              {t('checkVisaButton')}
            </button>
          </form>
        </section>

        {result ? (
          <section className="mt-12 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-200">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">نتيجة الفحص</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">الجنسية:</span>
                <span className="text-xl font-bold text-blue-700">{t(result.nationality.toLowerCase()) || result.nationality}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">بلد الوجهة:</span>
                <span className="text-xl font-bold text-blue-700">{result.destination}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">هل تحتاج فيزا؟</span>
                <span className={`text-xl font-bold ${result.visaRequired ? 'text-red-600' : 'text-green-600'}`}>
                  {result.visaRequired ? 'نعم' : 'لا'}
                </span>
              </div>
              {!result.visaRequired && (
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">المدة المسموحة:</span>
                  <span className="text-xl font-bold text-green-700">{result.duration}</span>
                </div>
              )}
              <div className="mt-4 p-4 bg-white rounded-lg border">
                <span className="text-lg font-semibold block mb-2">التفاصيل:</span>
                <p className="text-slate-700">{result.notes}</p>
              </div>
              <p className="text-sm text-slate-500 mt-2">آخر تحديث: {result.updatedAt}</p>
            </div>
          </section>
        ) : (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">{t('requirementsTitle')}</h2>
            <div className="bg-slate-100 p-6 rounded-lg text-slate-700 min-h-[100px]">
              <p className="text-lg">{t('requirementsText')}</p>
              <p className="text-sm text-slate-500 mt-2">{t('requirementsDeveloping')}</p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}