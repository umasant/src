import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
//import { useAuth } from '../contexts/MockAuthContext';
import { useSession } from '../contexts/SessionContext';
import { useAuth } from '../contexts/CognitoAuthContext';
import { SessionProvider } from './contexts/SessionContext';

const DashboardContainer = styled.div`
  padding: 2rem 0;
`;

const WelcomeSection = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const WelcomeTitle = styled.h1`
  color: var(--text-color);
  margin-bottom: 0.5rem;
`;

const WelcomeSubtitle = styled.p`
  color: var(--dark-gray);
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: var(--dark-gray);
  font-size: 1rem;
`;

const ActionButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #3a80d2;
  }
`;

const RecentSessionsSection = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const SectionTitle = styled.h2`
  color: var(--text-color);
  margin-bottom: 1.5rem;
`;

const SessionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SessionCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid var(--light-gray);
  transition: background-color 0.2s;
  
  &:hover {
    background-color: var(--light-gray);
  }
`;

const SessionInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const SessionDate = styled.div`
  font-weight: 600;
  color: var(--text-color);
`;

const SessionType = styled.div`
  color: var(--dark-gray);
  font-size: 0.9rem;
`;

const SessionScore = styled.div<{ score: number }>`
  font-weight: 700;
  font-size: 1.2rem;
  color: ${props => {
    if (props.score >= 7) return 'var(--success-color)';
    if (props.score >= 4) return 'var(--warning-color)';
    return 'var(--danger-color)';
  }};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: var(--dark-gray);
`;

const CoachDashboard: React.FC = () => {
  const { user } = useAuth();
  const { sessionCount, sessionHistory, startNewSession } = useSession();
  const navigate = useNavigate();
  
  const handleStartSession = () => {
    navigate('/categories');
  };
  
  // Calculate average score from session history
  const averageScore = sessionHistory.length > 0
    ? (sessionHistory.reduce((sum, session) => sum + session.performanceMetrics.overallScore, 0) / sessionHistory.length).toFixed(1)
    : '0.0';
  
  // Get recent sessions (last 5)
  const recentSessions = [...sessionHistory]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  
  return (
    <DashboardContainer>
      <WelcomeSection>
        <WelcomeTitle>Welcome, {user?.name}!</WelcomeTitle>
        <WelcomeSubtitle>
          Ready to improve your coaching skills? Start a new session or review your past performance.
        </WelcomeSubtitle>
        <ActionButton onClick={handleStartSession}>
          Start New Coaching Session
        </ActionButton>
      </WelcomeSection>
      
      <StatsGrid>
        <StatCard>
          <StatValue>{sessionCount}</StatValue>
          <StatLabel>Total Sessions</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{averageScore}</StatValue>
          <StatLabel>Average Score (1-10)</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>
            {sessionHistory.length > 0 
              ? Math.max(...sessionHistory.map(s => s.performanceMetrics.overallScore)).toFixed(1) 
              : '0.0'}
          </StatValue>
          <StatLabel>Highest Score</StatLabel>
        </StatCard>
      </StatsGrid>
      
      <RecentSessionsSection>
        <SectionTitle>Recent Sessions</SectionTitle>
        
        {recentSessions.length > 0 ? (
          <SessionsList>
            {recentSessions.map(session => (
              <SessionCard key={session.id} onClick={() => navigate(`/summary/${session.id}`)}>
                <SessionInfo>
                  <SessionDate>
                    {new Date(session.date).toLocaleDateString()} at {new Date(session.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </SessionDate>
                  <SessionType>{session.clientType} Client</SessionType>
                </SessionInfo>
                <SessionScore score={session.performanceMetrics.overallScore}>
                  {session.performanceMetrics.overallScore.toFixed(1)}/10
                </SessionScore>
              </SessionCard>
            ))}
          </SessionsList>
        ) : (
          <EmptyState>
            <p>You haven't completed any coaching sessions yet.</p>
            <p>Start your first session to see your performance!</p>
          </EmptyState>
        )}
      </RecentSessionsSection>
    </DashboardContainer>
  );
};

export default CoachDashboard;
