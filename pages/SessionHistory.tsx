import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSession } from '../contexts/SessionContext';

const HistoryContainer = styled.div`
  padding: 2rem 0;
`;

const HistoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const HistoryTitle = styled.h1`
  color: var(--text-color);
  margin: 0;
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 1rem;
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

const SessionsContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const SessionsTable = styled.table`
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

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: var(--dark-gray);
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
  margin-top: 1rem;
  
  &:hover {
    background-color: #3a80d2;
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

type SortField = 'date' | 'score';
type SortOrder = 'asc' | 'desc';

const SessionHistory: React.FC = () => {
  const { sessionHistory, startNewSession } = useSession();
  const navigate = useNavigate();
  
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [scoreFilter, setScoreFilter] = useState('all');
  
  const itemsPerPage = 10;
  
  // Apply filters and sorting
  const filteredSessions = sessionHistory.filter(session => {
    if (scoreFilter === 'all') return true;
    if (scoreFilter === 'high') return session.performanceMetrics.overallScore >= 7;
    if (scoreFilter === 'medium') return session.performanceMetrics.overallScore >= 4 && session.performanceMetrics.overallScore < 7;
    if (scoreFilter === 'low') return session.performanceMetrics.overallScore < 4;
    return true;
  });
  
  const sortedSessions = [...filteredSessions].sort((a, b) => {
    if (sortField === 'date') {
      return sortOrder === 'asc' 
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return sortOrder === 'asc'
        ? a.performanceMetrics.overallScore - b.performanceMetrics.overallScore
        : b.performanceMetrics.overallScore - a.performanceMetrics.overallScore;
    }
  });
  
  // Pagination
  const totalPages = Math.ceil(sortedSessions.length / itemsPerPage);
  const paginatedSessions = sortedSessions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };
  
  const handleStartNewSession = () => {
    startNewSession();
    navigate('/session');
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
    <HistoryContainer>
      <HistoryHeader>
        <HistoryTitle>Session History</HistoryTitle>
        <FiltersContainer>
          <FilterSelect 
            value={scoreFilter}
            onChange={(e) => setScoreFilter(e.target.value)}
          >
            <option value="all">All Scores</option>
            <option value="high">High (7-10)</option>
            <option value="medium">Medium (4-6)</option>
            <option value="low">Low (1-3)</option>
          </FilterSelect>
        </FiltersContainer>
      </HistoryHeader>
      
      <SessionsContainer>
        {sessionHistory.length > 0 ? (
          <>
            <SessionsTable>
              <TableHead>
                <TableRow>
                  <TableHeader 
                    onClick={() => handleSort('date')}
                    style={{ cursor: 'pointer' }}
                  >
                    Date {sortField === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </TableHeader>
                  <TableHeader>Client Type</TableHeader>
                  <TableHeader 
                    onClick={() => handleSort('score')}
                    style={{ cursor: 'pointer' }}
                  >
                    Score {sortField === 'score' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </TableHeader>
                  <TableHeader>Duration</TableHeader>
                </TableRow>
              </TableHead>
              <tbody>
                {paginatedSessions.map(session => (
                  <TableRow 
                    key={session.id}
                    onClick={() => navigate(`/summary/${session.id}`)}
                  >
                    <TableCell>
                      {new Date(session.date).toLocaleDateString()} at {new Date(session.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </TableCell>
                    <TableCell>{session.clientType}</TableCell>
                    <ScoreCell score={session.performanceMetrics.overallScore}>
                      {session.performanceMetrics.overallScore.toFixed(1)}/10
                    </ScoreCell>
                    <TableCell>{session.duration} minutes</TableCell>
                  </TableRow>
                ))}
              </tbody>
            </SessionsTable>
            
            {renderPagination()}
          </>
        ) : (
          <EmptyState>
            <p>You haven't completed any coaching sessions yet.</p>
            <ActionButton onClick={handleStartNewSession}>
              Start Your First Session
            </ActionButton>
          </EmptyState>
        )}
      </SessionsContainer>
    </HistoryContainer>
  );
};

export default SessionHistory;
