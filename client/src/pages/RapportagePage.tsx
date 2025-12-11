import { Link } from 'react-router-dom';
import { BarChart3, ArrowRight, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import { useLanguage } from '../i18n/LanguageContext';

export default function RapportagePage() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />

      {/* Hero */}
      <section className="bg-primary-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-3xl">
            <Link to="/boekhouding" className="text-accent-400 font-semibold mb-4 inline-flex items-center gap-2 hover:underline">
              ← {t.nav.boekhouding}
            </Link>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight mt-4">
              Rapportage & Dashboards
            </h1>
            <p className="text-xl text-primary-200 leading-relaxed">
              Duidelijke en overzichtelijke rapporten die u helpen betere beslissingen te nemen.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-primary-900 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-primary-900 m-0">Periodieke rapportage</h2>
                <p className="text-gray-600 m-0">Altijd inzicht in uw cijfers</p>
              </div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Goede beslissingen nemen vereist actuele en betrouwbare informatie. Wij voorzien u van 
              periodieke rapporten en dashboards die u een helder beeld geven van de financiële 
              gezondheid van uw onderneming.
            </p>

            <div className="bg-gray-50 p-8 rounded-xl mb-8">
              <h3 className="text-xl font-bold text-primary-900 mb-6">Wat wij bieden</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent-500 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-primary-900">Maandelijkse exploitatiecijfers</strong>
                    <p className="text-gray-600 mt-1">Overzicht van omzet, kosten en resultaat per maand</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent-500 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-primary-900">Visuele dashboards</strong>
                    <p className="text-gray-600 mt-1">Grafieken en KPI's voor snel inzicht</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent-500 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-primary-900">Vergelijking met vorig jaar</strong>
                    <p className="text-gray-600 mt-1">Evolutie en trends in kaart gebracht</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent-500 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-primary-900">Budget vs. realisatie</strong>
                    <p className="text-gray-600 mt-1">Afwijkingen tijdig signaleren en bijsturen</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-accent-50 p-6 rounded-xl">
                <h4 className="font-bold text-primary-900 mb-2">Frequentie op maat</h4>
                <p className="text-gray-700 text-sm">
                  Maandelijks, kwartaal of jaarlijks - wij stemmen de rapportagefrequentie af op uw behoeften.
                </p>
              </div>
              <div className="bg-accent-50 p-6 rounded-xl">
                <h4 className="font-bold text-primary-900 mb-2">Online toegankelijk</h4>
                <p className="text-gray-700 text-sm">
                  Via ons klantenportaal heeft u 24/7 toegang tot al uw rapporten en dashboards.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-primary-900 text-white p-8 rounded-xl text-center">
            <h3 className="text-2xl font-bold mb-4">Meer inzicht in uw cijfers?</h3>
            <p className="text-primary-200 mb-6">Ontdek hoe onze rapportage u kan helpen.</p>
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 bg-accent-500 text-white px-8 py-3 font-semibold hover:bg-accent-600 transition-colors rounded-lg"
            >
              Contact opnemen
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
