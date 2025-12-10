import { Link } from 'react-router-dom';
import { Calendar, MessageCircle, Shield, Clock, FileText, Users, ArrowRight, TrendingUp, BarChart3, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import { ContactSection } from '../components/ContactForm';
import { useLanguage } from '../i18n/LanguageContext';

export default function HomePage() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-surface-50 font-body">
      {/* Header */}
      <Header />

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

      {/* Services - Dense, professional grid */}
      <section id="diensten" className="px-4 py-16 bg-white border-b-4 border-accent-500">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-900">Onze Expertise</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-0">
            <ServiceCard
              icon={FileText}
              title="Boekhouding"
              description="Analytische boekhouding, jaarrekeningen, rapportage & dashboards, financiële analyses."
              link="/boekhouding"
              internal
            />
            <ServiceCard
              icon={Shield}
              title="Fiscaliteit"
              description="BTW-aangiftes, vennootschapsbelasting, loonoptimalisatie, fiscale controles."
              link="/fiscaliteit"
              internal
            />
            <ServiceCard
              icon={Users}
              title="Begeleiding"
              description="Startersadvies, overname, kredietbegeleiding, vermogensplanning."
              link="/begeleiding"
              internal
            />
          </div>
        </div>
      </section>

      {/* Why Oostboek - Data-driven trust signals */}
      <section className="px-4 py-16 bg-surface-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="data-card text-center">
              <TrendingUp className="w-8 h-8 text-accent-500 mx-auto mb-3" />
              <div className="text-3xl font-mono font-bold text-primary-900">+23%</div>
              <div className="text-sm text-primary-600 mt-1">Gem. fiscale besparing</div>
            </div>
            <div className="data-card text-center">
              <BarChart3 className="w-8 h-8 text-accent-500 mx-auto mb-3" />
              <div className="text-3xl font-mono font-bold text-primary-900">500+</div>
              <div className="text-sm text-primary-600 mt-1">Actieve klanten</div>
            </div>
            <div className="data-card text-center">
              <Clock className="w-8 h-8 text-accent-500 mx-auto mb-3" />
              <div className="text-3xl font-mono font-bold text-primary-900">25+</div>
              <div className="text-sm text-primary-600 mt-1">Jaar ervaring</div>
            </div>
            <div className="data-card text-center">
              <CheckCircle className="w-8 h-8 text-accent-500 mx-auto mb-3" />
              <div className="text-3xl font-mono font-bold text-primary-900">98%</div>
              <div className="text-sm text-primary-600 mt-1">Klanttevredenheid</div>
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

      {/* Platform Features */}
      <section className="px-4 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Uw digitale klantenportaal
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              24/7 toegang tot al uw boekhoudkundige zaken, waar en wanneer u maar wilt.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={Calendar}
              title="Afspraken"
              description="Plan eenvoudig een afspraak met onze specialisten."
            />
            <FeatureCard
              icon={MessageCircle}
              title="AI Assistent"
              description="Direct antwoord op uw vragen over BTW, facturatie en meer."
            />
            <FeatureCard
              icon={FileText}
              title="Documenten"
              description="Upload en bekijk uw documenten veilig online."
            />
            <FeatureCard
              icon={Clock}
              title="24/7 Toegang"
              description="Bekijk uw status wanneer het u uitkomt."
            />
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactSection />

      {/* CTA */}
      <section className="px-4 py-20 bg-gradient-to-br from-primary-800 to-primary-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Klaar om te beginnen?
          </h2>
          <p className="text-lg text-primary-100 mb-8 max-w-xl mx-auto">
            Registreer vandaag nog en ontdek hoe Oostboek uw boekhouding eenvoudiger maakt.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-accent-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-accent-600 transition-all shadow-lg"
          >
            Gratis registreren
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer - Oostboek style */}
      <footer className="bg-primary-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-white rounded flex items-center justify-center">
                  <span className="text-primary-900 font-extrabold text-2xl">O</span>
                </div>
                <div>
                  <span className="text-white font-bold text-xl block">Oostboek</span>
                  <span className="text-primary-400 text-sm">Boekhouders & mee(r)denkers</span>
                </div>
              </div>
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
                <Link to="/" className="block text-primary-300 hover:text-accent-400 transition-colors cursor-pointer">Home</Link>
                <Link to="/boekhouding" className="block text-primary-300 hover:text-accent-400 transition-colors cursor-pointer">Boekhouding</Link>
                <Link to="/fiscaliteit" className="block text-primary-300 hover:text-accent-400 transition-colors cursor-pointer">Fiscaliteit</Link>
                <Link to="/begeleiding" className="block text-primary-300 hover:text-accent-400 transition-colors cursor-pointer">Begeleiding</Link>
                <Link to="/faq" className="block text-primary-300 hover:text-accent-400 transition-colors cursor-pointer">FAQ</Link>
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

function ServiceCard({
  icon: Icon,
  title,
  description,
  link,
  internal,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  link?: string;
  internal?: boolean;
}) {
  return (
    <div className="p-8 md:p-10 border-r border-b border-gray-200 last:border-r-0 bg-white hover:bg-gray-50 transition-colors group">
      <div className="w-12 h-12 bg-primary-900 rounded flex items-center justify-center mb-6">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-bold text-primary-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed mb-6">{description}</p>
      {link && (
        internal ? (
          <Link 
            to={link}
            className="inline-flex items-center gap-2 text-accent-600 font-semibold hover:text-accent-700 transition-colors group-hover:gap-3"
          >
            lees meer
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent-600 font-semibold hover:text-accent-700 transition-colors group-hover:gap-3"
          >
            lees meer
            <ArrowRight className="w-4 h-4" />
          </a>
        )
      )}
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center p-6 border border-gray-200 bg-white hover:shadow-md transition-all">
      <div className="w-12 h-12 bg-primary-900 rounded flex items-center justify-center mx-auto mb-4">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-lg font-bold text-primary-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

