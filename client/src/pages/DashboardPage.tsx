import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MessageCircle, FileText, Clock, ArrowRight, Loader2 } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { api } from '../services/api';
import type { Appointment } from '../types/api';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);

  useEffect(() => {
    api.getAppointments()
      .then((response) => {
        if (response.success && response.data) {
          // Filter to only upcoming appointments (not cancelled/completed)
          const upcoming = response.data.filter(
            (apt) => apt.status === 'PENDING' || apt.status === 'CONFIRMED'
          );
          setAppointments(upcoming);
        }
      })
      .finally(() => setLoadingAppointments(false));
  }, []);

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welkom, {user?.firstName}!
        </h1>
        <p className="text-primary-100">
          Wat wilt u vandaag doen?
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/appointments"
          className="card hover:shadow-md transition-shadow group"
        >
          <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mb-4">
            <Calendar className="w-6 h-6 text-accent-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Afspraak maken</h3>
          <p className="text-sm text-gray-500">Plan een gesprek met onze specialisten</p>
          <ArrowRight className="w-5 h-5 text-gray-400 mt-3 group-hover:text-primary-600 transition-colors" />
        </Link>

        <Link
          to="/chat"
          className="card hover:shadow-md transition-shadow group"
        >
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
            <MessageCircle className="w-6 h-6 text-primary-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Stel een vraag</h3>
          <p className="text-sm text-gray-500">Krijg direct antwoord via onze AI-assistent</p>
          <ArrowRight className="w-5 h-5 text-gray-400 mt-3 group-hover:text-primary-600 transition-colors" />
        </Link>
      </div>

      {/* Upcoming Appointments */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Komende afspraken</h2>
          <Link to="/appointments" className="text-sm text-primary-600 hover:text-primary-700">
            Bekijk alle
          </Link>
        </div>
        
        {loadingAppointments ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary-600" />
          </div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 mb-4">Geen komende afspraken</p>
            <Link to="/appointments" className="btn-primary">
              Plan een afspraak
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {appointments.slice(0, 3).map((apt) => (
              <div key={apt.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{apt.topic}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(apt.scheduledAt).toLocaleDateString('nl-BE', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                      })}{' '}
                      om{' '}
                      {new Date(apt.scheduledAt).toLocaleTimeString('nl-BE', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  apt.status === 'CONFIRMED' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {apt.status === 'CONFIRMED' ? 'Bevestigd' : 'In afwachting'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Documents */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recente documenten</h2>
          <button className="text-sm text-primary-600 hover:text-primary-700">
            Bekijk alle
          </button>
        </div>
        
        {/* Empty state */}
        <div className="text-center py-8">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Nog geen documenten geüpload</p>
        </div>
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InfoCard
          title="BTW Aangifte"
          description="Volgende deadline: 20 januari 2025"
          status="upcoming"
        />
        <InfoCard
          title="Jaarrekening 2024"
          description="In behandeling"
          status="processing"
        />
        <InfoCard
          title="Facturen"
          description="3 facturen wachten op goedkeuring"
          status="action"
        />
      </div>
    </div>
  );
}

function InfoCard({
  title,
  description,
  status,
}: {
  title: string;
  description: string;
  status: 'upcoming' | 'processing' | 'action';
}) {
  const statusColors = {
    upcoming: 'bg-blue-50 border-blue-200',
    processing: 'bg-yellow-50 border-yellow-200',
    action: 'bg-orange-50 border-orange-200',
  };

  return (
    <div className={`p-4 rounded-xl border ${statusColors[status]}`}>
      <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
