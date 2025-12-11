import { useState } from 'react';
import { X, FileText, ChevronRight, Check, Download } from 'lucide-react';

type FieldType = 'text' | 'number' | 'date' | 'select' | 'textarea';

interface FieldDefinition {
  key: string;
  label: string;
  type: FieldType;
  required: boolean;
  placeholder?: string;
  prefix?: string;
  options?: string[];
}

interface DocumentTypeConfig {
  label: string;
  description: string;
  icon: string;
  fields: FieldDefinition[];
}

// Document types with their preset field sets
const DOCUMENT_TYPES: Record<string, DocumentTypeConfig> = {
  invoice: {
    label: 'Factuur / Invoice',
    description: 'Aankoop- of verkoopfactuur',
    icon: '🧾',
    fields: [
      { key: 'invoiceNumber', label: 'Factuurnummer', type: 'text' as FieldType, required: true },
      { key: 'invoiceDate', label: 'Factuurdatum', type: 'date' as FieldType, required: true },
      { key: 'dueDate', label: 'Vervaldatum', type: 'date', required: false },
      { key: 'supplierName', label: 'Leverancier', type: 'text', required: true },
      { key: 'supplierVat', label: 'BTW-nummer leverancier', type: 'text', required: false, placeholder: 'BE0123456789' },
      { key: 'subtotal', label: 'Bedrag excl. BTW', type: 'number', required: true, prefix: '€' },
      { key: 'vatRate', label: 'BTW-tarief', type: 'select', required: true, options: ['0%', '6%', '12%', '21%'] },
      { key: 'vatAmount', label: 'BTW-bedrag', type: 'number', required: true, prefix: '€' },
      { key: 'totalAmount', label: 'Totaal incl. BTW', type: 'number', required: true, prefix: '€' },
      { key: 'paymentReference', label: 'Gestructureerde mededeling', type: 'text', required: false, placeholder: '+++123/4567/89012+++' },
    ],
  },
  receipt: {
    label: 'Kasticket / Onkostennota',
    description: 'Kassabon of onkostenbewijs',
    icon: '🧾',
    fields: [
      { key: 'merchantName', label: 'Handelaar', type: 'text', required: true },
      { key: 'transactionDate', label: 'Datum', type: 'date', required: true },
      { key: 'totalAmount', label: 'Totaalbedrag', type: 'number', required: true, prefix: '€' },
      { key: 'vatAmount', label: 'BTW-bedrag', type: 'number', required: false, prefix: '€' },
      { key: 'expenseCategory', label: 'Kostenrubriek', type: 'select', required: true, options: [
        'Kantoorbenodigdheden', 'Brandstof', 'Maaltijden', 'Vervoer', 'Telecom', 'Verzekeringen', 'Onderhoud', 'Andere'
      ]},
      { key: 'paymentMethod', label: 'Betaalmethode', type: 'select', required: false, options: ['Cash', 'Bancontact', 'Kredietkaart', 'Overschrijving'] },
      { key: 'description', label: 'Omschrijving', type: 'textarea', required: false },
    ],
  },
  bankStatement: {
    label: 'Bankafschrift',
    description: 'Rekeninguittreksels',
    icon: '🏦',
    fields: [
      { key: 'accountNumber', label: 'Rekeningnummer (IBAN)', type: 'text', required: true, placeholder: 'BE00 0000 0000 0000' },
      { key: 'statementNumber', label: 'Afschriftnummer', type: 'text', required: false },
      { key: 'periodStart', label: 'Periode van', type: 'date', required: true },
      { key: 'periodEnd', label: 'Periode tot', type: 'date', required: true },
      { key: 'openingBalance', label: 'Beginsaldo', type: 'number', required: true, prefix: '€' },
      { key: 'closingBalance', label: 'Eindsaldo', type: 'number', required: true, prefix: '€' },
      { key: 'transactionCount', label: 'Aantal transacties', type: 'number', required: false },
    ],
  },
  contract: {
    label: 'Contract / Overeenkomst',
    description: 'Huur, arbeids- of andere contracten',
    icon: '📝',
    fields: [
      { key: 'contractType', label: 'Type contract', type: 'select', required: true, options: [
        'Huurcontract', 'Arbeidsovereenkomst', 'Leasecontract', 'Dienstenovereenkomst', 'Andere'
      ]},
      { key: 'partyA', label: 'Partij A (u)', type: 'text', required: true },
      { key: 'partyB', label: 'Partij B (tegenpartij)', type: 'text', required: true },
      { key: 'effectiveDate', label: 'Ingangsdatum', type: 'date', required: true },
      { key: 'endDate', label: 'Einddatum', type: 'date', required: false },
      { key: 'contractAmount', label: 'Bedrag', type: 'number', required: false, prefix: '€' },
      { key: 'paymentFrequency', label: 'Betalingsfrequentie', type: 'select', required: false, options: [
        'Eenmalig', 'Maandelijks', 'Driemaandelijks', 'Jaarlijks'
      ]},
      { key: 'notes', label: 'Opmerkingen', type: 'textarea', required: false },
    ],
  },
  taxDocument: {
    label: 'Fiscaal document',
    description: 'BTW-aangifte, aanslagbiljet, attest',
    icon: '📋',
    fields: [
      { key: 'documentType', label: 'Type document', type: 'select', required: true, options: [
        'BTW-aangifte', 'Aanslagbiljet PB', 'Aanslagbiljet VenB', 'Fiscaal attest', 'Voorafbetaling', 'Andere'
      ]},
      { key: 'taxPeriod', label: 'Belastingperiode', type: 'text', required: true, placeholder: 'Q1 2024 of AJ 2024' },
      { key: 'referenceNumber', label: 'Referentienummer', type: 'text', required: false },
      { key: 'taxableBase', label: 'Belastbare grondslag', type: 'number', required: false, prefix: '€' },
      { key: 'taxDue', label: 'Verschuldigde belasting', type: 'number', required: false, prefix: '€' },
      { key: 'deductibleAmount', label: 'Aftrekbaar bedrag', type: 'number', required: false, prefix: '€' },
      { key: 'netPayable', label: 'Netto te betalen/ontvangen', type: 'number', required: false, prefix: '€' },
      { key: 'dueDate', label: 'Uiterste betaaldatum', type: 'date', required: false },
    ],
  },
  annualAccounts: {
    label: 'Jaarrekening',
    description: 'Balans, resultatenrekening',
    icon: '📊',
    fields: [
      { key: 'companyName', label: 'Vennootschapsnaam', type: 'text', required: true },
      { key: 'enterpriseNumber', label: 'Ondernemingsnummer', type: 'text', required: true, placeholder: '0123.456.789' },
      { key: 'financialYear', label: 'Boekjaar', type: 'text', required: true, placeholder: '01/01/2024 - 31/12/2024' },
      { key: 'totalAssets', label: 'Totaal activa', type: 'number', required: false, prefix: '€' },
      { key: 'totalEquity', label: 'Eigen vermogen', type: 'number', required: false, prefix: '€' },
      { key: 'revenue', label: 'Omzet', type: 'number', required: false, prefix: '€' },
      { key: 'profitLoss', label: 'Winst/Verlies', type: 'number', required: false, prefix: '€' },
      { key: 'depositDate', label: 'Neerleggingsdatum', type: 'date', required: false },
    ],
  },
  payslip: {
    label: 'Loonfiche',
    description: 'Loonbrief of loonafrekening',
    icon: '💰',
    fields: [
      { key: 'employeeName', label: 'Naam werknemer', type: 'text', required: true },
      { key: 'employerName', label: 'Naam werkgever', type: 'text', required: true },
      { key: 'payPeriod', label: 'Loonperiode', type: 'text', required: true, placeholder: 'December 2024' },
      { key: 'grossSalary', label: 'Brutoloon', type: 'number', required: true, prefix: '€' },
      { key: 'socialSecurity', label: 'RSZ-bijdrage', type: 'number', required: false, prefix: '€' },
      { key: 'taxWithheld', label: 'Bedrijfsvoorheffing', type: 'number', required: false, prefix: '€' },
      { key: 'netSalary', label: 'Nettoloon', type: 'number', required: true, prefix: '€' },
      { key: 'paymentDate', label: 'Betaaldatum', type: 'date', required: false },
    ],
  },
  other: {
    label: 'Ander document',
    description: 'Overige documenten',
    icon: '📄',
    fields: [
      { key: 'documentTitle', label: 'Titel document', type: 'text', required: true },
      { key: 'documentDate', label: 'Datum document', type: 'date', required: true },
      { key: 'category', label: 'Categorie', type: 'select', required: true, options: [
        'Administratief', 'Juridisch', 'Financieel', 'Personeelszaken', 'Andere'
      ]},
      { key: 'description', label: 'Beschrijving', type: 'textarea', required: true },
      { key: 'relatedAmount', label: 'Gerelateerd bedrag', type: 'number', required: false, prefix: '€' },
    ],
  },
};

