import { Link } from 'react-router-dom';
import { Shield, FileCheck, Scale, Building2, ArrowRight, CheckCircle, Lightbulb, Users } from 'lucide-react';
import Header from '../components/Header';
import { useLanguage } from '../i18n/LanguageContext';

export default function FiscaliteitPage() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <Header />

      {/* Hero */}
      <section className="bg-primary-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-accent-400 font-semibold mb-4">{t.nav.fiscaliteit}</p>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              Fiscalisten waarop je kan rekenen
            </h1>
            <p className="text-xl text-primary-200 leading-relaxed">
              Je kent ze wel … de lange lijst van verplichtingen waaraan je als onderneming moet voldoen. 
              Wij nemen de administratie graag van je over, zodat jij je met een gerust gemoed echt kan 
              focussen op wat je graag doet: ondernemen.
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
                Van btw-aangiftes over successieplanning tot begeleiding bij fiscale controles … 
                Ons ervaren en multidisciplinair team staat garant voor een stipte en degelijke aanpak 
                van elk vraagstuk. We gaan telkens op zoek naar de beste oplossingen om de fiscale positie 
                van jouw onderneming op een correcte manier te optimaliseren.
              </p>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-primary-900 mb-4">Je kan op ons rekenen voor:</h3>
                <ul className="space-y-3">
                  <ServiceItem>Alle courante aangiftes (btw, personenbelasting, BNI, vennootschapsbelasting, rechtspersonenbelasting, …)</ServiceItem>
                  <ServiceItem>Loonoptimalisatie</ServiceItem>
                  <ServiceItem>Fiscale optimalisatie (btw, directe belastingen, successie- en registratierechten)</ServiceItem>
                  <ServiceItem>Fiscale controles</ServiceItem>
                  <ServiceItem>Vastgoedfiscaliteit</ServiceItem>
                </ul>
              </div>

              {/* Subsections */}
              <div className="pt-8 space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-primary-900 mb-4 flex items-center gap-3">
                    <Users className="w-6 h-6 text-accent-500" />
                    Brede en diepgaande kennis
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Door de complementariteit van ons team beschikken we over een brede en diepgaande kennis 
                    van de actuele fiscaliteit. Voor complexere zaken kunnen we vertrouwen op een uitgebreid 
                    netwerk van externe adviseurs waarmee we nauw samenwerken.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-primary-900 mb-4 flex items-center gap-3">
                    <Lightbulb className="w-6 h-6 text-accent-500" />
                    Onderbouwd advies
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Fiscaliteit dekt echter maar enkele puzzelstukjes in het grotere plaatje van het 
                    hedendaagse ondernemerschap. Wanneer we naast het fiscale luik ook jouw boekhouding 
                    bijhouden, kunnen we je onderbouwd advies geven om je bedrijfsvoering naar een niveau 
                    te brengen waar jij je goed bij voelt.
                  </p>
                </div>

                <div className="bg-accent-50 border-l-4 border-accent-500 p-6">
                  <h3 className="text-xl font-bold text-primary-900 mb-2">Fiscale optimalisatie</h3>
                  <p className="text-gray-700">
                    Wil je graag een verkennend gesprek over fiscale optimalisatie voor jouw onderneming?
                  </p>
                  <Link 
                    to="/#contact" 
                    className="inline-flex items-center gap-2 text-accent-600 font-semibold mt-3 hover:text-accent-700"
                  >
                    Contacteer ons
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-primary-900 text-white p-8 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Neem contact op</h3>
                <p className="text-primary-200 mb-6">
                  Laat ons jouw fiscale zaken professioneel beheren.
                </p>
                <Link
                  to="/register"
                  className="block w-full bg-accent-500 text-white text-center py-3 font-semibold hover:bg-accent-600 transition-colors"
                >
                  Start nu
                </Link>
                <div className="mt-6 pt-6 border-t border-primary-700 text-sm text-primary-300">
                  <p>T. 050/45 70 31</p>
                  <p>brugge@oostboek.be</p>
                </div>
              </div>

              {/* Quick links */}
              <div className="border border-gray-200 p-6 rounded-lg">
                <h4 className="font-bold text-primary-900 mb-4">Andere diensten</h4>
                <div className="space-y-3">
                  <Link to="/boekhouding" className="flex items-center gap-2 text-gray-600 hover:text-accent-600 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                    Boekhouding
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
            <FeatureCard icon={Shield} title="BTW-aangiftes" description="Stipt en correct" />
            <FeatureCard icon={FileCheck} title="Belastingen" description="Alle types aangiftes" />
            <FeatureCard icon={Scale} title="Optimalisatie" description="Correcte fiscale positie" />
            <FeatureCard icon={Building2} title="Vastgoed" description="Vastgoedfiscaliteit" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-800 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Klaar om te starten?</h2>
          <p className="text-primary-200 mb-8">
            Registreer nu en krijg toegang tot ons digitale klantenportaal.
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

function FeatureCard({ icon: Icon, title, description }: { 
  icon: React.ComponentType<{ className?: string }>; 
  title: string; 
  description: string; 
}) {
  return (
    <div className="bg-white p-6 border border-gray-200 text-center">
      <div className="w-12 h-12 bg-primary-900 rounded flex items-center justify-center mx-auto mb-4">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="font-bold text-primary-900 mb-1">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
