import { useState, useEffect } from 'react';
import { X, Cookie, Shield, BarChart3, Target } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

const COOKIE_CONSENT_KEY = 'oostboek-cookie-consent';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always required
    functional: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Small delay to avoid flash on page load
      setTimeout(() => setShowBanner(true), 500);
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
      ...prefs,
      timestamp: new Date().toISOString(),
      version: '1.0',
    }));
    setShowBanner(false);
    
    // Apply preferences (e.g., load/block analytics scripts)
    applyPreferences(prefs);
  };

  const applyPreferences = (prefs: CookiePreferences) => {
    // Here you would enable/disable tracking scripts based on preferences
    if (prefs.analytics) {
      // Enable Google Analytics, etc.
      console.log('Analytics enabled');
    }
    if (prefs.marketing) {
      // Enable marketing pixels
      console.log('Marketing enabled');
    }
  };

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    savePreferences(allAccepted);
  };

  const acceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    setPreferences(necessaryOnly);
    savePreferences(necessaryOnly);
  };

  const saveCustom = () => {
    savePreferences(preferences);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 z-40" onClick={() => {}} />
      
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-primary-900 text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Cookie className="w-6 h-6" />
              <h2 className="text-lg font-bold">Cookie-instellingen</h2>
            </div>
            <button 
              onClick={acceptNecessary}
              className="p-1 hover:bg-primary-800 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            {!showDetails ? (
              /* Simple View */
              <>
                <p className="text-gray-600 mb-6">
                  Wij gebruiken cookies om uw ervaring te verbeteren, het websiteverkeer te analyseren 
                  en gepersonaliseerde content te tonen. U kunt uw voorkeuren aanpassen of alle cookies accepteren.
                </p>

                {/* Quick Selection Buttons */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <button
                    onClick={acceptAll}
                    className="flex-1 min-w-[140px] bg-primary-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                  >
                    Alles accepteren
                  </button>
                  <button
                    onClick={acceptNecessary}
                    className="flex-1 min-w-[140px] bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                  >
                    Alleen noodzakelijk
                  </button>
                  <button
                    onClick={() => setShowDetails(true)}
                    className="flex-1 min-w-[140px] border border-gray-300 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Aanpassen
                  </button>
                </div>

                <p className="text-xs text-gray-500">
                  Door op "Alles accepteren" te klikken, gaat u akkoord met het opslaan van cookies op uw apparaat.{' '}
                  <a href="/privacy" className="text-primary-600 hover:underline">Privacybeleid</a>
                </p>
              </>
            ) : (
              /* Detailed View */
              <>
                <p className="text-gray-600 mb-6">
                  Selecteer welke cookies u wilt toestaan. Noodzakelijke cookies zijn altijd actief 
                  omdat ze essentieel zijn voor de werking van de website.
                </p>

                {/* Cookie Categories */}
                <div className="space-y-4 mb-6">
                  <CookieCategory
                    icon={<Shield className="w-5 h-5" />}
                    title="Noodzakelijke cookies"
                    description="Essentieel voor de werking van de website. Zonder deze cookies werkt de site niet correct."
                    enabled={preferences.necessary}
                    locked={true}
                    onChange={() => {}}
                  />
                  
                  <CookieCategory
                    icon={<Cookie className="w-5 h-5" />}
                    title="Functionele cookies"
                    description="Onthouden uw voorkeuren zoals taal en regio voor een betere gebruikerservaring."
                    enabled={preferences.functional}
                    locked={false}
                    onChange={(val) => setPreferences(p => ({ ...p, functional: val }))}
                  />
                  
                  <CookieCategory
                    icon={<BarChart3 className="w-5 h-5" />}
                    title="Analytische cookies"
                    description="Helpen ons te begrijpen hoe bezoekers de website gebruiken, zodat we deze kunnen verbeteren."
                    enabled={preferences.analytics}
                    locked={false}
                    onChange={(val) => setPreferences(p => ({ ...p, analytics: val }))}
                  />
                  
                  <CookieCategory
                    icon={<Target className="w-5 h-5" />}
                    title="Marketing cookies"
                    description="Worden gebruikt om advertenties relevanter te maken en om de effectiviteit van campagnes te meten."
                    enabled={preferences.marketing}
                    locked={false}
                    onChange={(val) => setPreferences(p => ({ ...p, marketing: val }))}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={saveCustom}
                    className="flex-1 min-w-[140px] bg-primary-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                  >
                    Voorkeuren opslaan
                  </button>
                  <button
                    onClick={acceptAll}
                    className="flex-1 min-w-[140px] bg-accent-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-accent-600 transition-colors"
                  >
                    Alles accepteren
                  </button>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="border border-gray-300 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Terug
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function CookieCategory({
  icon,
  title,
  description,
  enabled,
  locked,
  onChange,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  locked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className={`flex items-start gap-4 p-4 rounded-xl border ${
      enabled ? 'bg-primary-50 border-primary-200' : 'bg-gray-50 border-gray-200'
    }`}>
      <div className={`p-2 rounded-lg ${enabled ? 'bg-primary-100 text-primary-600' : 'bg-gray-200 text-gray-500'}`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-medium text-gray-900">{title}</h3>
          {locked ? (
            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">Altijd actief</span>
          ) : (
            <button
              onClick={() => onChange(!enabled)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                enabled ? 'bg-primary-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  enabled ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          )}
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}

// Export a function to check consent status
export function getCookieConsent(): CookiePreferences | null {
  const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (!consent) return null;
  try {
    return JSON.parse(consent);
  } catch {
    return null;
  }
}

// Export a function to reset consent (for settings page)
export function resetCookieConsent() {
  localStorage.removeItem(COOKIE_CONSENT_KEY);
  window.location.reload();
}
