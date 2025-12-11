import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { LanguageSwitcher, useLanguage } from '../i18n/LanguageContext';

export default function Header() {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-primary-900 text-white sticky top-0 z-50">
      {/* Top bar with contact info */}
      <div className="bg-primary-950 border-b border-primary-800">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a href="mailto:brugge@oostboek.be" className="hover:text-accent-400 transition-colors">
              brugge@oostboek.be
            </a>
            <span className="hidden sm:inline text-primary-400">|</span>
            <span className="hidden sm:inline">{t.phone}</span>
          </div>
          <div className="flex items-center gap-4 text-primary-300">
            <span className="hidden md:inline">Koningin Astridlaan 134 bus 1, 8200 Brugge</span>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
      {/* Main nav */}
      <div className="bg-primary-950">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/">
            <img src="/oostboek.png" alt="Oostboek Boekhouder Brugge - Logo" className="h-11 w-auto" />
          </Link>
          
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link to="/boekhouding" className="nav-link">{t.nav.boekhouding}</Link>
            <Link to="/fiscaliteit" className="nav-link">{t.nav.fiscaliteit}</Link>
            <Link to="/begeleiding" className="nav-link">{t.nav.begeleiding}</Link>
            <a href="/#faq" className="nav-link">FAQ</a>
            <a href="/#contact" className="nav-link">{t.nav.contact}</a>
          </nav>
          
          <div className="flex items-center gap-3">
            <Link
              to="/register"
              className="hidden md:inline-flex bg-white text-primary-900 px-5 py-2 rounded font-bold hover:bg-primary-100 transition-colors"
            >
              {t.register}
            </Link>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-primary-800 transition-colors"
              aria-label="Menu openen"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-primary-900 border-t border-primary-800">
            <nav className="flex flex-col px-4 py-4 space-y-1">
              <Link 
                to="/boekhouding" 
                className="px-4 py-3 rounded-lg hover:bg-primary-800 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.boekhouding}
              </Link>
              <Link 
                to="/fiscaliteit" 
                className="px-4 py-3 rounded-lg hover:bg-primary-800 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.fiscaliteit}
              </Link>
              <Link 
                to="/begeleiding" 
                className="px-4 py-3 rounded-lg hover:bg-primary-800 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.begeleiding}
              </Link>
              <a 
                href="/#faq" 
                className="px-4 py-3 rounded-lg hover:bg-primary-800 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </a>
              <a 
                href="/#contact" 
                className="px-4 py-3 rounded-lg hover:bg-primary-800 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.contact}
              </a>
              <Link
                to="/register"
                className="mt-2 bg-white text-primary-900 px-4 py-3 rounded-lg font-bold text-center hover:bg-primary-100 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.register}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
