import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xpwvjogv';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    service: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', company: '', message: '', service: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-accent-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Bedankt voor uw bericht!</h3>
        <p className="text-gray-600 mb-6">
          Wij hebben uw aanvraag ontvangen en nemen zo snel mogelijk contact met u op.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          Nog een bericht versturen
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-5">
      {status === 'error' && (
        <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">
          Er is iets misgegaan. Probeer het opnieuw of neem telefonisch contact op.
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Naam *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            E-mailadres *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Telefoonnummer
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
            Bedrijfsnaam
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
          Waar kunnen wij u mee helpen?
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="">Selecteer een optie</option>
          <option value="boekhouding">Boekhouding</option>
          <option value="btw">BTW Administratie</option>
          <option value="fiscaal">Fiscaal Advies</option>
          <option value="starter">Startersadvies</option>
          <option value="successie">Successieplanning</option>
          <option value="overname">Overnamebegeleiding</option>
          <option value="anders">Anders</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Uw bericht *
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          required
        />
      </div>

      <div className="flex items-center justify-between pt-2">
        <p className="text-xs text-gray-500">
          * Verplichte velden
        </p>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? (
            'Verzenden...'
          ) : (
            <>
              Verstuur bericht
              <Send className="w-4 h-4 ml-2" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="px-4 py-16 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Neem contact op
          </h2>
          <p className="text-lg text-gray-600">
            Heeft u vragen of wilt u meer informatie? Vul het formulier in en wij nemen zo snel mogelijk contact met u op.
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
