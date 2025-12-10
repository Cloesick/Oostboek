import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Building2, User, Mail, Phone, Briefcase } from 'lucide-react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xpwvjogv';

// Service categories with icons and descriptions
const serviceCategories = {
  boekhouding: { label: '📊 Boekhouding & Administratie', description: 'Volledige boekhoudkundige ondersteuning' },
  btw: { label: '📋 BTW & Aangiftes', description: 'BTW-registratie, aangiftes en optimalisatie' },
  fiscaal: { label: '💰 Fiscaal Advies', description: 'Belastingoptimalisatie en planning' },
  starter: { label: '🚀 Starters & Oprichting', description: 'Begeleiding bij het opstarten van uw zaak' },
  lonen: { label: '👥 Loonadministratie', description: 'Loonberekening en sociale secretariaat' },
  successie: { label: '🏠 Successie & Vermogen', description: 'Vermogensplanning en erfrecht' },
  overname: { label: '🤝 Overname & Fusie', description: 'Begeleiding bij aan- of verkoop bedrijf' },
  internationaal: { label: '🌍 Internationaal', description: 'Grensoverschrijdende fiscaliteit' },
  anders: { label: '❓ Andere vraag', description: 'Uw vraag past niet in bovenstaande categorieën' },
};

// Dynamic sub-fields configuration based on service selection
const serviceSubFields: Record<string, { label: string; name: string; type: 'text' | 'select' | 'number' | 'date'; options?: string[]; placeholder?: string; required?: boolean }[]> = {
  boekhouding: [
    { label: 'Type onderneming', name: 'companyType', type: 'select', options: ['Eenmanszaak', 'BV (Besloten Vennootschap)', 'NV (Naamloze Vennootschap)', 'VZW', 'Maatschap', 'VOF/CommV', 'Vrij beroep', 'Anders'], required: true },
    { label: 'Sector van activiteit', name: 'sector', type: 'select', options: ['Handel & Retail', 'Diensten & Consultancy', 'Horeca & Toerisme', 'Bouw & Renovatie', 'IT & Technologie', 'Gezondheidszorg', 'Vastgoed & Immobiliën', 'Transport & Logistiek', 'Productie & Industrie', 'Landbouw', 'Creatieve sector', 'Anders'], required: true },
    { label: 'Aantal medewerkers', name: 'employeeCount', type: 'select', options: ['Geen personeel', '1-5 medewerkers', '6-20 medewerkers', '21-50 medewerkers', '51-100 medewerkers', 'Meer dan 100'] },
    { label: 'Heeft u momenteel een boekhouder?', name: 'currentAccountant', type: 'select', options: ['Ja, maar ik wil wisselen', 'Ja, ik zoek een second opinion', 'Nee, nog geen boekhouder', 'Ik doe het momenteel zelf'] },
    { label: 'Geschat aantal facturen per jaar', name: 'invoiceCount', type: 'select', options: ['Minder dan 50', '50 tot 200', '200 tot 500', '500 tot 1000', 'Meer dan 1000'] },
    { label: 'Huidig boekhoudpakket', name: 'accountingSoftware', type: 'select', options: ['Geen specifiek pakket', 'Excel/Spreadsheets', 'Exact Online', 'Yuki', 'Octopus', 'Billit', 'Teamleader', 'Odoo', 'Anders', 'Weet ik niet'] },
    { label: 'Welke diensten wenst u?', name: 'desiredServices', type: 'select', options: ['Volledige boekhouding', 'Enkel jaarrekening', 'BTW-aangiftes', 'Loonadministratie', 'Financiële rapportering', 'Combinatie van diensten'], required: true },
  ],
  btw: [
    { label: 'BTW-plichtig sinds', name: 'vatSince', type: 'text', placeholder: 'bv. 2020 of nog niet' },
    { label: 'Type BTW-aangifte', name: 'vatType', type: 'select', options: ['Maandelijks', 'Kwartaal', 'Vrijgesteld', 'Weet ik niet'] },
    { label: 'BTW-regime', name: 'vatRegime', type: 'select', options: ['Normaal', 'Forfaitair', 'Kleine onderneming', 'Weet ik niet'] },
    { label: 'Intracommunautaire handel?', name: 'intraCommunity', type: 'select', options: ['Ja, aankopen', 'Ja, verkopen', 'Ja, beide', 'Nee', 'Weet ik niet'] },
    { label: 'Import/Export buiten EU?', name: 'importExport', type: 'select', options: ['Ja, import', 'Ja, export', 'Ja, beide', 'Nee'] },
    { label: 'Probleem of vraag?', name: 'vatIssue', type: 'select', options: ['Nieuwe registratie', 'Aangifte hulp', 'Controle/correctie', 'Teruggave', 'Advies optimalisatie', 'Anders'] },
  ],
  fiscaal: [
    { label: 'Type advies', name: 'taxAdviceType', type: 'select', options: ['Personenbelasting', 'Vennootschapsbelasting', 'Optimalisatie bezoldiging', 'Vastgoedfiscaliteit', 'Internationaal', 'Dividendbeleid', 'Investeringsaftrek', 'Anders'] },
    { label: 'Betreft het', name: 'taxSubject', type: 'select', options: ['Privé', 'Vennootschap', 'Beide', 'Groepsstructuur'] },
    { label: 'Jaarlijks belastbaar inkomen', name: 'taxableIncome', type: 'select', options: ['< €50.000', '€50.000 - €100.000', '€100.000 - €250.000', '> €250.000', 'Zeg ik liever niet'] },
    { label: 'Vastgoed in bezit?', name: 'realEstate', type: 'select', options: ['Nee', 'Ja, privé', 'Ja, in vennootschap', 'Ja, beide', 'Aankoop gepland'] },
    { label: 'Urgentie', name: 'urgency', type: 'select', options: ['Dringend (< 1 week)', 'Binnenkort (< 1 maand)', 'Geen haast', 'Planningsvraag voor volgend jaar'] },
    { label: 'Reeds fiscaal advies gehad?', name: 'previousAdvice', type: 'select', options: ['Nee, eerste keer', 'Ja, wil second opinion', 'Ja, wil opvolging'] },
  ],
  starter: [
    { label: 'Geplande startdatum', name: 'startDate', type: 'text', placeholder: 'bv. Januari 2025' },
    { label: 'Type activiteit', name: 'activityType', type: 'text', placeholder: 'bv. Consultancy, E-commerce, Horeca...' },
    { label: 'Hoofdberoep of bijberoep?', name: 'mainOrSide', type: 'select', options: ['Hoofdberoep', 'Bijberoep', 'Nog te beslissen'] },
    { label: 'Verwachte omzet jaar 1', name: 'expectedRevenue', type: 'select', options: ['< €25.000', '€25.000 - €50.000', '€50.000 - €100.000', '€100.000 - €250.000', '> €250.000', 'Weet ik nog niet'] },
    { label: 'Rechtsvorm al gekozen?', name: 'legalFormChosen', type: 'select', options: ['Ja, eenmanszaak', 'Ja, BV', 'Ja, anders', 'Nee, hulp nodig', 'Twijfel tussen opties'] },
    { label: 'Startkapitaal beschikbaar', name: 'startCapital', type: 'select', options: ['< €10.000', '€10.000 - €25.000', '€25.000 - €50.000', '> €50.000', 'Financiering nodig'] },
    { label: 'Personeel gepland?', name: 'staffPlanned', type: 'select', options: ['Nee', 'Ja, binnen jaar 1', 'Ja, later', 'Weet nog niet'] },
    { label: 'Welke hulp nodig?', name: 'helpNeeded', type: 'select', options: ['Volledige opstart', 'Alleen administratief', 'Financieel plan', 'Subsidies/steun', 'Alles'] },
  ],
  successie: [
    { label: 'Type planning', name: 'successionType', type: 'select', options: ['Schenking', 'Testament', 'Familiale overdracht bedrijf', 'Huwelijkscontract', 'Algemeen advies', 'Combinatie'] },
    { label: 'Uw leeftijd', name: 'age', type: 'select', options: ['< 50', '50-60', '60-70', '> 70', 'Zeg ik liever niet'] },
    { label: 'Gezinssituatie', name: 'familySituation', type: 'select', options: ['Gehuwd met kinderen', 'Gehuwd zonder kinderen', 'Samenwonend met kinderen', 'Samenwonend zonder kinderen', 'Alleenstaand met kinderen', 'Alleenstaand zonder kinderen', 'Nieuw samengesteld gezin'] },
    { label: 'Geschatte waarde vermogen', name: 'estateValue', type: 'select', options: ['< €500.000', '€500.000 - €1.000.000', '€1.000.000 - €2.500.000', '€2.500.000 - €5.000.000', '> €5.000.000', 'Zeg ik liever niet'] },
    { label: 'Familiebedrijf betrokken?', name: 'familyBusiness', type: 'select', options: ['Ja, actief', 'Ja, passief (aandelen)', 'Nee'] },
    { label: 'Vastgoed in vermogen?', name: 'realEstateInEstate', type: 'select', options: ['Nee', 'Ja, enkel gezinswoning', 'Ja, meerdere panden', 'Ja, buitenlands vastgoed'] },
    { label: 'Reeds stappen ondernomen?', name: 'stepsTaken', type: 'select', options: ['Nee, eerste verkenning', 'Ja, maar wil herbekijken', 'Ja, zoek second opinion', 'Ja, wil uitbreiden'] },
  ],
  overname: [
    { label: 'Type overname', name: 'acquisitionType', type: 'select', options: ['Ik wil kopen', 'Ik wil verkopen', 'Management buy-out', 'Management buy-in', 'Fusie', 'Splitsing'] },
    { label: 'Sector', name: 'sector', type: 'text', placeholder: 'bv. Retail, IT, Bouw, Horeca...' },
    { label: 'Aantal werknemers doelbedrijf', name: 'targetEmployees', type: 'select', options: ['< 5', '5-20', '20-50', '50-100', '> 100', 'Onbekend'] },
    { label: 'Fase', name: 'phase', type: 'select', options: ['Oriëntatie/zoektocht', 'Kandidaat geïdentificeerd', 'Eerste gesprekken', 'LOI/voorovereenkomst', 'Due diligence', 'Onderhandeling', 'Closing'] },
    { label: 'Geschatte transactiewaarde', name: 'transactionValue', type: 'select', options: ['< €250.000', '€250.000 - €500.000', '€500.000 - €1.000.000', '€1.000.000 - €2.500.000', '€2.500.000 - €5.000.000', '> €5.000.000', 'Onbekend'] },
    { label: 'Financiering', name: 'financing', type: 'select', options: ['Eigen middelen', 'Banklening nodig', 'Investeerders zoeken', 'Verkoperskrediet', 'Combinatie', 'Nog te bepalen'] },
    { label: 'Adviseurs reeds betrokken?', name: 'advisorsInvolved', type: 'select', options: ['Nee', 'Ja, advocaat', 'Ja, bank', 'Ja, M&A adviseur', 'Ja, meerdere'] },
    { label: 'Gewenste timing', name: 'timing', type: 'select', options: ['< 3 maanden', '3-6 maanden', '6-12 maanden', '> 12 maanden', 'Flexibel'] },
  ],
  anders: [
    { label: 'Categorie van uw vraag', name: 'otherCategory', type: 'select', options: ['Juridisch advies', 'Subsidies & steunmaatregelen', 'Internationale zaken', 'Waardering van bedrijf', 'Herstructurering', 'Geschil of conflict', 'Algemene vraag', 'Anders'], required: true },
    { label: 'Korte omschrijving', name: 'otherDescription', type: 'text', placeholder: 'Beschrijf kort waar uw vraag over gaat...', required: true },
    { label: 'Hoe dringend is uw vraag?', name: 'otherUrgency', type: 'select', options: ['Zeer dringend (binnen 48u)', 'Dringend (binnen 1 week)', 'Binnen 2 weken', 'Geen haast'] },
  ],
  lonen: [
    { label: 'Aantal werknemers', name: 'employeeCountPayroll', type: 'select', options: ['1-5', '6-10', '11-25', '26-50', '51-100', 'Meer dan 100'], required: true },
    { label: 'Type arbeidscontracten', name: 'contractTypes', type: 'select', options: ['Enkel bedienden', 'Enkel arbeiders', 'Gemengd (bedienden + arbeiders)', 'Flexi-jobs', 'Studenten', 'Combinatie'] },
    { label: 'Huidig sociaal secretariaat', name: 'currentPayrollProvider', type: 'select', options: ['Geen', 'Securex', 'Acerta', 'Partena', 'SD Worx', 'Liantis', 'Anders', 'Weet ik niet'] },
    { label: 'Reden voor contact', name: 'payrollReason', type: 'select', options: ['Nieuw bedrijf, eerste aanwerving', 'Wisselen van sociaal secretariaat', 'Uitbreiding personeel', 'Advies loonadministratie', 'Optimalisatie loonpakket', 'Anders'] },
    { label: 'Paritair comité', name: 'jointCommittee', type: 'text', placeholder: 'bv. PC 200, PC 124... (indien gekend)' },
  ],
  internationaal: [
    { label: 'Type internationale activiteit', name: 'internationalType', type: 'select', options: ['Export naar EU', 'Export buiten EU', 'Import vanuit EU', 'Import van buiten EU', 'Buitenlandse vestiging', 'Buitenlandse werknemers', 'Expat-regeling', 'Transfer pricing', 'Anders'], required: true },
    { label: 'Betrokken landen', name: 'countriesInvolved', type: 'text', placeholder: 'bv. Nederland, Frankrijk, VS...', required: true },
    { label: 'Heeft u al een structuur in het buitenland?', name: 'foreignStructure', type: 'select', options: ['Nee', 'Ja, dochteronderneming', 'Ja, filiaal', 'Ja, vaste inrichting', 'In oprichting'] },
    { label: 'Omzet uit internationale activiteiten', name: 'internationalRevenue', type: 'select', options: ['Minder dan 10%', '10-25%', '25-50%', '50-75%', 'Meer dan 75%'] },
    { label: 'Specifieke vraag', name: 'internationalQuestion', type: 'select', options: ['BTW bij internationale handel', 'Dubbele belasting vermijden', 'Optimalisatie groepsstructuur', 'Sociale zekerheid expats', 'Verrekenprijzen', 'Algemeen advies'] },
  ],
};

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState<Record<string, string>>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    service: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // If service changes, clear previous sub-field values
    if (name === 'service') {
      const currentSubFields = serviceSubFields[formData.service] || [];
      const newData: Record<string, string> = { ...formData, [name]: value };
      currentSubFields.forEach(field => {
        delete newData[field.name];
      });
      setFormData(newData);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
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

  // Get current sub-fields for validation
  const currentSubFields = serviceSubFields[formData.service] || [];
  const requiredSubFields = currentSubFields.filter(f => f.required);
  const hasAllRequiredSubFields = requiredSubFields.every(f => formData[f.name]?.trim());

  if (status === 'success') {
    return (
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg border border-green-200 p-10 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Bedankt voor uw aanvraag!</h3>
        <p className="text-gray-600 mb-2">
          Wij hebben uw bericht goed ontvangen.
        </p>
        <p className="text-gray-500 text-sm mb-8">
          Een van onze experts neemt binnen 24 uur contact met u op.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
        >
          Nog een vraag stellen
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 space-y-6">
      {/* Form Header */}
      <div className="border-b border-gray-100 pb-4 mb-2">
        <h3 className="text-lg font-semibold text-gray-900">Uw contactgegevens</h3>
        <p className="text-sm text-gray-500">Velden met * zijn verplicht</p>
      </div>

      {status === 'error' && (
        <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center gap-3 border border-red-200">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <div>
            <p className="font-medium">Er is iets misgegaan</p>
            <p className="text-red-600">Probeer het opnieuw of bel ons op 050/45 70 31</p>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-1 text-gray-400" />
            Volledige naam *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Jan Janssens"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            required
            minLength={2}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            <Mail className="w-4 h-4 inline mr-1 text-gray-400" />
            E-mailadres *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="jan@bedrijf.be"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
            <Phone className="w-4 h-4 inline mr-1 text-gray-400" />
            Telefoonnummer
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+32 xxx xx xx xx"
            pattern="[\+]?[0-9\s\-\/]{9,}"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
            <Building2 className="w-4 h-4 inline mr-1 text-gray-400" />
            Bedrijfsnaam
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            placeholder="Uw bedrijfsnaam (optioneel)"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
          />
        </div>
      </div>

      {/* Service Selection */}
      <div className="border-t border-gray-100 pt-6">
        <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
          <Briefcase className="w-4 h-4 inline mr-1 text-gray-400" />
          Waar kunnen wij u mee helpen? *
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white"
          required
        >
          <option value="">-- Selecteer een dienst --</option>
          {Object.entries(serviceCategories).map(([key, { label }]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
        {formData.service && serviceCategories[formData.service as keyof typeof serviceCategories] && (
          <p className="mt-2 text-sm text-primary-600 bg-primary-50 px-3 py-2 rounded-lg">
            ℹ️ {serviceCategories[formData.service as keyof typeof serviceCategories].description}
          </p>
        )}
      </div>

      {/* Dynamic sub-fields based on service selection */}
      {formData.service && serviceSubFields[formData.service] && (
        <div className="bg-gradient-to-br from-primary-50 to-blue-50 p-5 rounded-xl space-y-4 border border-primary-200">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
            <p className="text-sm font-semibold text-primary-800">Vertel ons meer over uw situatie</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {serviceSubFields[formData.service].map((field) => (
              <div key={field.name} className={field.type === 'text' && field.placeholder && field.placeholder.length > 30 ? 'md:col-span-2' : ''}>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                {field.type === 'select' ? (
                  <select
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    required={field.required}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white"
                  >
                    <option value="">Selecteer...</option>
                    {field.options?.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Message Field */}
      <div className="border-t border-gray-100 pt-6">
        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
          Uw bericht of vraag *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Beschrijf uw vraag of situatie zo volledig mogelijk. Hoe meer informatie, hoe beter wij u kunnen helpen..."
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all resize-none"
          required
          minLength={10}
        />
        <p className="mt-1 text-xs text-gray-400">Minimum 10 karakters</p>
      </div>

      {/* Privacy Notice */}
      <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 border border-gray-100">
        <p>
          🔒 Uw gegevens worden vertrouwelijk behandeld conform de GDPR-wetgeving. 
          Wij gebruiken uw informatie enkel om uw aanvraag te behandelen.
        </p>
      </div>

      {/* Submit Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-500 order-2 sm:order-1">
          Velden met <span className="text-red-500">*</span> zijn verplicht
        </p>
        <button
          type="submit"
          disabled={status === 'submitting' || !hasAllRequiredSubFields}
          className="order-1 sm:order-2 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
        >
          {status === 'submitting' ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Bezig met verzenden...
            </>
          ) : (
            <>
              Verstuur aanvraag
              <Send className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="px-4 py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-primary-100 text-primary-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
            Contact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Laat ons u helpen
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Heeft u vragen of wilt u vrijblijvend kennismaken? Vul het formulier in en wij nemen binnen 24 uur contact met u op.
          </p>
        </div>
        <ContactForm />
        
        {/* Alternative Contact */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Liever direct contact? Bel ons op{' '}
            <a href="tel:+3250457031" className="text-primary-600 font-medium hover:underline">
              050/45 70 31
            </a>
            {' '}of mail naar{' '}
            <a href="mailto:brugge@oostboek.be" className="text-primary-600 font-medium hover:underline">
              brugge@oostboek.be
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
