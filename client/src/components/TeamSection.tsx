import { Linkedin, Calculator, Scale, Rocket, Users2, Building2, Globe, Receipt, Landmark, Handshake } from 'lucide-react';

// Team data from personnel.txt - organized by primary specialization
const teamMembers = [
  // === BOEKHOUDING (Primary) ===
  {
    firstName: 'Dina',
    lastName: 'Tamsin',
    role: 'ACCOUNTANT',
    specializations: ['Boekhouding', 'BTW', 'Lonen'],
    linkedin: 'https://www.linkedin.com/in/dinatamsin/',
    primary: 'Boekhouding',
  },
  {
    firstName: 'Kristel',
    lastName: 'Vande Walle',
    role: 'ACCOUNTANT',
    specializations: ['Boekhouding', 'BTW'],
    linkedin: 'https://www.linkedin.com/in/kristel-vande-walle-7aa9a5339/',
    primary: 'Boekhouding',
  },
  {
    firstName: 'Jessy',
    lastName: 'Moeyaert',
    role: 'ACCOUNTANT',
    specializations: ['Boekhouding', 'Lonen'],
    linkedin: 'https://www.linkedin.com/in/jessy-moeyaert-36a782133/',
    primary: 'Boekhouding',
  },
  {
    firstName: 'Geert',
    lastName: 'Hutsebaut',
    role: 'ACCOUNTANT',
    specializations: ['Boekhouding', 'Fiscaliteit', 'BTW'],
    linkedin: 'https://www.linkedin.com/in/geert-hutsebaut-a1b08898/',
    primary: 'Boekhouding',
  },
  {
    firstName: 'Sophie',
    lastName: 'Ysenbrandt',
    role: 'ACCOUNTANT',
    specializations: ['Boekhouding', 'BTW', 'Internationaal'],
    linkedin: 'https://www.linkedin.com/in/sophie-ysenbrandt-20119a124/',
    primary: 'Boekhouding',
  },
  {
    firstName: 'Dylan',
    lastName: 'Denys',
    role: 'ACCOUNTANT',
    specializations: ['Boekhouding', 'BTW'],
    linkedin: 'https://www.linkedin.com/in/dylan-denys-26b955205/',
    primary: 'Boekhouding',
  },
  // === FISCALITEIT (Primary) ===
  {
    firstName: 'Mattijs',
    lastName: 'Wittevrongel',
    role: 'ADVISOR',
    specializations: ['Fiscaliteit', 'Successie', 'Overname'],
    linkedin: 'https://www.linkedin.com/in/mattijs-wittevrongel-06b8a71b4/',
    primary: 'Fiscaliteit',
  },
  {
    firstName: 'Bram',
    lastName: 'Keukeleire',
    role: 'ADVISOR',
    specializations: ['Fiscaliteit', 'Starters', 'Overname'],
    linkedin: 'https://www.linkedin.com/in/bram-keukeleire-816544232/',
    primary: 'Fiscaliteit',
  },
  {
    firstName: 'Dieter',
    lastName: 'Hoste',
    role: 'ADVISOR',
    specializations: ['Fiscaliteit', 'Successie', 'Internationaal'],
    linkedin: 'https://www.linkedin.com/in/dieter-hoste-a19940197/',
    primary: 'Fiscaliteit',
  },
  // === STARTERS (Primary) ===
  {
    firstName: 'Xenia',
    lastName: 'Lateste',
    role: 'ACCOUNTANT',
    specializations: ['Starters', 'Boekhouding'],
    linkedin: 'https://www.linkedin.com/in/xenia-lateste-937a44252/',
    primary: 'Starters',
  },
  {
    firstName: 'Mathias',
    lastName: 'Lievens',
    role: 'ADVISOR',
    specializations: ['Starters', 'Overname'],
    linkedin: 'https://www.linkedin.com/in/mathias-lievens-646a93356/',
    primary: 'Starters',
  },
];

