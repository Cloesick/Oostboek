export type Language = 'nl' | 'en';

export const translations = {
  nl: {
    // Header
    login: 'LOGIN',
    register: 'REGISTREREN',
    phone: 'T. 050/45 70 31',
    tagline: 'Boekhouders & mee(r)denkers',
    
    // Navigation
    nav: {
      boekhouding: 'Boekhouding',
      fiscaliteit: 'Fiscaliteit',
      begeleiding: 'Begeleiding',
      contact: 'Contact',
    },
    
    // Hero
    hero: {
      title1: 'Boekhouders en',
      title2: 'mee(r)denkers',
      subtitle: 'Wij begeleiden je doorheen elk aspect van het ondernemerschap. Van opstart tot groei, van fiscaliteit tot vermogensplanning.',
      cta: 'START NU',
      secondary: 'Onze diensten',
    },
    
    // Data visualization
    data: {
      clientResults: 'Klantresultaten',
      fiscalSavings: 'Fiscale besparing',
      adminEfficiency: 'Administratieve efficiëntie',
      satisfaction: 'Klanttevredenheid',
      clients: 'Klanten',
      years: 'Jaar',
      saved: 'Bespaard',
      avgFiscalSavings: 'Gem. fiscale besparing',
      activeClients: 'Actieve klanten',
      yearsExperience: 'Jaar ervaring',
    },
    
    // Services
    services: {
      title: 'Onze Expertise',
      boekhouding: {
        title: 'Boekhouding',
        description: 'Analytische boekhouding, jaarrekeningen, rapportage & dashboards, financiële analyses.',
      },
      fiscaliteit: {
        title: 'Fiscaliteit',
        description: 'BTW-aangiftes, vennootschapsbelasting, loonoptimalisatie, fiscale controles.',
      },
      begeleiding: {
        title: 'Begeleiding',
        description: 'Startersadvies, overname, kredietbegeleiding, vermogensplanning.',
      },
      readMore: 'lees meer',
    },
    
    // About
    about: {
      title: 'Persoonlijke gids doorheen facts & figures',
      p1: 'Jouw boekhouding en fiscaliteit van A tot Z bijhouden en verzorgen, is voor ons een evidentie. Onze echte meerwaarde zit hem vooral in ons persoonlijk partnership.',
      p2: 'Proactief werken en meedenken over nieuwe opportuniteiten is onze tweede natuur. Altijd to the point, met oog voor duurzaamheid en discretie.',
      cta: 'Start vandaag',
      whatWeDo: 'Wat we doen',
      services: [
        'Analytische boekhouding & jaarrekeningen',
        'Alle fiscale aangiftes & optimalisatie',
        'Startersadvies & kredietbegeleiding',
        'Vermogensplanning & successie',
      ],
    },
    
    // Platform
    platform: {
      title: 'Uw digitale klantenportaal',
      subtitle: '24/7 toegang tot al uw boekhoudkundige zaken, waar en wanneer u maar wilt.',
      appointments: { title: 'Afspraken', description: 'Plan eenvoudig een afspraak met onze specialisten.' },
      assistant: { title: 'AI Assistent', description: 'Direct antwoord op uw vragen over BTW, facturatie en meer.' },
      documents: { title: 'Documenten', description: 'Upload en bekijk uw documenten veilig online.' },
      access: { title: '24/7 Toegang', description: 'Bekijk uw status wanneer het u uitkomt.' },
    },
    
    // Contact
    contact: {
      title: 'Neem contact op',
      subtitle: 'Heeft u vragen of wilt u meer informatie? Vul het formulier in en wij nemen zo snel mogelijk contact met u op.',
      form: {
        name: 'Naam',
        email: 'E-mail',
        phone: 'Telefoon',
        company: 'Bedrijf',
        service: 'Dienst',
        selectService: 'Selecteer een dienst',
        message: 'Bericht',
        submit: 'Verstuur bericht',
        sending: 'Verzenden...',
        success: 'Bedankt! We nemen zo snel mogelijk contact met u op.',
        error: 'Er is iets misgegaan. Probeer het opnieuw.',
      },
    },
    
    // CTA
    cta: {
      title: 'Klaar om te beginnen?',
      subtitle: 'Registreer vandaag nog en ontdek hoe Oostboek uw boekhouding eenvoudiger maakt.',
      button: 'Gratis registreren',
    },
    
    // Footer
    footer: {
      description: 'Professioneel advies en persoonlijke begeleiding. Starter of gevestigde onderneming? Oostboek denkt proactief mee over elke opportuniteit.',
      contact: 'Contact',
      navigation: 'Navigatie',
      home: 'Home',
      about: 'About',
      team: 'Team',
      rights: 'Alle rechten voorbehouden.',
      cookies: 'Cookies',
      privacy: 'Privacyverklaring',
      gdpr: 'GDPR-compliant',
    },
    
    // Auth
    auth: {
      loginTitle: 'Inloggen',
      loginSubtitle: 'Welkom terug bij Oostboek',
      email: 'E-mailadres',
      password: 'Wachtwoord',
      loginButton: 'Inloggen',
      noAccount: 'Nog geen account?',
      registerHere: 'Registreer hier',
      registerTitle: 'Account aanmaken',
      registerSubtitle: 'Start uw digitale boekhoudervaring',
      firstName: 'Voornaam',
      lastName: 'Achternaam',
      confirmPassword: 'Bevestig wachtwoord',
      gdprConsent: 'Ik ga akkoord met de privacyvoorwaarden en geef toestemming voor de verwerking van mijn gegevens conform de GDPR.',
      registerButton: 'Registreren',
      hasAccount: 'Heeft u al een account?',
      loginHere: 'Log hier in',
      passwordMinLength: 'Minimaal 8 tekens',
      passwordMismatch: 'Wachtwoorden komen niet overeen',
      passwordTooShort: 'Wachtwoord moet minimaal 8 tekens bevatten',
      gdprRequired: 'U moet akkoord gaan met de privacyvoorwaarden',
      registering: 'Account aanmaken...',
      error: 'Er is een fout opgetreden. Probeer het opnieuw.',
      sessionExpired: 'Sessie verlopen. Log opnieuw in.',
      networkError: 'Kan geen verbinding maken met de server. Controleer uw internetverbinding.',
      invalidCredentials: 'Ongeldige inloggegevens. Controleer uw e-mail en wachtwoord.',
      emailExists: 'Dit e-mailadres is al geregistreerd.',
      loginFailed: 'Inloggen mislukt. Probeer het opnieuw.',
      registerFailed: 'Registratie mislukt. Probeer het opnieuw.',
    },

    // Pages
    pages: {
      boekhouding: {
        hero: 'Een boekhouder die met je meedenkt',
        heroSub: 'Op zoek naar een \'boekhoudpartner\' in Brugge om jouw boekhouding efficiënt te beheren? Wij zijn graag het financiële aanspreekpunt voor vrije beroepers en ondernemers. Van éénmanszaak tot kmo en van starter tot gevestigde waarde.',
        intro: 'We laten jouw boekhouding zo efficiënt mogelijk verlopen en zetten daarbij volop in op nieuwe technologieën, geïmplementeerd op maat van jouw onderneming.',
        services: 'Wij staan in voor o.a.',
        notDigital: 'Geen fan van 100% digitaal?',
        notDigitalText: 'Dan zoeken we naar een perfect evenwicht voor jouw boekhouding. Altijd optimaal, op tijd en correct.',
        internal: 'Interne boekhouddienst?',
        internalText: 'Heb je een interne boekhouddienst? Contacteer ons voor een second opinion of finale check!',
        contactUs: 'Neem contact op',
        contactSub: 'Klaar om jouw boekhouding naar een hoger niveau te tillen?',
        startNow: 'Start nu',
        otherServices: 'Andere diensten',
        readyToStart: 'Klaar om te starten?',
        registerNow: 'Registreer nu en krijg toegang tot ons digitale klantenportaal.',
      },
      faq: {
        title: 'Veelgestelde vragen',
        subtitle: 'Vind snel antwoord op de meest gestelde vragen.',
        notFound: 'Staat uw vraag er niet bij?',
        contactUs: 'Neem contact op',
      },
      calendly: {
        title: 'Plan een afspraak',
        subtitle: '',
      },
    },

    // FAQ items
    faqItems: {
      q1: 'Wat kost een boekhouder bij Oostboek?',
      a1: 'Onze tarieven zijn transparant en afhankelijk van uw situatie. Oprichting van een rechtspersoon (BV, VZW, ...): vanaf €1.500. Jaarlijkse boekhoudkosten: tot €2.500/jaar afhankelijk van de complexiteit en omvang van uw onderneming. Voor eenmanszaken werken we met maandelijkse forfaits vanaf €150/maand. Vraag een vrijblijvende offerte aan voor een prijs op maat.',
      q2: 'Wanneer moet ik mijn BTW-aangifte indienen?',
      a2: 'Kwartaalaangevers dienen hun BTW-aangifte in tegen de 20e van de maand volgend op het kwartaal. Maandaangevers hebben tijd tot de 20e van de volgende maand. Wij dienen uw aangiftes in via Intervat, het officiële platform van de FOD Financiën. Wij zorgen ervoor dat uw aangiftes altijd tijdig worden ingediend.',
      q3: 'Kan ik mijn boekhouding digitaal beheren?',
      a3: 'Absoluut! Via ons klantenportaal (dagboeken.oostboek.be) heeft u 24/7 toegang tot uw documenten, facturen en financiële overzichten. U kunt eenvoudig documenten uploaden en communiceren met uw dossierbeheerder. We werken ook met Billit voor digitale facturatie.',
      q4: 'Wat is het verschil tussen een eenmanszaak en een BV?',
      a4: 'Bij een eenmanszaak bent u persoonlijk aansprakelijk met uw privévermogen. Een BV biedt beperkte aansprakelijkheid en kan fiscaal voordeliger zijn vanaf een bepaald inkomen. U kunt uw onderneming opzoeken in de Kruispuntbank van Ondernemingen (KBO). Wij helpen u graag bij de keuze.',
      q5: 'Helpen jullie ook bij het opstarten van een onderneming?',
      a5: 'Zeker! Wij begeleiden starters bij de keuze van de juiste rechtsvorm, het opstellen van een financieel plan, en alle administratieve formaliteiten. Van KBO-inschrijving tot BTW-registratie via Intervat.',
      q6: 'Hoe snel kan ik een afspraak krijgen?',
      a6: 'Voor dringende zaken proberen we u binnen 48 uur te ontvangen. Voor een eerste kennismaking kunt u meestal binnen een week terecht. Boek eenvoudig online via onze agenda.',
      q7: 'Werken jullie met specifieke boekhoudprogramma\'s?',
      a7: 'Wij werken met verschillende professionele boekhoudpakketten waaronder Exact Online, Yuki, en Octopus. Voor facturatie gebruiken we ook Billit. We adviseren u graag over de beste keuze voor uw situatie.',
      q8: 'Wat gebeurt er als ik een controle krijg van de fiscus?',
      a8: 'Geen paniek! Wij bereiden het dossier voor, zijn aanwezig tijdens de controle, en verdedigen uw belangen. Onze ervaring met fiscale controles zorgt voor een vlotte afhandeling.',
      q9: 'Hoe dien ik mijn vennootschapsbelasting in?',
      a9: 'De aangifte vennootschapsbelasting gebeurt via Biztax, het online platform van de FOD Financiën. Wij verzorgen de volledige aangifte voor u, inclusief alle bijlagen en berekeningen. De deadline is doorgaans 7 maanden na het afsluiten van uw boekjaar.',
      q10: 'Wat is de 30bis-regeling voor aannemers?',
      a10: 'De 30bis-regeling verplicht opdrachtgevers om na te gaan of hun aannemer schulden heeft bij de RSZ of fiscus. Bij schulden moet u een deel van de factuur inhouden en doorstorten. Wij controleren dit voor u via het RSZ-portaal en adviseren over de correcte afhandeling.',
      q11: 'Hoe kan ik een Europees BTW-nummer controleren?',
      a11: 'Via het VIES-systeem (VAT Information Exchange System) van de Europese Commissie kunt u de geldigheid van BTW-nummers binnen de EU controleren. Dit is essentieel bij intracommunautaire leveringen. Wij doen deze controles standaard voor al uw buitenlandse klanten.',
      q12: 'Waar kan ik jaarrekeningen van andere bedrijven raadplegen?',
      a12: 'Jaarrekeningen van Belgische vennootschappen zijn publiek beschikbaar via de Balanscentrale van de Nationale Bank van België (NBB). Wij gebruiken deze informatie o.a. voor kredietanalyses en due diligence bij overnames.',
      q13: 'Hoe zit het met GDPR en privacy in mijn onderneming?',
      a13: 'Als onderneming moet u voldoen aan de GDPR-wetgeving. De Gegevensbeschermingsautoriteit (GBA) is de toezichthouder in België. Wij adviseren over de basisverplichtingen: verwerkingsregister, privacyverklaring, en beveiligingsmaatregelen. Zie ook de praktische GDPR-brochure van het VBO.',
      q14: 'Hoe bereken ik de indexatie van mijn huurprijs?',
      a14: 'De huurindexatie wordt berekend op basis van de gezondheidsindex. Statbel biedt een officiële huurcalculator aan. De formule is: nieuwe huur = basishuur × nieuw indexcijfer / aanvangsindexcijfer. Wij kunnen dit voor u berekenen en documenteren.',
      q15: 'Hoe vraag ik een fiscaal attest aan?',
      a15: 'Fiscale attesten (zoals attest geen schulden, attest artikel 442bis) kunt u aanvragen via het eServices-portaal van de FOD Financiën. Deze attesten zijn vaak nodig bij overheidsopdrachten of subsidieaanvragen. Wij kunnen deze voor u aanvragen.',
      q16: 'Wat is roerende voorheffing en hoe geef ik die aan?',
      a16: 'Roerende voorheffing is de belasting op inkomsten uit roerende goederen (dividenden, interesten). De aangifte gebeurt via RV-on-web. Het standaardtarief is 30%. Wij zorgen voor de correcte aangifte en optimaliseren waar mogelijk.',
    },
  },
  
  en: {
    // Header
    login: 'LOGIN',
    register: 'REGISTER',
    phone: 'T. +32 50 45 70 31',
    tagline: 'Accountants & Advisors',
    
    // Navigation
    nav: {
      boekhouding: 'Accounting',
      fiscaliteit: 'Tax Services',
      begeleiding: 'Advisory',
      contact: 'Contact',
    },
    
    // Hero
    hero: {
      title1: 'Accountants and',
      title2: 'Advisors',
      subtitle: 'We guide you through every aspect of entrepreneurship. From startup to growth, from taxation to wealth planning.',
      cta: 'GET STARTED',
      secondary: 'Our services',
    },
    
    // Data visualization
    data: {
      clientResults: 'Client Results',
      fiscalSavings: 'Tax Savings',
      adminEfficiency: 'Administrative Efficiency',
      satisfaction: 'Client Satisfaction',
      clients: 'Clients',
      years: 'Years',
      saved: 'Saved',
      avgFiscalSavings: 'Avg. tax savings',
      activeClients: 'Active clients',
      yearsExperience: 'Years experience',
    },
    
    // Services
    services: {
      title: 'Our Expertise',
      boekhouding: {
        title: 'Accounting',
        description: 'Analytical accounting, annual reports, reporting & dashboards, financial analysis.',
      },
      fiscaliteit: {
        title: 'Tax Services',
        description: 'VAT returns, corporate tax, salary optimization, tax audits.',
      },
      begeleiding: {
        title: 'Advisory',
        description: 'Startup advice, acquisitions, credit guidance, wealth planning.',
      },
      readMore: 'read more',
    },
    
    // About
    about: {
      title: 'Your personal guide through facts & figures',
      p1: 'Managing your accounting and taxation from A to Z is a given for us. Our real added value lies in the personal partnership we build with all our clients.',
      p2: 'Working proactively and thinking along about new opportunities is our second nature. Always to the point, with an eye for sustainability and discretion.',
      cta: 'Start today',
      whatWeDo: 'What we do',
      services: [
        'Analytical accounting & annual reports',
        'All tax returns & optimization',
        'Startup advice & credit guidance',
        'Wealth planning & succession',
      ],
    },
    
    // Platform
    platform: {
      title: 'Your digital client portal',
      subtitle: '24/7 access to all your accounting matters, wherever and whenever you want.',
      appointments: { title: 'Appointments', description: 'Easily schedule an appointment with our specialists.' },
      assistant: { title: 'AI Assistant', description: 'Instant answers to your questions about VAT, invoicing and more.' },
      documents: { title: 'Documents', description: 'Upload and view your documents securely online.' },
      access: { title: '24/7 Access', description: 'Check your status whenever it suits you.' },
    },
    
    // Contact
    contact: {
      title: 'Get in touch',
      subtitle: 'Have questions or want more information? Fill out the form and we will contact you as soon as possible.',
      form: {
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        company: 'Company',
        service: 'Service',
        selectService: 'Select a service',
        message: 'Message',
        submit: 'Send message',
        sending: 'Sending...',
        success: 'Thank you! We will contact you as soon as possible.',
        error: 'Something went wrong. Please try again.',
      },
    },
    
    // CTA
    cta: {
      title: 'Ready to get started?',
      subtitle: 'Register today and discover how Oostboek makes your accounting easier.',
      button: 'Register for free',
    },
    
    // Footer
    footer: {
      description: 'Professional advice and personal guidance. Startup or established business? Oostboek proactively thinks along with every opportunity.',
      contact: 'Contact',
      navigation: 'Navigation',
      home: 'Home',
      about: 'About',
      team: 'Team',
      rights: 'All rights reserved.',
      cookies: 'Cookies',
      privacy: 'Privacy Policy',
      gdpr: 'GDPR-compliant',
    },
    
    // Auth
    auth: {
      loginTitle: 'Sign In',
      loginSubtitle: 'Welcome back to Oostboek',
      email: 'Email address',
      password: 'Password',
      loginButton: 'Sign In',
      noAccount: "Don't have an account?",
      registerHere: 'Register here',
      registerTitle: 'Create Account',
      registerSubtitle: 'Start your digital accounting experience',
      firstName: 'First name',
      lastName: 'Last name',
      confirmPassword: 'Confirm password',
      gdprConsent: 'I agree to the privacy policy and consent to the processing of my data in accordance with GDPR.',
      registerButton: 'Register',
      hasAccount: 'Already have an account?',
      loginHere: 'Sign in here',
      passwordMinLength: 'Minimum 8 characters',
      passwordMismatch: 'Passwords do not match',
      passwordTooShort: 'Password must be at least 8 characters',
      gdprRequired: 'You must agree to the privacy policy',
      registering: 'Creating account...',
      error: 'An error occurred. Please try again.',
      sessionExpired: 'Session expired. Please log in again.',
      networkError: 'Cannot connect to server. Please check your internet connection.',
      invalidCredentials: 'Invalid credentials. Please check your email and password.',
      emailExists: 'This email address is already registered.',
      loginFailed: 'Login failed. Please try again.',
      registerFailed: 'Registration failed. Please try again.',
    },

    // Pages
    pages: {
      boekhouding: {
        hero: 'An accountant who thinks along with you',
        heroSub: 'Looking for an accounting partner in Bruges to efficiently manage your bookkeeping? We are happy to be the financial point of contact for freelancers and entrepreneurs. From sole proprietorship to SME and from startup to established business.',
        intro: 'We make your accounting as efficient as possible, fully embracing new technologies, implemented to suit your business.',
        services: 'Our services include',
        notDigital: 'Not a fan of 100% digital?',
        notDigitalText: 'Then we look for a perfect balance for your accounting. Always optimal, on time and correct.',
        internal: 'Internal accounting department?',
        internalText: 'Do you have an internal accounting department? Contact us for a second opinion or final check!',
        contactUs: 'Contact us',
        contactSub: 'Ready to take your accounting to the next level?',
        startNow: 'Start now',
        otherServices: 'Other services',
        readyToStart: 'Ready to start?',
        registerNow: 'Register now and get access to our digital client portal.',
      },
      faq: {
        title: 'Frequently Asked Questions',
        subtitle: 'Find quick answers to the most common questions.',
        notFound: 'Question not listed?',
        contactUs: 'Contact us',
      },
      calendly: {
        title: 'Schedule an appointment',
        subtitle: 'Choose a time that suits you and we will discuss your situation without obligation.',
      },
    },

    // FAQ items
    faqItems: {
      q1: 'What does an accountant at Oostboek cost?',
      a1: 'Our rates are transparent and depend on your situation. Setting up a legal entity (BV, VZW, ...): from €1,500. Annual accounting costs: up to €2,500/year depending on the complexity and size of your business. For sole proprietorships we work with monthly packages from €150/month. Request a free quote for a customized price.',
      q2: 'When do I need to file my VAT return?',
      a2: 'Quarterly filers must submit their VAT return by the 20th of the month following the quarter. Monthly filers have until the 20th of the following month. We file your returns via Intervat, the official platform of the FPS Finance. We ensure your returns are always filed on time.',
      q3: 'Can I manage my accounting digitally?',
      a3: 'Absolutely! Through our client portal (dagboeken.oostboek.be) you have 24/7 access to your documents, invoices and financial overviews. You can easily upload documents and communicate with your account manager. We also work with Billit for digital invoicing.',
      q4: 'What is the difference between a sole proprietorship and a BV?',
      a4: 'With a sole proprietorship you are personally liable with your private assets. A BV offers limited liability and can be more tax efficient from a certain income. You can look up your company in the Crossroads Bank for Enterprises (KBO). We are happy to help you with the choice.',
      q5: 'Do you also help with starting a business?',
      a5: 'Certainly! We guide starters in choosing the right legal form, drawing up a financial plan, and all administrative formalities. From KBO registration to VAT registration via Intervat.',
      q6: 'How quickly can I get an appointment?',
      a6: 'For urgent matters we try to see you within 48 hours. For a first meeting you can usually come within a week. Book easily online via our calendar.',
      q7: 'Do you work with specific accounting software?',
      a7: 'We work with various professional accounting packages including Exact Online, Yuki, and Octopus. For invoicing we also use Billit. We are happy to advise you on the best choice for your situation.',
      q8: 'What happens if I get an audit from the tax authorities?',
      a8: 'No panic! We prepare the file, are present during the audit, and defend your interests. Our experience with tax audits ensures smooth handling.',
      q9: 'How do I file my corporate tax return?',
      a9: 'Corporate tax returns are filed via Biztax, the online platform of the FPS Finance. We handle the complete return for you, including all attachments and calculations. The deadline is usually 7 months after closing your financial year.',
      q10: 'What is the 30bis regulation for contractors?',
      a10: 'The 30bis regulation requires principals to check whether their contractor has debts with the RSZ or tax authorities. In case of debts, you must withhold part of the invoice and transfer it. We check this for you via the RSZ portal and advise on correct handling.',
      q11: 'How can I verify a European VAT number?',
      a11: 'Via the VIES system (VAT Information Exchange System) of the European Commission you can verify the validity of VAT numbers within the EU. This is essential for intra-community supplies. We do these checks as standard for all your foreign customers.',
      q12: 'Where can I consult annual accounts of other companies?',
      a12: 'Annual accounts of Belgian companies are publicly available via the Balance Sheet Centre of the National Bank of Belgium (NBB). We use this information for credit analyses and due diligence in acquisitions.',
      q13: 'What about GDPR and privacy in my business?',
      a13: 'As a business you must comply with GDPR legislation. The Data Protection Authority (GBA) is the supervisor in Belgium. We advise on basic obligations: processing register, privacy statement, and security measures. See also the practical GDPR brochure from VBO.',
      q14: 'How do I calculate the indexation of my rent?',
      a14: 'Rent indexation is calculated based on the health index. Statbel offers an official rent calculator. The formula is: new rent = base rent × new index / initial index. We can calculate and document this for you.',
      q15: 'How do I request a tax certificate?',
      a15: 'Tax certificates (such as no debt certificate, article 442bis certificate) can be requested via the eServices portal of the FPS Finance. These certificates are often required for government contracts or subsidy applications. We can request these for you.',
      q16: 'What is withholding tax and how do I declare it?',
      a16: 'Withholding tax is the tax on income from movable property (dividends, interest). The declaration is made via RV-on-web. The standard rate is 30%. We ensure correct declaration and optimize where possible.',
    },
  },
} as const;

export type TranslationKey = keyof typeof translations.nl;
