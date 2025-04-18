import { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardHeader, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getPosts, type Post } from '../services/api';

const PageContainer = styled(Box)({
  width: '100%',
  maxHeight: '100vh',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '&::-webkit-scrollbar': {
    display: 'none'
  },
  scrollbarWidth: 'none'
});

const ContentContainer = styled(Box)({
  maxWidth: '600px',
  width: '100%',
  margin: '0 auto',
  padding: '0 16px',
  paddingBottom: '2rem'
});

const StyledCard = styled(Card)({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s ease-in-out',
  marginBottom: '16px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '16px',
  overflow: 'hidden',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.15)',
    borderColor: 'rgba(255, 255, 255, 0.2)'
  },
});

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
    
    // Set up polling for real-time updates
    const interval = setInterval(fetchPosts, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PageContainer>
      <ContentContainer>
      <Typography variant="h4" gutterBottom sx={{ color: 'white', textAlign: 'center', mb: 4, fontWeight: 'bold' }}>
        Latest Posts
      </Typography>
      {posts.map((post) => (
        <StyledCard key={post.id}>
          <CardHeader
            avatar={
              <Avatar sx={{
                width: 40,
                height: 40,
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                color: 'white'
              }}>
                {post.userId.charAt(0).toUpperCase()}
              </Avatar>
            }
            title={
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                User {post.userId}
              </Typography>
            }
            subheader={
              <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                {new Date(post.timestamp).toLocaleString()}
              </Typography>
            }
          />
          <CardContent sx={{ pt: 1, pb: '16px !important' }}>
            <Typography variant="body1" sx={{ mb: 2, color: 'white' }}>
              {post.content}
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'flex-end',
              alignItems: 'center',
              mt: 2
            }}>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                <strong>{post.commentCount}</strong> Comments
              </Typography>
            </Box>
          </CardContent>
        </StyledCard>
      ))}
      </ContentContainer>
    </PageContainer>
  );
};

export default Feed;
