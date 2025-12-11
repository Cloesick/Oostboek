import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Calendar, Phone, ExternalLink, FileText, Link2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

interface ChatLink {
  label: string;
  url: string;
  type: 'internal' | 'external';
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  showActions?: 'appointment' | 'contact' | 'both';
  links?: ChatLink[];
  sources?: string[];
  suggestions?: string[];
}

// Bilingual Knowledge base with Q&A network
const KNOWLEDGE_BASE_NL = {
  btw: {
    keywords: ['btw', 'vat', 'belasting', 'aangifte', 'intervat', 'kwartaal', 'maand'],
    response: '📊 **BTW-administratie**\n\nWij bieden volledige BTW-ondersteuning:\n• Maandelijkse of driemaandelijkse aangiftes via **Intervat**\n• IC-listings en jaarlijkse klantenlisting\n• BTW-optimalisatie en -advies\n• Controle door de fiscus? Wij staan u bij.\n\n**Deadlines:**\n• Kwartaalaangevers: 20e van de maand na het kwartaal\n• Maandaangevers: 20e van de volgende maand',
    links: [
      { label: 'Intervat (FOD Financiën)', url: 'http://financien.belgium.be/nl/E-services/Intervat/', type: 'external' as const },
      { label: 'VIES BTW-controle', url: 'http://ec.europa.eu/taxation_customs/vies/?locale=nl', type: 'external' as const },
      { label: 'Onze fiscale diensten', url: '/fiscaliteit', type: 'internal' as const },
    ],
    sources: ['FOD Financiën', 'Intervat'],
    showActions: 'appointment' as const,
  },
  vennootschapsbelasting: {
    keywords: ['vennootschapsbelasting', 'biztax', 'vennootschap', 'bv', 'nv', 'corporate'],
    response: '🏢 **Vennootschapsbelasting**\n\nDe aangifte vennootschapsbelasting dient u in via **Biztax**:\n• Deadline: 7 maanden na afsluiting boekjaar\n• Wij verzorgen de volledige aangifte\n• Inclusief alle bijlagen en berekeningen\n• Fiscale optimalisatie waar mogelijk\n\nWij begeleiden u door het volledige proces.',
    links: [
      { label: 'Biztax (FOD Financiën)', url: 'http://financien.belgium.be/nl/E-services/biztax/', type: 'external' as const },
      { label: 'Tax-on-web', url: 'https://eservices.minfin.fgov.be/taxonweb/app/citizen/public/taxbox/home.do', type: 'external' as const },
      { label: 'Onze fiscale diensten', url: '/fiscaliteit', type: 'internal' as const },
    ],
    sources: ['FOD Financiën', 'Biztax'],
    showActions: 'appointment' as const,
  },
  roerende: {
    keywords: ['roerende', 'voorheffing', 'dividend', 'interest', 'rv-on-web'],
    response: '💵 **Roerende Voorheffing**\n\nRoerende voorheffing is de belasting op:\n• Dividenden\n• Interesten\n• Andere roerende inkomsten\n\n**Standaardtarief:** 30%\n**Aangifte:** via RV-on-web\n\nWij zorgen voor correcte aangifte en optimaliseren waar mogelijk.',
    links: [
      { label: 'RV-on-web', url: 'http://financien.belgium.be/nl/E-services/rv-on-web/', type: 'external' as const },
      { label: 'Fiscale attesten', url: 'https://eservices.minfin.fgov.be/portal/nl/public/citizen/services/attests', type: 'external' as const },
    ],
    sources: ['FOD Financiën', 'RV-on-web'],
    showActions: 'appointment' as const,
  },
  starter: {
    keywords: ['starter', 'beginnen', 'oprichten', 'starten', 'nieuw bedrijf', 'onderneming starten', 'kbo'],
    response: '🚀 **Startersbegeleiding**\n\nWij helpen starters met:\n• Keuze rechtsvorm (eenmanszaak, BV, VOF...)\n• **KBO-inschrijving** (Kruispuntbank van Ondernemingen)\n• BTW-registratie via Intervat\n• Eerste boekhouding opzetten\n• Financieel plan en subsidies\n\n**Gratis startersgesprek:** 60 minuten\n\nBekijk ook onze FAQ voor veelgestelde startersvragen!',
    links: [
      { label: 'KBO Public Search', url: 'http://kbopub.economie.fgov.be/kbopub/zoeknummerform.html', type: 'external' as const },
      { label: 'Intervat registratie', url: 'http://financien.belgium.be/nl/E-services/Intervat/', type: 'external' as const },
      { label: 'Startersbegeleiding', url: '/begeleiding', type: 'internal' as const },
      { label: 'Veelgestelde vragen', url: '/#faq', type: 'internal' as const },
    ],
    sources: ['KBO', 'FOD Financiën'],
    showActions: 'both' as const,
  },
  factuur: {
    keywords: ['factuur', 'facturatie', 'invoice', 'billit', 'peppol', 'e-facturatie'],
    response: '📄 **Facturatie & Documenten**\n\nBelangrijke info:\n• Facturen moeten **10 jaar** bewaard worden\n• Wij ondersteunen **Peppol e-facturatie**\n• Automatische verwerking via **Billit**\n• Upload documenten via ons klantenportaal\n\n**Tip:** Vanaf 2026 wordt e-facturatie verplicht voor B2B!',
    links: [
      { label: 'Billit facturatie', url: 'https://my.billit.be/Account/Logon', type: 'external' as const },
      { label: 'Oostboek Dagboeken', url: 'https://dagboeken.oostboek.be/nl/login', type: 'external' as const },
      { label: 'Onze boekhouddiensten', url: '/boekhouding', type: 'internal' as const },
    ],
    sources: ['Billit', 'Oostboek'],
    showActions: 'appointment' as const,
  },
  aannemer: {
    keywords: ['aannemer', '30bis', 'inhoudingsplicht', 'rsz', 'onderaannemer'],
    response: '👷 **30bis-regeling voor Aannemers**\n\nDe 30bis-regeling verplicht opdrachtgevers om:\n• Na te gaan of aannemer schulden heeft bij RSZ/fiscus\n• Bij schulden: deel van factuur inhouden en doorstorten\n\nWij controleren dit voor u via het **RSZ-portaal** en adviseren over correcte afhandeling.',
    links: [
      { label: 'RSZ 30bis portaal', url: 'https://www.socialsecurity.be/site_nl/employer/applics/30bis/index.htm?type=all', type: 'external' as const },
      { label: 'Onze begeleiding', url: '/begeleiding', type: 'internal' as const },
    ],
    sources: ['RSZ', 'Sociale Zekerheid'],
    showActions: 'appointment' as const,
  },
  jaarrekening: {
    keywords: ['jaarrekening', 'balans', 'nbb', 'nationale bank', 'neerlegging', 'publicatie'],
    response: '📊 **Jaarrekeningen**\n\nJaarrekeningen van Belgische vennootschappen:\n• Publiek beschikbaar via **NBB Balanscentrale**\n• Neerlegging verplicht binnen 7 maanden na boekjaar\n• Wij verzorgen opstelling én neerlegging\n\nWij gebruiken deze info ook voor kredietanalyses en due diligence.',
    links: [
      { label: 'NBB Balanscentrale', url: 'https://www.nbb.be/nl/balanscentrale', type: 'external' as const },
      { label: 'Belgisch Staatsblad', url: 'http://www.ejustice.just.fgov.be/tsv_pub/index_n.htm', type: 'external' as const },
      { label: 'Onze boekhouddiensten', url: '/boekhouding', type: 'internal' as const },
      { label: 'Jaarrekeningen pagina', url: '/boekhouding/jaarrekeningen', type: 'internal' as const },
    ],
    sources: ['NBB', 'Belgisch Staatsblad'],
    showActions: 'appointment' as const,
  },
  gdpr: {
    keywords: ['gdpr', 'privacy', 'avg', 'gegevens', 'persoonsgegevens', 'dataprotectie'],
    response: '🔒 **GDPR & Privacy**\n\nAls onderneming moet u voldoen aan GDPR:\n• Verwerkingsregister bijhouden\n• Privacyverklaring opstellen\n• Beveiligingsmaatregelen nemen\n\nDe **Gegevensbeschermingsautoriteit (GBA)** is toezichthouder in België.\n\nWij adviseren over de basisverplichtingen.',
    links: [
      { label: 'Gegevensbeschermingsautoriteit', url: 'https://www.privacycommission.be/nl', type: 'external' as const },
      { label: 'GDPR Brochure (VBO)', url: 'http://www.vbo-feb.be/globalassets/publicaties/data-protection/feb_dataprotection_brochure_03_nl_web-pdf.pdf', type: 'external' as const },
      { label: 'Onze begeleiding', url: '/begeleiding', type: 'internal' as const },
    ],
    sources: ['GBA', 'VBO'],
    showActions: 'contact' as const,
  },
  huur: {
    keywords: ['huur', 'indexatie', 'huurprijs', 'index', 'gezondheidsindex'],
    response: '🏠 **Huurindexatie**\n\nDe huurindexatie wordt berekend op basis van de gezondheidsindex:\n\n**Formule:**\nNieuwe huur = basishuur × nieuw indexcijfer / aanvangsindexcijfer\n\n**Statbel** biedt een officiële huurcalculator aan.\n\nWij kunnen dit voor u berekenen en documenteren.',
    links: [
      { label: 'Statbel Huurcalculator', url: 'http://statbel.fgov.be/nl/statistieken/cijfers/economie/consumptieprijzen/huurcalculator/', type: 'external' as const },
    ],
    sources: ['Statbel'],
    showActions: 'contact' as const,
  },
  kadaster: {
    keywords: ['kadaster', 'kadastraal', 'onroerend', 'vastgoed', 'ki', 'kadastraal inkomen'],
    response: '🏡 **Kadaster & Onroerend Goed**\n\nKadastrale gegevens opzoeken:\n• Kadastraal inkomen (KI)\n• Eigendomsgegevens\n• Perceelsinformatie\n\nVia **KMWeb** kunt u kadastrale gegevens raadplegen.',
    links: [
      { label: 'KMWeb Kadaster', url: 'http://ccff02.minfin.fgov.be/KMWeb/main.do?home=true', type: 'external' as const },
      { label: 'Fiscale attesten', url: 'https://eservices.minfin.fgov.be/portal/nl/public/citizen/services/attests', type: 'external' as const },
    ],
    sources: ['FOD Financiën', 'Kadaster'],
    showActions: 'appointment' as const,
  },
  attest: {
    keywords: ['attest', 'certificaat', 'geen schulden', '442bis', 'fiscaal attest'],
    response: '📜 **Fiscale Attesten**\n\nFiscale attesten aanvragen:\n• Attest geen schulden\n• Attest artikel 442bis\n• Andere fiscale certificaten\n\nDeze zijn vaak nodig bij:\n• Overheidsopdrachten\n• Subsidieaanvragen\n• Kredietaanvragen\n\nWij kunnen deze voor u aanvragen via het eServices-portaal.',
    links: [
      { label: 'eServices Attesten', url: 'https://eservices.minfin.fgov.be/portal/nl/public/citizen/services/attests', type: 'external' as const },
      { label: 'Onze begeleiding', url: '/begeleiding', type: 'internal' as const },
    ],
    sources: ['FOD Financiën'],
    showActions: 'appointment' as const,
  },
  successie: {
    keywords: ['successie', 'erfenis', 'schenking', 'nalatenschap', 'testament'],
    response: '🏛️ **Successieplanning**\n\nWij adviseren over:\n• Schenkingen en erfenissen\n• Fiscaal voordelige overdracht\n• Familiale vennootschappen\n• Testament en huwelijkscontract\n\nDit is complex en persoonlijk. Een gesprek met onze specialist is sterk aangeraden.',
    links: [
      { label: 'Successieplanning info', url: '/begeleiding', type: 'internal' as const },
      { label: 'Veelgestelde vragen', url: '/#faq', type: 'internal' as const },
    ],
    sources: ['Oostboek'],
    showActions: 'appointment' as const,
  },
  overname: {
    keywords: ['overname', 'verkoop', 'bedrijf verkopen', 'due diligence', 'waardering'],
    response: '🤝 **Overname & Verkoop**\n\nWij begeleiden:\n• Due diligence\n• Waardering van uw onderneming\n• Fiscale optimalisatie bij verkoop\n• Onderhandelingen en contracten\n\nVia de **NBB Balanscentrale** analyseren we financiële gegevens van potentiële overnames.',
    links: [
      { label: 'NBB Balanscentrale', url: 'https://www.nbb.be/nl/balanscentrale', type: 'external' as const },
      { label: 'KBO opzoeken', url: 'http://kbopub.economie.fgov.be/kbopub/zoeknummerform.html', type: 'external' as const },
      { label: 'Onze begeleiding', url: '/begeleiding', type: 'internal' as const },
    ],
    sources: ['NBB', 'KBO'],
    showActions: 'appointment' as const,
  },
  prijs: {
    keywords: ['prijs', 'kost', 'tarief', 'offerte', 'hoeveel'],
    response: '💰 **Tarieven**\n\nOnze tarieven zijn maatwerk, afhankelijk van:\n• Type onderneming (eenmanszaak, BV, VZW...)\n• Aantal transacties per jaar\n• Gewenste diensten\n\n**Indicatie:**\n• Oprichting rechtspersoon: vanaf €1.500\n• Jaarlijkse boekhouding: tot €2.500/jaar\n• Eenmanszaak: vanaf €150/maand\n\nVoor een vrijblijvende offerte plannen we graag een kennismakingsgesprek.',
    links: [
      { label: 'Afspraak maken', url: '/appointments', type: 'internal' as const },
      { label: 'Onze diensten', url: '/boekhouding', type: 'internal' as const },
      { label: 'Veelgestelde vragen', url: '/#faq', type: 'internal' as const },
    ],
    sources: ['Oostboek'],
    showActions: 'both' as const,
  },
  contact: {
    keywords: ['contact', 'bellen', 'mail', 'bereiken', 'adres', 'telefoon'],
    response: '📞 **Contact Oostboek**\n\n**Adres:**\nKoningin Astridlaan 134 bus 1\n8200 Brugge\n\n**Telefoon:** 050/45 70 31\n**Email:** brugge@oostboek.be\n\nOf plan direct een afspraak in!',
    links: [
      { label: 'Afspraak maken', url: '/appointments', type: 'internal' as const },
      { label: 'Contactformulier', url: '/#contact', type: 'internal' as const },
    ],
    sources: ['Oostboek'],
    showActions: 'both' as const,
  },
  nieuws: {
    keywords: ['nieuws', 'update', 'nieuw', 'wetgeving', 'wijziging'],
    response: '📰 **Nieuws & Updates**\n\nBlijf op de hoogte van:\n• Nieuwe wetgeving\n• Fiscale wijzigingen\n• Deadlines\n• Kantoornieuws\n\nBekijk onze nieuwspagina voor het laatste nieuws!',
    links: [
      { label: 'Nieuws pagina', url: '/nieuws', type: 'internal' as const },
      { label: 'Belgisch Staatsblad', url: 'http://www.ejustice.just.fgov.be/tsv_pub/index_n.htm', type: 'external' as const },
    ],
    sources: ['Oostboek', 'Belgisch Staatsblad'],
    showActions: undefined,
  },
  vacature: {
    keywords: ['vacature', 'job', 'werk', 'solliciteer', 'werken bij'],
    response: '💼 **Werken bij Oostboek**\n\nWij zijn altijd op zoek naar gemotiveerde mensen!\n\nBekijk onze openstaande vacatures of stuur een open sollicitatie naar jobs@oostboek.be.',
    links: [
      { label: 'Vacatures', url: '/vacatures', type: 'internal' as const },
    ],
    sources: ['Oostboek'],
    showActions: undefined,
  },
  links: {
    keywords: ['link', 'website', 'portaal', 'nuttig', 'tool'],
    response: '🔗 **Nuttige Links**\n\nWij hebben een uitgebreide verzameling van handige websites en tools voor ondernemers:\n• Belastingdiensten\n• Facturatie tools\n• Officiële registers\n• Privacy & GDPR\n\nBekijk onze links pagina!',
    links: [
      { label: 'Alle nuttige links', url: '/links', type: 'internal' as const },
    ],
    sources: ['Oostboek'],
    showActions: undefined,
  },
};

