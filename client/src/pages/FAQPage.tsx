import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, HelpCircle, FileText, Shield, Users } from 'lucide-react';
import { useLanguage, LanguageSwitcher } from '../i18n/LanguageContext';

interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'boekhouding' | 'fiscaliteit' | 'begeleiding';
}

const faqData: { nl: FAQItem[]; en: FAQItem[] } = {
  nl: [
    // General
    {
      category: 'general',
      question: 'Wie is Oostboek?',
      answer: 'Oostboek is een boekhoudkantoor in Brugge dat al meer dan 25 jaar ondernemers begeleidt. Ons enthousiast team van relatie- en dossierbeheerders staat klaar om je boekhouding van A tot Z te verzorgen. Onze echte meerwaarde zit in ons persoonlijk partnership - we werken proactief en denken altijd met je mee over nieuwe opportuniteiten en kansen.',
    },
    {
      category: 'general',
      question: 'Voor wie is Oostboek geschikt?',
      answer: 'Wij zijn het financiële aanspreekpunt voor vrije beroepers en ondernemers. Van éénmanszaak tot kmo, van starter tot gevestigde waarde. Of je nu een nieuwe zaak opstart, een bestaand bedrijf overneemt, of al jaren actief bent - wij begeleiden je in alle aspecten.',
    },
    {
      category: 'general',
      question: 'Waar is Oostboek gevestigd?',
      answer: 'Ons kantoor bevindt zich aan de Koningin Astridlaan 134 bus 1, 8200 Brugge. Je kan ons bereiken via telefoon (050/45 70 31) of e-mail (brugge@oostboek.be).',
    },
    {
      category: 'general',
      question: 'Hoe kan ik contact opnemen met Oostboek?',
      answer: 'Je kan ons bereiken via telefoon op 050/45 70 31, via e-mail op brugge@oostboek.be, of via het contactformulier op onze website. We plannen graag een vrijblijvend kennismakingsgesprek.',
    },
    {
      category: 'general',
      question: 'Werkt Oostboek digitaal?',
      answer: 'Ja, we zetten volop in op nieuwe technologieën, geïmplementeerd op maat van jouw onderneming. In ons online systeem wordt alle info gebundeld – facturen, bewijsstukken en andere gegevens. Je hebt altijd een duidelijk overzicht van de stand van zaken. Geen fan van 100% digitaal? Dan zoeken we naar een perfect evenwicht.',
    },

    // Boekhouding
    {
      category: 'boekhouding',
      question: 'Welke boekhoudkundige diensten biedt Oostboek aan?',
      answer: 'Wij verzorgen: analytische boekhouding, opmaak van exploitatiecijfers en jaarrekeningen, periodieke rapportage & dashboards, opmaak van budgetten, financiële plannen, haalbaarheidsstudies en financiële analyses.',
    },
    {
      category: 'boekhouding',
      question: 'Hoe verloopt de boekhouding bij Oostboek?',
      answer: 'We laten jouw boekhouding zo efficiënt mogelijk verlopen via ons online systeem waar alle info wordt gebundeld. Onze dossierbeheerders controleren alles grondig en jij hebt altijd een duidelijk overzicht. We voorzien op regelmatige basis duidelijke rapporten om samen de resultaten te overlopen.',
    },
    {
      category: 'boekhouding',
      question: 'Kan Oostboek helpen als ik al een interne boekhouddienst heb?',
      answer: 'Absoluut! Heb je een interne boekhouddienst? Contacteer ons voor een second opinion of finale check. We werken graag samen met interne teams om de kwaliteit te waarborgen.',
    },
    {
      category: 'boekhouding',
      question: 'Maakt Oostboek ook jaarrekeningen op?',
      answer: 'Ja, de opmaak van jaarrekeningen is één van onze kernactiviteiten. We zorgen voor correcte en tijdige opmaak, inclusief alle wettelijk vereiste documenten en neerlegging bij de Nationale Bank.',
    },
    {
      category: 'boekhouding',
      question: 'Biedt Oostboek rapportage en dashboards aan?',
      answer: 'Ja, we voorzien periodieke rapportage en dashboards zodat je altijd inzicht hebt in de financiële gezondheid van je onderneming. Dit is het moment bij uitstek om samen de resultaten te overlopen en te adviseren over nieuwe stappen.',
    },

    // Fiscaliteit
    {
      category: 'fiscaliteit',
      question: 'Welke fiscale diensten biedt Oostboek aan?',
      answer: 'Wij verzorgen: alle courante aangiftes (btw, personenbelasting, BNI, vennootschapsbelasting, rechtspersonenbelasting), loonoptimalisatie, fiscale optimalisatie (btw, directe belastingen, successie- en registratierechten), begeleiding bij fiscale controles, en vastgoedfiscaliteit.',
    },
    {
      category: 'fiscaliteit',
      question: 'Kan Oostboek helpen bij fiscale controles?',
      answer: 'Ja, wij begeleiden je volledig bij fiscale controles. Ons ervaren team staat garant voor een stipte en degelijke aanpak. We bereiden je voor, zijn aanwezig tijdens de controle en helpen bij de afhandeling.',
    },
    {
      category: 'fiscaliteit',
      question: 'Wat is fiscale optimalisatie?',
      answer: 'Fiscale optimalisatie betekent dat we op zoek gaan naar de beste oplossingen om de fiscale positie van jouw onderneming op een correcte manier te optimaliseren. Dit omvat btw, directe belastingen, successie- en registratierechten. Wil je een verkennend gesprek? Contacteer ons!',
    },
    {
      category: 'fiscaliteit',
      question: 'Helpt Oostboek ook met successieplanning?',
      answer: 'Ja, successieplanning maakt deel uit van onze fiscale diensten. We adviseren over de meest gunstige manier om vermogen over te dragen, rekening houdend met successie- en registratierechten.',
    },
    {
      category: 'fiscaliteit',
      question: 'Verzorgt Oostboek mijn BTW-aangiftes?',
      answer: 'Ja, alle courante aangiftes inclusief btw-aangiftes worden door ons verzorgd. We zorgen voor stipte en correcte indiening zodat jij je kan focussen op ondernemen.',
    },

    // Begeleiding
    {
      category: 'begeleiding',
      question: 'Welke begeleidingsdiensten biedt Oostboek aan?',
      answer: 'Onze begeleiding omvat: startersadvies, advies bij overname/overlating/herstructurering, opbouw van administratieve en boekhoudkundige organisatie, winstprognose en fiscale raming, krediet- en subsidiebegeleiding, en vermogensplanning.',
    },
    {
      category: 'begeleiding',
      question: 'Kan Oostboek helpen bij het opstarten van een onderneming?',
      answer: 'Absoluut! Als sparringpartner begeleiden we je vanaf de prille opstart. We geven startersadvies, helpen bij de opbouw van je administratieve organisatie, maken winstprognoses en fiscale ramingen, en begeleiden je bij kredietaanvragen.',
    },
    {
      category: 'begeleiding',
      question: 'Helpt Oostboek bij bedrijfsovernames?',
      answer: 'Ja, we begeleiden je bij overname, overlating en herstructurering. We bekijken de financiële aspecten, adviseren over de structuur en helpen bij de praktische afhandeling.',
    },
    {
      category: 'begeleiding',
      question: 'Kan ik bij Oostboek terecht voor een second opinion?',
      answer: 'Zeker! Wil je een second opinion over een bepaald aspect of een unieke opportuniteit? Kom eens praten. Wij bekijken de pro\'s en contra\'s met een frisse blik en geven je eerlijk en onderbouwd advies.',
    },
    {
      category: 'begeleiding',
      question: 'Biedt Oostboek vermogensplanning aan?',
      answer: 'Ja, vermogensplanning is onderdeel van onze begeleidingsdiensten. We adviseren over de optimale structuur van je vermogen, rekening houdend met fiscale aspecten en je persoonlijke situatie.',
    },
  ],
  en: [
    // General
    {
      category: 'general',
      question: 'Who is Oostboek?',
      answer: 'Oostboek is an accounting firm in Bruges that has been guiding entrepreneurs for over 25 years. Our enthusiastic team of relationship and file managers is ready to handle your accounting from A to Z. Our real added value lies in our personal partnership - we work proactively and always think along with you about new opportunities.',
    },
    {
      category: 'general',
      question: 'Who is Oostboek suitable for?',
      answer: 'We are the financial point of contact for freelancers and entrepreneurs. From sole proprietorships to SMEs, from startups to established businesses. Whether you\'re starting a new business, taking over an existing company, or have been active for years - we guide you in all aspects.',
    },
    {
      category: 'general',
      question: 'Where is Oostboek located?',
      answer: 'Our office is located at Koningin Astridlaan 134 bus 1, 8200 Bruges, Belgium. You can reach us by phone (+32 50 45 70 31) or email (brugge@oostboek.be).',
    },
    {
      category: 'general',
      question: 'How can I contact Oostboek?',
      answer: 'You can reach us by phone at +32 50 45 70 31, by email at brugge@oostboek.be, or via the contact form on our website. We\'re happy to schedule a no-obligation introductory meeting.',
    },
    {
      category: 'general',
      question: 'Does Oostboek work digitally?',
      answer: 'Yes, we fully embrace new technologies, implemented tailored to your business. In our online system, all information is bundled – invoices, receipts, and other data. You always have a clear overview. Not a fan of 100% digital? We\'ll find the perfect balance.',
    },

    // Accounting
    {
      category: 'boekhouding',
      question: 'What accounting services does Oostboek offer?',
      answer: 'We provide: analytical accounting, preparation of operating figures and annual accounts, periodic reporting & dashboards, preparation of budgets, financial plans, feasibility studies, and financial analyses.',
    },
    {
      category: 'boekhouding',
      question: 'How does accounting work at Oostboek?',
      answer: 'We make your accounting as efficient as possible through our online system where all information is bundled. Our file managers check everything thoroughly and you always have a clear overview. We provide regular clear reports to review results together.',
    },
    {
      category: 'boekhouding',
      question: 'Can Oostboek help if I already have an internal accounting department?',
      answer: 'Absolutely! Do you have an internal accounting department? Contact us for a second opinion or final check. We\'re happy to work with internal teams to ensure quality.',
    },
    {
      category: 'boekhouding',
      question: 'Does Oostboek prepare annual accounts?',
      answer: 'Yes, preparing annual accounts is one of our core activities. We ensure correct and timely preparation, including all legally required documents and filing with the National Bank.',
    },
    {
      category: 'boekhouding',
      question: 'Does Oostboek offer reporting and dashboards?',
      answer: 'Yes, we provide periodic reporting and dashboards so you always have insight into the financial health of your business. This is the perfect moment to review results together and advise on next steps.',
    },

    // Tax Services
    {
      category: 'fiscaliteit',
      question: 'What tax services does Oostboek offer?',
      answer: 'We handle: all common tax returns (VAT, personal income tax, non-resident tax, corporate tax, legal entity tax), salary optimization, tax optimization (VAT, direct taxes, inheritance and registration duties), tax audit guidance, and real estate taxation.',
    },
    {
      category: 'fiscaliteit',
      question: 'Can Oostboek help with tax audits?',
      answer: 'Yes, we fully guide you through tax audits. Our experienced team guarantees a punctual and thorough approach. We prepare you, are present during the audit, and help with the settlement.',
    },
    {
      category: 'fiscaliteit',
      question: 'What is tax optimization?',
      answer: 'Tax optimization means we look for the best solutions to correctly optimize your company\'s tax position. This includes VAT, direct taxes, inheritance and registration duties. Want an exploratory conversation? Contact us!',
    },
    {
      category: 'fiscaliteit',
      question: 'Does Oostboek help with succession planning?',
      answer: 'Yes, succession planning is part of our tax services. We advise on the most favorable way to transfer assets, taking into account inheritance and registration duties.',
    },
    {
      category: 'fiscaliteit',
      question: 'Does Oostboek handle my VAT returns?',
      answer: 'Yes, all common returns including VAT returns are handled by us. We ensure punctual and correct filing so you can focus on running your business.',
    },

    // Advisory
    {
      category: 'begeleiding',
      question: 'What advisory services does Oostboek offer?',
      answer: 'Our guidance includes: startup advice, advice on acquisitions/transfers/restructuring, building administrative and accounting organization, profit forecasts and tax estimates, credit and subsidy guidance, and wealth planning.',
    },
    {
      category: 'begeleiding',
      question: 'Can Oostboek help with starting a business?',
      answer: 'Absolutely! As a sparring partner, we guide you from the very start. We provide startup advice, help build your administrative organization, create profit forecasts and tax estimates, and guide you through credit applications.',
    },
    {
      category: 'begeleiding',
      question: 'Does Oostboek help with business acquisitions?',
      answer: 'Yes, we guide you through acquisitions, transfers, and restructuring. We examine the financial aspects, advise on structure, and help with practical handling.',
    },
    {
      category: 'begeleiding',
      question: 'Can I get a second opinion from Oostboek?',
      answer: 'Certainly! Want a second opinion on a specific aspect or unique opportunity? Come talk to us. We\'ll look at the pros and cons with fresh eyes and give you honest, well-founded advice.',
    },
    {
      category: 'begeleiding',
      question: 'Does Oostboek offer wealth planning?',
      answer: 'Yes, wealth planning is part of our advisory services. We advise on the optimal structure of your assets, taking into account tax aspects and your personal situation.',
    },
  ],
};

