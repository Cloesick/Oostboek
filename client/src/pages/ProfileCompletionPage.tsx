import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuthStore } from '../stores/authStore';
import { api } from '../services/api';

export default function ProfileCompletionPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  
  const [formData, setFormData] = useState({
    companyName: '',
    phone: '',
    legalForm: '',
    howDidYouHear: '',
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkip = () => navigate('/dashboard');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      await api.updateProfile({
        companyName: formData.companyName || undefined,
        phone: formData.phone || undefined,
        legalForm: formData.legalForm || undefined,
        howDidYouHear: formData.howDidYouHear || undefined,
      });
      navigate('/dashboard');
    } catch {
      // Still navigate on error - profile is optional
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Welkom, {user?.firstName}!
            </h1>
            <p className="text-gray-600 mt-1 text-sm">
              Nog een paar optionele gegevens om u beter te helpen.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bedrijfsnaam
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="input"
                placeholder="Uw bedrijfsnaam (optioneel)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefoonnummer
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input"
                placeholder="+32 xxx xx xx xx"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rechtsvorm
              </label>
              <select
                name="legalForm"
                value={formData.legalForm}
                onChange={handleChange}
                className="input"
              >
                <option value="">Selecteer (optioneel)</option>
                <option value="eenmanszaak">Eenmanszaak</option>
                <option value="bv">BV</option>
                <option value="nv">NV</option>
                <option value="vzw">VZW</option>
                <option value="starter">Starter (nog geen onderneming)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hoe heeft u ons gevonden?
              </label>
              <select
                name="howDidYouHear"
                value={formData.howDidYouHear}
                onChange={handleChange}
                className="input"
              >
                <option value="">Selecteer (optioneel)</option>
                <option value="google">Google</option>
                <option value="referral">Doorverwijzing</option>
                <option value="social">Social media</option>
                <option value="other">Anders</option>
              </select>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={handleSkip}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Overslaan
              </button>
              <button
                type="submit"
                disabled={saving}
                className="btn-primary inline-flex items-center gap-2"
              >
                {saving ? 'Opslaan...' : 'Doorgaan'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <p className="text-center text-xs text-gray-400 mt-4">
            U kunt dit later aanpassen in uw profiel.
          </p>
        </div>
      </div>

      <footer className="bg-primary-950 text-white py-6 px-4">
        <div className="max-w-6xl mx-auto text-center text-sm text-primary-400">
          <p>&copy; 2025 Oostboek. {t.footer.rights}</p>
        </div>
      </footer>
    </div>
  );
}
