import { Link } from 'react-router-dom';
import { PieChart, ArrowRight, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import { useLanguage } from '../i18n/LanguageContext';

export default function AnalysesPage() {
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
              Financiële Analyses
            </h1>
            <p className="text-xl text-primary-200 leading-relaxed">
              Diepgaande inzichten in de financiële prestaties van uw onderneming.
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
                <PieChart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-primary-900 m-0">Strategische inzichten</h2>
                <p className="text-gray-600 m-0">Van cijfers naar actie</p>
              </div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Cijfers vertellen een verhaal. Onze financiële analyses helpen u dat verhaal te begrijpen 
              en om te zetten in concrete acties. We kijken verder dan de oppervlakte en identificeren 
              kansen en risico's voor uw onderneming.
            </p>

            <div className="bg-gray-50 p-8 rounded-xl mb-8">
              <h3 className="text-xl font-bold text-primary-900 mb-6">Onze analyses omvatten</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent-500 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-primary-900">Rentabiliteitsanalyse</strong>
                    <p className="text-gray-600 mt-1">Hoe winstgevend is uw onderneming werkelijk?</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent-500 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-primary-900">Liquiditeitsanalyse</strong>
                    <p className="text-gray-600 mt-1">Kan uw onderneming aan haar kortetermijnverplichtingen voldoen?</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent-500 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-primary-900">Solvabiliteitsanalyse</strong>
                    <p className="text-gray-600 mt-1">Hoe gezond is de financiële structuur op lange termijn?</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent-500 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-primary-900">Kostenanalyse</strong>
                    <p className="text-gray-600 mt-1">Waar zitten de grootste kostenposten en besparingsmogelijkheden?</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent-500 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-primary-900">Benchmarking</strong>
                    <p className="text-gray-600 mt-1">Vergelijking met sectorgenoten en concurrenten</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-primary-50 border-l-4 border-primary-500 p-6 rounded-r-xl">
              <h4 className="font-bold text-primary-900 mb-2">Proactief advies</h4>
              <p className="text-gray-700">
                Onze analyses zijn geen doel op zich. We vertalen de inzichten naar concrete 
                aanbevelingen die u helpen uw onderneming te laten groeien.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-primary-900 text-white p-8 rounded-xl text-center">
            <h3 className="text-2xl font-bold mb-4">Dieper inzicht gewenst?</h3>
            <p className="text-primary-200 mb-6">Laat ons uw cijfers analyseren.</p>
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
