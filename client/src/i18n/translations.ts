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
      a2: 'Kwartaalaangevers dienen hun BTW-aangifte in tegen de 20e van de maand volgend op het kwartaal. Maandaangevers hebben tijd tot de 20e van de volgende maand. Wij zorgen ervoor dat uw aangiftes altijd tijdig worden ingediend.',
      q3: 'Kan ik mijn boekhouding digitaal beheren?',
      a3: 'Absoluut! Via ons klantenportaal heeft u 24/7 toegang tot uw documenten, facturen en financiële overzichten. U kunt eenvoudig documenten uploaden en communiceren met uw dossierbeheerder.',
      q4: 'Wat is het verschil tussen een eenmanszaak en een BV?',
      a4: 'Bij een eenmanszaak bent u persoonlijk aansprakelijk met uw privévermogen. Een BV biedt beperkte aansprakelijkheid en kan fiscaal voordeliger zijn vanaf een bepaald inkomen. Wij helpen u graag bij de keuze.',
      q5: 'Helpen jullie ook bij het opstarten van een onderneming?',
      a5: 'Zeker! Wij begeleiden starters bij de keuze van de juiste rechtsvorm, het opstellen van een financieel plan, en alle administratieve formaliteiten. Van KBO-inschrijving tot BTW-registratie.',
      q6: 'Hoe snel kan ik een afspraak krijgen?',
      a6: 'Voor dringende zaken proberen we u binnen 48 uur te ontvangen. Voor een eerste kennismaking kunt u meestal binnen een week terecht. Boek eenvoudig online via onze agenda.',
      q7: 'Werken jullie met specifieke boekhoudprogramma\'s?',
      a7: 'Wij werken met verschillende professionele boekhoudpakketten waaronder Exact Online, Yuki, en Octopus. We adviseren u graag over de beste keuze voor uw situatie.',
      q8: 'Wat gebeurt er als ik een controle krijg van de fiscus?',
      a8: 'Geen paniek! Wij bereiden het dossier voor, zijn aanwezig tijdens de controle, en verdedigen uw belangen. Onze ervaring met fiscale controles zorgt voor een vlotte afhandeling.',
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
      a2: 'Quarterly filers must submit their VAT return by the 20th of the month following the quarter. Monthly filers have until the 20th of the following month. We ensure your returns are always filed on time.',
      q3: 'Can I manage my accounting digitally?',
      a3: 'Absolutely! Through our client portal you have 24/7 access to your documents, invoices and financial overviews. You can easily upload documents and communicate with your account manager.',
      q4: 'What is the difference between a sole proprietorship and a BV?',
      a4: 'With a sole proprietorship you are personally liable with your private assets. A BV offers limited liability and can be more tax efficient from a certain income. We are happy to help you with the choice.',
      q5: 'Do you also help with starting a business?',
      a5: 'Certainly! We guide starters in choosing the right legal form, drawing up a financial plan, and all administrative formalities. From KBO registration to VAT registration.',
      q6: 'How quickly can I get an appointment?',
      a6: 'For urgent matters we try to see you within 48 hours. For a first meeting you can usually come within a week. Book easily online via our calendar.',
      q7: 'Do you work with specific accounting software?',
      a7: 'We work with various professional accounting packages including Exact Online, Yuki, and Octopus. We are happy to advise you on the best choice for your situation.',
      q8: 'What happens if I get an audit from the tax authorities?',
      a8: 'No panic! We prepare the file, are present during the audit, and defend your interests. Our experience with tax audits ensures smooth handling.',
    },
  },
} as const;

export type TranslationKey = keyof typeof translations.nl;
