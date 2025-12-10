import { useState } from 'react';
import { Calendar, Clock, User, ChevronLeft, ChevronRight } from 'lucide-react';

const SERVICE_TYPES = [
  { id: 'VAT_ADMINISTRATION', label: 'BTW Administratie', duration: 30 },
  { id: 'TAX_CONSULTATION', label: 'Fiscaal Advies', duration: 60 },
  { id: 'BOOKKEEPING', label: 'Boekhouding', duration: 45 },
  { id: 'STARTER_ADVICE', label: 'Startersadvies', duration: 60 },
  { id: 'SUCCESSION_PLANNING', label: 'Successieplanning', duration: 90 },
  { id: 'QUICK_QUESTION', label: 'Snelle Vraag', duration: 15 },
];

const MOCK_STAFF = [
  { id: '1', name: 'Jan Vermeersch', role: 'Accountant', specializations: ['tax', 'bookkeeping'] },
  { id: '2', name: 'Marie Claeys', role: 'Fiscalist', specializations: ['tax', 'succession'] },
  { id: '3', name: 'Pieter Desmet', role: 'Adviseur', specializations: ['startup', 'legal'] },
];

export default function AppointmentsPage() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [topic, setTopic] = useState('');

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: (Date | null)[] = [];

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  ];

  const handleSubmit = () => {
    // TODO: Call API to create appointment
    alert('Afspraak aangevraagd! U ontvangt een bevestiging per e-mail.');
    // Reset form
    setStep(1);
    setSelectedService(null);
    setSelectedStaff(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setTopic('');
  };

  return (
    <div className="pb-20 md:pb-0">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Afspraak maken</h1>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8 max-w-md">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= s
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {s}
            </div>
            {s < 4 && (
              <div
                className={`w-12 h-1 mx-2 ${
                  step > s ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Select Service */}
      {step === 1 && (
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Waarvoor wilt u een afspraak maken?
          </h2>
          <div className="grid gap-3">
            {SERVICE_TYPES.map((service) => (
              <button
                key={service.id}
                onClick={() => {
                  setSelectedService(service.id);
                  setStep(2);
                }}
                className={`p-4 rounded-xl border text-left transition-colors ${
                  selectedService === service.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{service.label}</p>
                    <p className="text-sm text-gray-500">{service.duration} minuten</p>
                  </div>
                  <Clock className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Select Staff */}
      {step === 2 && (
        <div className="card">
          <button
            onClick={() => setStep(1)}
            className="text-sm text-gray-500 hover:text-gray-700 mb-4 flex items-center"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Terug
          </button>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Kies een medewerker
          </h2>
          <div className="grid gap-3">
            {MOCK_STAFF.map((staff) => (
              <button
                key={staff.id}
                onClick={() => {
                  setSelectedStaff(staff.id);
                  setStep(3);
                }}
                className={`p-4 rounded-xl border text-left transition-colors ${
                  selectedStaff === staff.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{staff.name}</p>
                    <p className="text-sm text-gray-500">{staff.role}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Select Date & Time */}
      {step === 3 && (
        <div className="card">
          <button
            onClick={() => setStep(2)}
            className="text-sm text-gray-500 hover:text-gray-700 mb-4 flex items-center"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Terug
          </button>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Kies een datum en tijd
          </h2>

          {/* Calendar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="font-medium">
                {currentMonth.toLocaleDateString('nl-BE', { month: 'long', year: 'numeric' })}
              </span>
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'].map((day) => (
                <div key={day} className="py-2 text-gray-500 font-medium">
                  {day}
                </div>
              ))}
              {getDaysInMonth(currentMonth).map((day, index) => {
                if (!day) {
                  return <div key={`empty-${index}`} />;
                }
                const isToday = day.toDateString() === new Date().toDateString();
                const isSelected = selectedDate?.toDateString() === day.toDateString();
                const isPast = day < new Date(new Date().setHours(0, 0, 0, 0));
                const isWeekend = day.getDay() === 0 || day.getDay() === 6;

                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => !isPast && !isWeekend && setSelectedDate(day)}
                    disabled={isPast || isWeekend}
                    className={`py-2 rounded-lg transition-colors ${
                      isSelected
                        ? 'bg-primary-600 text-white'
                        : isToday
                        ? 'bg-primary-100 text-primary-700'
                        : isPast || isWeekend
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {day.getDate()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slots */}
          {selectedDate && (
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Beschikbare tijden</h3>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => {
                      setSelectedTime(time);
                      setStep(4);
                    }}
                    className={`py-2 px-3 rounded-lg text-sm transition-colors ${
                      selectedTime === time
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 4: Confirm */}
      {step === 4 && (
        <div className="card">
          <button
            onClick={() => setStep(3)}
            className="text-sm text-gray-500 hover:text-gray-700 mb-4 flex items-center"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Terug
          </button>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Bevestig uw afspraak
          </h2>

          {/* Summary */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-3">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span>
                {selectedDate?.toLocaleDateString('nl-BE', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <span>{selectedTime}</span>
            </div>
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-gray-400" />
              <span>{MOCK_STAFF.find((s) => s.id === selectedStaff)?.name}</span>
            </div>
          </div>

          {/* Topic */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Onderwerp van de afspraak *
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="input"
              placeholder="Bijv. Vraag over BTW-aangifte Q4"
              required
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!topic}
            className="btn-primary w-full py-3"
          >
            Afspraak bevestigen
          </button>
        </div>
      )}
    </div>
  );
}
