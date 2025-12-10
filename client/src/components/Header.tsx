import { Link } from 'react-router-dom';
import { LanguageSwitcher } from '../i18n/LanguageContext';

export default function Header() {
  return (
    <header className="bg-primary-900 text-white">
      {/* Top bar with contact info */}
      <div className="bg-primary-950 border-b border-primary-800">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a href="mailto:brugge@oostboek.be" className="hover:text-accent-400 transition-colors">
              brugge@oostboek.be
            </a>
            <span className="hidden sm:inline text-primary-400">|</span>
            <span className="hidden sm:inline">T. 050/45 70 31</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-primary-300">
            <span>Koningin Astridlaan 134 bus 1, 8200 Brugge</span>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/">
          <img src="/oostboek.png" alt="Oostboek" className="h-11 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          <Link to="/boekhouding" className="nav-link">Accounting</Link>
          <Link to="/fiscaliteit" className="nav-link">Tax Services</Link>
          <Link to="/begeleiding" className="nav-link">Advisory</Link>
          <a href="/#contact" className="nav-link">Contact</a>
        </nav>
        <Link
          to="/register"
          className="hidden md:inline-flex bg-white text-primary-900 px-5 py-2 rounded font-bold hover:bg-primary-100 transition-colors"
        >
          REGISTER
        </Link>
      </div>
    </header>
  );
}
