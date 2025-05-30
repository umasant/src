import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const HeroSection = styled.div`
  position: relative;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  overflow: hidden;
`;

const HeroVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: 2rem;
  z-index: 1;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: var(--primary-color);
  color: white;
  padding: 1rem 2rem;
  border-radius: 4px;
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #3a80d2;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin: 3rem 0 2rem;
  color: var(--text-color);
`;

const BenefitsSection = styled.section`
  padding: 4rem 2rem;
  background-color: #f8f9fa;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const BenefitCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  text-align: center;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const BenefitIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
`;

const BenefitTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-color);
`;

const BenefitDescription = styled.p`
  color: var(--dark-gray);
  line-height: 1.6;
`;

const CoachingTypesSection = styled.section`
  padding: 4rem 2rem;
`;

const CoachingTypesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const CoachingTypeCard = styled.div`
  position: relative;
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
`;

const CoachingTypeImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
  
  ${CoachingTypeCard}:hover & {
    transform: scale(1.05);
  }
`;

const CoachingTypeOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
`;

const CoachingTypeTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const TestimonialsSection = styled.section`
  padding: 4rem 2rem;
  background-color: #f8f9fa;
`;

const TestimonialCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto 2rem;
`;

const TestimonialText = styled.p`
  font-size: 1.2rem;
  font-style: italic;
  color: var(--text-color);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
`;

const TestimonialAvatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
`;

const TestimonialInfo = styled.div``;

const TestimonialName = styled.h4`
  margin: 0 0 0.25rem;
  color: var(--text-color);
`;

const TestimonialRole = styled.p`
  margin: 0;
  color: var(--dark-gray);
`;

const HomePage: React.FC = () => {
  return (
    <HomeContainer>
      <HeroSection>
        <HeroVideo autoPlay muted loop>
          <source src="https://player.vimeo.com/external/370331493.sd.mp4?s=e90dcaba73c19e0e36f03406b47b5385a138a9f1&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
          Your browser does not support the video tag.
        </HeroVideo>
        <HeroOverlay />
        <HeroContent>
          <HeroTitle>Transform Your Life with Professional Coaching</HeroTitle>
          <HeroSubtitle>
            Unlock your full potential and achieve your goals with our expert coaches.
            Experience personalized guidance tailored to your unique journey.
          </HeroSubtitle>
          <CTAButton to="/categories">Start Your Coaching Journey</CTAButton>
        </HeroContent>
      </HeroSection>
      
      <BenefitsSection>
        <SectionTitle>Benefits of Coaching</SectionTitle>
        <BenefitsGrid>
          <BenefitCard>
            <BenefitIcon>🎯</BenefitIcon>
            <BenefitTitle>Clarity & Focus</BenefitTitle>
            <BenefitDescription>
              Gain clarity on your goals and develop a focused approach to achieve them.
              Our coaches help you cut through the noise and identify what truly matters.
            </BenefitDescription>
          </BenefitCard>
          
          <BenefitCard>
            <BenefitIcon>🚀</BenefitIcon>
            <BenefitTitle>Accelerated Growth</BenefitTitle>
            <BenefitDescription>
              Fast-track your personal and professional development with structured guidance.
              Achieve in months what might otherwise take years of trial and error.
            </BenefitDescription>
          </BenefitCard>
          
          <BenefitCard>
            <BenefitIcon>🧠</BenefitIcon>
            <BenefitTitle>Overcome Limitations</BenefitTitle>
            <BenefitDescription>
              Break through mental barriers and limiting beliefs that hold you back.
              Develop new perspectives and approaches to long-standing challenges.
            </BenefitDescription>
          </BenefitCard>
          
          <BenefitCard>
            <BenefitIcon>⚖️</BenefitIcon>
            <BenefitTitle>Work-Life Balance</BenefitTitle>
            <BenefitDescription>
              Create harmony between your professional ambitions and personal fulfillment.
              Design a life that honors all aspects of who you are and what you value.
            </BenefitDescription>
          </BenefitCard>
          
          <BenefitCard>
            <BenefitIcon>💪</BenefitIcon>
            <BenefitTitle>Accountability</BenefitTitle>
            <BenefitDescription>
              Stay committed to your goals with consistent support and accountability.
              Transform intentions into actions with regular check-ins and guidance.
            </BenefitDescription>
          </BenefitCard>
          
          <BenefitCard>
            <BenefitIcon>🌱</BenefitIcon>
            <BenefitTitle>Sustainable Change</BenefitTitle>
            <BenefitDescription>
              Develop habits and mindsets that create lasting transformation.
              Build a foundation for continued growth long after coaching ends.
            </BenefitDescription>
          </BenefitCard>
        </BenefitsGrid>
      </BenefitsSection>
      
      <CoachingTypesSection>
        <SectionTitle>Explore Coaching Types</SectionTitle>
        <CoachingTypesGrid>
          <CoachingTypeCard>
            <CoachingTypeImage src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" alt="Life Coaching" />
            <CoachingTypeOverlay>
              <CoachingTypeTitle>Life Coaching</CoachingTypeTitle>
            </CoachingTypeOverlay>
          </CoachingTypeCard>
          
          <CoachingTypeCard>
            <CoachingTypeImage src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="Health Coaching" />
            <CoachingTypeOverlay>
              <CoachingTypeTitle>Health Coaching</CoachingTypeTitle>
            </CoachingTypeOverlay>
          </CoachingTypeCard>
          
          <CoachingTypeCard>
            <CoachingTypeImage src="https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80" alt="Wealth Coaching" />
            <CoachingTypeOverlay>
              <CoachingTypeTitle>Wealth Coaching</CoachingTypeTitle>
            </CoachingTypeOverlay>
          </CoachingTypeCard>
          
          <CoachingTypeCard>
            <CoachingTypeImage src="https://images.unsplash.com/photo-1515552726023-7125c8d07fb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1467&q=80" alt="Relationship Coaching" />
            <CoachingTypeOverlay>
              <CoachingTypeTitle>Relationship Coaching</CoachingTypeTitle>
            </CoachingTypeOverlay>
          </CoachingTypeCard>
        </CoachingTypesGrid>
      </CoachingTypesSection>
      
      <TestimonialsSection>
        <SectionTitle>What Our Clients Say</SectionTitle>
        
        <TestimonialCard>
          <TestimonialText>
            "Working with my coach has been transformative. I've gained clarity on my career path and developed the confidence to pursue opportunities I would have previously avoided. The structured approach and accountability made all the difference."
          </TestimonialText>
          <TestimonialAuthor>
            <TestimonialAvatar src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sarah J." />
            <TestimonialInfo>
              <TestimonialName>Sarah J.</TestimonialName>
              <TestimonialRole>Marketing Director</TestimonialRole>
            </TestimonialInfo>
          </TestimonialAuthor>
        </TestimonialCard>
        
        <TestimonialCard>
          <TestimonialText>
            "I was skeptical about coaching at first, but it's been one of the best investments I've made. My health coach helped me establish sustainable habits that have improved my energy levels and overall wellbeing. I'm now running half-marathons at 45!"
          </TestimonialText>
          <TestimonialAuthor>
            <TestimonialAvatar src="https://randomuser.me/api/portraits/men/32.jpg" alt="Michael T." />
            <TestimonialInfo>
              <TestimonialName>Michael T.</TestimonialName>
              <TestimonialRole>Software Engineer</TestimonialRole>
            </TestimonialInfo>
          </TestimonialAuthor>
        </TestimonialCard>
      </TestimonialsSection>
    </HomeContainer>
  );
};

export default HomePage;
