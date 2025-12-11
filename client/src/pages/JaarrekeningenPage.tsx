import { Link } from 'react-router-dom';
import { FileText, ArrowRight, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import { useLanguage } from '../i18n/LanguageContext';

export default function JaarrekeningenPage() {
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
              Jaarrekeningen
            </h1>
            <p className="text-xl text-primary-200 leading-relaxed">
              Correcte en tijdige opmaak van uw jaarrekeningen, volledig conform de Belgische wetgeving.
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
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-primary-900 m-0">Professionele jaarrekeningen</h2>
                <p className="text-gray-600 m-0">Uw financiële situatie helder in kaart</p>
              </div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              De jaarrekening is het financiële visitekaartje van uw onderneming. Wij zorgen voor een 
              correcte en tijdige opmaak, volledig conform de Belgische boekhoudwetgeving en de 
              vereisten van de Nationale Bank van België.
            </p>

            <div className="bg-gray-50 p-8 rounded-xl mb-8">
              <h3 className="text-xl font-bold text-primary-900 mb-6">Onze diensten omvatten</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent-500 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-primary-900">Balans en resultatenrekening</strong>
                    <p className="text-gray-600 mt-1">Volledige opstelling van activa, passiva, opbrengsten en kosten</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent-500 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-primary-900">Toelichting</strong>
                    <p className="text-gray-600 mt-1">Gedetailleerde uitleg bij de cijfers conform het wettelijk schema</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent-500 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-primary-900">Neerlegging bij NBB</strong>
                    <p className="text-gray-600 mt-1">Tijdige en correcte neerlegging bij de Nationale Bank van België</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent-500 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-primary-900">Verkort of volledig schema</strong>
                    <p className="text-gray-600 mt-1">Afhankelijk van de grootte van uw onderneming</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-primary-50 border-l-4 border-primary-500 p-6 rounded-r-xl">
              <h4 className="font-bold text-primary-900 mb-2">Wist u dat?</h4>
              <p className="text-gray-700">
                De jaarrekening moet binnen de 7 maanden na afsluiting van het boekjaar worden neergelegd. 
                Wij zorgen ervoor dat u nooit een deadline mist.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-primary-900 text-white p-8 rounded-xl text-center">
            <h3 className="text-2xl font-bold mb-4">Hulp nodig bij uw jaarrekening?</h3>
            <p className="text-primary-200 mb-6">Neem contact op voor een vrijblijvend gesprek.</p>
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
