import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/CognitoAuthContext';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 200px);
  padding: 2rem;
`;

const LoginCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  width: 100%;
  max-width: 500px;
  text-align: center;
`;

const Title = styled.h1`
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: var(--dark-gray);
  margin-bottom: 2rem;
  font-size: 1.1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-color);
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
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
  transition: background-color 0.2s;
  margin-top: 1rem;
  
  &:hover {
    background-color: #3a80d2;
  }
  
  &:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #e53e3e;
  margin-top: 0.5rem;
  font-size: 0.875rem;
`;

const ToggleText = styled.p`
  margin-top: 1rem;
  color: var(--text-color);
  font-size: 0.875rem;
`;

const ToggleLink = styled.span`
  color: var(--primary-color);
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const FeatureList = styled.ul`
  text-align: left;
  margin: 2rem 0;
  padding-left: 1.5rem;
`;

const FeatureItem = styled.li`
  margin-bottom: 0.75rem;
  color: var(--text-color);
`;

enum AuthMode {
  SIGN_IN,
  SIGN_UP,
  CONFIRM_SIGN_UP,
  FORGOT_PASSWORD,
  RESET_PASSWORD
}

const Login: React.FC = () => {
  const { isAuthenticated, user, signIn, signUp, confirmSignUp, forgotPassword, forgotPasswordSubmit } = useAuth();
  const navigate = useNavigate();
  
  const [authMode, setAuthMode] = useState<AuthMode>(AuthMode.SIGN_IN);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect to the appropriate dashboard based on user role
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/coach');
      }
    }
  }, [isAuthenticated, user, navigate]);
  
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await signIn(username, password);
    } catch (error: any) {
      console.error('Sign in error:', error);
      if (error.name === 'UserNotConfirmedException') {
        setAuthMode(AuthMode.CONFIRM_SIGN_UP);
        setError('Please confirm your account with the code sent to your email.');
      } else {
        setError(error.message || 'Failed to sign in. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    
    try {
      await signUp(username, password, email);
      setAuthMode(AuthMode.CONFIRM_SIGN_UP);
    } catch (error: any) {
      console.error('Sign up error:', error);
      setError(error.message || 'Failed to sign up. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleConfirmSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await confirmSignUp(username, confirmationCode);
      setAuthMode(AuthMode.SIGN_IN);
    } catch (error: any) {
      console.error('Confirm sign up error:', error);
      setError(error.message || 'Failed to confirm sign up. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await forgotPassword(username);
      setAuthMode(AuthMode.RESET_PASSWORD);
    } catch (error: any) {
      console.error('Forgot password error:', error);
      setError(error.message || 'Failed to initiate password reset. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    
    try {
      await forgotPasswordSubmit(username, confirmationCode, password);
      setAuthMode(AuthMode.SIGN_IN);
    } catch (error: any) {
      console.error('Reset password error:', error);
      setError(error.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const renderAuthForm = () => {
    switch (authMode) {
      case AuthMode.SIGN_IN:
        return (
          <Form onSubmit={handleSignIn}>
            <FormGroup>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Button type="submit" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
            <ToggleText>
              Don't have an account?{' '}
              <ToggleLink onClick={() => setAuthMode(AuthMode.SIGN_UP)}>
                Sign Up
              </ToggleLink>
            </ToggleText>
            <ToggleText>
              <ToggleLink onClick={() => setAuthMode(AuthMode.FORGOT_PASSWORD)}>
                Forgot Password?
              </ToggleLink>
            </ToggleText>
          </Form>
        );
        
      case AuthMode.SIGN_UP:
        return (
          <Form onSubmit={handleSignUp}>
            <FormGroup>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </FormGroup>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Button type="submit" disabled={loading}>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </Button>
            <ToggleText>
              Already have an account?{' '}
              <ToggleLink onClick={() => setAuthMode(AuthMode.SIGN_IN)}>
                Sign In
              </ToggleLink>
            </ToggleText>
          </Form>
        );
        
      case AuthMode.CONFIRM_SIGN_UP:
        return (
          <Form onSubmit={handleConfirmSignUp}>
            <FormGroup>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="confirmationCode">Confirmation Code</Label>
              <Input
                id="confirmationCode"
                type="text"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                required
              />
            </FormGroup>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Button type="submit" disabled={loading}>
              {loading ? 'Confirming...' : 'Confirm Sign Up'}
            </Button>
            <ToggleText>
              <ToggleLink onClick={() => setAuthMode(AuthMode.SIGN_IN)}>
                Back to Sign In
              </ToggleLink>
            </ToggleText>
          </Form>
        );
        
      case AuthMode.FORGOT_PASSWORD:
        return (
          <Form onSubmit={handleForgotPassword}>
            <FormGroup>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </FormGroup>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Button type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Code'}
            </Button>
            <ToggleText>
              <ToggleLink onClick={() => setAuthMode(AuthMode.SIGN_IN)}>
                Back to Sign In
              </ToggleLink>
            </ToggleText>
          </Form>
        );
        
      case AuthMode.RESET_PASSWORD:
        return (
          <Form onSubmit={handleResetPassword}>
            <FormGroup>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="confirmationCode">Confirmation Code</Label>
              <Input
                id="confirmationCode"
                type="text"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
              <Input
                id="confirmNewPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </FormGroup>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Button type="submit" disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </Button>
            <ToggleText>
              <ToggleLink onClick={() => setAuthMode(AuthMode.SIGN_IN)}>
                Back to Sign In
              </ToggleLink>
            </ToggleText>
          </Form>
        );
    }
  };
  
  return (
    <LoginContainer>
      <LoginCard>
        <Title>RoleplayHub</Title>
        <Subtitle>Improve your coaching skills with clients</Subtitle>
        
        {renderAuthForm()}
        
        {authMode === AuthMode.SIGN_IN && (
          <FeatureList>
            <FeatureItem>Practice with realistic clients</FeatureItem>
            <FeatureItem>Voice-enabled conversations</FeatureItem>
            <FeatureItem>30-minute coaching sessions with performance evaluation</FeatureItem>
            <FeatureItem>Detailed feedback and improvement suggestions</FeatureItem>
            <FeatureItem>Track your progress over time</FeatureItem>
          </FeatureList>
        )}
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
