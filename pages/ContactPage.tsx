import React, { useState } from 'react';
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

const ContactLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ContactForm = styled.form`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const FormTitle = styled.h2`
  font-size: 1.8rem;
  color: var(--text-color);
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-color);
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--medium-gray);
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--medium-gray);
  border-radius: 4px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.2);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--medium-gray);
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.2);
  }
`;

const SubmitButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #3a80d2;
  }
  
  &:disabled {
    background-color: var(--medium-gray);
    cursor: not-allowed;
  }
`;

const ContactInfo = styled.div``;

const InfoTitle = styled.h2`
  font-size: 1.8rem;
  color: var(--text-color);
  margin-bottom: 1.5rem;
`;

const InfoText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--dark-gray);
  margin-bottom: 2rem;
`;

const ContactMethods = styled.div`
  margin-bottom: 2rem;
`;

const ContactMethod = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const ContactIcon = styled.div`
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-right: 1rem;
  width: 40px;
  text-align: center;
`;

const ContactText = styled.div`
  color: var(--dark-gray);
`;

const MapContainer = styled.div`
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 2rem;
`;

const Map = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const SuccessMessage = styled.div`
  background-color: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
`;

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send the form data to a server here
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      inquiryType: ''
    });
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };
  
  return (
    <PageContainer>
      <PageTitle>Contact Us</PageTitle>
      
      <ContactLayout>
        <ContactForm onSubmit={handleSubmit}>
          <FormTitle>Send Us a Message</FormTitle>
          
          {isSubmitted && (
            <SuccessMessage>
              Thank you for your message! We'll get back to you shortly.
            </SuccessMessage>
          )}
          
          <FormGroup>
            <Label htmlFor="name">Your Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="inquiryType">Inquiry Type</Label>
            <Select
              id="inquiryType"
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleChange}
              required
            >
              <option value="">Select an option</option>
              <option value="general">General Inquiry</option>
              <option value="coaching">Coaching Services</option>
              <option value="partnership">Partnership Opportunities</option>
              <option value="careers">Careers</option>
              <option value="support">Technical Support</option>
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="subject">Subject</Label>
            <Input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="message">Your Message</Label>
            <TextArea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <SubmitButton type="submit">Send Message</SubmitButton>
        </ContactForm>
        
        <ContactInfo>
          <InfoTitle>Get in Touch</InfoTitle>
          <InfoText>
            Have questions about our coaching services or want to learn more about how we can help you achieve your goals? 
            We'd love to hear from you! Fill out the form or use one of the contact methods below to get in touch with our team.
          </InfoText>
          
          <ContactMethods>
            <ContactMethod>
              <ContactIcon>📍</ContactIcon>
              <ContactText>123 Coaching Street, Suite 100, New York, NY 10001</ContactText>
            </ContactMethod>
            
            <ContactMethod>
              <ContactIcon>📞</ContactIcon>
              <ContactText>(555) 123-4567</ContactText>
            </ContactMethod>
            
            <ContactMethod>
              <ContactIcon>✉️</ContactIcon>
              <ContactText>info@CoachesHub.com</ContactText>
            </ContactMethod>
            
            <ContactMethod>
              <ContactIcon>🕒</ContactIcon>
              <ContactText>Monday - Friday: 9:00 AM - 6:00 PM EST</ContactText>
            </ContactMethod>
          </ContactMethods>
          
          <InfoTitle>Office Location</InfoTitle>
          <MapContainer>
            <Map 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215053348223!2d-73.98784492426362!3d40.75085657138558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1682531529631!5m2!1sen!2sus" 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
            />
          </MapContainer>
        </ContactInfo>
      </ContactLayout>
    </PageContainer>
  );
};

export default ContactPage;
