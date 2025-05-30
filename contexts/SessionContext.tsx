import React, { createContext, useContext, useState, useEffect } from 'react';
//import { useAuth } from './MockAuthContext';
import { useAuth } from '../contexts/CognitoAuthContext';

export interface PerformanceMetrics {
  activeListeningScore: number; // 1-10
  questionQualityScore: number; // 1-10
  responseAppropriatenessScore: number; // 1-10
  goalSettingEffectivenessScore: number; // 1-10
  clientEngagementScore: number; // 1-10
  overallScore: number; // 1-10, average of all scores
  feedback: {
    strengths: string[];
    areasForImprovement: string[];
    actionableSteps: string[];
  };
}

export interface Session {
  id: string;
  userId: string;
  date: Date;
  duration: number; // in minutes
  clientType: string;
  summary: {
    strengths: string[];
    areasForImprovement: string[];
    keyInsights: string[];
    overallRating: number;
  };
  transcript: string;
  performanceMetrics: PerformanceMetrics;
  completed: boolean;
}

interface SessionContextType {
  currentSession: Session | null;
  sessionHistory: Session[];
  startNewSession: () => void;
  endCurrentSession: () => void;
  updateCurrentSession: (updates: Partial<Session>) => void;
  getSessionById: (id: string) => Session | undefined;
  sessionCount: number;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, updateUserProfile } = useAuth();
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [sessionHistory, setSessionHistory] = useState<Session[]>([]);
  const [sessionCount, setSessionCount] = useState<number>(0);

  // Load session history from localStorage on component mount
  useEffect(() => {
    if (user) {
      const storedHistory = localStorage.getItem(`sessionHistory-${user.id}`);
      if (storedHistory) {
        try {
          const parsedHistory = JSON.parse(storedHistory);
          setSessionHistory(parsedHistory.map((session: any) => ({
            ...session,
            date: new Date(session.date)
          })));
        } catch (error) {
          console.error('Error parsing session history:', error);
        }
      }
      
      setSessionCount(user.sessionCount || 0);
    }
  }, [user]);

  // Save session history to localStorage whenever it changes
  useEffect(() => {
    if (user && sessionHistory.length > 0) {
      localStorage.setItem(`sessionHistory-${user.id}`, JSON.stringify(sessionHistory));
    }
  }, [sessionHistory, user]);

  const startNewSession = () => {
    if (!user) return;

    const newSession: Session = {
      id: `session-${Date.now()}`,
      userId: user.id,
      date: new Date(),
      duration: 30, // 30 minutes
      clientType: 'General',
      summary: {
        strengths: [],
        areasForImprovement: [],
        keyInsights: [],
        overallRating: 0,
      },
      transcript: '',
      performanceMetrics: {
        activeListeningScore: 0,
        questionQualityScore: 0,
        responseAppropriatenessScore: 0,
        goalSettingEffectivenessScore: 0,
        clientEngagementScore: 0,
        overallScore: 0,
        feedback: {
          strengths: [],
          areasForImprovement: [],
          actionableSteps: [],
        },
      },
      completed: false,
    };

    setCurrentSession(newSession);
  };

  const endCurrentSession = () => {
    if (!currentSession || !user) return;

    const completedSession = {
      ...currentSession,
      completed: true,
    };

    // Add to session history
    const updatedHistory = [...sessionHistory, completedSession];
    setSessionHistory(updatedHistory);

    // Update session count
    const newSessionCount = sessionCount + 1;
    setSessionCount(newSessionCount);

    // Update user profile
    updateUserProfile({
      sessionCount: newSessionCount,
      sessionHistory: [...(user.sessionHistory || []), completedSession.id],
    });

    // Clear current session
    setCurrentSession(null);
  };

  const updateCurrentSession = (updates: Partial<Session>) => {
    if (currentSession) {
      setCurrentSession({ ...currentSession, ...updates });
    }
  };

  const getSessionById = (id: string) => {
    return sessionHistory.find(session => session.id === id);
  };

  const value = {
    currentSession,
    sessionHistory,
    startNewSession,
    endCurrentSession,
    updateCurrentSession,
    getSessionById,
    sessionCount,
  };

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};
