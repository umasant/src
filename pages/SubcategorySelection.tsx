import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useSession } from '../contexts/SessionContext';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: var(--text-color);
  margin-bottom: 1rem;
  text-align: center;
`;

const CategoryBadge = styled.div`
  background-color: var(--primary-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  margin-bottom: 2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

const Description = styled.p`
  color: var(--dark-gray);
  font-size: 1.1rem;
  margin-bottom: 3rem;
  text-align: center;
  max-width: 700px;
`;

const SubcategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  width: 100%;
`;

const SubcategoryCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
`;

const SubcategoryTitle = styled.h3`
  color: var(--text-color);
  margin-bottom: 0.5rem;
`;

const SubcategoryDescription = styled.p`
  color: var(--dark-gray);
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const ClientDetails = styled.div`
  background-color: var(--light-gray);
  border-radius: 6px;
  padding: 1rem;
  font-size: 0.9rem;
`;

const ClientDetail = styled.div`
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  strong {
    color: var(--text-color);
  }
`;

const BackButton = styled.button`
  background-color: transparent;
  border: 1px solid var(--medium-gray);
  color: var(--text-color);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: var(--light-gray);
  }
`;

// Define the subcategories for each coaching category
const subcategoriesData = {
  life: [
    {
      id: 'career-transition',
      title: 'Career Transition Client',
      description: 'A client looking to change careers and find more fulfilling work.',
      details: {
        age: '35',
        occupation: 'Marketing Manager',
        goal: 'Change to a more meaningful career path',
        challenge: 'Uncertainty about which direction to take'
      }
    },
    {
      id: 'work-life-balance',
      title: 'Work-Life Balance Client',
      description: 'A client struggling to balance professional responsibilities with personal life.',
      details: {
        age: '42',
        occupation: 'Senior Executive',
        goal: 'Achieve better work-life balance',
        challenge: 'Constantly feels overwhelmed and burned out'
      }
    },
    {
      id: 'personal-growth',
      title: 'Personal Growth Client',
      description: 'A client seeking to develop themselves and reach their full potential.',
      details: {
        age: '28',
        occupation: 'Teacher',
        goal: 'Develop confidence and self-awareness',
        challenge: 'Self-doubt and impostor syndrome'
      }
    },
    {
      id: 'retirement-planning',
      title: 'Retirement Transition Client',
      description: 'A client preparing for the transition to retirement and finding new purpose.',
      details: {
        age: '58',
        occupation: 'Engineer',
        goal: 'Create a fulfilling retirement plan',
        challenge: 'Fear of losing identity tied to career'
      }
    },
    {
      id: 'productivity',
      title: 'Productivity Client',
      description: 'A client wanting to overcome procrastination and become more productive.',
      details: {
        age: '31',
        occupation: 'Freelance Writer',
        goal: 'Establish effective routines and habits',
        challenge: 'Procrastination and lack of structure'
      }
    }
  ],
  health: [
    {
      id: 'weight-management',
      title: 'Weight Management Client',
      description: 'A client looking to establish healthy eating habits and sustainable weight management.',
      details: {
        age: '38',
        health_concern: 'Obesity',
        goal: 'Develop sustainable eating habits',
        challenge: 'Emotional eating patterns'
      }
    },
    {
      id: 'fitness-beginner',
      title: 'Fitness Beginner Client',
      description: 'A client who is new to exercise and wants to establish a consistent routine.',
      details: {
        age: '45',
        health_concern: 'Sedentary lifestyle',
        goal: 'Build an exercise habit',
        challenge: 'Low energy and motivation'
      }
    },
    {
      id: 'stress-management',
      title: 'Stress Management Client',
      description: 'A client dealing with chronic stress and seeking better coping mechanisms.',
      details: {
        age: '33',
        health_concern: 'Anxiety',
        goal: 'Develop stress management techniques',
        challenge: 'High-pressure job environment'
      }
    },
    {
      id: 'sleep-improvement',
      title: 'Sleep Improvement Client',
      description: 'A client struggling with sleep issues and wanting to improve sleep quality.',
      details: {
        age: '40',
        health_concern: 'Insomnia',
        goal: 'Establish healthy sleep patterns',
        challenge: 'Racing thoughts at bedtime'
      }
    },
    {
      id: 'chronic-condition',
      title: 'Chronic Condition Client',
      description: 'A client managing a chronic health condition and seeking to improve quality of life.',
      details: {
        age: '52',
        health_concern: 'Diabetes',
        goal: 'Optimize lifestyle with condition',
        challenge: 'Maintaining consistency with health routines'
      }
    }
  ],
  wealth: [
    {
      id: 'debt-reduction',
      title: 'Debt Reduction Client',
      description: 'A client working to eliminate debt and establish financial stability.',
      details: {
        age: '29',
        income: 'Middle income',
        goal: 'Become debt-free within 3 years',
        challenge: 'Multiple high-interest debts'
      }
    },
    {
      id: 'retirement-saving',
      title: 'Retirement Saving Client',
      description: 'A client focused on building a substantial retirement nest egg.',
      details: {
        age: '47',
        income: 'Upper middle income',
        goal: 'Accelerate retirement savings',
        challenge: 'Late start to retirement planning'
      }
    },
    {
      id: 'investment-beginner',
      title: 'Investment Beginner Client',
      description: 'A client new to investing who wants to grow their wealth effectively.',
      details: {
        age: '32',
        income: 'Middle income',
        goal: 'Learn investment fundamentals',
        challenge: 'Fear of market volatility'
      }
    },
    {
      id: 'business-owner',
      title: 'Business Owner Client',
      description: 'A client who owns a small business and needs help with financial planning.',
      details: {
        age: '41',
        income: 'Variable',
        goal: 'Stabilize business finances',
        challenge: 'Inconsistent cash flow'
      }
    },
    {
      id: 'financial-independence',
      title: 'Financial Independence Client',
      description: 'A client pursuing financial independence and early retirement.',
      details: {
        age: '35',
        income: 'High income',
        goal: 'Achieve financial independence by 45',
        challenge: 'Balancing current lifestyle with future goals'
      }
    }
  ],
  relationship: [
    {
      id: 'communication-issues',
      title: 'Communication Issues Client',
      description: 'A client seeking to improve communication in their relationship.',
      details: {
        age: '36',
        relationship_status: 'Married (8 years)',
        goal: 'Develop healthier communication patterns',
        challenge: 'Frequent misunderstandings and arguments'
      }
    },
    {
      id: 'dating-confidence',
      title: 'Dating Confidence Client',
      description: 'A client wanting to build confidence in dating and finding a partner.',
      details: {
        age: '27',
        relationship_status: 'Single',
        goal: 'Overcome dating anxiety',
        challenge: 'Fear of rejection and vulnerability'
      }
    },
    {
      id: 'conflict-resolution',
      title: 'Conflict Resolution Client',
      description: 'A client looking to resolve ongoing conflicts in their relationship.',
      details: {
        age: '43',
        relationship_status: 'Married (15 years)',
        goal: 'Learn effective conflict resolution',
        challenge: 'Recurring unresolved issues'
      }
    },
    {
      id: 'trust-rebuilding',
      title: 'Trust Rebuilding Client',
      description: 'A client working to rebuild trust after a breach in their relationship.',
      details: {
        age: '39',
        relationship_status: 'Committed relationship (5 years)',
        goal: 'Rebuild trust and security',
        challenge: 'Healing from past betrayal'
      }
    },
    {
      id: 'life-transition',
      title: 'Life Transition Client',
      description: 'A client navigating a major life transition with their partner.',
      details: {
        age: '34',
        relationship_status: 'Married (3 years)',
        goal: 'Navigate transition together',
        challenge: 'Different coping mechanisms for change'
      }
    }
  ]
};

// Icons for each category
const categoryIcons = {
  life: '🌱',
  health: '💪',
  wealth: '💰',
  relationship: '❤️'
};

// Titles for each category
const categoryTitles = {
  life: 'Life Coach',
  health: 'Health Coach',
  wealth: 'Wealth Coach',
  relationship: 'Relationship Coach'
};

const SubcategorySelection: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { startNewSession, updateCurrentSession } = useSession();
  
  // Get the subcategories for the selected category
  const subcategories = useMemo(() => {
    if (!categoryId || !subcategoriesData[categoryId as keyof typeof subcategoriesData]) {
      return [];
    }
    return subcategoriesData[categoryId as keyof typeof subcategoriesData];
  }, [categoryId]);
  
  // Get the icon and title for the selected category
  const categoryIcon = categoryId ? categoryIcons[categoryId as keyof typeof categoryIcons] : '';
  const categoryTitle = categoryId ? categoryTitles[categoryId as keyof typeof categoryTitles] : '';
  
  const handleSubcategorySelect = (subcategory: any) => {
    // Start a new session
    startNewSession();
    
    // Update the session with the category and subcategory information
    updateCurrentSession({
      clientType: `${categoryTitle} - ${subcategory.title}`
    });
    
    // Navigate to the coaching session
    navigate('/session');
  };
  
  const handleBack = () => {
    navigate('/categories');
  };
  
  if (!categoryId || subcategories.length === 0) {
    return (
      <PageContainer>
        <Title>Category Not Found</Title>
        <BackButton onClick={() => navigate('/categories')}>
          ← Back to Categories
        </BackButton>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <BackButton onClick={handleBack}>
        ← Back to Categories
      </BackButton>
      
      <CategoryBadge>
        <span>{categoryIcon}</span>
        <span>{categoryTitle}</span>
      </CategoryBadge>
      
      <Title>Select a Client Type</Title>
      <Description>
        Choose the type of client you'd like to practice coaching with. Each client has different goals and challenges.
      </Description>
      
      <SubcategoriesGrid>
        {subcategories.map(subcategory => (
          <SubcategoryCard 
            key={subcategory.id} 
            onClick={() => handleSubcategorySelect(subcategory)}
          >
            <SubcategoryTitle>{subcategory.title}</SubcategoryTitle>
            <SubcategoryDescription>{subcategory.description}</SubcategoryDescription>
            <ClientDetails>
              {Object.entries(subcategory.details).map(([key, value]) => (
                <ClientDetail key={key}>
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {String(value)}
                </ClientDetail>
              ))}
            </ClientDetails>
          </SubcategoryCard>
        ))}
      </SubcategoriesGrid>
    </PageContainer>
  );
};

export default SubcategorySelection;
