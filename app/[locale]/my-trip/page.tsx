import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { useTranslations } from 'next-intl';

interface Trip {
  id: string;
  destination: string;
  date: string;
  airline: string;
  weightAllowed: number;
  visaRequired: boolean;
}

export default function MyTripPage() {
  const t = useTranslations('MyTripPage');
  const [trips, setTrips] = useState<Trip[]>([]);
  const [points, setPoints] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  useEffect(() => {
    // جلب البيانات من localStorage (مؤقت)
    const savedTrips = localStorage.getItem('mfly_trips');
    const savedPoints = localStorage.getItem('mfly_points');
    const savedChallenges = localStorage.getItem('mfly_challenges');

    if (savedTrips) setTrips(JSON.parse(savedTrips));
    if (savedPoints) setPoints(Number(savedPoints));
    if (savedChallenges) setChallengesCompleted(Number(savedChallenges));
  }, []);

  const addMockTrip = () => {
    const newTrip: Trip = {
      id: Date.now().toString(),
      destination: 'تركيا (TR)',
      date: '2026-03-15',
      airline: 'Kuwait Airways',
      weightAllowed: 60,
      visaRequired: false,
    };
    const updatedTrips = [...trips, newTrip];
    setTrips(updatedTrips);
    localStorage.setItem('mfly_trips', JSON.stringify(updatedTrips));
  };

  const addPoints = (amount: number) => {
    const newPoints = points + amount;
    setPoints(newPoints);
    localStorage.setItem('mfly_points', newPoints.toString());
  };

  const completeChallenge = () => {
    const newCount = challengesCompleted + 1;
    setChallengesCompleted(newCount);
    localStorage.setItem('mfly_challenges', newCount.toString());
    addPoints(10);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-900 font-sans" dir="rtl">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800 mb-4">
            🧳 رحلتي
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            تابع خطط سفرك، نقاطك، وإنجازاتك في منصة mfly.ai
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-blue-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-blue-700">🏆 نقاطي</h2>
              <div className="text-4xl font-black text-amber-600">{points}</div>
            </div>
            <p className="text-slate-600 mb-6">النقاط التي ربحتها من التحديات والمشاركة.</p>
            <div className="space-y-3">
              <button
                onClick={() => addPoints(10)}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold hover:scale-[1.02] transition"
              >
                +10 نقطة (مكافأة)
              </button>
              <button
                onClick={() => addPoints(50)}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold hover:scale-[1.02] transition"
              >
                +50 نقطة (مشاركة)
              </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl border border-green-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-green-700">✅ التحديات المكتملة</h2>
              <div className="text-4xl font-black text-green-600">{challengesCompleted}</div>
            </div>
            <p className="text-slate-600 mb-6">عدد التحديات اليومية التي أنهيتها بنجاح.</p>
            <button
              onClick={completeChallenge}
              className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold hover:scale-[1.02] transition"
            >
              إكمال تحدي جديد
            </button>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl border border-purple-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-purple-700">📅 الرحلات القادمة</h2>
              <div className="text-4xl font-black text-purple-600">{trips.length}</div>
            </div>
            <p className="text-slate-600 mb-6">عدد رحلاتك المخطط لها.</p>
            <button
              onClick={addMockTrip}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:scale-[1.02] transition"
            >
              + إضافة رحلة تجريبية
            </button>
          </div>
        </section>

        <section className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200 mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-6">✈️ رحلاتي</h2>
          {trips.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-300 p-4 text-right">الوجهة</th>
                    <th className="border border-slate-300 p-4 text-right">التاريخ</th>
                    <th className="border border-slate-300 p-4 text-right">الخطوط</th>
                    <th className="border border-slate-300 p-4 text-right">الوزن المسموح</th>
                    <th className="border border-slate-300 p-4 text-right">الفيزا</th>
                    <th className="border border-slate-300 p-4 text-right">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {trips.map((trip) => (
                    <tr key={trip.id} className="hover:bg-slate-50">
                      <td className="border border-slate-300 p-4 font-bold">{trip.destination}</td>
                      <td className="border border-slate-300 p-4">{trip.date}</td>
                      <td className="border border-slate-300 p-4">{trip.airline}</td>
                      <td className="border border-slate-300 p-4">{trip.weightAllowed} كغ</td>
                      <td className="border border-slate-300 p-4">
                        <span className={`px-3 py-1 rounded-full ${trip.visaRequired ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                          {trip.visaRequired ? 'مطلوبة' : 'غير مطلوبة'}
                        </span>
                      </td>
                      <td className="border border-slate-300 p-4">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                          عرض التفاصيل
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-slate-500">لا توجد رحلات مسجلة بعد.</p>
              <button
                onClick={addMockTrip}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold hover:scale-[1.05] transition"
              >
                + إضافة رحلة تجريبية
              </button>
            </div>
          )}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-3xl border border-blue-300">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">📈 تقدمي هذا الشهر</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>التحديات المكتملة</span>
                <span className="font-bold">{challengesCompleted} / 30</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-4">
                <div className="bg-green-500 h-4 rounded-full" style={{ width: `${(challengesCompleted / 30) * 100}%` }}></div>
              </div>
              <div className="flex justify-between">
                <span>النقاط المجمعة</span>
                <span className="font-bold">{points} / 1000</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-4">
                <div className="bg-amber-500 h-4 rounded-full" style={{ width: `${(points / 1000) * 100}%` }}></div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-3xl border border-amber-300">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">🎯 الأهداف القادمة</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center ml-3">50</div>
                <span>وصل إلى 50 نقطة لتربح خريطة مطار مخصصة</span>
              </li>
              <li className="flex items-center">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center ml-3">10</div>
                <span>أكمل 10 تحديات يومية لترقى لمستوى "خبير السفر"</span>
              </li>
              <li className="flex items-center">
                <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center ml-3">5</div>
                <span>أضف 5 رحلات قادمة لتفعيل التنبيهات الذكية</span>
              </li>
            </ul>
          </div>
        </section>

        <footer className="mt-16 text-center text-slate-500">
          <p>🔒 البيانات مخزنة محلياً على جهازك. لربطها مع السحابة (Supabase)، سنقوم بذلك قريباً.</p>
          <p className="text-sm mt-2">شارك لوحة رحلتك مع أصدقائك وتنافسوا!</p>
        </footer>
      </main>
    </div>
  );
}