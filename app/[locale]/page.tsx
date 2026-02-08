import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Header from '@/components/Header'; // Import the new Header component

export default function Home() {
  const t = useTranslations('Hero');
  const th = useTranslations('Header'); // Th is not needed directly in Home after Header component
  const tf = useTranslations('Features');
  const tc = useTranslations('CallToAction');
  const ft = useTranslations('Footer');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans" dir={th('languageDir') === 'rtl' ? 'rtl' : 'ltr'}>
      <Header />
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 -z-10" />
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            {t('title')}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-xl shadow-blue-600/20">
              {t('startJourney')}
            </button>
            <button className="bg-white text-slate-700 border border-slate-200 px-8 py-3 rounded-xl font-bold hover:bg-slate-50 transition">
              {t('learnMore')}
            </button>
          </div>
          
          {/* Stats */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16 text-slate-500">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-slate-900">{t('staffCount')}</span>
              <span className="text-sm">{t('staffCountText')}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-slate-900">{t('travelersCount')}</span>
              <span className="text-sm">{t('travelersCountText')}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-slate-900">{t('madeInKuwait')}</span>
              <span className="text-sm">{t('madeInKuwaitText')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{tf('title')}</h2>
            <p className="text-slate-600">{tf('subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <FeatureCard
              icon="🌍"
              title={tf('inspireMeTitle')}
              desc={tf('inspireMeDesc')}
              href="/inspire-me"
            />
            {/* Feature 2 */}
            <FeatureCard
              icon="💸"
              title={tf('fareHunterTitle')}
              desc={tf('fareHunterDesc')}
              href="/fare-hunter"
            />
            {/* Feature 3 */}
            <FeatureCard
              icon="🗣️"
              title={tf('airportTranslatorTitle')}
              desc={tf('airportTranslatorDesc')}
              href="/airport-translator"
            />
            {/* Feature 4 */}
            <FeatureCard
              icon="🗓️"
              title={tf('shiftOrganizerTitle')}
              desc={tf('shiftOrganizerDesc')}
              href="/shift-organizer"
            />
            {/* Feature 5 */}
            <FeatureCard
              icon="🛂"
              title={tf('visaCheckerTitle')}
              desc={tf('visaCheckerDesc')}
              href="/visa-checker"
            />
            {/* Feature 6 */}
            <FeatureCard
              icon="⚖️"
              title={tf('weightCalculatorTitle')}
              desc={tf('weightCalculatorDesc')}
              href="/weight-calculator"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-slate-900 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{tc('title')}</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            {tc('subtitle')}
          </p>
          <form className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder={tc('emailPlaceholder')}
              className="flex-1 px-4 py-3 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
              {tc('signUp')}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-8 text-center text-sm border-t border-slate-900">
        <p>{ft('copyright')}</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc, href }: { icon: string; title: string; desc: string; href: string }) {
  return (
    <Link href={href} className="bg-slate-50 p-8 rounded-2xl hover:shadow-lg transition border border-slate-100 flex flex-col items-center text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{desc}</p>
    </Link>
  );
}
