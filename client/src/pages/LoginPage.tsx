import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { api } from '../services/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.login(email, password);
      
      if (response.success && response.data) {
        login(response.data.user, response.data.token);
        navigate('/dashboard');
      } else {
        setError(response.error || 'Inloggen mislukt');
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
            <h1 className="text-2xl font-bold text-gray-900">Welkom terug</h1>
            <p className="text-gray-600 mt-2">Log in op uw Oostboek account</p>
          </div>

          <form onSubmit={handleSubmit} className="card space-y-6">
            {error && (
              <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-mailadres
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pr-10"
                  placeholder="••••••••"
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

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3"
            >
              {loading ? 'Bezig met inloggen...' : 'Inloggen'}
            </button>

            <p className="text-center text-sm text-gray-600">
              Nog geen account?{' '}
              <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">
                Registreer hier
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
