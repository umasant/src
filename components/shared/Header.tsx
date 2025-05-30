import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';


import { useAuth } from '../../contexts/CognitoAuthContext';


const HeaderContainer = styled.header`
  background-color: rgb(244, 249, 246);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: Black;
  text-decoration: none;
  display: flex;
  align-items: center;
  
  &:hover {
    text-decoration: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  margin-left: 1.5rem;
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    color: var(--primary-color);
    text-decoration: none;
  }
`;

const SignInButton = styled(Link)`
  background-color: var(--primary-color);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  margin-left: 1.5rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #3a80d2;
    text-decoration: none;
    color: white;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1.5rem;
`;

const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: var(--danger-color);
  font-weight: 500;
  cursor: pointer;
  margin-left: 1.5rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <HeaderContainer>
      <HeaderContent >
        <Logo to="/">CoachesHub</Logo>
        
        <Nav>
          {isAuthenticated ? (
            <>
              {user?.role === 'coach' && (
                <>
                  <NavLink to="/coach">Dashboard</NavLink>
                  <NavLink to="/history">Session History</NavLink>
                </>
              )}
              
              {user?.role === 'admin' && (
                <>
                  <NavLink to="/admin">Admin Dashboard</NavLink>
                  <NavLink to="/admin/users">User Management</NavLink>
                  <NavLink to="/admin/analytics">Analytics</NavLink>
                </>
              )}
              
              <ProfileContainer>
                {user?.picture && (
                  <ProfileImage src={user.picture} alt={user.name} />
                )}
                <span>{user?.name}</span>
              </ProfileContainer>
              
              <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </>
          ) : (
            <>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/coaches">Coaches</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/blog">Blog</NavLink>
              <NavLink to="/contact">Contact Us</NavLink>
              <SignInButton to="/login">Sign In</SignInButton>
            </>
          )}
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
