import { Link } from 'react-router-dom';
import { FileText, BarChart3, PieChart, Calculator, ArrowRight, CheckCircle, Monitor, Users } from 'lucide-react';
import Header from '../components/Header';
import { useLanguage } from '../i18n/LanguageContext';

export default function BoekhoudingPage() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <Header />

      {/* Hero */}
      <section className="bg-primary-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-accent-400 font-semibold mb-4">{t.nav.boekhouding}</p>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              {t.pages.boekhouding.hero}
            </h1>
            <p className="text-xl text-primary-200 leading-relaxed">
              {t.pages.boekhouding.heroSub}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Main text */}
            <div className="md:col-span-2 space-y-6">
              <p className="text-gray-700 text-lg leading-relaxed">
                We laten jouw boekhouding zo efficiënt mogelijk verlopen en zetten daarbij volop in op 
                nieuwe technologieën, geïmplementeerd op maat van jouw onderneming. In ons online systeem 
                wordt alle info gebundeld – denk aan facturen, bewijsstukken en andere gegevens. 
                Onze dossierbeheerders controleren alles grondig en jij hebt altijd een duidelijk overzicht 
                van de stand van zaken.
              </p>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-primary-900 mb-4">{t.pages.boekhouding.services}</h3>
                <ul className="space-y-3">
                  <ServiceItem>Analytische boekhouding</ServiceItem>
                  <ServiceItem>Opmaak van exploitatiecijfers en jaarrekeningen</ServiceItem>
                  <ServiceItem>Periodieke rapportage & dashboards</ServiceItem>
                  <ServiceItem>Opmaak van budgetten, financiële plannen, haalbaarheidsstudies</ServiceItem>
                  <ServiceItem>Financiële analyses</ServiceItem>
                </ul>
              </div>

              {/* Subsections */}
              <div className="pt-8 space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-primary-900 mb-4 flex items-center gap-3">
                    <Monitor className="w-6 h-6 text-accent-500" />
                    {t.pages.boekhouding.notDigital}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t.pages.boekhouding.notDigitalText}
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-primary-900 mb-4 flex items-center gap-3">
                    <Users className="w-6 h-6 text-accent-500" />
                    {t.pages.boekhouding.internal}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t.pages.boekhouding.internalText}
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-primary-900 text-white p-8 rounded-lg">
                <h3 className="text-xl font-bold mb-4">{t.pages.boekhouding.contactUs}</h3>
                <p className="text-primary-200 mb-6">
                  {t.pages.boekhouding.contactSub}
                </p>
                <Link
                  to="/register"
                  className="block w-full bg-accent-500 text-white text-center py-3 font-semibold hover:bg-accent-600 transition-colors"
                >
                  {t.pages.boekhouding.startNow}
                </Link>
                <div className="mt-6 pt-6 border-t border-primary-700 text-sm text-primary-300">
                  <p>T. 050/45 70 31</p>
                  <p>brugge@oostboek.be</p>
                </div>
              </div>

              {/* Quick links */}
              <div className="border border-gray-200 p-6 rounded-lg">
                <h4 className="font-bold text-primary-900 mb-4">{t.pages.boekhouding.otherServices}</h4>
                <div className="space-y-3">
                  <Link to="/fiscaliteit" className="flex items-center gap-2 text-gray-600 hover:text-accent-600 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                    Fiscaliteit
                  </Link>
                  <Link to="/begeleiding" className="flex items-center gap-2 text-gray-600 hover:text-accent-600 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                    Begeleiding
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            <FeatureCard icon={FileText} title="Jaarrekeningen" description="Correcte en tijdige opmaak" href="/boekhouding/jaarrekeningen" />
            <FeatureCard icon={BarChart3} title="Rapportage" description="Duidelijke dashboards" href="/boekhouding/rapportage" />
            <FeatureCard icon={PieChart} title="Analyses" description="Financiële inzichten" href="/boekhouding/analyses" />
            <FeatureCard icon={Calculator} title="Budgetten" description="Haalbaarheidsstudies" href="/boekhouding/budgetten" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-800 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{t.pages.boekhouding.readyToStart}</h2>
          <p className="text-primary-200 mb-8">
            {t.pages.boekhouding.registerNow}
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-accent-500 text-white px-8 py-4 font-bold hover:bg-accent-600 transition-colors"
          >
            Registreren
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}


function Footer() {
  return (
    <footer className="bg-primary-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                <span className="text-primary-900 font-extrabold text-xl">O</span>
              </div>
              <span className="text-white font-bold text-lg">Oostboek</span>
            </div>
            <p className="text-primary-300 text-sm">
              Boekhouders en mee(r)denkers in Brugge.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <div className="text-primary-300 text-sm space-y-1">
              <p>Koningin Astridlaan 134 bus 1</p>
              <p>8200 Brugge</p>
              <p className="pt-2">T. 050/45 70 31</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">Diensten</h4>
            <div className="space-y-2 text-sm">
              <Link to="/boekhouding" className="block text-primary-300 hover:text-accent-400">Boekhouding</Link>
              <Link to="/fiscaliteit" className="block text-primary-300 hover:text-accent-400">Fiscaliteit</Link>
              <Link to="/begeleiding" className="block text-primary-300 hover:text-accent-400">Begeleiding</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-800 mt-8 pt-8 text-sm text-primary-400 text-center">
          &copy; 2025 Oostboek. Alle rechten voorbehouden.
        </div>
      </div>
    </footer>
  );
}

function ServiceItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle className="w-5 h-5 text-accent-500 mt-0.5 flex-shrink-0" />
      <span className="text-gray-700">{children}</span>
    </li>
  );
}

function FeatureCard({ icon: Icon, title, description, href }: { 
  icon: React.ComponentType<{ className?: string }>; 
  title: string; 
  description: string;
  href: string;
}) {
  return (
    <Link to={href} className="bg-white p-6 border border-gray-200 text-center hover:shadow-lg hover:border-primary-300 transition-all">
      <div className="w-12 h-12 bg-primary-900 rounded flex items-center justify-center mx-auto mb-4">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="font-bold text-primary-900 mb-1">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </Link>
  );
}
