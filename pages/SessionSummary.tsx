import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSession } from '../contexts/SessionContext';
import Loading from '../components/shared/Loading';

const SummaryContainer = styled.div`
  padding: 2rem 0;
`;

const SummaryCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const SummaryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const SummaryTitle = styled.h1`
  color: var(--text-color);
  margin: 0;
`;

const SessionDate = styled.div`
  color: var(--dark-gray);
  font-size: 1.1rem;
`;

const OverallScore = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const ScoreCircle = styled.div<{ score: number }>`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
  background-color: ${props => {
    if (props.score >= 7) return 'var(--success-color)';
    if (props.score >= 4) return 'var(--warning-color)';
    return 'var(--danger-color)';
  }};
`;

const ScoreLabel = styled.div`
  font-size: 1.2rem;
  color: var(--dark-gray);
`;

const ScoresGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ScoreCard = styled.div<{ score: number }>`
  background-color: ${props => {
    if (props.score >= 7) return 'rgba(40, 167, 69, 0.1)';
    if (props.score >= 4) return 'rgba(255, 193, 7, 0.1)';
    return 'rgba(220, 53, 69, 0.1)';
  }};
  border-left: 4px solid ${props => {
    if (props.score >= 7) return 'var(--success-color)';
    if (props.score >= 4) return 'var(--warning-color)';
    return 'var(--danger-color)';
  }};
  border-radius: 4px;
  padding: 1rem;
`;

const ScoreCardTitle = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-color);
`;

const ScoreCardValue = styled.div<{ score: number }>`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => {
    if (props.score >= 7) return 'var(--success-color)';
    if (props.score >= 4) return 'var(--warning-color)';
    return 'var(--danger-color)';
  }};
`;

const SectionTitle = styled.h2`
  color: var(--text-color);
  margin: 2rem 0 1rem;
`;

const FeedbackList = styled.ul`
  margin: 0;
  padding-left: 1.5rem;
`;

const FeedbackItem = styled.li`
  margin-bottom: 0.5rem;
  color: var(--text-color);
`;

const TranscriptContainer = styled.div`
  background-color: var(--light-gray);
  border-radius: 8px;
  padding: 1.5rem;
  white-space: pre-line;
  max-height: 300px;
  overflow-y: auto;
  font-family: monospace;
  font-size: 0.9rem;
  line-height: 1.6;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const Button = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background-color: #3a80d2;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: white;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  
  &:hover {
    background-color: var(--light-gray);
  }
`;

const SessionSummary: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { getSessionById, startNewSession } = useSession();
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(null);
  const [showTranscript, setShowTranscript] = useState(false);
  
  useEffect(() => {
    if (sessionId) {
      const sessionData = getSessionById(sessionId);
      if (sessionData) {
        setSession(sessionData);
      } else {
        navigate('/coach');
      }
    }
  }, [sessionId, getSessionById, navigate]);
  
  const handleStartNewSession = () => {
    startNewSession();
    navigate('/session');
  };
  
  if (!session) {
    return <Loading message="Loading session summary..." />;
  }
  
  const { performanceMetrics, summary, date, transcript } = session;
  
  return (
    <SummaryContainer>
      <SummaryCard>
        <SummaryHeader>
          <SummaryTitle>Session Summary</SummaryTitle>
          <SessionDate>
            {new Date(date).toLocaleDateString()} at {new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </SessionDate>
        </SummaryHeader>
        
        <OverallScore>
          <ScoreCircle score={performanceMetrics.overallScore}>
            {performanceMetrics.overallScore.toFixed(1)}
          </ScoreCircle>
          <ScoreLabel>Overall Score (1-10)</ScoreLabel>
        </OverallScore>
        
        <ScoresGrid>
          <ScoreCard score={performanceMetrics.activeListeningScore}>
            <ScoreCardTitle>Active Listening</ScoreCardTitle>
            <ScoreCardValue score={performanceMetrics.activeListeningScore}>
              {performanceMetrics.activeListeningScore.toFixed(1)}
            </ScoreCardValue>
          </ScoreCard>
          
          <ScoreCard score={performanceMetrics.questionQualityScore}>
            <ScoreCardTitle>Question Quality</ScoreCardTitle>
            <ScoreCardValue score={performanceMetrics.questionQualityScore}>
              {performanceMetrics.questionQualityScore.toFixed(1)}
            </ScoreCardValue>
          </ScoreCard>
          
          <ScoreCard score={performanceMetrics.responseAppropriatenessScore}>
            <ScoreCardTitle>Response Appropriateness</ScoreCardTitle>
            <ScoreCardValue score={performanceMetrics.responseAppropriatenessScore}>
              {performanceMetrics.responseAppropriatenessScore.toFixed(1)}
            </ScoreCardValue>
          </ScoreCard>
          
          <ScoreCard score={performanceMetrics.goalSettingEffectivenessScore}>
            <ScoreCardTitle>Goal Setting</ScoreCardTitle>
            <ScoreCardValue score={performanceMetrics.goalSettingEffectivenessScore}>
              {performanceMetrics.goalSettingEffectivenessScore.toFixed(1)}
            </ScoreCardValue>
          </ScoreCard>
          
          <ScoreCard score={performanceMetrics.clientEngagementScore}>
            <ScoreCardTitle>Client Engagement</ScoreCardTitle>
            <ScoreCardValue score={performanceMetrics.clientEngagementScore}>
              {performanceMetrics.clientEngagementScore.toFixed(1)}
            </ScoreCardValue>
          </ScoreCard>
        </ScoresGrid>
        
        <SectionTitle>Strengths</SectionTitle>
        <FeedbackList>
          {summary.strengths.map((strength: string, index: number) => (
            <FeedbackItem key={`strength-${index}`}>{strength}</FeedbackItem>
          ))}
        </FeedbackList>
        
        <SectionTitle>Areas for Improvement</SectionTitle>
        <FeedbackList>
          {summary.areasForImprovement.map((area: string, index: number) => (
            <FeedbackItem key={`area-${index}`}>{area}</FeedbackItem>
          ))}
        </FeedbackList>
        
        <SectionTitle>Actionable Steps</SectionTitle>
        <FeedbackList>
          {performanceMetrics.feedback.actionableSteps.map((step: string, index: number) => (
            <FeedbackItem key={`step-${index}`}>{step}</FeedbackItem>
          ))}
        </FeedbackList>
        
        <SectionTitle>Key Insights</SectionTitle>
        <FeedbackList>
          {summary.keyInsights.map((insight: string, index: number) => (
            <FeedbackItem key={`insight-${index}`}>{insight}</FeedbackItem>
          ))}
        </FeedbackList>
        
        <SectionTitle>Session Transcript</SectionTitle>
        <Button onClick={() => setShowTranscript(!showTranscript)}>
          {showTranscript ? 'Hide Transcript' : 'Show Transcript'}
        </Button>
        
        {showTranscript && (
          <TranscriptContainer>
            {transcript}
          </TranscriptContainer>
        )}
        
        <ButtonsContainer>
          <SecondaryButton onClick={() => navigate('/history')}>
            View All Sessions
          </SecondaryButton>
          <Button onClick={handleStartNewSession}>
            Start New Session
          </Button>
        </ButtonsContainer>
      </SummaryCard>
    </SummaryContainer>
  );
};

export default SessionSummary;
