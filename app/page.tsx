import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans" dir="rtl">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600 flex items-center gap-2">
            ✈️ mfly.ai
          </div>
          <nav className="hidden md:flex gap-6 font-medium text-slate-600">
            <a href="/inspire-me" className="hover:text-blue-600 transition">ألهمني</a>
            <a href="/fare-hunter" className="hover:text-blue-600 transition">صائد العروض</a>
            <a href="/airport-translator" className="hover:text-blue-600 transition">مترجم المطار</a>
            <a href="/visa-checker" className="hover:text-blue-600 transition">فاحص الفيزا</a>
            <a href="#features" className="hover:text-blue-600 transition">الخدمات</a>
            <a href="#staff" className="hover:text-blue-600 transition">للموظفين</a>
            <a href="#travelers" className="hover:text-blue-600 transition">للمسافرين</a>
            <a href="/shift-organizer" className="hover:text-blue-600 transition">منظم الشفتات</a>
          </nav>
          <a
            href="#"
            className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-600/20"
          >
            جرب النسخة التجريبية
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 -z-10" />
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            سفرك.. <span className="text-blue-600">بذكاء عربي.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            من "وين أسافر؟" إلى "وين جنطتي؟". <br />
            منصة واحدة تخدم المسافر الذكي.. وموظف الطيران المحترف.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-xl shadow-blue-600/20">
              ابدأ رحلتك
            </button>
            <button className="bg-white text-slate-700 border border-slate-200 px-8 py-3 rounded-xl font-bold hover:bg-slate-50 transition">
              تعرف علينا
            </button>
          </div>
          
          {/* Stats */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16 text-slate-500">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-slate-900">+500</span>
              <span className="text-sm">موظف طيران</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-slate-900">+2000</span>
              <span className="text-sm">مسافر</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-slate-900">🇰🇼</span>
              <span className="text-sm">صنع في الكويت</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">خدمات ذكية لكل خطوة</h2>
            <p className="text-slate-600">كل ما تحتاجه في تطبيق واحد.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <FeatureCard
              icon="🌍"
              title="ألهمني (Inspire Me)"
              desc="محتار وين تروح؟ الذكاء الاصطناعي يقترح عليك وجهات تناسب مزاجك وميزانيتك."
            />
            {/* Feature 2 */}
            <FeatureCard
              icon="💸"
              title="صائد العروض"
              desc="لا تحجز غالي. نقارن لك الأسعار ونعطيك أرخص تذكرة باليوم والساعة."
            />
            {/* Feature 3 */}
            <FeatureCard
              icon="🗣️"
              title="مترجم المطار"
              desc="توهقت مع موظف أجنبي؟ التطبيق يسمع ويترجم لك فوراً، صوت وصورة."
            />
            {/* Feature 4 */}
            <FeatureCard
              icon="🗓️"
              title="منظم الشفتات"
              desc="رتب جدولك، واعرف إجازاتك، ونسق مع زملائك بضغطة زر (لموظفي الطيران)."
            />
            {/* Feature 5 */}
            <FeatureCard
              icon="🛂"
              title="فاحص الفيزا"
              desc="صور الجواز واعرف المطلوب فوراً بدون تعقيد السيستم."
            />
            {/* Feature 6 */}
            <FeatureCard
              icon="⚖️"
              title="حاسبة الوزن"
              desc="احسب الغرامات بدقة لكل الدرجات والعملات، وريح راسك من الجدال."
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-slate-900 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">جاهز لتجربة سفر مختلفة؟</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            انضم لقائمة الانتظار وكن أول من يجرب مستقبل السفر الذكي.
          </p>
          <form className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="بريدك الإلكتروني"
              className="flex-1 px-4 py-3 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
              سجلني
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-8 text-center text-sm border-t border-slate-900">
        <p>© 2026 mfly.ai - جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="bg-slate-50 p-8 rounded-2xl hover:shadow-lg transition border border-slate-100">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );
}