// English Knowledge Base
const KNOWLEDGE_BASE_EN = {
  btw: {
    keywords: ['vat', 'tax', 'return', 'intervat', 'quarterly', 'monthly', 'btw'],
    response: '📊 **VAT Administration**\n\nWe offer complete VAT support:\n• Monthly or quarterly returns via **Intervat**\n• IC listings and annual client listings\n• VAT optimization and advice\n• Tax audit? We stand by you.\n\n**Deadlines:**\n• Quarterly filers: 20th of the month after the quarter\n• Monthly filers: 20th of the following month',
    links: [
      { label: 'Intervat (FPS Finance)', url: 'http://financien.belgium.be/nl/E-services/Intervat/', type: 'external' as const },
      { label: 'VIES VAT Check', url: 'http://ec.europa.eu/taxation_customs/vies/?locale=en', type: 'external' as const },
      { label: 'Our tax services', url: '/fiscaliteit', type: 'internal' as const },
    ],
    sources: ['FPS Finance', 'Intervat'],
    showActions: 'appointment' as const,
  },
  vennootschapsbelasting: {
    keywords: ['corporate tax', 'biztax', 'company', 'bv', 'nv', 'corporation', 'vennootschapsbelasting'],
    response: '🏢 **Corporate Tax**\n\nCorporate tax returns are filed via **Biztax**:\n• Deadline: 7 months after closing the financial year\n• We handle the complete return\n• Including all attachments and calculations\n• Tax optimization where possible\n\nWe guide you through the entire process.',
    links: [
      { label: 'Biztax (FPS Finance)', url: 'http://financien.belgium.be/nl/E-services/biztax/', type: 'external' as const },
      { label: 'Tax-on-web', url: 'https://eservices.minfin.fgov.be/taxonweb/app/citizen/public/taxbox/home.do', type: 'external' as const },
      { label: 'Our tax services', url: '/fiscaliteit', type: 'internal' as const },
    ],
    sources: ['FPS Finance', 'Biztax'],
    showActions: 'appointment' as const,
  },
  roerende: {
    keywords: ['withholding tax', 'dividend', 'interest', 'rv-on-web', 'roerende'],
    response: '💵 **Withholding Tax**\n\nWithholding tax is the tax on:\n• Dividends\n• Interest\n• Other movable income\n\n**Standard rate:** 30%\n**Filing:** via RV-on-web\n\nWe ensure correct filing and optimize where possible.',
    links: [
      { label: 'RV-on-web', url: 'http://financien.belgium.be/nl/E-services/rv-on-web/', type: 'external' as const },
      { label: 'Tax certificates', url: 'https://eservices.minfin.fgov.be/portal/nl/public/citizen/services/attests', type: 'external' as const },
    ],
    sources: ['FPS Finance', 'RV-on-web'],
    showActions: 'appointment' as const,
  },
  starter: {
    keywords: ['starter', 'start', 'begin', 'new business', 'establish', 'kbo', 'entrepreneur'],
    response: '🚀 **Startup Guidance**\n\nWe help starters with:\n• Choosing legal form (sole proprietorship, BV, VOF...)\n• **KBO registration** (Crossroads Bank for Enterprises)\n• VAT registration via Intervat\n• Setting up initial bookkeeping\n• Financial plan and subsidies\n\n**Free startup consultation:** 60 minutes\n\nAlso check our FAQ for frequently asked startup questions!',
    links: [
      { label: 'KBO Public Search', url: 'http://kbopub.economie.fgov.be/kbopub/zoeknummerform.html', type: 'external' as const },
      { label: 'Intervat registration', url: 'http://financien.belgium.be/nl/E-services/Intervat/', type: 'external' as const },
      { label: 'Startup guidance', url: '/begeleiding', type: 'internal' as const },
      { label: 'FAQ', url: '/#faq', type: 'internal' as const },
    ],
    sources: ['KBO', 'FPS Finance'],
    showActions: 'both' as const,
  },
  factuur: {
    keywords: ['invoice', 'invoicing', 'billit', 'peppol', 'e-invoicing', 'factuur'],
    response: '📄 **Invoicing & Documents**\n\nImportant info:\n• Invoices must be kept for **10 years**\n• We support **Peppol e-invoicing**\n• Automatic processing via **Billit**\n• Upload documents via our client portal\n\n**Tip:** From 2026, e-invoicing becomes mandatory for B2B!',
    links: [
      { label: 'Billit invoicing', url: 'https://my.billit.be/Account/Logon', type: 'external' as const },
      { label: 'Oostboek Journals', url: 'https://dagboeken.oostboek.be/nl/login', type: 'external' as const },
      { label: 'Our accounting services', url: '/boekhouding', type: 'internal' as const },
    ],
    sources: ['Billit', 'Oostboek'],
    showActions: 'appointment' as const,
  },
  aannemer: {
    keywords: ['contractor', '30bis', 'withholding obligation', 'rsz', 'subcontractor', 'aannemer'],
    response: '👷 **30bis Regulation for Contractors**\n\nThe 30bis regulation requires principals to:\n• Check if contractor has debts with RSZ/tax authorities\n• If debts exist: withhold part of invoice and transfer\n\nWe check this for you via the **RSZ portal** and advise on correct handling.',
    links: [
      { label: 'RSZ 30bis portal', url: 'https://www.socialsecurity.be/site_nl/employer/applics/30bis/index.htm?type=all', type: 'external' as const },
      { label: 'Our guidance', url: '/begeleiding', type: 'internal' as const },
    ],
    sources: ['RSZ', 'Social Security'],
    showActions: 'appointment' as const,
  },
  jaarrekening: {
    keywords: ['annual accounts', 'balance sheet', 'nbb', 'national bank', 'filing', 'publication', 'jaarrekening'],
    response: '📊 **Annual Accounts**\n\nAnnual accounts of Belgian companies:\n• Publicly available via **NBB Balance Sheet Centre**\n• Filing required within 7 months after financial year\n• We handle preparation and filing\n\nWe also use this info for credit analyses and due diligence.',
    links: [
      { label: 'NBB Balance Sheet Centre', url: 'https://www.nbb.be/nl/balanscentrale', type: 'external' as const },
      { label: 'Belgian Official Gazette', url: 'http://www.ejustice.just.fgov.be/tsv_pub/index_n.htm', type: 'external' as const },
      { label: 'Our accounting services', url: '/boekhouding', type: 'internal' as const },
      { label: 'Annual accounts page', url: '/boekhouding/jaarrekeningen', type: 'internal' as const },
    ],
    sources: ['NBB', 'Belgian Official Gazette'],
    showActions: 'appointment' as const,
  },
  gdpr: {
    keywords: ['gdpr', 'privacy', 'data protection', 'personal data', 'avg'],
    response: '🔒 **GDPR & Privacy**\n\nAs a business you must comply with GDPR:\n• Maintain processing register\n• Draft privacy statement\n• Implement security measures\n\nThe **Data Protection Authority (GBA)** is the supervisor in Belgium.\n\nWe advise on basic obligations.',
    links: [
      { label: 'Data Protection Authority', url: 'https://www.privacycommission.be/nl', type: 'external' as const },
      { label: 'GDPR Brochure (VBO)', url: 'http://www.vbo-feb.be/globalassets/publicaties/data-protection/feb_dataprotection_brochure_03_nl_web-pdf.pdf', type: 'external' as const },
      { label: 'Our guidance', url: '/begeleiding', type: 'internal' as const },
    ],
    sources: ['GBA', 'VBO'],
    showActions: 'contact' as const,
  },
  huur: {
    keywords: ['rent', 'indexation', 'rental price', 'index', 'health index', 'huur'],
    response: '🏠 **Rent Indexation**\n\nRent indexation is calculated based on the health index:\n\n**Formula:**\nNew rent = base rent × new index / initial index\n\n**Statbel** offers an official rent calculator.\n\nWe can calculate and document this for you.',
    links: [
      { label: 'Statbel Rent Calculator', url: 'http://statbel.fgov.be/nl/statistieken/cijfers/economie/consumptieprijzen/huurcalculator/', type: 'external' as const },
    ],
    sources: ['Statbel'],
    showActions: 'contact' as const,
  },
  kadaster: {
    keywords: ['cadastre', 'cadastral', 'real estate', 'property', 'ki', 'cadastral income', 'kadaster'],
    response: '🏡 **Cadastre & Real Estate**\n\nLook up cadastral data:\n• Cadastral income (KI)\n• Property data\n• Plot information\n\nVia **KMWeb** you can consult cadastral data.',
    links: [
      { label: 'KMWeb Cadastre', url: 'http://ccff02.minfin.fgov.be/KMWeb/main.do?home=true', type: 'external' as const },
      { label: 'Tax certificates', url: 'https://eservices.minfin.fgov.be/portal/nl/public/citizen/services/attests', type: 'external' as const },
    ],
    sources: ['FPS Finance', 'Cadastre'],
    showActions: 'appointment' as const,
  },
  attest: {
    keywords: ['certificate', 'attestation', 'no debts', '442bis', 'tax certificate', 'attest'],
    response: '📜 **Tax Certificates**\n\nRequest tax certificates:\n• No debt certificate\n• Article 442bis certificate\n• Other tax certificates\n\nThese are often needed for:\n• Government contracts\n• Subsidy applications\n• Credit applications\n\nWe can request these for you via the eServices portal.',
    links: [
      { label: 'eServices Certificates', url: 'https://eservices.minfin.fgov.be/portal/nl/public/citizen/services/attests', type: 'external' as const },
      { label: 'Our guidance', url: '/begeleiding', type: 'internal' as const },
    ],
    sources: ['FPS Finance'],
    showActions: 'appointment' as const,
  },
  successie: {
    keywords: ['succession', 'inheritance', 'gift', 'estate', 'will', 'successie'],
    response: '🏛️ **Succession Planning**\n\nWe advise on:\n• Gifts and inheritances\n• Tax-efficient transfers\n• Family companies\n• Wills and marriage contracts\n\nThis is complex and personal. A consultation with our specialist is highly recommended.',
    links: [
      { label: 'Succession planning info', url: '/begeleiding', type: 'internal' as const },
      { label: 'FAQ', url: '/#faq', type: 'internal' as const },
    ],
    sources: ['Oostboek'],
    showActions: 'appointment' as const,
  },
  overname: {
    keywords: ['acquisition', 'sale', 'sell business', 'due diligence', 'valuation', 'overname'],
    response: '🤝 **Acquisition & Sale**\n\nWe guide:\n• Due diligence\n• Valuation of your business\n• Tax optimization on sale\n• Negotiations and contracts\n\nVia the **NBB Balance Sheet Centre** we analyze financial data of potential acquisitions.',
    links: [
      { label: 'NBB Balance Sheet Centre', url: 'https://www.nbb.be/nl/balanscentrale', type: 'external' as const },
      { label: 'KBO lookup', url: 'http://kbopub.economie.fgov.be/kbopub/zoeknummerform.html', type: 'external' as const },
      { label: 'Our guidance', url: '/begeleiding', type: 'internal' as const },
    ],
    sources: ['NBB', 'KBO'],
    showActions: 'appointment' as const,
  },
  prijs: {
    keywords: ['price', 'cost', 'rate', 'quote', 'how much', 'pricing', 'tariff'],
    response: '💰 **Pricing**\n\nOur rates are customized, depending on:\n• Type of business (sole proprietorship, BV, VZW...)\n• Number of transactions per year\n• Desired services\n\n**Indication:**\n• Establishing legal entity: from €1,500\n• Annual accounting: up to €2,500/year\n• Sole proprietorship: from €150/month\n\nFor a free quote, we\'d be happy to schedule an introductory meeting.',
    links: [
      { label: 'Make appointment', url: '/appointments', type: 'internal' as const },
      { label: 'Our services', url: '/boekhouding', type: 'internal' as const },
      { label: 'FAQ', url: '/#faq', type: 'internal' as const },
    ],
    sources: ['Oostboek'],
    showActions: 'both' as const,
  },
  contact: {
    keywords: ['contact', 'call', 'email', 'reach', 'address', 'phone'],
    response: '📞 **Contact Oostboek**\n\n**Address:**\nKoningin Astridlaan 134 bus 1\n8200 Bruges, Belgium\n\n**Phone:** +32 50 45 70 31\n**Email:** brugge@oostboek.be\n\nOr schedule an appointment directly!',
    links: [
      { label: 'Make appointment', url: '/appointments', type: 'internal' as const },
      { label: 'Contact form', url: '/#contact', type: 'internal' as const },
    ],
    sources: ['Oostboek'],
    showActions: 'both' as const,
  },
  nieuws: {
    keywords: ['news', 'update', 'new', 'legislation', 'change'],
    response: '📰 **News & Updates**\n\nStay informed about:\n• New legislation\n• Tax changes\n• Deadlines\n• Office news\n\nCheck our news page for the latest updates!',
    links: [
      { label: 'News page', url: '/nieuws', type: 'internal' as const },
      { label: 'Belgian Official Gazette', url: 'http://www.ejustice.just.fgov.be/tsv_pub/index_n.htm', type: 'external' as const },
    ],
    sources: ['Oostboek', 'Belgian Official Gazette'],
    showActions: undefined,
  },
  vacature: {
    keywords: ['vacancy', 'job', 'work', 'apply', 'career', 'employment'],
    response: '💼 **Work at Oostboek**\n\nWe are always looking for motivated people!\n\nCheck our open vacancies or send an open application to jobs@oostboek.be.',
    links: [
      { label: 'Vacancies', url: '/vacatures', type: 'internal' as const },
    ],
    sources: ['Oostboek'],
    showActions: undefined,
  },
  links: {
    keywords: ['link', 'website', 'portal', 'useful', 'tool', 'resource'],
    response: '🔗 **Useful Links**\n\nWe have an extensive collection of useful websites and tools for entrepreneurs:\n• Tax services\n• Invoicing tools\n• Official registers\n• Privacy & GDPR\n\nCheck our links page!',
    links: [
      { label: 'All useful links', url: '/links', type: 'internal' as const },
    ],
    sources: ['Oostboek'],
    showActions: undefined,
  },
};

