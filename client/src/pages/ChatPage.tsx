import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Welkom bij Oostboek! Hoe kan ik u vandaag helpen? Ik kan u informatie geven over onze diensten, BTW-administratie, fiscale vragen, of u helpen een afspraak te maken.',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
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
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const generateResponse = (userInput: string): string => {
    const lower = userInput.toLowerCase();

    if (lower.includes('btw') || lower.includes('vat')) {
      return 'Voor BTW-administratie bieden wij volledige ondersteuning. De BTW-aangifte moet maandelijks of driemaandelijks worden ingediend, afhankelijk van uw omzet. Wilt u een afspraak maken om uw specifieke situatie te bespreken?';
    }

    if (lower.includes('factuur') || lower.includes('invoice')) {
      return 'Facturen moeten in België 10 jaar bewaard worden. U kunt uw facturen uploaden via de "Documenten" sectie in uw dashboard. Wij ondersteunen ook Peppol e-facturatie voor automatische verwerking.';
    }

    if (lower.includes('afspraak') || lower.includes('appointment')) {
      return 'U kunt eenvoudig een afspraak maken via de "Afspraken" pagina. Kies het type dienst, selecteer een beschikbare medewerker en tijdslot, en vul het intakeformulier in. Zal ik u daarheen doorverwijzen?';
    }

    if (lower.includes('starter') || lower.includes('beginnen') || lower.includes('oprichten')) {
      return 'Als starter bieden wij uitgebreide begeleiding: van de keuze van rechtsvorm tot BTW-registratie en eerste boekhouding. Ons startersadvies duurt ongeveer 60 minuten. Wilt u een afspraak maken met een van onze adviseurs?';
    }

    if (lower.includes('prijs') || lower.includes('kost') || lower.includes('tarief')) {
      return 'Onze tarieven zijn afhankelijk van de complexiteit van uw dossier. Voor een persoonlijke offerte kunt u het beste een afspraak maken met een van onze accountants. Zij kunnen uw situatie bekijken en een passend voorstel doen.';
    }

    return 'Bedankt voor uw vraag. Ik help u graag verder. Kunt u wat meer details geven over wat u precies wilt weten? Of wilt u direct een afspraak maken met een van onze specialisten?';
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
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
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
        {['BTW aangifte', 'Factuur uploaden', 'Afspraak maken', 'Startersadvies'].map((action) => (
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
