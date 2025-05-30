import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'coach' | 'admin';
  sessionCount: number;
  sessionHistory: string[]; // Array of session IDs
  picture?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithRedirect: () => void;
  logout: () => void;
  getAccessTokenSilently: () => Promise<string>;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    user: auth0User,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout: auth0Logout,
    getAccessTokenSilently,
  } = useAuth0();

  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (isAuthenticated && auth0User) {
      // In a real app, you would fetch the user profile from your backend
      // For now, we'll create a mock user profile based on Auth0 user info
      const mockUserProfile: UserProfile = {
        id: auth0User.sub || '',
        name: auth0User.name || '',
        email: auth0User.email || '',
        role: auth0User.email?.includes('admin') ? 'admin' : 'coach', // Simple role assignment for demo
        sessionCount: 0,
        sessionHistory: [],
        picture: auth0User.picture,
      };
      
      setUser(mockUserProfile);
    } else {
      setUser(null);
    }
  }, [isAuthenticated, auth0User]);

  const logout = () => {
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...updates });
      // In a real app, you would also update the user profile in your backend
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
