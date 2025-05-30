import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
//import { useAuth } from '../contexts/MockAuthContext';
import { useAuth } from '../contexts/CognitoAuthContext';
//import { SessionProvider } from './contexts/SessionContext';
import { useSession } from '../contexts/SessionContext';
import Loading from '../components/shared/Loading';
import { generateClientResponse, generatePerformanceMetrics } from '../services/openai';

const SessionContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const SessionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--primary-color);
  color: white;
`;

const SessionTitle = styled.h2`
  margin: 0;
`;

const ClientTypeTag = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.9rem;
  margin-left: 1rem;
`;

const SessionTitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TimerDisplay = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 4px;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MessageBubble = styled.div<{ isUser: boolean }>`
  max-width: 70%;
  padding: 1rem;
  border-radius: 1rem;
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  background-color: ${props => props.isUser ? 'var(--primary-color)' : 'var(--light-gray)'};
  color: ${props => props.isUser ? 'white' : 'var(--text-color)'};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    ${props => props.isUser ? 'right' : 'left'}: -10px;
    width: 20px;
    height: 20px;
    background-color: ${props => props.isUser ? 'var(--primary-color)' : 'var(--light-gray)'};
    border-radius: 50%;
    z-index: -1;
  }
`;

const InputContainer = styled.div`
  display: flex;
  padding: 1rem;
  border-top: 1px solid var(--light-gray);
  background-color: white;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid var(--medium-gray);
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const SendButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  margin-left: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background-color: #3a80d2;
  }
  
  &:disabled {
    background-color: var(--medium-gray);
    cursor: not-allowed;
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: var(--light-gray);
`;

const ControlButton = styled.button<{ isActive?: boolean }>`
  background-color: ${props => props.isActive ? 'var(--primary-color)' : 'white'};
  color: ${props => props.isActive ? 'white' : 'var(--text-color)'};
  border: 1px solid var(--medium-gray);
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: ${props => props.isActive ? '#3a80d2' : 'var(--light-gray)'};
  }
`;