// Expertise categories with icons and colors
const expertiseCategories = [
  { id: 'Boekhouding', label: 'Boekhouding', icon: Calculator, color: 'bg-blue-500', lightColor: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'BTW', label: 'BTW & Aangiftes', icon: Receipt, color: 'bg-indigo-500', lightColor: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { id: 'Fiscaliteit', label: 'Fiscaliteit', icon: Landmark, color: 'bg-green-500', lightColor: 'bg-green-50 text-green-700 border-green-200' },
  { id: 'Starters', label: 'Starters', icon: Rocket, color: 'bg-orange-500', lightColor: 'bg-orange-50 text-orange-700 border-orange-200' },
  { id: 'Lonen', label: 'Loonadministratie', icon: Users2, color: 'bg-purple-500', lightColor: 'bg-purple-50 text-purple-700 border-purple-200' },
  { id: 'Successie', label: 'Successie', icon: Scale, color: 'bg-rose-500', lightColor: 'bg-rose-50 text-rose-700 border-rose-200' },
  { id: 'Overname', label: 'Overname & Fusie', icon: Handshake, color: 'bg-amber-500', lightColor: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'Internationaal', label: 'Internationaal', icon: Globe, color: 'bg-teal-500', lightColor: 'bg-teal-50 text-teal-700 border-teal-200' },
];

export default function TeamSection() {
  return (
    <section id="team" className="px-4 py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Maak kennis met onze experts
          </h2>
        </div>

        {/* Matrix View - Specializations vs People */}
        <div className="overflow-x-auto pb-4">
            <table className="w-full min-w-[800px] border border-gray-300 rounded-xl overflow-hidden">
              {/* Header Row - Team Members */}
              <thead>
                <tr>
                  <th className="p-3 bg-primary-900 text-white rounded-tl-xl sticky left-0 z-10">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5" />
                      <span className="font-semibold">Expertise</span>
                    </div>
                  </th>
                  {teamMembers.map((member) => (
                    <th key={member.linkedin} className="p-2 bg-primary-800 text-white text-center min-w-[80px] border-l border-primary-700">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary-200 transition-colors"
                      >
                        <div className="text-xs font-medium">{member.firstName}</div>
                        <div className="text-[10px] text-primary-300">{member.lastName}</div>
                      </a>
                    </th>
                  ))}
                  <th className="p-3 bg-primary-900 text-white rounded-tr-xl text-center border-l border-primary-700">
                    <span className="text-xs font-medium">Totaal</span>
                  </th>
                </tr>
              </thead>
              
              {/* Body - Specializations */}
              <tbody>
                {expertiseCategories.map((category, idx) => {
                  const Icon = category.icon;
                  const membersWithSpec = teamMembers.filter(m => m.specializations.includes(category.id));
                  const isLast = idx === expertiseCategories.length - 1;
                  
                  return (
                    <tr key={category.id} className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-t border-gray-200`}>
                      {/* Specialization Label */}
                      <td className={`p-3 sticky left-0 z-10 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} ${isLast ? 'rounded-bl-xl' : ''}`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center shadow-sm`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <span className="font-medium text-gray-900 text-sm">{category.label}</span>
                        </div>
                      </td>
                      
                      {/* Checkmarks for each member */}
                      {teamMembers.map((member) => {
                        const hasSpec = member.specializations.includes(category.id);
                        return (
                          <td key={member.linkedin} className="p-2 text-center border-l border-gray-200">
                            {hasSpec ? (
                              <div className={`w-8 h-8 ${category.color} rounded-lg flex items-center justify-center mx-auto shadow-sm`}>
                                <Icon className="w-4 h-4 text-white" />
                              </div>
                            ) : (
                              <div className="w-8 h-8 bg-gray-100 rounded-lg mx-auto" />
                            )}
                          </td>
                        );
                      })}
                      
                      {/* Total count */}
                      <td className={`p-3 text-center font-bold text-gray-700 border-l border-gray-300 ${isLast ? 'rounded-br-xl' : ''}`}>
                        {membersWithSpec.length}
                      </td>
                    </tr>
                  );
                })}
                
                {/* Footer Row - Total per person */}
                <tr className="bg-primary-50 border-t-2 border-primary-200">
                  <td className="p-3 sticky left-0 bg-primary-50 rounded-bl-xl">
                    <span className="font-bold text-primary-900">Totaal per persoon</span>
                  </td>
                  {teamMembers.map((member) => (
                    <td key={member.linkedin} className="p-2 text-center border-l border-gray-200">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-primary-600 text-white rounded-full font-bold text-sm">
                        {member.specializations.length}
                      </span>
                    </td>
                  ))}
                  <td className="p-3 text-center rounded-br-xl border-l border-gray-300">
                    <span className="font-bold text-primary-900">
                      {teamMembers.reduce((sum, m) => sum + m.specializations.length, 0)}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            
            {/* Legend */}
            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-500 rounded-lg" />
                Heeft expertise
              </span>
              <span className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-100 rounded-lg" />
                Geen expertise
              </span>
              <span className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-blue-500" />
                Klik op naam voor LinkedIn
              </span>
            </div>
          </div>
      </div>
    </section>
  );
}
