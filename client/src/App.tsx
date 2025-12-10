import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AppointmentsPage from './pages/AppointmentsPage';
import ChatPage from './pages/ChatPage';
import BoekhoudingPage from './pages/BoekhoudingPage';
import FiscaliteitPage from './pages/FiscaliteitPage';
import BegeleidingPage from './pages/BegeleidingPage';
import FAQPage from './pages/FAQPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/boekhouding" element={<BoekhoudingPage />} />
      <Route path="/fiscaliteit" element={<FiscaliteitPage />} />
      <Route path="/begeleiding" element={<BegeleidingPage />} />
      <Route path="/faq" element={<FAQPage />} />
      
      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <DashboardPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/appointments"
        element={
          <ProtectedRoute>
            <Layout>
              <AppointmentsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <Layout>
              <ChatPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