const EndSessionButton = styled.button`
  background-color: var(--danger-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: #c82333;
  }
`;

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const CoachingSession: React.FC = () => {
  const { user } = useAuth();
  const { currentSession, updateCurrentSession, endCurrentSession } = useSession();
  const navigate = useNavigate();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes in seconds
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Redirect if no active session
  useEffect(() => {
    if (!currentSession) {
      navigate('/coach');
    }
  }, [currentSession, navigate]);
  
  // Initialize session with welcome message
  useEffect(() => {
    if (currentSession && messages.length === 0) {
      // Get client type from the session
      const clientType = currentSession.clientType || 'General';
      
      // Create a personalized welcome message based on client type
      let welcomeMessage = "Hello, Good to meet you, How are you doing?";
      
      // Add client type to transcript for OpenAI to use
      const initialTranscript = `Client Type: ${clientType}\n\nClient: [Session Started]`;
      updateCurrentSession({ transcript: initialTranscript });
      
      setMessages([
        {
          id: 'welcome',
          text: welcomeMessage,
          isUser: false,
          timestamp: new Date()
        }
      ]);
    }
  }, [currentSession, messages.length, updateCurrentSession]);
  
  // Session timer
  useEffect(() => {
    if (!currentSession) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleEndSession();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [currentSession]);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Format time remaining as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleSendMessage = async () => {
    if (!inputValue.trim() || !currentSession) return;
    
    console.log("Sending message:", inputValue);
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Update session transcript
    const updatedTranscript = currentSession.transcript + `\nCoach: ${inputValue}`;
    updateCurrentSession({ transcript: updatedTranscript });
    
    // Create typing indicator outside try/catch so it's accessible in both blocks
    const typingIndicator: Message = {
      id: `typing-${Date.now()}`,
      text: "...",
      isUser: false,
      timestamp: new Date()
    };
    
    try {
      console.log("Calling generateClientResponse with transcript:", updatedTranscript.substring(0, 50) + "...");
      
      // Show typing indicator
      
      setMessages(prev => [...prev, typingIndicator]);
      
      // Generate client response using OpenAI
      const clientResponse = await generateClientResponse(updatedTranscript);
      
      console.log("Received client response:", clientResponse);
      
      // Remove typing indicator and add AI message
      setMessages(prev => {
        const filtered = prev.filter(msg => msg.id !== typingIndicator.id);
        return [...filtered, {
          id: `ai-${Date.now()}`,
          text: clientResponse,
          isUser: false,
          timestamp: new Date()
        }];
      });
      
      // Update session transcript
      const newTranscript = updatedTranscript + `\nClient: ${clientResponse}`;
      updateCurrentSession({ transcript: newTranscript });
      
      // If voice is enabled, simulate voice playback
      if (voiceEnabled) {
        // In a real app, this would call the ElevenLabs API
        console.log('Playing voice:', clientResponse);
      }
    } catch (error: any) {
      console.error('Error generating client response:', error);
      
      // More detailed error logging
      if (error.response) {
        console.error(`API Error: Status ${error.response.status}`, error.response.data);
      } else if (error.message) {
        console.error('Error message:', error.message);
      }
      
      // Get the error message from the response if available
      let errorText = "I'm sorry, I'm having trouble formulating my thoughts right now.";
      
      // Use the error message from the API if available
      if (typeof error === 'string') {
        errorText = error;
      } else if (error.message && error.message.includes("API key")) {
        errorText = "I can't respond right now. There seems to be an issue with the AI service configuration.";
      }
      
      // Fallback message in case of error
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        text: errorText,
        isUser: false,
        timestamp: new Date()
      };
      
      // Remove typing indicator if it exists
      setMessages(prev => {
        const filtered = prev.filter(msg => msg.id !== typingIndicator.id);
        return [...filtered, errorMessage];
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  };
  
  const toggleVoice = () => {
    setVoiceEnabled(prev => !prev);
  };
  
  const handleEndSession = async () => {
    if (!currentSession) return;
    
    try {
      // Set loading state
      setIsLoading(true);
      
      // Generate performance metrics using OpenAI
      const performanceMetrics = await generatePerformanceMetrics(currentSession.transcript);
      
      // Update session with performance metrics
      updateCurrentSession({
        performanceMetrics: performanceMetrics,
        summary: {
          strengths: performanceMetrics.feedback.strengths,
          areasForImprovement: performanceMetrics.feedback.areasForImprovement,
          keyInsights: performanceMetrics.summary?.keyInsights || ["Client values continuous learning", "Client feels stuck in current role"],
          overallRating: performanceMetrics.overallScore
        }
      });
    } catch (error: any) {
      console.error('Error generating performance metrics:', error);
      
      // More detailed error logging
      if (error.response) {
        console.error(`API Error: Status ${error.response.status}`, error.response.data);
      } else if (error.message) {
        console.error('Error message:', error.message);
      }
      
      // Fallback to basic metrics in case of error
      const fallbackMetrics = {
        activeListeningScore: 7,
        questionQualityScore: 6,
        responseAppropriatenessScore: 8,
        goalSettingEffectivenessScore: 7,
        clientEngagementScore: 7,
        overallScore: 7,
        feedback: {
          strengths: [
            "Good active listening skills",
            "Asked open-ended questions",
            "Created a supportive environment"
          ],
          areasForImprovement: [
            "Could develop more specific action plans",
            "Sometimes missed opportunities for deeper exploration"
          ],
          actionableSteps: [
            "Practice waiting before responding",
            "Use the SMART framework for goal setting",
            "Incorporate more reflective statements"
          ]
        }
      };
      
      updateCurrentSession({
        performanceMetrics: fallbackMetrics,
        summary: {
          strengths: fallbackMetrics.feedback.strengths,
          areasForImprovement: fallbackMetrics.feedback.areasForImprovement,
          keyInsights: ["Client values continuous learning", "Client feels stuck in current role"],
          overallRating: fallbackMetrics.overallScore
        }
      });
    } finally {
      setIsLoading(false);
      
      // End the session
      endCurrentSession();
      
      // Navigate to summary page
      navigate(`/summary/${currentSession.id}`);
    }
  };
  
  if (!currentSession) {
    return <Loading message="Loading session..." />;
  }
  
  return (
    <SessionContainer>
      <SessionHeader>
        <SessionTitleContainer>
          <SessionTitle>Coaching Session</SessionTitle>
          <ClientTypeTag>{currentSession.clientType || 'General'}</ClientTypeTag>
        </SessionTitleContainer>
        <TimerDisplay>{formatTime(timeRemaining)}</TimerDisplay>
      </SessionHeader>
      
      <ChatContainer>
        <MessagesContainer>
          {messages.map(message => (
            <MessageBubble key={message.id} isUser={message.isUser}>
              {message.text}
            </MessageBubble>
          ))}
          {isLoading && (
            <MessageBubble isUser={false}>
              <em>Client is typing...</em>
            </MessageBubble>
          )}
          <div ref={messagesEndRef} />
        </MessagesContainer>
        
        <InputContainer>
          <MessageInput
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <SendButton onClick={handleSendMessage} disabled={isLoading || !inputValue.trim()}>
            Send
          </SendButton>
        </InputContainer>
      </ChatContainer>
      
      <ControlsContainer>
        <div>
          <ControlButton isActive={voiceEnabled} onClick={toggleVoice}>
            {voiceEnabled ? 'Voice: On' : 'Voice: Off'}
          </ControlButton>
        </div>
        <EndSessionButton onClick={handleEndSession}>
          End Session
        </EndSessionButton>
      </ControlsContainer>
    </SessionContainer>
  );
};

export default CoachingSession;