type DocumentType = keyof typeof DOCUMENT_TYPES;

export interface ProcessedDocument {
  id: string;
  fileName: string;
  fileSize: string;
  documentType: string;
  documentTypeLabel: string;
  documentTypeIcon: string;
  fields: Record<string, string>;
  uploadedAt: Date;
}

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (document: ProcessedDocument) => void;
  file: { name: string; size: string; rawFile?: File } | null;
}

export default function DocumentUploadModal({ isOpen, onClose, onComplete, file }: DocumentUploadModalProps) {
  const [step, setStep] = useState<'type' | 'fields' | 'review'>('type');
  const [selectedType, setSelectedType] = useState<DocumentType | null>(null);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !file) return null;

  const handleTypeSelect = (type: DocumentType) => {
    setSelectedType(type);
    setFieldValues({});
    setStep('fields');
  };

  const handleFieldChange = (key: string, value: string) => {
    setFieldValues(prev => ({ ...prev, [key]: value }));
  };

  const handleFieldsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('review');
  };

  const generateXML = (): string => {
    if (!selectedType) return '';
    
    const docType = DOCUMENT_TYPES[selectedType];
    const timestamp = new Date().toISOString();
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<Document type="${selectedType}" generated="${timestamp}">\n`;
    xml += `  <Metadata>\n`;
    xml += `    <FileName>${file.name}</FileName>\n`;
    xml += `    <FileSize>${file.size}</FileSize>\n`;
    xml += `    <DocumentType>${docType.label}</DocumentType>\n`;
    xml += `  </Metadata>\n`;
    xml += `  <Fields>\n`;
    
    docType.fields.forEach(field => {
      const value = fieldValues[field.key] || '';
      if (value) {
        xml += `    <${field.key}>${escapeXml(value)}</${field.key}>\n`;
      }
    });
    
    xml += `  </Fields>\n`;
    xml += `</Document>`;
    
    return xml;
  };

  const escapeXml = (str: string): string => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  };

  const handleSubmit = async () => {
    if (!selectedType) return;
    
    setIsSubmitting(true);
    
    // Generate XML
    const xml = generateXML();
    console.log('Generated XML:', xml);
    
    // TODO: Send to backend
    // await api.uploadDocument({ file: file.rawFile, xml, type: selectedType });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create processed document object
    const docType = DOCUMENT_TYPES[selectedType];
    const processedDoc: ProcessedDocument = {
      id: Date.now().toString(),
      fileName: file.name,
      fileSize: file.size,
      documentType: selectedType,
      documentTypeLabel: docType.label,
      documentTypeIcon: docType.icon,
      fields: { ...fieldValues },
      uploadedAt: new Date(),
    };
    
    setIsSubmitting(false);
    
    // Call onComplete with processed document
    onComplete(processedDoc);
    onClose();
    
    // Reset state
    setStep('type');
    setSelectedType(null);
    setFieldValues({});
  };

  const handleDownloadXML = () => {
    const xml = generateXML();
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file.name.replace(/\.[^/.]+$/, '')}_metadata.xml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderTypeSelection = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <FileText className="w-8 h-8 text-accent-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Welk type document is dit?</h3>
        <p className="text-sm text-gray-500 mt-1">
          Bestand: <span className="font-medium">{file.name}</span> ({file.size})
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto">
        {Object.entries(DOCUMENT_TYPES).map(([key, type]) => (
          <button
            key={key}
            onClick={() => handleTypeSelect(key as DocumentType)}
            className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-colors text-left"
          >
            <span className="text-2xl">{type.icon}</span>
            <div>
              <p className="font-medium text-gray-900">{type.label}</p>
              <p className="text-xs text-gray-500">{type.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderFieldsForm = () => {
    if (!selectedType) return null;
    const docType = DOCUMENT_TYPES[selectedType];

    return (
      <form onSubmit={handleFieldsSubmit} className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <button
            type="button"
            onClick={() => setStep('type')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-400 rotate-180" />
          </button>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <span>{docType.icon}</span> {docType.label}
            </h3>
            <p className="text-sm text-gray-500">Vul de gegevens in</p>
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto space-y-4 pr-2">
          {docType.fields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              
              {field.type === 'select' ? (
                <select
                  value={fieldValues[field.key] || ''}
                  onChange={(e) => handleFieldChange(field.key, e.target.value)}
                  required={field.required}
                  className="input"
                >
                  <option value="">Selecteer...</option>
                  {field.options?.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea
                  value={fieldValues[field.key] || ''}
                  onChange={(e) => handleFieldChange(field.key, e.target.value)}
                  required={field.required}
                  placeholder={field.placeholder}
                  rows={3}
                  className="input"
                />
              ) : (
                <div className="relative">
                  {field.prefix && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      {field.prefix}
                    </span>
                  )}
                  <input
                    type={field.type}
                    value={fieldValues[field.key] || ''}
                    onChange={(e) => handleFieldChange(field.key, e.target.value)}
                    required={field.required}
                    placeholder={field.placeholder}
                    step={field.type === 'number' ? '0.01' : undefined}
                    className={`input ${field.prefix ? 'pl-8' : ''}`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-3 pt-4 border-t">
          <button
            type="button"
            onClick={() => setStep('type')}
            className="btn-secondary flex-1"
          >
            Terug
          </button>
          <button type="submit" className="btn-primary flex-1">
            Controleren
          </button>
        </div>
      </form>
    );
  };

  const renderReview = () => {
    if (!selectedType) return null;
    const docType = DOCUMENT_TYPES[selectedType];

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <button
            type="button"
            onClick={() => setStep('fields')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-400 rotate-180" />
          </button>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Controleer uw gegevens</h3>
            <p className="text-sm text-gray-500">Bevestig dat alles correct is</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{docType.icon}</span>
            <div>
              <p className="font-medium text-gray-900">{docType.label}</p>
              <p className="text-sm text-gray-500">{file.name}</p>
            </div>
          </div>
        </div>

        <div className="max-h-[300px] overflow-y-auto space-y-2">
          {docType.fields.map((field) => {
            const value = fieldValues[field.key];
            if (!value) return null;
            
            return (
              <div key={field.key} className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">{field.label}</span>
                <span className="text-sm font-medium text-gray-900">
                  {field.prefix}{value}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex gap-3 pt-4 border-t">
          <button
            type="button"
            onClick={handleDownloadXML}
            className="btn-secondary flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            XML
          </button>
          <button
            type="button"
            onClick={() => setStep('fields')}
            className="btn-secondary flex-1"
          >
            Aanpassen
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="btn-primary flex-1 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Uploaden...
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                Bevestigen
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Document verwerken</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 py-3 bg-gray-50 border-b">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step === 'type' ? 'bg-primary-600 text-white' : 'bg-primary-100 text-primary-600'
          }`}>
            1
          </div>
          <div className="w-8 h-0.5 bg-gray-300" />
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step === 'fields' ? 'bg-primary-600 text-white' : step === 'review' ? 'bg-primary-100 text-primary-600' : 'bg-gray-200 text-gray-500'
          }`}>
            2
          </div>
          <div className="w-8 h-0.5 bg-gray-300" />
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step === 'review' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'
          }`}>
            3
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'type' && renderTypeSelection()}
          {step === 'fields' && renderFieldsForm()}
          {step === 'review' && renderReview()}
        </div>
      </div>
    </div>
  );
}
