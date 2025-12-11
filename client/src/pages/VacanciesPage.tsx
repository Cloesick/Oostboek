import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Briefcase, ArrowRight } from 'lucide-react';
import Header from '../components/Header';

const VACANCIES = [
  {
    id: 1,
    title: 'Junior Accountant',
    location: 'Brugge',
    type: 'Voltijds',
    department: 'Boekhouding',
    description: 'Ben je pas afgestudeerd en wil je je carrière starten in een dynamisch boekhoudkantoor? Wij zoeken een gemotiveerde junior accountant om ons team te versterken.',
    requirements: [
      'Bachelor in accountancy of gelijkwaardig',
      'Kennis van boekhoudkundige software',
      'Goede kennis van Nederlands en Frans',
      'Teamspeler met oog voor detail',
    ],
  },
  {
    id: 2,
    title: 'Fiscaal Adviseur',
    location: 'Brugge',
    type: 'Voltijds',
    department: 'Fiscaliteit',
    description: 'Voor ons groeiend fiscaal team zoeken we een ervaren fiscaal adviseur die onze klanten kan begeleiden bij complexe fiscale vraagstukken.',
    requirements: [
      'Master in fiscaliteit of rechten',
      'Minimum 3 jaar ervaring',
      'Uitstekende analytische vaardigheden',
      'Klantgerichte instelling',
    ],
  },
  {
    id: 3,
    title: 'Administratief Medewerker',
    location: 'Brugge',
    type: 'Deeltijds (50%)',
    department: 'Administratie',
    description: 'Ter ondersteuning van ons team zoeken we een administratief medewerker voor diverse ondersteunende taken.',
    requirements: [
      'Ervaring in administratieve functies',
      'Goede kennis van MS Office',
      'Organisatorisch sterk',
      'Flexibel en stressbestendig',
    ],
  },
];

export default function VacanciesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Terug naar home
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Vacatures</h1>
          <p className="text-lg text-gray-600">
            Wil je deel uitmaken van ons team? Bekijk onze openstaande vacatures en solliciteer vandaag nog!
          </p>
        </div>

        {VACANCIES.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Geen openstaande vacatures</h2>
            <p className="text-gray-600 mb-6">
              Momenteel hebben we geen openstaande vacatures, maar we zijn altijd geïnteresseerd in talent!
            </p>
            <Link to="/contact" className="btn-primary">
              Stuur een open sollicitatie
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {VACANCIES.map((vacancy) => (
              <article 
                key={vacancy.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-xs font-medium bg-accent-100 text-accent-700 px-2 py-1 rounded">
                      {vacancy.department}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {vacancy.location}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {vacancy.type}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">{vacancy.title}</h2>
                  <p className="text-gray-600 mb-4">{vacancy.description}</p>
                  
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-900 mb-2">Vereisten:</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {vacancy.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <a 
                      href={`mailto:jobs@oostboek.be?subject=Sollicitatie: ${vacancy.title}`}
                      className="btn-primary inline-flex items-center gap-2"
                    >
                      Solliciteer nu
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <button className="btn-secondary">
                      Meer info
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-12 bg-primary-50 rounded-xl p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Geen passende vacature gevonden?</h2>
          <p className="text-gray-600 mb-4">
            Stuur ons een open sollicitatie! We zijn altijd op zoek naar gemotiveerde mensen.
          </p>
          <a 
            href="mailto:jobs@oostboek.be?subject=Open sollicitatie"
            className="btn-primary"
          >
            Stuur open sollicitatie
          </a>
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
