import type { ApiResponse, User, Staff, Appointment, ChatSession } from '../types/api';

const API_BASE = import.meta.env.PROD 
  ? 'https://3kxjm2mtcj.eu-central-1.awsapprunner.com/api' 
  : '/api';

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = localStorage.getItem('oostboek-auth')
    ? JSON.parse(localStorage.getItem('oostboek-auth')!).state?.token
    : null;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();
  return data;
}

export const api = {
  // Auth
  login: (email: string, password: string) =>
    request<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    gdprConsent: boolean;
  }) =>
    request<{ user: User; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getMe: () => request<User>('/auth/me'),

  // Appointments
  getAppointments: () => request<Appointment[]>('/appointments'),
  
  getAvailableSlots: (date: string, staffId?: string) =>
    request<string[]>(`/appointments/available-slots?date=${date}${staffId ? `&staffId=${staffId}` : ''}`),
  
  getStaff: (serviceType?: string) => 
    request<Staff[]>(`/appointments/staff${serviceType ? `?serviceType=${serviceType}` : ''}`),
  
  createAppointment: (data: {
    staffId: string;
    serviceType: string;
    scheduledAt: string;
    topic: string;
    description?: string;
  }) =>
    request<Appointment>('/appointments', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  cancelAppointment: (id: string, reason?: string) =>
    request<Appointment>(`/appointments/${id}/cancel`, {
      method: 'PATCH',
      body: JSON.stringify({ reason }),
    }),

  // Chat
  getChatSessions: () => request<ChatSession[]>('/chat/sessions'),
  
  createChatSession: () =>
    request<ChatSession>('/chat/sessions', { method: 'POST' }),
  
  getChatSession: (id: string) => request<ChatSession>(`/chat/sessions/${id}`),
  
  sendMessage: (sessionId: string, content: string) =>
    request<ChatSession>(`/chat/sessions/${sessionId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    }),

  // Leads (contact form)
  createLead: (data: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    service?: string;
    message: string;
  }) =>
    request<{ message: string }>('/leads', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Profile
  getProfile: () => request<User>('/profile'),
  
  updateProfile: (data: {
    companyName?: string;
    phone?: string;
    legalForm?: string;
    street?: string;
    city?: string;
    postalCode?: string;
    howDidYouHear?: string;
  }) =>
    request<User>('/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};
