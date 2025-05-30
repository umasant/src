import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
//import { useAuth } from '../contexts/MockAuthContext';
import { useAuth } from '../contexts/CognitoAuthContext';
//import { SessionProvider } from './contexts/SessionContext';
// Mock data for user management
interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'coach' | 'admin';
  sessionCount: number;
  averageScore: number;
  lastActive: Date;
  status: 'active' | 'inactive';
}

const PageContainer = styled.div`
  padding: 2rem 0;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  color: var(--text-color);
  margin: 0;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid var(--medium-gray);
  border-radius: 4px;
  font-size: 1rem;
  min-width: 300px;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const FilterSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid var(--medium-gray);
  border-radius: 4px;
  background-color: white;
  color: var(--text-color);
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const UsersContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const UsersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: var(--light-gray);
`;

const TableRow = styled.tr`
  border-bottom: 1px solid var(--light-gray);
  cursor: pointer;
  
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

const StatusBadge = styled.span<{ status: 'active' | 'inactive' }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  background-color: ${props => props.status === 'active' ? 'rgba(40, 167, 69, 0.1)' : 'rgba(108, 117, 125, 0.1)'};
  color: ${props => props.status === 'active' ? 'var(--success-color)' : 'var(--dark-gray)'};
`;

const ActionButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background-color: #3a80d2;
  }
`;

const DangerButton = styled(ActionButton)`
  background-color: var(--danger-color);
  
  &:hover {
    background-color: #c82333;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  gap: 0.5rem;
`;

const PageButton = styled.button<{ isActive?: boolean }>`
  background-color: ${props => props.isActive ? 'var(--primary-color)' : 'white'};
  color: ${props => props.isActive ? 'white' : 'var(--text-color)'};
  border: 1px solid ${props => props.isActive ? 'var(--primary-color)' : 'var(--medium-gray)'};
  border-radius: 4px;
  padding: 0.5rem 0.75rem;
  font-size: 0.9rem;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.isActive ? 'var(--primary-color)' : 'var(--light-gray)'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const UserManagement: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [users, setUsers] = useState<UserData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 10;
  
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
        lastActive: new Date(2025, 4, 20),
        status: 'active'
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'coach',
        sessionCount: 8,
        averageScore: 6.5,
        lastActive: new Date(2025, 4, 21),
        status: 'active'
      },
      {
        id: '3',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        role: 'coach',
        sessionCount: 22,
        averageScore: 8.2,
        lastActive: new Date(2025, 4, 22),
        status: 'active'
      },
      {
        id: '4',
        name: 'Alice Williams',
        email: 'alice@example.com',
        role: 'coach',
        sessionCount: 5,
        averageScore: 5.9,
        lastActive: new Date(2025, 4, 19),
        status: 'inactive'
      },
      {
        id: '5',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin',
        sessionCount: 0,
        averageScore: 0,
        lastActive: new Date(2025, 4, 22),
        status: 'active'
      },
      {
        id: '6',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        role: 'coach',
        sessionCount: 12,
        averageScore: 7.2,
        lastActive: new Date(2025, 4, 18),
        status: 'active'
      },
      {
        id: '7',
        name: 'Michael Brown',
        email: 'michael@example.com',
        role: 'coach',
        sessionCount: 3,
        averageScore: 4.8,
        lastActive: new Date(2025, 4, 15),
        status: 'inactive'
      }
    ];
    
    setUsers(mockUsers);
  }, []);
  
  // Apply filters and search
  const filteredUsers = users.filter(user => {
    // Search term filter
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Role filter
    const matchesRole = 
      roleFilter === 'all' || 
      user.role === roleFilter;
    
    // Status filter
    const matchesStatus = 
      statusFilter === 'all' || 
      user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });
  
  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const handleToggleStatus = (userId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    // In a real app, this would be an API call to update the user status
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
          : user
      )
    );
  };
  
  const renderPagination = () => {
    if (totalPages <= 1) return null;
    
    const pageButtons = [];
    for (let i = 1; i <= totalPages; i++) {
      pageButtons.push(
        <PageButton 
          key={i} 
          isActive={i === currentPage}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </PageButton>
      );
    }
    
    return (
      <Pagination>
        <PageButton 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </PageButton>
        
        {pageButtons}
        
        <PageButton 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </PageButton>
      </Pagination>
    );
  };
  
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>User Management</PageTitle>
        <SearchContainer>
          <SearchInput 
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterSelect 
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="coach">Coaches</option>
            <option value="admin">Admins</option>
          </FilterSelect>
          <FilterSelect 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </FilterSelect>
        </SearchContainer>
      </PageHeader>
      
      <UsersContainer>
        <UsersTable>
          <TableHead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Role</TableHeader>
              <TableHeader>Sessions</TableHeader>
              <TableHeader>Avg. Score</TableHeader>
              <TableHeader>Last Active</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {paginatedUsers.map(user => (
              <TableRow 
                key={user.id}
                onClick={() => navigate(`/admin/users/${user.id}`)}
              >
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role === 'admin' ? 'Admin' : 'Coach'}</TableCell>
                <TableCell>{user.sessionCount}</TableCell>
                <ScoreCell score={user.averageScore}>
                  {user.averageScore > 0 ? user.averageScore.toFixed(1) : '-'}
                </ScoreCell>
                <TableCell>
                  {user.lastActive.toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <StatusBadge status={user.status}>
                    {user.status === 'active' ? 'Active' : 'Inactive'}
                  </StatusBadge>
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  {user.status === 'active' ? (
                    <DangerButton onClick={(e) => handleToggleStatus(user.id, e)}>
                      Deactivate
                    </DangerButton>
                  ) : (
                    <ActionButton onClick={(e) => handleToggleStatus(user.id, e)}>
                      Activate
                    </ActionButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </UsersTable>
        
        {renderPagination()}
      </UsersContainer>
    </PageContainer>
  );
};

export default UserManagement;
