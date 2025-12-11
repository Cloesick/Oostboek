import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-primary-950 text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img src="/oostboek.png" alt="Oostboek Boekhouder Brugge - Logo" className="h-11 w-auto" />
            </Link>
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
              <Link to="/" className="block text-primary-300 hover:text-accent-400 transition-colors">Home</Link>
              <Link to="/boekhouding" className="block text-primary-300 hover:text-accent-400 transition-colors">Boekhouding</Link>
              <Link to="/fiscaliteit" className="block text-primary-300 hover:text-accent-400 transition-colors">Fiscaliteit</Link>
              <Link to="/begeleiding" className="block text-primary-300 hover:text-accent-400 transition-colors">Begeleiding</Link>
              <Link to="/nieuws" className="block text-primary-300 hover:text-accent-400 transition-colors">Nieuws</Link>
              <Link to="/vacatures" className="block text-primary-300 hover:text-accent-400 transition-colors">Vacatures</Link>
              <Link to="/links" className="block text-primary-300 hover:text-accent-400 transition-colors">Links</Link>
              <Link to="/dashboard" className="block text-primary-300 hover:text-accent-400 transition-colors">Dashboard</Link>
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
  );
}
