import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle, ChevronDown, Calendar, Clock } from 'lucide-react';
import Header from '../components/Header';
import { ContactSection } from '../components/ContactForm';
import TeamSection from '../components/TeamSection';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuthStore } from '../stores/authStore';
import { api } from '../services/api';
import type { Appointment } from '../types/api';

// Declare Calendly on window for TypeScript
declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: Element }) => void;
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export default function HomePage() {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuthStore();
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const calendlyRef = useRef<HTMLDivElement>(null);

  // Fetch appointments for logged-in users
  useEffect(() => {
    if (isAuthenticated) {
      api.getAppointments().then((response) => {
        if (response.success && response.data) {
          const upcoming = response.data.filter(
            (apt) => apt.status === 'PENDING' || apt.status === 'CONFIRMED'
          );
          setAppointments(upcoming.slice(0, 3));
        }
      });
    }
  }, [isAuthenticated]);
  
  // Lazy load Calendly when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !calendlyLoaded) {
          setCalendlyLoaded(true);
        }
      },
      { rootMargin: '200px' } // Load 200px before it's visible
    );

    if (calendlyRef.current) {
      observer.observe(calendlyRef.current);
    }

    return () => observer.disconnect();
  }, [calendlyLoaded]);

  // Initialize Calendly widget after it's loaded
  useEffect(() => {
    if (!calendlyLoaded) return;
    
    const initCalendly = () => {
      const widget = document.querySelector('.calendly-inline-widget');
      if (window.Calendly && widget) {
        window.Calendly.initInlineWidget({
          url: 'https://calendly.com/oostboek/kennismaking?hide_gdpr_banner=1&primary_color=1e3a5f',
          parentElement: widget,
        });
      }
    };

    // Try immediately, then retry after script loads
    initCalendly();
    const timer = setTimeout(initCalendly, 1000);
    return () => clearTimeout(timer);
  }, [calendlyLoaded]);
  
  return (
    <div className="min-h-screen bg-surface-50 font-body">
      {/* Header */}
      <Header />

      {/* Upcoming Appointments Banner for logged-in users */}
      {isAuthenticated && appointments.length > 0 && (
        <section className="bg-accent-50 border-b border-accent-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-accent-600" />
                  <span className="font-semibold text-accent-900">Komende afspraken</span>
                </div>
                <div className="hidden md:flex items-center gap-4">
                  {appointments.map((apt) => (
                    <div key={apt.id} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-accent-200">
                      <Clock className="w-4 h-4 text-accent-500" />
                      <span className="text-sm text-gray-700">
                        {new Date(apt.scheduledAt).toLocaleDateString('nl-BE', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short',
                        })}{' '}
                        om{' '}
                        {new Date(apt.scheduledAt).toLocaleTimeString('nl-BE', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      <span className="text-xs text-gray-500">- {apt.topic}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link
                to="/dashboard"
                className="text-sm text-accent-700 hover:text-accent-800 font-medium flex items-center gap-1"
              >
                Bekijk alle
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Hero - Split layout with data visualization */}
      <section className="bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                {t.hero.title1}<br />
                <span className="text-accent-400">{t.hero.title2}</span>
              </h1>
              <p className="text-lg text-primary-200 mb-8 leading-relaxed">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/register"
                  className="bg-accent-500 text-white px-6 py-3 font-bold hover:bg-accent-600 transition-colors inline-flex items-center gap-2 rounded"
                >
                  {t.hero.cta}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="#diensten"
                  className="bg-primary-800 text-white px-6 py-3 font-bold hover:bg-primary-700 transition-colors rounded border border-primary-600"
                >
                  {t.hero.secondary}
                </a>
              </div>
            </div>
            
            {/* Right: Data visualization - shows financial authority */}
            <div className="bg-primary-800 p-6 rounded border border-primary-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold">{t.data.clientResults}</h3>
                <span className="text-primary-400 text-sm font-mono">2024</span>
              </div>
              
              {/* Mini chart visualization */}
              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-primary-300">{t.data.fiscalSavings}</span>
                    <span className="text-accent-400 font-mono font-bold">+23%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '78%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-primary-300">{t.data.adminEfficiency}</span>
                    <span className="text-accent-400 font-mono font-bold">+45%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '92%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-primary-300">{t.data.satisfaction}</span>
                    <span className="text-accent-400 font-mono font-bold">98%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '98%'}}></div>
                  </div>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-primary-700">
                <div className="text-center">
                  <div className="text-2xl font-mono font-bold text-white">500+</div>
                  <div className="text-xs text-primary-400 uppercase">{t.data.clients}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-mono font-bold text-white">25+</div>
                  <div className="text-xs text-primary-400 uppercase">{t.data.years}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-mono font-bold text-white">€2M+</div>
                  <div className="text-xs text-primary-400 uppercase">{t.data.saved}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About section - More compact */}
      <section className="px-4 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-4">
                Persoonlijke gids doorheen facts & figures
              </h2>
              <p className="text-primary-700 mb-4 leading-relaxed">
                Jouw boekhouding en fiscaliteit van A tot Z bijhouden en verzorgen, is voor ons een evidentie. 
                Onze echte meerwaarde zit hem vooral in ons persoonlijk partnership.
              </p>
              <p className="text-primary-700 mb-6 leading-relaxed">
                Proactief werken en meedenken over nieuwe opportuniteiten is onze tweede natuur. 
                Altijd to the point, met oog voor duurzaamheid en discretie.
              </p>
              <Link 
                to="/register"
                className="inline-flex items-center gap-2 bg-accent-500 text-white px-5 py-2.5 rounded font-bold hover:bg-accent-600 transition-colors"
              >
                Start vandaag
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-primary-900 p-6 rounded">
              <h3 className="text-white font-bold mb-4 text-lg">Wat we doen</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-primary-200">
                  <CheckCircle className="w-5 h-5 text-accent-400 mt-0.5 flex-shrink-0" />
                  <span>Analytische boekhouding & jaarrekeningen</span>
                </li>
                <li className="flex items-start gap-3 text-primary-200">
                  <CheckCircle className="w-5 h-5 text-accent-400 mt-0.5 flex-shrink-0" />
                  <span>Alle fiscale aangiftes & optimalisatie</span>
                </li>
                <li className="flex items-start gap-3 text-primary-200">
                  <CheckCircle className="w-5 h-5 text-accent-400 mt-0.5 flex-shrink-0" />
                  <span>Startersadvies & kredietbegeleiding</span>
                </li>
                <li className="flex items-start gap-3 text-primary-200">
                  <CheckCircle className="w-5 h-5 text-accent-400 mt-0.5 flex-shrink-0" />
                  <span>Vermogensplanning & successie</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />

      {/* Calendly Section */}
      <section id="afspraak" className="px-4 py-20 bg-white" ref={calendlyRef}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.pages.calendly.title}</h2>
            {t.pages.calendly.subtitle && (
              <p className="text-lg text-gray-600">{t.pages.calendly.subtitle}</p>
            )}
          </div>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            {calendlyLoaded ? (
              <div 
                className="calendly-inline-widget" 
                data-url="https://calendly.com/oostboek/kennismaking?hide_gdpr_banner=1&primary_color=1e3a5f"
                style={{ minWidth: '320px', height: '700px' }}
              />
            ) : (
              <div className="flex items-center justify-center h-[700px] bg-gray-50">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-gray-500">Kalender laden...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-4 py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <ContactSection />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="px-4 py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.pages.faq.title}</h2>
            <p className="text-lg text-gray-600">{t.pages.faq.subtitle}</p>
          </div>
          <FAQAccordion />
        </div>
      </section>

      {/* Footer - Oostboek style */}
      <footer className="bg-primary-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-block mb-6 cursor-pointer">
                <img src="/oostboek.png" alt="Oostboek Boekhouder Brugge - Logo" className="h-11 w-auto" />
              </a>
              <p className="text-primary-300 leading-relaxed max-w-md">
                Professioneel advies en persoonlijke begeleiding. Starter of gevestigde onderneming? 
                Oostboek denkt proactief mee over elke opportuniteit.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 text-lg">Contact</h4>
              <div className="text-primary-300 space-y-2">
                <p>Koningin Astridlaan 134 bus 1</p>
                <p>8200 Brugge</p>
                <p className="pt-2">T. 050/45 70 31</p>
                <a href="mailto:brugge@oostboek.be" className="block hover:text-accent-400 transition-colors">brugge@oostboek.be</a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 text-lg">Navigatie</h4>
              <div className="space-y-2">
                <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="block text-primary-300 hover:text-accent-400 transition-colors cursor-pointer">Home</a>
                <Link to="/boekhouding" className="block text-primary-300 hover:text-accent-400 transition-colors cursor-pointer">Boekhouding</Link>
                <Link to="/fiscaliteit" className="block text-primary-300 hover:text-accent-400 transition-colors cursor-pointer">Fiscaliteit</Link>
                <Link to="/begeleiding" className="block text-primary-300 hover:text-accent-400 transition-colors cursor-pointer">Begeleiding</Link>
                <Link to="/nieuws" className="block text-primary-300 hover:text-accent-400 transition-colors cursor-pointer">Nieuws</Link>
                <Link to="/vacatures" className="block text-primary-300 hover:text-accent-400 transition-colors cursor-pointer">Vacatures</Link>
                <Link to="/links" className="block text-primary-300 hover:text-accent-400 transition-colors cursor-pointer">Links</Link>
                <Link to="/login" className="block text-primary-300 hover:text-accent-400 transition-colors cursor-pointer">Login</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-400">
            <p>&copy; 2025 Oostboek. Alle rechten voorbehouden.</p>
            <div className="flex gap-4">
              <span>Cookies</span>
              <span>Privacyverklaring</span>
              <span>GDPR-compliant</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  const faqData = [
    { question: t.faqItems.q1, answer: t.faqItems.a1 },
    { question: t.faqItems.q2, answer: t.faqItems.a2 },
    { question: t.faqItems.q3, answer: t.faqItems.a3 },
    { question: t.faqItems.q4, answer: t.faqItems.a4 },
    { question: t.faqItems.q5, answer: t.faqItems.a5 },
    { question: t.faqItems.q6, answer: t.faqItems.a6 },
    { question: t.faqItems.q7, answer: t.faqItems.a7 },
    { question: t.faqItems.q8, answer: t.faqItems.a8 },
    { question: t.faqItems.q9, answer: t.faqItems.a9 },
    { question: t.faqItems.q10, answer: t.faqItems.a10 },
    { question: t.faqItems.q11, answer: t.faqItems.a11 },
    { question: t.faqItems.q12, answer: t.faqItems.a12 },
    { question: t.faqItems.q13, answer: t.faqItems.a13 },
    { question: t.faqItems.q14, answer: t.faqItems.a14 },
    { question: t.faqItems.q15, answer: t.faqItems.a15 },
    { question: t.faqItems.q16, answer: t.faqItems.a16 },
  ];

  return (
    <div className="space-y-3">
      {faqData.map((faq, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
          >
            <span className="font-semibold text-gray-900">{faq.question}</span>
            <ChevronDown
              className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openIndex === index && (
            <div className="px-6 pb-4">
              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

