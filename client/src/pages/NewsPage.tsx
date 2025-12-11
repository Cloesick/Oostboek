import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, ArrowRight } from 'lucide-react';
import Header from '../components/Header';

const NEWS_ITEMS = [
  {
    id: 1,
    title: 'Nieuwe BTW-tarieven vanaf 2025',
    date: '2024-12-01',
    excerpt: 'De federale regering heeft nieuwe BTW-tarieven aangekondigd die van kracht worden vanaf januari 2025. Lees hier wat dit betekent voor uw onderneming.',
    category: 'Fiscaliteit',
  },
  {
    id: 2,
    title: 'Digitale facturatie wordt verplicht',
    date: '2024-11-15',
    excerpt: 'Vanaf 2026 wordt e-facturatie verplicht voor alle B2B-transacties in België. Oostboek helpt u bij de overgang naar Peppol.',
    category: 'Wetgeving',
  },
  {
    id: 3,
    title: 'Verhoogde investeringsaftrek voor KMO\'s',
    date: '2024-10-28',
    excerpt: 'Goed nieuws voor kleine en middelgrote ondernemingen: de investeringsaftrek wordt tijdelijk verhoogd naar 25%.',
    category: 'Fiscaliteit',
  },
  {
    id: 4,
    title: 'Oostboek breidt team uit',
    date: '2024-10-10',
    excerpt: 'We verwelkomen twee nieuwe collega\'s in ons team. Ontdek wie ze zijn en wat hun specialisaties zijn.',
    category: 'Kantoor',
  },
  {
    id: 5,
    title: 'Nieuwe deadlines jaarrekening 2024',
    date: '2024-09-20',
    excerpt: 'De NBB heeft de indieningsdeadlines voor de jaarrekening 2024 bekendgemaakt. Markeer deze data in uw agenda.',
    category: 'Boekhouding',
  },
];

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Terug naar home
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nieuws</h1>
          <p className="text-lg text-gray-600">
            Blijf op de hoogte van het laatste nieuws over fiscaliteit, boekhouding en wetgeving.
          </p>
        </div>

        <div className="grid gap-6">
          {NEWS_ITEMS.map((item) => (
            <article 
              key={item.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-medium bg-primary-100 text-primary-700 px-2 py-1 rounded">
                      {item.category}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(item.date).toLocaleDateString('nl-BE', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h2>
                  <p className="text-gray-600 mb-4">{item.excerpt}</p>
                  <button className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1">
                    Lees meer
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500">
            Wilt u op de hoogte blijven? Neem contact met ons op voor onze nieuwsbrief.
          </p>
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
