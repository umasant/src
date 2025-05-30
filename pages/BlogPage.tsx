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

const BlogLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div``;

const Sidebar = styled.div`
  @media (max-width: 992px) {
    order: -1;
  }
`;

const BlogPostsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
`;

const BlogPost = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const BlogPostImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const BlogPostContent = styled.div`
  padding: 1.5rem;
`;

const BlogPostTitle = styled.h2`
  font-size: 1.5rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
`;

const BlogPostMeta = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: var(--dark-gray);
  font-size: 0.9rem;
`;

const BlogPostAuthor = styled.span`
  margin-right: 1rem;
`;

const BlogPostDate = styled.span``;

const BlogPostExcerpt = styled.p`
  color: var(--dark-gray);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ReadMoreButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background-color: #3a80d2;
  }
`;

const SidebarSection = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const SidebarTitle = styled.h3`
  font-size: 1.2rem;
  color: var(--text-color);
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--light-gray);
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CategoryItem = styled.li`
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const CategoryLink = styled.a`
  color: var(--dark-gray);
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const CategoryCount = styled.span`
  background-color: var(--light-gray);
  padding: 0.1rem 0.5rem;
  border-radius: 10px;
  font-size: 0.8rem;
`;

const PopularPostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PopularPost = styled.div`
  display: flex;
  gap: 1rem;
`;

const PopularPostImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`;

const PopularPostInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const PopularPostTitle = styled.h4`
  font-size: 1rem;
  color: var(--text-color);
  margin: 0 0 0.5rem;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const PopularPostDate = styled.span`
  font-size: 0.8rem;
  color: var(--dark-gray);
`;

const TagsCloud = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.a`
  background-color: var(--light-gray);
  color: var(--dark-gray);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  text-decoration: none;
  
  &:hover {
    background-color: var(--primary-color);
    color: white;
  }
`;

const BlogPage: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: '5 Powerful Questions Every Life Coach Should Ask',
      excerpt: 'Discover the transformative questions that can help your clients gain clarity, overcome obstacles, and achieve their goals. These powerful inquiries can be the key to unlocking breakthrough moments in your coaching sessions.',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      author: 'Jennifer Smith',
      date: 'May 15, 2025',
      category: 'Life Coaching'
    },
    {
      id: 2,
      title: 'How to Build Sustainable Health Habits That Last',
      excerpt: 'Creating lasting health habits isn\'t about willpower—it\'s about designing systems that work with your lifestyle. Learn evidence-based strategies for building sustainable health routines that you can maintain for years to come.',
      image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      author: 'Michael Chen',
      date: 'May 8, 2025',
      category: 'Health Coaching'
    },
    {
      id: 3,
      title: 'Financial Freedom: A Step-by-Step Roadmap',
      excerpt: 'Financial freedom isn\'t just for the wealthy. This comprehensive guide outlines practical steps anyone can take to build wealth, eliminate debt, and create a secure financial future regardless of your starting point.',
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
      author: 'Jessica Williams',
      date: 'April 29, 2025',
      category: 'Wealth Coaching'
    },
    {
      id: 4,
      title: 'The Science of Effective Communication in Relationships',
      excerpt: 'Communication is the foundation of healthy relationships, but few of us are taught how to do it effectively. Explore the research-backed techniques that can transform your connections with partners, family, and friends.',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      author: 'David Rodriguez',
      date: 'April 22, 2025',
      category: 'Relationship Coaching'
    }
  ];
  
  const categories = [
    { name: 'Life Coaching', count: 12 },
    { name: 'Health Coaching', count: 8 },
    { name: 'Wealth Coaching', count: 10 },
    { name: 'Relationship Coaching', count: 7 },
    { name: 'Career Coaching', count: 9 },
    { name: 'Mindfulness', count: 6 }
  ];
  
  const popularPosts = [
    {
      id: 1,
      title: 'How to Overcome Impostor Syndrome',
      date: 'April 10, 2025',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
    },
    {
      id: 2,
      title: '10 Morning Habits of Successful People',
      date: 'March 28, 2025',
      image: 'https://images.unsplash.com/photo-1484627147104-f5197bcd6651?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
    },
    {
      id: 3,
      title: 'The Power of Vulnerability in Leadership',
      date: 'March 15, 2025',
      image: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
    }
  ];
  
  const tags = [
    'Personal Growth', 'Mindfulness', 'Goal Setting', 'Productivity',
    'Wellness', 'Nutrition', 'Exercise', 'Mental Health',
    'Financial Planning', 'Investing', 'Debt Reduction', 'Budgeting',
    'Communication', 'Conflict Resolution', 'Dating', 'Marriage',
    'Career Transition', 'Leadership', 'Work-Life Balance', 'Stress Management'
  ];
  
  return (
    <PageContainer>
      <PageTitle>Coaching Insights Blog</PageTitle>
      
      <BlogLayout>
        <MainContent>
          <BlogPostsGrid>
            {blogPosts.map(post => (
              <BlogPost key={post.id}>
                <BlogPostImage src={post.image} alt={post.title} />
                <BlogPostContent>
                  <BlogPostTitle>{post.title}</BlogPostTitle>
                  <BlogPostMeta>
                    <BlogPostAuthor>By {post.author}</BlogPostAuthor>
                    <BlogPostDate>{post.date}</BlogPostDate>
                  </BlogPostMeta>
                  <BlogPostExcerpt>{post.excerpt}</BlogPostExcerpt>
                  <ReadMoreButton>Read More</ReadMoreButton>
                </BlogPostContent>
              </BlogPost>
            ))}
          </BlogPostsGrid>
        </MainContent>
        
        <Sidebar>
          <SidebarSection>
            <SidebarTitle>Categories</SidebarTitle>
            <CategoryList>
              {categories.map(category => (
                <CategoryItem key={category.name}>
                  <CategoryLink href="#">
                    {category.name}
                    <CategoryCount>{category.count}</CategoryCount>
                  </CategoryLink>
                </CategoryItem>
              ))}
            </CategoryList>
          </SidebarSection>
          
          <SidebarSection>
            <SidebarTitle>Popular Posts</SidebarTitle>
            <PopularPostList>
              {popularPosts.map(post => (
                <PopularPost key={post.id}>
                  <PopularPostImage src={post.image} alt={post.title} />
                  <PopularPostInfo>
                    <PopularPostTitle>{post.title}</PopularPostTitle>
                    <PopularPostDate>{post.date}</PopularPostDate>
                  </PopularPostInfo>
                </PopularPost>
              ))}
            </PopularPostList>
          </SidebarSection>
          
          <SidebarSection>
            <SidebarTitle>Tags</SidebarTitle>
            <TagsCloud>
              {tags.map(tag => (
                <Tag key={tag} href="#">{tag}</Tag>
              ))}
            </TagsCloud>
          </SidebarSection>
        </Sidebar>
      </BlogLayout>
    </PageContainer>
  );
};

export default BlogPage;
