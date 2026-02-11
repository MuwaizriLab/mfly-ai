import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Header from '@/components/Header';

// بيانات التحديات اليومية
const dailyChallenges = [
  {
    id: 1,
    question: "أي مطار يعتبر الأكثر ازدحاماً في العالم من حيث حركة الركاب؟",
    options: [
      "مطار هارتسفيلد-جاكسون أتلانتا (الولايات المتحدة)",
      "مطار دبي الدولي (الإمارات)",
      "مطار بكين العاصمة (الصين)",
      "مطار هيثرو لندن (بريطانيا)"
    ],
    correctAnswer: 0,
    points: 10,
    hint: "هذا المطار يحتفظ بالصدارة منذ سنوات."
  },
  {
    id: 2,
    question: "ما هي الدولة التي لا تحتاج مواطن الكويت إلى فيزا لزيارتها؟",
    options: [
      "أمريكا",
      "بريطانيا",
      "تركيا",
      "أستراليا"
    ],
    correctAnswer: 2,
    points: 8,
    hint: "تقع بين أوروبا وآسيا."
  },
  {
    id: 3,
    question: "ما هو الوزن المسموح للأمتعة في درجة رجال الأعمال في الخطوط الكويتية؟",
    options: [
      "30 كغ",
      "40 كغ",
      "60 كغ",
      "80 كغ"
    ],
    correctAnswer: 2,
    points: 12,
    hint: "ضعف الوزن المسموح في الدرجة الاقتصادية."
  }
];

export default function DailyChallengePage() {
  const t = useTranslations('DailyChallengePage');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [todayChallenge] = useState(dailyChallenges[0]); // اليوم نعطي التحدي الأول

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setSubmitted(true);
    if (selectedOption === todayChallenge.correctAnswer) {
      setScore(todayChallenge.points);
    }
  };

  const resetChallenge = () => {
    setSelectedOption(null);
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-blue-50 text-slate-900 font-sans" dir="rtl">
      <Header />

      <main className="container mx-auto px-4 max-w-4xl py-12">
        <header className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-amber-600 mb-4">
            🧠 تحدي السفر اليومي
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            اختبر معلوماتك في السفر والطيران واكتسب نقاطاً تصعد بها في لوحة المتصدرين!
          </p>
          <div className="mt-6 inline-flex items-center bg-white px-6 py-3 rounded-full shadow-md">
            <span className="text-lg font-bold text-slate-700">نقاطك الحالية:</span>
            <span className="mr-3 text-3xl font-black text-amber-600">{score}</span>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </header>

        <section className="bg-white p-8 rounded-3xl shadow-2xl border border-amber-200">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-800">تحدي اليوم</h2>
              <p className="text-slate-500">#{todayChallenge.id} • {todayChallenge.points} نقطة</p>
            </div>
            <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-bold">
              ⏳ ينتهي بعد 22 ساعة
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-slate-800 mb-6 leading-relaxed">
              {todayChallenge.question}
            </h3>
            <div className="space-y-4">
              {todayChallenge.options.map((option, idx) => (
                <div
                  key={idx}
                  onClick={() => !submitted && setSelectedOption(idx)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    selectedOption === idx
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-blue-300 hover:bg-blue-25'
                  } ${submitted && idx === todayChallenge.correctAnswer ? 'border-green-500 bg-green-50' : ''}
                  ${submitted && selectedOption === idx && idx !== todayChallenge.correctAnswer ? 'border-red-500 bg-red-50' : ''}`}
                >
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                      selectedOption === idx ? 'bg-blue-600 text-white' : 'bg-slate-200'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="text-lg">{option}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className={`w-full py-4 rounded-xl font-bold text-xl transition-all ${
                selectedOption === null
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              ✅ تأكيد الإجابة
            </button>
          ) : (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                {selectedOption === todayChallenge.correctAnswer ? '🎉 أحسنت! إجابة صحيحة' : '❌ للأسف إجابة خاطئة'}
              </h3>
              <p className="text-lg text-slate-700 mb-4">
                {selectedOption === todayChallenge.correctAnswer
                  ? `ربحت ${todayChallenge.points} نقطة! استمر في تحديات الغد لتصعد في الترتيب.`
                  : `الإجابة الصحيحة هي: "${todayChallenge.options[todayChallenge.correctAnswer]}".`}
              </p>
              <div className="flex items-center text-slate-600 mb-6">
                <span className="ml-2">💡 تلميح:</span>
                <span>{todayChallenge.hint}</span>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={resetChallenge}
                  className="px-6 py-3 bg-slate-200 text-slate-800 rounded-lg font-bold hover:bg-slate-300 transition"
                >
                  ↻ حاول مرة أخرى
                </button>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition">
                  📊 شاهد لوحة المتصدرين
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-bold hover:from-purple-600 hover:to-pink-600 transition">
                  ➡️ التحدي التالي
                </button>
              </div>
            </div>
          )}
        </section>

        <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-200">
            <h3 className="text-xl font-bold text-blue-700 mb-3">🏆 لوحة المتصدرين</h3>
            <ul className="space-y-3">
              {['أحمد العلي', 'سارة الحربي', 'خالد الشمري', 'فاطمة العوضي', 'أنت'].map((name, idx) => (
                <li key={idx} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="font-medium">{name}</span>
                  <span className="font-bold text-amber-600">{[120, 95, 80, 65, score][idx]} نقطة</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-green-200">
            <h3 className="text-xl font-bold text-green-700 mb-3">📅 التحديات القادمة</h3>
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <span>غداً: أسئلة عن المطارات</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">15 نقطة</span>
              </li>
              <li className="flex justify-between items-center">
                <span>بعد غد: فيزا أوروبا</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">12 نقطة</span>
              </li>
              <li className="flex justify-between items-center">
                <span>الجمعة: وزن الأمتعة</span>
                <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">20 نقطة</span>
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-200">
            <h3 className="text-xl font-bold text-purple-700 mb-3">🎁 مكافآت النقاط</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center ml-3">50</div>
                <span>خريطة مطار مخصصة</span>
              </li>
              <li className="flex items-center">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center ml-3">100</div>
                <span>تقرير فيزا مفصل</span>
              </li>
              <li className="flex items-center">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center ml-3">200</div>
                <span>دردشة مع موظف أرضي</span>
              </li>
            </ul>
          </div>
        </section>

        <footer className="mt-16 text-center text-slate-500">
          <p>🔥 تحديث يومي في الساعة 00:00 توقيت الكويت. كن مستعداً!</p>
          <p className="text-sm mt-2">شارك التحدي مع أصدقائك وتنافسوا على المركز الأول!</p>
        </footer>
      </main>
    </div>
  );
}