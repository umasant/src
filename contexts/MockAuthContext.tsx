import React, { createContext, useContext, useState } from 'react';

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
  // Mock user for demonstration purposes
  const mockUserProfile: UserProfile = {
    id: 'mock-user-id',
    name: 'Demo User',
    email: 'demo@example.com',
    role: 'coach', // Default to coach role
    sessionCount: 0,
    sessionHistory: [],
    picture: 'https://via.placeholder.com/150',
  };

  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loginWithRedirect = () => {
    setIsLoading(true);
    
    // Simulate authentication delay
    setTimeout(() => {
      setUser(mockUserProfile);
      setIsAuthenticated(true);
      setIsLoading(false);
    }, 1000);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    // Don't use window.location.href as it causes a full page reload
    // The Header component will handle navigation using React Router
  };

  const getAccessTokenSilently = async (): Promise<string> => {
    return 'mock-access-token';
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...updates });
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
