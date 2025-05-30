import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: var(--text-color);
  margin-bottom: 2rem;
  text-align: center;
`;

const CoachesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const CoachCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const CoachImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
`;

const CoachInfo = styled.div`
  padding: 1.5rem;
`;

const CoachName = styled.h3`
  font-size: 1.3rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
`;

const CoachSpecialty = styled.p`
  color: var(--primary-color);
  font-weight: 600;
  margin-bottom: 1rem;
`;

const CoachBio = styled.p`
  color: var(--dark-gray);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const CoachButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  
  &:hover {
    background-color: #3a80d2;
  }
`;

const IntroSection = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 3rem;
`;

const IntroText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--dark-gray);
`;

const CoachesPage: React.FC = () => {
  const coaches = [
    {
      id: 1,
      name: 'Sarah Johnson',
      specialty: 'Life Coach',
      bio: 'Sarah specializes in helping clients navigate major life transitions and find purpose in their personal and professional lives.',
      image: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: 2,
      name: 'Michael Chen',
      specialty: 'Health Coach',
      bio: 'Michael is passionate about helping clients develop sustainable health habits and achieve their fitness goals.',
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: 3,
      name: 'Jessica Williams',
      specialty: 'Wealth Coach',
      bio: 'Jessica helps clients build financial literacy, eliminate debt, and create wealth-building strategies for long-term success.',
      image: 'https://randomuser.me/api/portraits/women/68.jpg'
    },
    {
      id: 4,
      name: 'David Rodriguez',
      specialty: 'Relationship Coach',
      bio: 'David specializes in helping individuals and couples improve communication and build healthier relationships.',
      image: 'https://randomuser.me/api/portraits/men/91.jpg'
    },
    {
      id: 5,
      name: 'Emma Thompson',
      specialty: 'Career Coach',
      bio: 'Emma helps professionals navigate career transitions, improve leadership skills, and achieve work-life balance.',
      image: 'https://randomuser.me/api/portraits/women/33.jpg'
    },
    {
      id: 6,
      name: 'James Wilson',
      specialty: 'Mindfulness Coach',
      bio: 'James guides clients in developing mindfulness practices to reduce stress and improve overall wellbeing.',
      image: 'https://randomuser.me/api/portraits/men/64.jpg'
    }
  ];
  
  return (
    <PageContainer>
      <PageTitle>Our Expert Coaches</PageTitle>
      
      <IntroSection>
        <IntroText>
          Our team of certified coaches brings diverse expertise and experience to help you achieve your goals.
          Each coach is committed to providing personalized guidance and support on your journey to personal and professional growth.
        </IntroText>
      </IntroSection>
      
      <CoachesGrid>
        {coaches.map(coach => (
          <CoachCard key={coach.id}>
            <CoachImage src={coach.image} alt={coach.name} />
            <CoachInfo>
              <CoachName>{coach.name}</CoachName>
              <CoachSpecialty>{coach.specialty}</CoachSpecialty>
              <CoachBio>{coach.bio}</CoachBio>
              <CoachButton>View Profile</CoachButton>
            </CoachInfo>
          </CoachCard>
        ))}
      </CoachesGrid>
    </PageContainer>
  );
};

export default CoachesPage;
