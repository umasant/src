import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/CognitoAuthContext';
import Loading from '../shared/Loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: 'coach' | 'admin';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  role 
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loading message="Authenticating..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If a specific role is required, check if the user has that role
  if (role && user?.role !== role) {
    // Redirect to the appropriate dashboard based on the user's actual role
    if (user?.role === 'admin') {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/coach" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
