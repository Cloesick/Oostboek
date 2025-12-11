export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  vatNumber?: string;
  companyName?: string;
  legalForm?: string;
  street?: string;
  city?: string;
  postalCode?: string;
  howDidYouHear?: string;
  profileCompleted: boolean;
  mfaEnabled: boolean;
  gdprConsentAt?: string;
}

export interface Staff {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  specializations: string;
}

export interface Appointment {
  id: string;
  userId: string;
  staffId: string;
  serviceType: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'NO_SHOW';
  scheduledAt: string;
  durationMinutes: number;
  topic: string;
  description?: string;
  documentsNeeded: string;
  staff?: Staff;
}

export interface ChatSession {
  id: string;
  userId: string;
  status: 'ACTIVE' | 'RESOLVED' | 'ESCALATED';
  escalatedAt?: string;
  escalationReason?: string;
  createdAt: string;
  updatedAt: string;
  messages?: ChatMessage[];
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  role: 'USER' | 'ASSISTANT' | 'SYSTEM';
  content: string;
  sources: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CONVERTED' | 'CLOSED';
  source: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