export default function ChatPage() {
  const { t, language } = useLanguage();
  
  // Get the appropriate knowledge base based on language
  const KNOWLEDGE_BASE = language === 'en' ? KNOWLEDGE_BASE_EN : KNOWLEDGE_BASE_NL;
  
  // Initial welcome message based on language
  const getInitialMessage = (): Message => ({
    id: '1',
    role: 'assistant',
    content: t.chat.welcome,
    timestamp: new Date(),
    showActions: undefined,
    links: language === 'en' 
      ? [
          { label: 'FAQ', url: '/#faq', type: 'internal' },
          { label: 'All useful links', url: '/links', type: 'internal' },
        ]
      : [
          { label: 'Veelgestelde vragen', url: '/#faq', type: 'internal' },
          { label: 'Alle nuttige links', url: '/links', type: 'internal' },
        ],
    suggestions: language === 'en'
      ? ['VAT return', 'Start a business', 'Corporate tax', 'Annual accounts', 'GDPR privacy', 'Pricing', '30bis contractor', 'Make appointment']
      : ['BTW aangifte', 'Starter worden', 'Vennootschapsbelasting', 'Jaarrekening', 'GDPR privacy', 'Tarieven', '30bis aannemer', 'Afspraak maken'],
  });

  const [messages, setMessages] = useState<Message[]>([getInitialMessage()]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Reset messages when language changes
  useEffect(() => {
    setMessages([getInitialMessage()]);
    setQuestionCount(0);
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const response = generateResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
        showActions: response.showActions,
        links: response.links,
        sources: response.sources,
        suggestions: response.suggestions,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const generateResponse = (userInput: string): { content: string; showActions?: 'appointment' | 'contact' | 'both'; links?: ChatLink[]; sources?: string[]; suggestions?: string[] } => {
    const lower = userInput.toLowerCase();
    setQuestionCount(prev => prev + 1);

    // Special case: affirmative response (ja/yes) - direct to Calendly
    if (lower === 'ja' || lower === 'yes' || lower === 'ok' || lower === 'oké' || lower === 'graag' || lower === 'ja graag' || lower.includes('ja, graag') || lower.includes('yes, i would')) {
      return {
        content: language === 'en' 
          ? '📅 **Perfect!** Click below to schedule an appointment via Calendly. Choose a time that suits you best.'
          : '📅 **Perfect!** Klik hieronder om direct een afspraak in te plannen via Calendly. Kies een tijdstip dat u het beste uitkomt.',
        showActions: undefined,
        links: [
          { label: language === 'en' ? '📅 Schedule via Calendly' : '📅 Plan afspraak via Calendly', url: 'https://calendly.com/oostboek/kennismaking', type: 'external' },
          { label: language === 'en' ? 'Or call us: +32 50 45 70 31' : 'Of bel ons: 050/45 70 31', url: 'tel:+3250457031', type: 'external' },
        ],
      };
    }

    // Special case: negative response - show topic options
    if (lower === 'nee' || lower === 'no' || lower.includes('nee,') || lower.includes('nog een vraag') || lower.includes('another question')) {
      setQuestionCount(0); // Reset question count
      return {
        content: language === 'en'
          ? 'No problem! 😊 What else can I help you with?\n\nChoose a topic:'
          : 'Geen probleem! 😊 Waar kan ik u verder mee helpen?\n\nKies een onderwerp:',
        showActions: undefined,
        links: [
          { label: language === 'en' ? 'FAQ' : 'Veelgestelde vragen', url: '/#faq', type: 'internal' },
        ],
        suggestions: language === 'en'
          ? ['VAT return', 'Start a business', 'Corporate tax', 'Annual accounts', 'GDPR privacy', 'Pricing']
          : ['BTW aangifte', 'Starter worden', 'Vennootschapsbelasting', 'Jaarrekening', 'GDPR privacy', 'Tarieven'],
      };
    }

    // Special case: direct appointment request
    if (lower.includes('afspraak') || lower.includes('appointment') || lower.includes('gesprek maken') || lower.includes('calendly') || lower.includes('schedule') || lower.includes('meeting')) {
      return {
        content: language === 'en'
          ? '📅 **Make an Appointment**\n\nYou can schedule an appointment directly via Calendly. Choose a time that suits you for a free introductory meeting.'
          : '📅 **Afspraak maken**\n\nU kunt direct een afspraak inplannen via Calendly. Kies een tijdstip dat u het beste uitkomt voor een vrijblijvend kennismakingsgesprek.',
        showActions: undefined,
        links: [
          { label: language === 'en' ? '📅 Schedule via Calendly' : '📅 Plan afspraak via Calendly', url: 'https://calendly.com/oostboek/kennismaking', type: 'external' },
          { label: language === 'en' ? 'Contact form' : 'Contactformulier', url: '/#contact', type: 'internal' },
        ],
      };
    }

    // Search knowledge base for matching topic
    for (const [, topic] of Object.entries(KNOWLEDGE_BASE)) {
      const hasMatch = topic.keywords.some(keyword => lower.includes(keyword));
      if (hasMatch) {
        return {
          content: topic.response,
          showActions: topic.showActions,
          links: topic.links,
          sources: topic.sources,
        };
      }
    }

    // After 3 questions without match, prompt for appointment
    if (questionCount >= 2) {
      return {
        content: language === 'en'
          ? 'Thank you for your questions! 🤝 I notice you have several matters to discuss. For a complete picture of your situation, I recommend a personal meeting with one of our specialists. This is free and without obligation.\n\nWould you like to schedule an appointment to discuss your specific situation?'
          : 'Bedankt voor uw vragen! 🤝 Ik merk dat u meerdere zaken wilt bespreken. Voor een volledig beeld van uw situatie raad ik een persoonlijk gesprek aan met een van onze specialisten. Dit is vrijblijvend en gratis.\n\nWilt u een afspraak maken om uw specifieke situatie te bespreken?',
        showActions: undefined,
        links: [
          { label: language === 'en' ? 'FAQ' : 'Veelgestelde vragen', url: '/#faq', type: 'internal' },
          { label: language === 'en' ? 'All useful links' : 'Alle nuttige links', url: '/links', type: 'internal' },
        ],
        suggestions: language === 'en'
          ? ['Yes, I would like an appointment', 'No, I have another question']
          : ['Ja, graag een afspraak', 'Nee, ik heb nog een vraag'],
      };
    }

    // Default response with helpful suggestions
    return {
      content: language === 'en'
        ? 'Thank you for your question! 🤔 How can I help you?\n\nChoose a topic or type your question:'
        : 'Bedankt voor uw vraag! 🤔 Waar kan ik u mee helpen?\n\nKies een onderwerp of typ uw vraag:',
      showActions: 'both',
      links: [
        { label: language === 'en' ? 'FAQ' : 'Veelgestelde vragen', url: '/#faq', type: 'internal' },
        { label: language === 'en' ? 'All useful links' : 'Alle nuttige links', url: '/links', type: 'internal' },
      ],
      suggestions: language === 'en'
        ? ['VAT return', 'Start a business', 'Annual accounts', 'GDPR privacy', 'Pricing', 'Make appointment']
        : ['BTW aangifte', 'Starter worden', 'Jaarrekening', 'GDPR privacy', 'Tarieven', 'Afspraak maken'],
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    // Trigger send after a brief delay to show the input
    setTimeout(() => {
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: suggestion,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);

      setTimeout(() => {
        const response = generateResponse(suggestion);
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response.content,
          timestamp: new Date(),
          showActions: response.showActions,
          links: response.links,
          sources: response.sources,
          suggestions: response.suggestions,
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setIsTyping(false);
      }, 1000);

      setInput('');
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-6rem)] pb-16 md:pb-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t.chat.title}</h1>
          <p className="text-sm text-gray-500">{t.chat.subtitle}</p>
        </div>
        <Link to="/appointments" className="btn-secondary">
          <Calendar className="w-4 h-4 mr-2" />
          {t.chat.makeAppointment}
        </Link>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-white rounded-xl border border-gray-200 p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${
              message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === 'assistant'
                  ? 'bg-primary-100'
                  : 'bg-gray-200'
              }`}
            >
              {message.role === 'assistant' ? (
                <Bot className="w-5 h-5 text-primary-600" />
              ) : (
                <User className="w-5 h-5 text-gray-600" />
              )}
            </div>
            <div className="max-w-[80%]">
              <div
                className={`rounded-2xl px-4 py-3 ${
                  message.role === 'assistant'
                    ? 'bg-gray-100 text-gray-900'
                    : 'bg-primary-600 text-white'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.role === 'assistant' ? 'text-gray-400' : 'text-primary-200'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString('nl-BE', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              
              {/* Links section */}
              {message.role === 'assistant' && message.links && message.links.length > 0 && (
                <div className="mt-3 space-y-1.5">
                  <p className="text-xs font-medium text-gray-500 flex items-center gap-1">
                    <Link2 className="w-3 h-3" />
                    {t.chat.relevantLinks}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {message.links.map((link, idx) => (
                      link.type === 'internal' ? (
                        <Link
                          key={idx}
                          to={link.url}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-200 text-gray-700 text-xs rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          <FileText className="w-3 h-3" />
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 text-xs rounded-lg hover:bg-blue-200 transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          {link.label}
                        </a>
                      )
                    ))}
                  </div>
                </div>
              )}

              {/* Sources */}
              {message.role === 'assistant' && message.sources && message.sources.length > 0 && (
                <p className="text-xs text-gray-400 mt-2">
                  Bronnen: {message.sources.join(', ')}
                </p>
              )}

              {/* Clickable suggestions */}
              {message.role === 'assistant' && message.suggestions && message.suggestions.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {message.suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-3 py-1.5 bg-primary-100 text-primary-700 text-sm rounded-full hover:bg-primary-200 transition-colors border border-primary-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
              
              {/* Action buttons for lead generation */}
              {message.role === 'assistant' && message.showActions && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {(message.showActions === 'appointment' || message.showActions === 'both') && (
                    <Link
                      to="/appointments"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      <Calendar className="w-4 h-4" />
                      {t.chat.makeAppointment}
                    </Link>
                  )}
                  {(message.showActions === 'contact' || message.showActions === 'both') && (
                    <a
                      href="/#contact"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent-500 text-white text-sm rounded-lg hover:bg-accent-600 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      {t.chat.contactUs}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-600" />
            </div>
            <div className="bg-gray-100 rounded-2xl px-4 py-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="mt-4 flex items-center space-x-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={t.chat.typeQuestion}
          className="input flex-1"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="btn-primary p-3"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Actions */}
      <div className="mt-3 flex flex-wrap gap-2">
        {[
          t.chat.vatReturn,
          t.chat.becomeStarter,
          t.chat.annualAccounts,
          t.chat.corporateTax,
          t.chat.gdprPrivacy,
          t.chat.pricing,
          t.chat.contractor30bis,
          t.chat.usefulLinks,
        ].map((action) => (
          <button
            key={action}
            onClick={() => setInput(action)}
            className="text-sm px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}
