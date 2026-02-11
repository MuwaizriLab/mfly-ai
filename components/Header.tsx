import { useTranslations } from 'next-intl';
import Link from 'next/link';
import LocaleSwitcher from './LocaleSwitcher';

export default function Header() {
  const th = useTranslations('Header');

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          ✈️ mfly.ai
        </Link>
        <nav className="hidden md:flex gap-6 font-medium text-slate-600">
          <Link href="/" className="hover:text-blue-600 transition">{th('home')}</Link>
          <Link href="/inspire-me" className="hover:text-blue-600 transition">{th('inspireMe')}</Link>
          <Link href="/fare-hunter" className="hover:text-blue-600 transition">{th('fareHunter')}</Link>
          <Link href="/airport-translator" className="hover:text-blue-600 transition">{th('airportTranslator')}</Link>
          <Link href="/visa-checker" className="hover:text-blue-600 transition">{th('visaChecker')}</Link>
          <Link href="/weight-calculator" className="hover:text-blue-600 transition">{th('weightCalculator')}</Link>
          <Link href="/shift-organizer" className="hover:text-blue-600 transition">{th('shiftOrganizer')}</Link>
          <Link href="/daily-challenge" className="hover:text-blue-600 transition">🧠 التحدي اليومي</Link>
        </nav>
        <LocaleSwitcher /> {/* Language Switcher Component */}
        <a
          href="#"
          className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-600/20"
        >
          {th('tryBeta')}
        </a>
      </div>
    </header>
  );
}
