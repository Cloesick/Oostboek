import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, Check } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { api } from '../services/api';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gdprConsent: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Wachtwoorden komen niet overeen');
      return;
    }

    if (formData.password.length < 8) {
      setError('Wachtwoord moet minimaal 8 tekens bevatten');
      return;
    }

    if (!formData.gdprConsent) {
      setError('U moet akkoord gaan met de privacyvoorwaarden');
      return;
    }

    setLoading(true);

    try {
      const response = await api.register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        gdprConsent: formData.gdprConsent,
      });
      
      if (response.success && response.data) {
        login(response.data.user, response.data.token);
        navigate('/dashboard');
      } else {
        setError(response.error || 'Registratie mislukt');
      }
    } catch (err) {
      setError('Er is een fout opgetreden. Probeer het opnieuw.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="px-4 py-4">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Terug naar home
        </Link>
      </header>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">O</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Account aanmaken</h1>
            <p className="text-gray-600 mt-2">Start uw digitale boekhoudervaring</p>
          </div>

          <form onSubmit={handleSubmit} className="card space-y-5">
            {error && (
              <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  Voornaam
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Achternaam
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-mailadres
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className="input"
                placeholder="uw@email.be"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Wachtwoord
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input pr-10"
                  placeholder="Minimaal 8 tekens"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Bevestig wachtwoord
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            {/* GDPR Consent */}
            <div className="flex items-start space-x-3">
              <div className="relative flex items-center">
                <input
                  id="gdprConsent"
                  name="gdprConsent"
                  type="checkbox"
                  checked={formData.gdprConsent}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div
                  onClick={() => setFormData((prev) => ({ ...prev, gdprConsent: !prev.gdprConsent }))}
                  className={`w-5 h-5 rounded border-2 cursor-pointer flex items-center justify-center transition-colors ${
                    formData.gdprConsent
                      ? 'bg-primary-600 border-primary-600'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {formData.gdprConsent && <Check className="w-3 h-3 text-white" />}
                </div>
              </div>
              <label htmlFor="gdprConsent" className="text-sm text-gray-600 cursor-pointer">
                Ik ga akkoord met de{' '}
                <a href="#" className="text-primary-600 hover:underline">
                  privacyvoorwaarden
                </a>{' '}
                en geef toestemming voor de verwerking van mijn gegevens conform de GDPR.
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3"
            >
              {loading ? 'Account aanmaken...' : 'Registreren'}
            </button>

            <p className="text-center text-sm text-gray-600">
              Heeft u al een account?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                Log hier in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
