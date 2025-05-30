import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 200px);
  padding: 2rem;
  text-align: center;
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  color: var(--primary-color);
  margin: 0;
  line-height: 1;
`;

const ErrorMessage = styled.h2`
  font-size: 2rem;
  color: var(--text-color);
  margin: 1rem 0 2rem;
`;

const ErrorDescription = styled.p`
  font-size: 1.2rem;
  color: var(--dark-gray);
  max-width: 600px;
  margin-bottom: 2rem;
`;

const HomeButton = styled(Link)`
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #3a80d2;
    text-decoration: none;
    color: white;
  }
`;

const NotFound: React.FC = () => {
  return (
    <NotFoundContainer>
      <ErrorCode>404</ErrorCode>
      <ErrorMessage>Page Not Found</ErrorMessage>
      <ErrorDescription>
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </ErrorDescription>
      <HomeButton to="/">Return to Home</HomeButton>
    </NotFoundContainer>
  );
};

export default NotFound;
