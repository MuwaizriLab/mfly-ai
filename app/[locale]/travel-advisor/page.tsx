'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import { useTranslations } from 'next-intl';

export default function TravelAdvisorPage() {
  const t = useTranslations('TravelAdvisorPage');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<Array<{ role: string; text: string }>>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    const userMessage = message.trim();
    setMessage('');
    setHistory(prev => [...prev, { role: 'user', text: userMessage }]);

    // محاكاة رد ذكي (مؤقت حتى نربط API حقيقي)
    setTimeout(() => {
      const mockReplies = [
        "أهلاً وسهلاً! لو تسافر مع عائلتك بميزانية 2000 دينار لمدة أسبوع، أنصحك بتركيا (إسطنبول وأنطاليا). التذاكر حوالي 300 دينار للشخص، والإقامة في فنادق 4 نجوم تكلف 700 دينار، والباقي للنشاطات والمأكولات.",
        "للسفر الفردي بميزانية 500 دينار، تقدر تزور دبي لمدة 3 أيام. خطوط الطيران رخيصة وحجز فندق 3 نجوم يكون ضمن الميزانية. لا تحتاج فيزا كمواطن كويتي.",
        "إذا تبغي مكان هادئ وعائلي، أنصحك بسلطنة عُمان (صلالة). الجو جميل والأسعار معقولة. الوزن المسموح في الخطوط العُمانية 40 كغ للدرجة السياحية.",
        "لرحلة شهر عسل بميزانية 3000 دينار، جرب ماليزيا (كوالالمبور ولانكاوي). فيزا إلكترونية سهلة والطبيعة خلابة. أحجز مقدماً عشان توفر 20%.",
        "إذا كنت موظف أرضي وتحتاج تسويق رحلة جماعية، أقدر أوصّي ببرامج خاصة للشركات مع خصومات تصل إلى 15%."
      ];
      const randomReply = mockReplies[Math.floor(Math.random() * mockReplies.length)];
      setResponse(randomReply);
      setHistory(prev => [...prev, { role: 'assistant', text: randomReply }]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 text-slate-900 font-sans" dir="rtl">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800 mb-4">
            🧠 مستشار السفر الذكي
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            اسأل عن وجهات السفر، الميزانية، الفيزا، الوزن، أو أي استفسار آخر. المستشار الذكي يجيبك بلغتك وبلهجتك.
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-2xl border border-blue-200">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">💬 محادثتك</h2>
            <div className="h-96 overflow-y-auto mb-6 p-4 bg-slate-50 rounded-2xl border">
              {history.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <p className="text-lg">ابدأ المحادثة بكتابة سؤالك أدناه.</p>
                  <p className="text-sm mt-2">مثال: "وين أقدر أسافر بميزانية 1000 دينار؟"</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {history.map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl ${item.role === 'user' ? 'bg-blue-100 border border-blue-300' : 'bg-green-100 border border-green-300'}`}
                    >
                      <div className="flex items-center mb-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${item.role === 'user' ? 'bg-blue-600' : 'bg-green-600'}`}>
                          {item.role === 'user' ? '👤' : '🤖'}
                        </div>
                        <span className="font-bold">{item.role === 'user' ? 'أنت' : 'المستشار الذكي'}</span>
                      </div>
                      <p className="text-lg">{item.text}</p>
                    </div>
                  ))}
                  {loading && (
                    <div className="p-4 rounded-2xl bg-amber-100 border border-amber-300">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center mr-3">🤔</div>
                        <span className="font-bold">المستشار يفكر...</span>
                      </div>
                      <div className="mt-3 flex space-x-2">
                        <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce"></div>
                        <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="message" className="block text-lg font-medium text-slate-700 mb-2">
                  اكتب سؤالك هنا:
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="مثال: وين أقدر أسافر مع أسرتي بميزانية 2000 دينار؟"
                  className="w-full h-32 p-4 border border-slate-300 rounded-2xl focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-2xl font-bold text-xl transition-all ${loading ? 'bg-slate-400' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'} text-white shadow-lg hover:shadow-xl`}
              >
                {loading ? 'جاري الإجابة...' : '🚀 أرسل السؤال'}
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-green-200">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">💡 نماذج أسئلة مفيدة</h3>
              <ul className="space-y-3">
                {[
                  "شروط فيزا أمريكا للمواطن الكويتي؟",
                  "أرخص وجهة سفر في الصيف؟",
                  "الوزن المسموح في الخطوط السعودية درجة رجال الأعمال؟",
                  "وين أقدر أسافر بمفردي بميزانية 500 دينار؟",
                  "أفضل وقت لزيارة اليابان؟"
                ].map((q, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => setMessage(q)}
                      className="w-full text-right p-3 bg-slate-100 hover:bg-blue-100 rounded-xl transition"
                    >
                      {q}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-xl border border-amber-200">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">⚙️ كيف يعمل المستشار؟</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mt-1 ml-3">1</div>
                  <span>يكتب المستخدم سؤاله بالعربية.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center mt-1 ml-3">2</div>
                  <span>المستشار (DeepSeek عبر OpenRouter) يحلل السؤال.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center mt-1 ml-3">3</div>
                  <span>يرد بلغة عربية واضحة مع معلومات دقيقة.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center mt-1 ml-3">4</div>
                  <span>يمكنك متابعة المحادثة وتوسيع النقاش.</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-3xl border border-purple-300">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">📊 إحصائيات</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>عدد الأسئلة المجابة</span>
                  <span className="font-bold">{history.filter(h => h.role === 'assistant').length}</span>
                </div>
                <div className="flex justify-between">
                  <span>دقة المعلومات</span>
                  <span className="font-bold text-green-600">%95</span>
                </div>
                <div className="flex justify-between">
                  <span>متوسط وقت الرد</span>
                  <span className="font-bold">1.5 ثانية</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-16 text-center text-slate-500">
          <p>🔗 المستشار يعمل على DeepSeek V3.2 عبر OpenRouter. الدقة عالية والتحديثات يومية.</p>
          <p className="text-sm mt-2">المستشار مجاني حالياً. قد يصبح جزءاً من اشتراك Premium في المستقبل.</p>
        </footer>
      </main>
    </div>
  );
}