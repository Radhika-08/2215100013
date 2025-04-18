import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Avatar, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getTopUsers } from '../services/api';

interface TopUser {
  id: string;
  totalComments: number;
  postCount: number;
  averageCommentsPerPost: number;
}

const StyledCard = styled(Card)({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  transition: 'transform 0.3s ease-in-out',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
    background: 'rgba(255, 255, 255, 0.15)',
  },
});

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
  maxWidth: '1200px',
  width: '100%',
  margin: '0 auto',
  padding: '0 16px',
  paddingBottom: '2rem'
});

const TopUsers = () => {
  const [topUsers, setTopUsers] = useState<TopUser[]>([]);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const data = await getTopUsers();
        setTopUsers(data.slice(0, 5)); // Get top 5 users
      } catch (error) {
        console.error('Error fetching top users:', error);
      }
    };

    fetchTopUsers();
    const interval = setInterval(fetchTopUsers, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PageContainer>
      <ContentContainer>
      <Typography variant="h4" gutterBottom sx={{ color: 'white', textAlign: 'center', mb: 4, fontWeight: 'bold' }}>
        Top Users
      </Typography>
      <Grid container spacing={3}>
        {topUsers.map((user, index) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <StyledCard>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    margin: '0 auto',
                    bgcolor: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : '#CD7F32',
                    border: '4px solid white',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                    fontSize: '2rem',
                    fontWeight: 'bold'
                  }}
                >
                  {user.id.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                  {user.id}
                </Typography>
                <Box sx={{ 
                  bgcolor: 'rgba(0,0,0,0.03)', 
                  p: 2, 
                  borderRadius: 2,
                  '& > *:not(:last-child)': { mb: 1.5 }
                }}>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }} gutterBottom>
                    Total Comments: <strong>{user.totalComments}</strong>
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }} gutterBottom>
                    Posts: <strong>{user.postCount}</strong>
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    Avg. Comments/Post: <strong>{user.averageCommentsPerPost.toFixed(2)}</strong>
                  </Typography>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
      </ContentContainer>
    </PageContainer>
  );
};

export default TopUsers;
