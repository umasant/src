import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/CognitoAuthContext';

//import { useAuth } from '../contexts/Context';

// Mock data for admin dashboard
interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'coach' | 'admin';
  sessionCount: number;
  averageScore: number;
  lastActive: Date;
}

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
  margin-right: 1rem;
  
  &:hover {
    background-color: #3a80d2;
  }
`;

const UsersSection = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const SectionTitle = styled.h2`
  color: var(--text-color);
  margin-bottom: 1.5rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: var(--light-gray);
`;

const TableRow = styled.tr`
  border-bottom: 1px solid var(--light-gray);
  
  &:hover {
    background-color: var(--light-gray);
  }
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 1rem;
  color: var(--dark-gray);
  font-weight: 600;
`;

const TableCell = styled.td`
  padding: 1rem;
  color: var(--text-color);
`;

const ScoreCell = styled.td<{ score: number }>`
  padding: 1rem;
  font-weight: 600;
  color: ${props => {
    if (props.score >= 7) return 'var(--success-color)';
    if (props.score >= 4) return 'var(--warning-color)';
    return 'var(--danger-color)';
  }};
`;

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserData[]>([]);
  const [totalSessions, setTotalSessions] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  
  // Mock data loading
  useEffect(() => {
    // In a real app, this would be an API call to fetch users
    const mockUsers: UserData[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'coach',
        sessionCount: 15,
        averageScore: 7.8,
        lastActive: new Date(2025, 4, 20)
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'coach',
        sessionCount: 8,
        averageScore: 6.5,
        lastActive: new Date(2025, 4, 21)
      },
      {
        id: '3',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        role: 'coach',
        sessionCount: 22,
        averageScore: 8.2,
        lastActive: new Date(2025, 4, 22)
      },
      {
        id: '4',
        name: 'Alice Williams',
        email: 'alice@example.com',
        role: 'coach',
        sessionCount: 5,
        averageScore: 5.9,
        lastActive: new Date(2025, 4, 19)
      },
      {
        id: '5',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin',
        sessionCount: 0,
        averageScore: 0,
        lastActive: new Date(2025, 4, 22)
      }
    ];
    
    setUsers(mockUsers);
    
    // Calculate total sessions and average score
    const coaches = mockUsers.filter(u => u.role === 'coach');
    const totalSessionCount = coaches.reduce((sum, user) => sum + user.sessionCount, 0);
    const avgScore = coaches.reduce((sum, user) => sum + (user.averageScore * user.sessionCount), 0) / totalSessionCount;
    
    setTotalSessions(totalSessionCount);
    setAverageScore(avgScore);
  }, []);
  
  return (
    <DashboardContainer>
      <WelcomeSection>
        <WelcomeTitle>Admin Dashboard</WelcomeTitle>
        <WelcomeSubtitle>
          Welcome, {user?.name}! Monitor coach performance and manage users.
        </WelcomeSubtitle>
        <div>
          <ActionButton onClick={() => navigate('/admin/users')}>
            User Management
          </ActionButton>
          <ActionButton onClick={() => navigate('/admin/analytics')}>
            Performance Analytics
          </ActionButton>
        </div>
      </WelcomeSection>
      
      <StatsGrid>
        <StatCard>
          <StatValue>{users.filter(u => u.role === 'coach').length}</StatValue>
          <StatLabel>Total Coaches</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{totalSessions}</StatValue>
          <StatLabel>Total Sessions</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{averageScore.toFixed(1)}</StatValue>
          <StatLabel>Average Score (1-10)</StatLabel>
        </StatCard>
      </StatsGrid>
      
      <UsersSection>
        <SectionTitle>Recent Coach Activity</SectionTitle>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Sessions</TableHeader>
              <TableHeader>Avg. Score</TableHeader>
              <TableHeader>Last Active</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {users
              .filter(user => user.role === 'coach')
              .sort((a, b) => b.lastActive.getTime() - a.lastActive.getTime())
              .map(user => (
                <TableRow key={user.id} onClick={() => navigate(`/admin/users/${user.id}`)}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.sessionCount}</TableCell>
                  <ScoreCell score={user.averageScore}>
                    {user.averageScore.toFixed(1)}
                  </ScoreCell>
                  <TableCell>
                    {user.lastActive.toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
          </tbody>
        </Table>
      </UsersSection>
    </DashboardContainer>
  );
};

export default AdminDashboard;
