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

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: var(--text-color);
  margin: 2.5rem 0 1.5rem;
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--dark-gray);
  margin-bottom: 1.5rem;
`;

const MissionSection = styled.div`
  background-color: var(--light-gray);
  padding: 3rem;
  border-radius: 8px;
  margin: 3rem 0;
  text-align: center;
`;

const MissionTitle = styled.h2`
  font-size: 2rem;
  color: var(--text-color);
  margin-bottom: 1.5rem;
`;

const MissionStatement = styled.p`
  font-size: 1.3rem;
  line-height: 1.8;
  color: var(--dark-gray);
  max-width: 800px;
  margin: 0 auto;
`;

const TeamSection = styled.div`
  margin: 3rem 0;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const TeamMemberCard = styled.div`
  text-align: center;
`;

const TeamMemberImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
`;

const TeamMemberName = styled.h3`
  font-size: 1.3rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
`;

const TeamMemberRole = styled.p`
  color: var(--primary-color);
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const TeamMemberBio = styled.p`
  color: var(--dark-gray);
  font-size: 0.9rem;
  line-height: 1.6;
`;

const ValuesSection = styled.div`
  margin: 3rem 0;
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ValueCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  text-align: center;
`;

const ValueIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
`;

const ValueTitle = styled.h3`
  font-size: 1.3rem;
  color: var(--text-color);
  margin-bottom: 1rem;
`;

const ValueDescription = styled.p`
  color: var(--dark-gray);
  font-size: 0.9rem;
  line-height: 1.6;
`;

const AboutPage: React.FC = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Jennifer Smith',
      role: 'Founder & CEO',
      bio: 'Jennifer founded Clarity with a vision to make professional coaching accessible to everyone.',
      image: 'https://randomuser.me/api/portraits/women/17.jpg'
    },
    {
      id: 2,
      name: 'Robert Johnson',
      role: 'Head of Coaching',
      bio: 'Robert oversees our coaching programs and ensures the highest quality standards.',
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: 3,
      name: 'Emily Chen',
      role: 'Director of Training',
      bio: 'Emily develops our coach training curriculum and certification programs.',
      image: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: 4,
      name: 'Daniel Williams',
      role: 'Technology Director',
      bio: 'Daniel leads our technology team, creating innovative coaching tools and platforms.',
      image: 'https://randomuser.me/api/portraits/men/91.jpg'
    }
  ];
  
  const values = [
    {
      id: 1,
      title: 'Integrity',
      description: 'We uphold the highest ethical standards in all our coaching relationships and business practices.',
      icon: '⚖️'
    },
    {
      id: 2,
      title: 'Growth Mindset',
      description: 'We believe in continuous learning and the capacity for personal and professional development.',
      icon: '🌱'
    },
    {
      id: 3,
      title: 'Empowerment',
      description: 'We empower individuals to discover their strengths and achieve their full potential.',
      icon: '💪'
    },
    {
      id: 4,
      title: 'Inclusivity',
      description: 'We create a welcoming environment where diversity is celebrated and everyone belongs.',
      icon: '🤝'
    },
    {
      id: 5,
      title: 'Excellence',
      description: 'We strive for excellence in our coaching services, training programs, and client experiences.',
      icon: '🏆'
    },
    {
      id: 6,
      title: 'Innovation',
      description: 'We continuously innovate our coaching methodologies and technology to better serve our clients.',
      icon: '💡'
    }
  ];
  
  return (
    <PageContainer>
      <PageTitle>About CoachesHub</PageTitle>
      
      <Paragraph>
        Founded in 2018, CoachesHub has grown from a small coaching practice to a global platform connecting expert coaches with clients seeking personal and professional growth. Our mission is to make high-quality coaching accessible to everyone, empowering individuals to achieve their goals and transform their lives.
      </Paragraph>
      
      <Paragraph>
        We believe that everyone has the potential to grow and thrive with the right guidance and support. Our coaches are certified professionals with diverse backgrounds and specialties, equipped to help clients navigate challenges, discover opportunities, and create meaningful change.
      </Paragraph>
      
      <MissionSection>
        <MissionTitle>Our Mission</MissionTitle>
        <MissionStatement>
          To transform lives through accessible, high-quality coaching that empowers individuals to discover their potential, achieve their goals, and create lasting positive change.
        </MissionStatement>
      </MissionSection>
      
      <ValuesSection>
        <SectionTitle>Our Values</SectionTitle>
        <ValuesGrid>
          {values.map(value => (
            <ValueCard key={value.id}>
              <ValueIcon>{value.icon}</ValueIcon>
              <ValueTitle>{value.title}</ValueTitle>
              <ValueDescription>{value.description}</ValueDescription>
            </ValueCard>
          ))}
        </ValuesGrid>
      </ValuesSection>
      
      <TeamSection>
        <SectionTitle>Our Leadership Team</SectionTitle>
        <TeamGrid>
          {teamMembers.map(member => (
            <TeamMemberCard key={member.id}>
              <TeamMemberImage src={member.image} alt={member.name} />
              <TeamMemberName>{member.name}</TeamMemberName>
              <TeamMemberRole>{member.role}</TeamMemberRole>
              <TeamMemberBio>{member.bio}</TeamMemberBio>
            </TeamMemberCard>
          ))}
        </TeamGrid>
      </TeamSection>
      
      <SectionTitle>Our Approach</SectionTitle>
      <Paragraph>
        At CoachesHub, we take a holistic, client-centered approach to coaching. We recognize that each individual's journey is unique, and we tailor our coaching methods to meet the specific needs and goals of each client. Our coaches use evidence-based techniques and draw from diverse disciplines including positive psychology, neuroscience, and behavioral change theory.
      </Paragraph>
      
      <Paragraph>
        We believe in the power of accountability, reflection, and action. Our coaching relationships are built on trust, confidentiality, and mutual respect. We create a safe space for clients to explore challenges, set meaningful goals, and develop strategies for sustainable growth and success.
      </Paragraph>
    </PageContainer>
  );
};

export default AboutPage;
