import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Building2, FileText, Calculator, Shield, Database } from 'lucide-react';
import Header from '../components/Header';

const LINK_CATEGORIES = [
  {
    title: 'Belastingdiensten',
    icon: Building2,
    links: [
      {
        name: 'Intervat (BTW-aangiftes)',
        url: 'http://financien.belgium.be/nl/E-services/Intervat/',
        description: 'Online BTW-aangiftes indienen',
      },
      {
        name: 'Tax-on-web',
        url: 'https://eservices.minfin.fgov.be/taxonweb/app/citizen/public/taxbox/home.do',
        description: 'Personenbelasting online',
      },
      {
        name: 'Biztax',
        url: 'http://financien.belgium.be/nl/E-services/biztax/',
        description: 'Vennootschapsbelasting online',
      },
      {
        name: 'RV-on-web',
        url: 'http://financien.belgium.be/nl/E-services/rv-on-web/',
        description: 'Roerende voorheffing online',
      },
      {
        name: 'Fiscale attesten',
        url: 'https://eservices.minfin.fgov.be/portal/nl/public/citizen/services/attests',
        description: 'Fiscale attesten aanvragen',
      },
      {
        name: 'Kadaster (KMWeb)',
        url: 'http://ccff02.minfin.fgov.be/KMWeb/main.do?home=true',
        description: 'Kadastrale gegevens opzoeken',
      },
    ],
  },
  {
    title: 'Facturatie & Boekhouding',
    icon: FileText,
    links: [
      {
        name: 'Billit',
        url: 'https://my.billit.be/Account/Logon',
        description: 'Online facturatie platform',
      },
      {
        name: 'Oostboek Dagboeken',
        url: 'https://dagboeken.oostboek.be/nl/login',
        description: 'Klantportaal Oostboek',
      },
    ],
  },
  {
    title: 'Sociale Zekerheid',
    icon: Shield,
    links: [
      {
        name: 'RSZ 30bis',
        url: 'https://www.socialsecurity.be/site_nl/employer/applics/30bis/index.htm?type=all',
        description: 'Aannemersregistratie en inhoudingsplicht',
      },
    ],
  },
  {
    title: 'Privacy & GDPR',
    icon: Shield,
    links: [
      {
        name: 'Gegevensbeschermingsautoriteit',
        url: 'https://www.privacycommission.be/nl',
        description: 'Belgische privacycommissie',
      },
      {
        name: 'GDPR Brochure (VBO)',
        url: 'http://www.vbo-feb.be/globalassets/publicaties/data-protection/feb_dataprotection_brochure_03_nl_web-pdf.pdf',
        description: 'Praktische gids voor ondernemingen',
      },
    ],
  },
  {
    title: 'Nuttige Tools',
    icon: Calculator,
    links: [
      {
        name: 'Huurcalculator',
        url: 'http://statbel.fgov.be/nl/statistieken/cijfers/economie/consumptieprijzen/huurcalculator/',
        description: 'Berekening huurindexatie',
      },
      {
        name: 'VIES BTW-controle',
        url: 'http://ec.europa.eu/taxation_customs/vies/?locale=nl',
        description: 'Europese BTW-nummers controleren',
      },
    ],
  },
  {
    title: 'Officiële Registers',
    icon: Database,
    links: [
      {
        name: 'KBO Public Search',
        url: 'http://kbopub.economie.fgov.be/kbopub/zoeknummerform.html',
        description: 'Kruispuntbank van Ondernemingen',
      },
      {
        name: 'NBB Balanscentrale',
        url: 'https://www.nbb.be/nl/balanscentrale',
        description: 'Jaarrekeningen raadplegen',
      },
      {
        name: 'Belgisch Staatsblad',
        url: 'http://www.ejustice.just.fgov.be/tsv_pub/index_n.htm',
        description: 'Officiële publicaties',
      },
    ],
  },
];

export default function LinksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Terug naar home
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nuttige Links</h1>
          <p className="text-lg text-gray-600">
            Een verzameling van handige websites en tools voor ondernemers en boekhouding.
          </p>
        </div>

        <div className="space-y-8">
          {LINK_CATEGORIES.map((category) => (
            <section key={category.title} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="bg-primary-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <category.icon className="w-5 h-5 text-primary-600" />
                  <h2 className="text-lg font-semibold text-gray-900">{category.title}</h2>
                </div>
              </div>
              
              <div className="divide-y divide-gray-100">
                {category.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                        {link.name}
                      </h3>
                      <p className="text-sm text-gray-500">{link.description}</p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors flex-shrink-0" />
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 bg-accent-50 rounded-xl p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Link ontbreekt?</h2>
          <p className="text-gray-600 mb-4">
            Kent u een nuttige website die hier zou moeten staan? Laat het ons weten!
          </p>
          <Link to="/contact" className="btn-primary">
            Suggestie doorsturen
          </Link>
        </div>
      </main>

      <footer className="bg-primary-950 text-white py-8 px-4 mt-12">
        <div className="max-w-6xl mx-auto text-center text-sm text-primary-400">
          <p>&copy; 2025 Oostboek. Alle rechten voorbehouden.</p>
        </div>
      </footer>
    </div>
  );
}
