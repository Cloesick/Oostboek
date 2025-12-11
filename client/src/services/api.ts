const API_BASE = import.meta.env.PROD 
  ? 'https://3kxjm2mtcj.eu-central-1.awsapprunner.com/api' 
  : '/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

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
    request<{ user: any; token: string }>('/auth/login', {
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
    request<{ user: any; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getMe: () => request<any>('/auth/me'),

  // Appointments
  getAppointments: () => request<any[]>('/appointments'),
  
  getAvailableSlots: (date: string, staffId?: string) =>
    request<string[]>(`/appointments/available-slots?date=${date}${staffId ? `&staffId=${staffId}` : ''}`),
  
  getStaff: (serviceType?: string) => 
    request<any[]>(`/appointments/staff${serviceType ? `?serviceType=${serviceType}` : ''}`),
  
  createAppointment: (data: {
    staffId: string;
    serviceType: string;
    scheduledAt: string;
    topic: string;
    description?: string;
  }) =>
    request<any>('/appointments', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  cancelAppointment: (id: string, reason?: string) =>
    request<any>(`/appointments/${id}/cancel`, {
      method: 'PATCH',
      body: JSON.stringify({ reason }),
    }),

  // Chat
  getChatSessions: () => request<any[]>('/chat/sessions'),
  
  createChatSession: () =>
    request<any>('/chat/sessions', { method: 'POST' }),
  
  getChatSession: (id: string) => request<any>(`/chat/sessions/${id}`),
  
  sendMessage: (sessionId: string, content: string) =>
    request<any>(`/chat/sessions/${sessionId}/messages`, {
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
  getProfile: () => request<any>('/profile'),
  
  updateProfile: (data: {
    companyName?: string;
    phone?: string;
    legalForm?: string;
    street?: string;
    city?: string;
    postalCode?: string;
    howDidYouHear?: string;
  }) =>
    request<any>('/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};
