import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Calendar, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  showActions?: 'appointment' | 'contact' | 'both';
}

export default function ChatPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Welkom bij Oostboek! Hoe kan ik u vandaag helpen?\n\nIk kan u informatie geven over:\n• BTW-administratie en aangiftes\n• Boekhouding en jaarrekeningen\n• Fiscaal advies en optimalisatie\n• Startersbegeleiding\n• Successieplanning\n\nOf wilt u direct een afspraak maken met een specialist?',
      timestamp: new Date(),
      showActions: 'both',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const generateResponse = (userInput: string): { content: string; showActions?: 'appointment' | 'contact' | 'both' } => {
    const lower = userInput.toLowerCase();
    setQuestionCount(prev => prev + 1);

    if (lower.includes('btw') || lower.includes('vat')) {
      return {
        content: '📊 **BTW-administratie**\n\nWij bieden volledige BTW-ondersteuning:\n• Maandelijkse of driemaandelijkse aangiftes\n• IC-listings en jaarlijkse klantenlisting\n• BTW-optimalisatie en -advies\n• Controle door de fiscus? Wij staan u bij.\n\nDe deadline voor uw aangifte hangt af van uw omzet. Wilt u dat we uw situatie bekijken?',
        showActions: 'appointment',
      };
    }

    if (lower.includes('factuur') || lower.includes('invoice')) {
      return {
        content: '📄 **Facturatie & Documenten**\n\nBelangrijke info:\n• Facturen moeten 10 jaar bewaard worden\n• Wij ondersteunen Peppol e-facturatie\n• Automatische verwerking via onze software\n\nTip: Upload uw facturen via het dashboard voor snelle verwerking.',
        showActions: questionCount >= 2 ? 'both' : undefined,
      };
    }

    if (lower.includes('afspraak') || lower.includes('appointment') || lower.includes('gesprek')) {
      navigate('/appointments');
      return {
        content: '📅 Ik stuur u door naar onze afsprakenpagina waar u direct een tijdslot kunt kiezen met een van onze specialisten.',
        showActions: undefined,
      };
    }

    if (lower.includes('starter') || lower.includes('beginnen') || lower.includes('oprichten') || lower.includes('starten')) {
      return {
        content: '🚀 **Startersbegeleiding**\n\nWij helpen starters met:\n• Keuze rechtsvorm (eenmanszaak, BV, VOF...)\n• BTW-registratie en KBO-inschrijving\n• Eerste boekhouding opzetten\n• Financieel plan en subsidies\n\nOns gratis startersgesprek duurt 60 minuten. Interesse?',
        showActions: 'both',
      };
    }

    if (lower.includes('prijs') || lower.includes('kost') || lower.includes('tarief') || lower.includes('offerte')) {
      return {
        content: '💰 **Tarieven**\n\nOnze tarieven zijn maatwerk, afhankelijk van:\n• Type onderneming (eenmanszaak, BV, VZW...)\n• Aantal transacties per jaar\n• Gewenste diensten\n\nVoor een vrijblijvende offerte plannen we graag een kennismakingsgesprek in.',
        showActions: 'both',
      };
    }

    if (lower.includes('successie') || lower.includes('erfenis') || lower.includes('schenking')) {
      return {
        content: '🏛️ **Successieplanning**\n\nWij adviseren over:\n• Schenkingen en erfenissen\n• Fiscaal voordelige overdracht\n• Familiale vennootschappen\n• Testament en huwelijkscontract\n\nDit is complex en persoonlijk. Een gesprek met onze specialist is sterk aangeraden.',
        showActions: 'appointment',
      };
    }

    if (lower.includes('overname') || lower.includes('verkoop') || lower.includes('bedrijf verkopen')) {
      return {
        content: '🤝 **Overname & Verkoop**\n\nWij begeleiden:\n• Due diligence\n• Waardering van uw onderneming\n• Fiscale optimalisatie bij verkoop\n• Onderhandelingen en contracten\n\nDit vraagt om een persoonlijk gesprek. Zullen we een afspraak inplannen?',
        showActions: 'appointment',
      };
    }

    if (lower.includes('contact') || lower.includes('bellen') || lower.includes('mail') || lower.includes('bereiken')) {
      return {
        content: '📞 **Contact**\n\nU kunt ons bereiken via:\n• Tel: +32 50 XX XX XX\n• Email: info@oostboek.be\n• Kantoor: Brugge\n\nOf plan direct een afspraak in via onderstaande knop.',
        showActions: 'both',
      };
    }

    // After 3 questions, prompt for appointment
    if (questionCount >= 2) {
      return {
        content: 'Bedankt voor uw vragen! Ik merk dat u meerdere zaken wilt bespreken. Voor een volledig beeld van uw situatie raad ik een persoonlijk gesprek aan met een van onze specialisten. Dit is vrijblijvend en gratis.\n\nZal ik een afspraak voor u inplannen?',
        showActions: 'both',
      };
    }

    return {
      content: 'Bedankt voor uw vraag! Kunt u wat meer details geven? Bijvoorbeeld:\n• Bent u starter of heeft u al een onderneming?\n• Gaat het om boekhouding, fiscaliteit, of iets anders?\n\nOf wilt u direct met een specialist spreken?',
      showActions: 'both',
    };
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
          <h1 className="text-2xl font-bold text-gray-900">Chat</h1>
          <p className="text-sm text-gray-500">AI-assistent voor snelle antwoorden</p>
        </div>
        <Link to="/appointments" className="btn-secondary">
          <Calendar className="w-4 h-4 mr-2" />
          Afspraak maken
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
              
              {/* Action buttons for lead generation */}
              {message.role === 'assistant' && message.showActions && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {(message.showActions === 'appointment' || message.showActions === 'both') && (
                    <Link
                      to="/appointments"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      <Calendar className="w-4 h-4" />
                      Afspraak maken
                    </Link>
                  )}
                  {(message.showActions === 'contact' || message.showActions === 'both') && (
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent-500 text-white text-sm rounded-lg hover:bg-accent-600 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      Contact opnemen
                    </Link>
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
          placeholder="Typ uw vraag..."
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
        {['Ik wil starten', 'BTW vraag', 'Tarieven', 'Successie', 'Overname', 'Afspraak maken'].map((action) => (
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
