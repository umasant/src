import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
//import { useAuth } from '../contexts/MockAuthContext';
import { useAuth } from '../contexts/CognitoAuthContext';
//import { SessionProvider } from './contexts/SessionContext';
// Mock data for analytics
interface AnalyticsData {
  totalSessions: number;
  totalCoaches: number;
  averageScore: number;
  sessionsByMonth: {
    month: string;
    count: number;
  }[];
  scoresByCategory: {
    category: string;
    averageScore: number;
  }[];
  topPerformingCoaches: {
    id: string;
    name: string;
    sessionCount: number;
    averageScore: number;
  }[];
  improvementAreas: {
    area: string;
    frequency: number;
  }[];
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

const FilterContainer = styled.div`
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

const ChartContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const ChartTitle = styled.h2`
  color: var(--text-color);
  margin-top: 0;
  margin-bottom: 1.5rem;
`;

const BarChart = styled.div`
  display: flex;
  height: 300px;
  align-items: flex-end;
  gap: 1rem;
  padding-bottom: 2rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    background-color: var(--medium-gray);
  }
`;

const BarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const Bar = styled.div<{ height: number; color?: string }>`
  width: 100%;
  max-width: 60px;
  height: ${props => props.height}%;
  background-color: ${props => props.color || 'var(--primary-color)'};
  border-radius: 4px 4px 0 0;
  transition: height 0.3s ease;
`;

const BarLabel = styled.div`
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: var(--dark-gray);
  text-align: center;
`;

const BarValue = styled.div`
  margin-top: 0.25rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-color);
`;

const TableContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
  overflow-x: auto;
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

const PerformanceAnalytics: React.FC = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('all');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  
  // Mock data loading
  useEffect(() => {
    // In a real app, this would be an API call to fetch analytics data
    const mockData: AnalyticsData = {
      totalSessions: 65,
      totalCoaches: 4,
      averageScore: 7.2,
      sessionsByMonth: [
        { month: 'Jan', count: 8 },
        { month: 'Feb', count: 10 },
        { month: 'Mar', count: 12 },
        { month: 'Apr', count: 15 },
        { month: 'May', count: 20 }
      ],
      scoresByCategory: [
        { category: 'Active Listening', averageScore: 7.8 },
        { category: 'Question Quality', averageScore: 6.5 },
        { category: 'Response Appropriateness', averageScore: 8.2 },
        { category: 'Goal Setting', averageScore: 6.9 },
        { category: 'Client Engagement', averageScore: 7.6 }
      ],
      topPerformingCoaches: [
        { id: '3', name: 'Bob Johnson', sessionCount: 22, averageScore: 8.2 },
        { id: '1', name: 'John Doe', sessionCount: 15, averageScore: 7.8 },
        { id: '6', name: 'Sarah Johnson', sessionCount: 12, averageScore: 7.2 },
        { id: '2', name: 'Jane Smith', sessionCount: 8, averageScore: 6.5 }
      ],
      improvementAreas: [
        { area: 'Goal Setting', frequency: 18 },
        { area: 'Interrupting Client', frequency: 15 },
        { area: 'Asking Leading Questions', frequency: 12 },
        { area: 'Providing Solutions Instead of Coaching', frequency: 10 },
        { area: 'Not Allowing Enough Silence', frequency: 8 }
      ]
    };
    
    setAnalyticsData(mockData);
  }, [timeRange]);
  
  if (!analyticsData) {
    return <div>Loading analytics data...</div>;
  }
  
  // Find the maximum value for the sessions by month chart to scale properly
  const maxSessionCount = Math.max(...analyticsData.sessionsByMonth.map(item => item.count));
  
  // Find the maximum frequency for improvement areas to scale properly
  const maxFrequency = Math.max(...analyticsData.improvementAreas.map(item => item.frequency));
  
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Performance Analytics</PageTitle>
        <FilterContainer>
          <FilterSelect 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="all">All Time</option>
            <option value="year">Past Year</option>
            <option value="6months">Past 6 Months</option>
            <option value="3months">Past 3 Months</option>
            <option value="month">Past Month</option>
          </FilterSelect>
        </FilterContainer>
      </PageHeader>
      
      <StatsGrid>
        <StatCard>
          <StatValue>{analyticsData.totalSessions}</StatValue>
          <StatLabel>Total Sessions</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{analyticsData.totalCoaches}</StatValue>
          <StatLabel>Active Coaches</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{analyticsData.averageScore.toFixed(1)}</StatValue>
          <StatLabel>Average Score (1-10)</StatLabel>
        </StatCard>
      </StatsGrid>
      
      <ChartContainer>
        <ChartTitle>Sessions by Month</ChartTitle>
        <BarChart>
          {analyticsData.sessionsByMonth.map((item, index) => (
            <BarContainer key={index}>
              <Bar 
                height={(item.count / maxSessionCount) * 100} 
                color="var(--primary-color)"
              />
              <BarLabel>{item.month}</BarLabel>
              <BarValue>{item.count}</BarValue>
            </BarContainer>
          ))}
        </BarChart>
      </ChartContainer>
      
      <ChartContainer>
        <ChartTitle>Average Scores by Category</ChartTitle>
        <BarChart>
          {analyticsData.scoresByCategory.map((item, index) => (
            <BarContainer key={index}>
              <Bar 
                height={item.averageScore * 10} 
                color={
                  item.averageScore >= 7 ? 'var(--success-color)' :
                  item.averageScore >= 4 ? 'var(--warning-color)' :
                  'var(--danger-color)'
                }
              />
              <BarLabel>{item.category}</BarLabel>
              <BarValue>{item.averageScore.toFixed(1)}</BarValue>
            </BarContainer>
          ))}
        </BarChart>
      </ChartContainer>
      
      <TableContainer>
        <ChartTitle>Top Performing Coaches</ChartTitle>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Sessions</TableHeader>
              <TableHeader>Average Score</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {analyticsData.topPerformingCoaches.map(coach => (
              <TableRow key={coach.id}>
                <TableCell>{coach.name}</TableCell>
                <TableCell>{coach.sessionCount}</TableCell>
                <ScoreCell score={coach.averageScore}>
                  {coach.averageScore.toFixed(1)}
                </ScoreCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>
      
      <ChartContainer>
        <ChartTitle>Common Areas for Improvement</ChartTitle>
        <BarChart>
          {analyticsData.improvementAreas.map((item, index) => (
            <BarContainer key={index}>
              <Bar 
                height={(item.frequency / maxFrequency) * 100} 
                color="var(--accent-color)"
              />
              <BarLabel>{item.area}</BarLabel>
              <BarValue>{item.frequency}</BarValue>
            </BarContainer>
          ))}
        </BarChart>
      </ChartContainer>
    </PageContainer>
  );
};

export default PerformanceAnalytics;
