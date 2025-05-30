import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Contexts
import { useAuth } from './contexts/CognitoAuthContext';
import { SessionProvider } from './contexts/SessionContext';

// Components
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Loading from './components/shared/Loading';

// Pages
import Login from './pages/Login';
import CoachDashboard from './pages/CoachDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CoachingSession from './pages/CoachingSession';
import SessionSummary from './pages/SessionSummary';
import SessionHistory from './pages/SessionHistory';
import UserManagement from './pages/UserManagement';
import PerformanceAnalytics from './pages/PerformanceAnalytics';
import CategorySelection from './pages/CategorySelection';
import SubcategorySelection from './pages/SubcategorySelection';
import HomePage from './pages/HomePage';
import CoachesPage from './pages/CoachesPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SessionProvider>
        <div className="app">
          <Header />
          <main className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route 
                path="/coach" 
                element={
                  <ProtectedRoute role="coach">
                    <CoachDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute role="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/session" 
                element={
                  <ProtectedRoute role="coach">
                    <CoachingSession />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/summary/:sessionId" 
                element={
                  <ProtectedRoute role="coach">
                    <SessionSummary />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/history" 
                element={
                  <ProtectedRoute role="coach">
                    <SessionHistory />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/users" 
                element={
                  <ProtectedRoute role="admin">
                    <UserManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/analytics" 
                element={
                  <ProtectedRoute role="admin">
                    <PerformanceAnalytics />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/categories" 
                element={
                  <ProtectedRoute role="coach">
                    <CategorySelection />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/subcategories/:categoryId" 
                element={
                  <ProtectedRoute role="coach">
                    <SubcategorySelection />
                  </ProtectedRoute>
                } 
              />
              <Route path="/coaches" element={<CoachesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </SessionProvider>
  );
};

export default App;
