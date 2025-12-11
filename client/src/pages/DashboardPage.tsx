import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MessageCircle, FileText, Clock, ArrowRight, Loader2, Upload, Download, File, X } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { api } from '../services/api';
import type { Appointment } from '../types/api';
import DocumentUploadModal from '../components/DocumentUploadModal';


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

      {/* Documents Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Received Documents */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Download className="w-5 h-5 text-primary-600" />
              <h2 className="text-lg font-semibold text-gray-900">Ontvangen documenten</h2>
            </div>
            <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
              Van Oostboek
            </span>
          </div>
          
          <div className="space-y-2 mb-4">
            {/* Placeholder documents - replace with API data */}
            <DocumentItem 
              name="BTW Aangifte Q3 2024.pdf" 
              date="15 okt 2024" 
              size="245 KB"
              type="received"
            />
            <DocumentItem 
              name="Jaarrekening 2023.pdf" 
              date="28 jun 2024" 
              size="1.2 MB"
              type="received"
            />
          </div>
          
          <p className="text-xs text-gray-400 text-center">
            Documenten van uw boekhouder
          </p>
        </div>

        {/* Uploaded Documents */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-accent-600" />
              <h2 className="text-lg font-semibold text-gray-900">Mijn uploads</h2>
            </div>
            <span className="text-xs bg-accent-100 text-accent-700 px-2 py-1 rounded-full">
              Door u geüpload
            </span>
          </div>
          
          <div className="space-y-2 mb-4">
            {/* Placeholder - empty state or uploaded docs */}
            <div className="text-center py-4">
              <FileText className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Nog geen documenten geüpload</p>
            </div>
          </div>
          
          {/* Upload Zone */}
          <UploadZone />
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

function DocumentItem({
  name,
  date,
  size,
  type,
}: {
  name: string;
  date: string;
  size: string;
  type: 'received' | 'uploaded';
}) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          type === 'received' ? 'bg-primary-100' : 'bg-accent-100'
        }`}>
          <File className={`w-5 h-5 ${type === 'received' ? 'text-primary-600' : 'text-accent-600'}`} />
        </div>
        <div>
          <p className="font-medium text-gray-900 text-sm">{name}</p>
          <p className="text-xs text-gray-500">{date} • {size}</p>
        </div>
      </div>
      <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
        <Download className="w-4 h-4 text-gray-500" />
      </button>
    </div>
  );
}

function UploadZone() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string; rawFile?: File }[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: string; rawFile?: File } | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: globalThis.File[]) => {
    // Process first file and open modal
    if (files.length > 0) {
      const file = files[0];
      const fileData = {
        name: file.name,
        size: formatFileSize(file.size),
        rawFile: file,
      };
      setSelectedFile(fileData);
      setModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    // Add file to uploaded list when modal closes (after successful processing)
    if (selectedFile) {
      setUploadedFiles(prev => [...prev, selectedFile]);
    }
    setSelectedFile(null);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <div>
        {/* Uploaded files list */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-2 mb-3">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-accent-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <File className="w-4 h-4 text-accent-600" />
                  <span className="text-sm text-gray-700">{file.name}</span>
                  <span className="text-xs text-gray-500">({file.size})</span>
                </div>
                <button 
                  onClick={() => removeFile(index)}
                  className="p-1 hover:bg-accent-100 rounded transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Drop zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
            isDragging 
              ? 'border-accent-500 bg-accent-50' 
              : 'border-gray-300 hover:border-accent-400 hover:bg-gray-50'
          }`}
        >
          <Upload className={`w-8 h-8 mx-auto mb-2 ${isDragging ? 'text-accent-500' : 'text-gray-400'}`} />
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium text-accent-600">Klik om te uploaden</span> of sleep bestanden hierheen
          </p>
          <p className="text-xs text-gray-400">PDF, JPG, PNG, CSV tot 10MB</p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.csv,.xlsx,.xls"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </div>

      {/* Document Upload Modal */}
      <DocumentUploadModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        file={selectedFile}
      />
    </>
  );
}