const categoryLabels = {
  nl: {
    general: 'Algemeen',
    boekhouding: 'Boekhouding',
    fiscaliteit: 'Fiscaliteit',
    begeleiding: 'Begeleiding',
  },
  en: {
    general: 'General',
    boekhouding: 'Accounting',
    fiscaliteit: 'Tax Services',
    begeleiding: 'Advisory',
  },
};

const categoryIcons = {
  general: HelpCircle,
  boekhouding: FileText,
  fiscaliteit: Shield,
  begeleiding: Users,
};

export default function FAQPage() {
  const { language, t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'general' | 'boekhouding' | 'fiscaliteit' | 'begeleiding'>('all');

  const faqs = faqData[language];
  const labels = categoryLabels[language];
  
  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-surface-50 font-body">
      {/* Header */}
      <header className="bg-primary-950 text-white sticky top-0 z-50">
        <div className="bg-primary-900 border-b border-primary-800">
          <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center text-sm">
            <div className="flex items-center gap-4">
              <a href="mailto:brugge@oostboek.be" className="hover:text-accent-400 transition-colors font-medium">
                brugge@oostboek.be
              </a>
              <span className="hidden sm:inline text-primary-400">|</span>
              <span className="hidden sm:inline">{t.phone}</span>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <Link to="/login" className="bg-accent-500 px-4 py-1 rounded font-bold hover:bg-accent-600 transition-colors">
                {t.login}
              </Link>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/">
            <img src="/oostboek.png" alt="Oostboek Boekhouder Brugge - Logo" className="h-11 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <Link to="/boekhouding" className="nav-link">{t.nav.boekhouding}</Link>
            <Link to="/fiscaliteit" className="nav-link">{t.nav.fiscaliteit}</Link>
            <Link to="/begeleiding" className="nav-link">{t.nav.begeleiding}</Link>
            <Link to="/faq" className="nav-link bg-primary-800">FAQ</Link>
          </nav>
          <Link
            to="/register"
            className="hidden md:inline-flex bg-white text-primary-900 px-5 py-2 rounded font-bold hover:bg-primary-100 transition-colors"
          >
            {t.register}
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-primary-900 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <HelpCircle className="w-16 h-16 text-accent-400 mx-auto mb-6" />
          <h1 className="text-4xl font-black text-white mb-4">
            {language === 'nl' ? 'Veelgestelde Vragen' : 'Frequently Asked Questions'}
          </h1>
          <p className="text-xl text-primary-200">
            {language === 'nl' 
              ? 'Vind antwoorden op de meest gestelde vragen over onze diensten.'
              : 'Find answers to the most frequently asked questions about our services.'}
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b border-primary-100 sticky top-[104px] z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded font-semibold transition-colors ${
                activeCategory === 'all'
                  ? 'bg-accent-500 text-white'
                  : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
              }`}
            >
              {language === 'nl' ? 'Alle' : 'All'}
            </button>
            {(['general', 'boekhouding', 'fiscaliteit', 'begeleiding'] as const).map((cat) => {
              const Icon = categoryIcons[cat];
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded font-semibold transition-colors inline-flex items-center gap-2 ${
                    activeCategory === cat
                      ? 'bg-accent-500 text-white'
                      : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {labels[cat]}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-3">
            {filteredFaqs.map((faq, index) => {
              const Icon = categoryIcons[faq.category];
              const isOpen = openIndex === index;
              
              return (
                <div
                  key={index}
                  className="bg-white border border-primary-100 rounded overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-primary-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary-600" />
                      </div>
                      <span className="font-semibold text-primary-900">{faq.question}</span>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-primary-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-primary-400 flex-shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-4 pl-20">
                      <p className="text-primary-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-900 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            {language === 'nl' ? 'Nog vragen?' : 'Still have questions?'}
          </h2>
          <p className="text-primary-200 mb-6">
            {language === 'nl' 
              ? 'Neem gerust contact met ons op. We helpen je graag verder.'
              : 'Feel free to contact us. We\'re happy to help.'}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="mailto:brugge@oostboek.be"
              className="bg-accent-500 text-white px-6 py-3 rounded font-bold hover:bg-accent-600 transition-colors"
            >
              {language === 'nl' ? 'E-mail ons' : 'Email us'}
            </a>
            <a
              href="tel:+3250457031"
              className="bg-white text-primary-900 px-6 py-3 rounded font-bold hover:bg-primary-100 transition-colors"
            >
              {language === 'nl' ? 'Bel ons' : 'Call us'}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-950 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-primary-400 text-sm">
            © 2025 Oostboek. {language === 'nl' ? 'Alle rechten voorbehouden.' : 'All rights reserved.'}
          </p>
        </div>
      </footer>
    </div>
  );
}
