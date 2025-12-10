import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language } from './translations';

type TranslationType = typeof translations['nl'] | typeof translations['en'];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationType;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Check localStorage first
    const saved = localStorage.getItem('oostboek-language');
    if (saved === 'en' || saved === 'nl') return saved;
    
    // Check browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('nl')) return 'nl';
    return 'en'; // Default to English for international users
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('oostboek-language', lang);
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Language switcher component
export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <button
        onClick={() => setLanguage('nl')}
        className={`px-2 py-1 text-xs font-bold rounded transition-colors ${
          language === 'nl' 
            ? 'bg-accent-500 text-white' 
            : 'text-primary-300 hover:text-white'
        }`}
      >
        NL
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 text-xs font-bold rounded transition-colors ${
          language === 'en' 
            ? 'bg-accent-500 text-white' 
            : 'text-primary-300 hover:text-white'
        }`}
      >
        EN
      </button>
    </div>
  );
}
