import React, { createContext, useContext, useState, useEffect } from 'react';
import { signIn as amplifySignIn, signUp as amplifySignUp, 
  confirmSignUp as amplifyConfirmSignUp, resendSignUpCode as amplifyResendSignUpCode, 
  resetPassword as amplifyResetPassword, confirmResetPassword as amplifyConfirmResetPassword, 
  signOut as amplifySignOut, getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { AuthUser } from 'aws-amplify/auth';

export interface UserProfile {
  id: string;
  username: string;
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
  signIn: (username: string, password: string) => Promise<any>;
  signUp: (username: string, password: string, email: string) => Promise<any>;
  confirmSignUp: (username: string, code: string) => Promise<any>;
  resendConfirmationCode: (username: string) => Promise<any>;
  forgotPassword: (username: string) => Promise<any>;
  forgotPasswordSubmit: (username: string, code: string, newPassword: string) => Promise<any>;
  signOut: () => Promise<void>;
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
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      setIsLoading(true);
      const currentUser = await getCurrentUser();
      
      if (currentUser) {
        const userAttributes = await fetchUserAttributes();
        
        // Get email from user attributes
        const email = userAttributes.email || '';
        
        // Simple role assignment based on email (in a real app, this would come from your backend)
        const role = email.includes('admin') ? 'admin' : 'coach';
        
        const userProfile: UserProfile = {
          id: currentUser.userId,
          username: currentUser.username,
          email: email,
          role: role,
          sessionCount: 0,
          sessionHistory: [],
          // You can add more user attributes here as needed
        };
        
        setUser(userProfile);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log('Not authenticated', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await amplifySignIn({ username, password });
      await checkAuthState();
      return result;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (username: string, password: string, email: string) => {
    setIsLoading(true);
    try {
      const result = await amplifySignUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
          },
        },
      });
      return result;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const confirmSignUp = async (username: string, code: string) => {
    setIsLoading(true);
    try {
      return await amplifyConfirmSignUp({ username, confirmationCode: code });
    } catch (error) {
      console.error('Error confirming sign up:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resendConfirmationCode = async (username: string) => {
    setIsLoading(true);
    try {
      return await amplifyResendSignUpCode({ username });
    } catch (error) {
      console.error('Error resending confirmation code:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (username: string) => {
    setIsLoading(true);
    try {
      return await amplifyResetPassword({ username });
    } catch (error) {
      console.error('Error initiating forgot password:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPasswordSubmit = async (username: string, code: string, newPassword: string) => {
    setIsLoading(true);
    try {
      return await amplifyConfirmResetPassword({
        username,
        confirmationCode: code,
        newPassword,
      });
    } catch (error) {
      console.error('Error submitting new password:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await amplifySignOut();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
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
    signIn,
    signUp,
    confirmSignUp,
    resendConfirmationCode,
    forgotPassword,
    forgotPasswordSubmit,
    signOut,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
