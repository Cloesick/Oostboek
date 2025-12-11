import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Check } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { api } from '../services/api';
import Header from '../components/Header';
import { useLanguage } from '../i18n/LanguageContext';

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
  const { t } = useLanguage();

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
      setError(t.auth.passwordMismatch);
      return;
    }

    if (formData.password.length < 8) {
      setError(t.auth.passwordTooShort);
      return;
    }

    if (!formData.gdprConsent) {
      setError(t.auth.gdprRequired);
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
        navigate('/complete-profile');
      } else {
        // Map backend errors to translated messages
        const errorMsg = response.error?.toLowerCase() || '';
        if (errorMsg.includes('already') || errorMsg.includes('exists') || errorMsg.includes('409')) {
          setError(t.auth.emailExists);
        } else if (errorMsg.includes('verbinding') || errorMsg.includes('connect')) {
          setError(t.auth.networkError);
        } else {
          setError(t.auth.registerFailed);
        }
      }
    } catch {
      setError(t.auth.networkError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">{t.auth.registerTitle}</h1>
            <p className="text-gray-600 mt-2">{t.auth.registerSubtitle}</p>
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
                  {t.auth.firstName}
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
                  {t.auth.lastName}
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
                {t.auth.email}
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
                {t.auth.password}
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
                  placeholder={t.auth.passwordMinLength}
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
                {t.auth.confirmPassword}
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
                {t.auth.gdprConsent}
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3"
            >
              {loading ? t.auth.registering : t.auth.registerButton}
            </button>

            <p className="text-center text-sm text-gray-600">
              {t.auth.hasAccount}{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                {t.auth.loginHere}
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary-950 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-sm text-primary-400">
          <p>&copy; 2025 Oostboek. {t.footer.rights}</p>
        </div>
      </footer>
    </div>
  );
}
