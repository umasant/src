import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
  margin-bottom: 2rem;
  text-align: center;
`;

const Description = styled.p`
  color: var(--dark-gray);
  font-size: 1.1rem;
  margin-bottom: 3rem;
  text-align: center;
  max-width: 700px;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  width: 100%;
`;

const CategoryCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
`;

const CategoryIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
`;

const CategoryTitle = styled.h3`
  color: var(--text-color);
  margin-bottom: 0.5rem;
`;

const CategoryDescription = styled.p`
  color: var(--dark-gray);
  font-size: 0.9rem;
`;

// Define the coaching categories
const categories = [
  {
    id: 'life',
    title: 'Life Coach',
    icon: '🌱',
    description: 'General life coaching for personal growth and development'
  },
  {
    id: 'health',
    title: 'Health Coach',
    icon: '💪',
    description: 'Coaching focused on physical and mental wellbeing'
  },
  {
    id: 'wealth',
    title: 'Wealth Coach',
    icon: '💰',
    description: 'Financial guidance and wealth building strategies'
  },
  {
    id: 'relationship',
    title: 'Relationship Coach',
    icon: '❤️',
    description: 'Coaching for interpersonal and romantic relationships'
  }
];

const CategorySelection: React.FC = () => {
  const navigate = useNavigate();
  
  const handleCategorySelect = (categoryId: string) => {
    navigate(`/subcategories/${categoryId}`);
  };
  
  return (
    <PageContainer>
      <Title>Select a Coaching Category</Title>
      <Description>
        Choose the type of coaching you'd like to practice. Each category offers different client scenarios to help you develop specialized coaching skills.
      </Description>
      
      <CategoriesGrid>
        {categories.map(category => (
          <CategoryCard 
            key={category.id} 
            onClick={() => handleCategorySelect(category.id)}
          >
            <CategoryIcon>{category.icon}</CategoryIcon>
            <CategoryTitle>{category.title}</CategoryTitle>
            <CategoryDescription>{category.description}</CategoryDescription>
          </CategoryCard>
        ))}
      </CategoriesGrid>
    </PageContainer>
  );
};

export default CategorySelection;
