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
import JaarrekeningenPage from './pages/JaarrekeningenPage';
import RapportagePage from './pages/RapportagePage';
import AnalysesPage from './pages/AnalysesPage';
import BudgettenPage from './pages/BudgettenPage';
import FiscaliteitPage from './pages/FiscaliteitPage';
import BegeleidingPage from './pages/BegeleidingPage';
import FAQPage from './pages/FAQPage';
import ProfileCompletionPage from './pages/ProfileCompletionPage';
import NotFoundPage from './pages/NotFoundPage';

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
      <Route path="/boekhouding/jaarrekeningen" element={<JaarrekeningenPage />} />
      <Route path="/boekhouding/rapportage" element={<RapportagePage />} />
      <Route path="/boekhouding/analyses" element={<AnalysesPage />} />
      <Route path="/boekhouding/budgetten" element={<BudgettenPage />} />
      <Route path="/fiscaliteit" element={<FiscaliteitPage />} />
      <Route path="/begeleiding" element={<BegeleidingPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route
        path="/complete-profile"
        element={
          <ProtectedRoute>
            <ProfileCompletionPage />
          </ProtectedRoute>
        }
      />
      
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
      
      {/* 404 Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
