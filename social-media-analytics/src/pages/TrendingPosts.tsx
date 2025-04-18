import { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardHeader, Typography, Avatar } from '@mui/material';
import { getTrendingPosts } from '../services/api';

interface TrendingPost {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  commentCount: number;
}

const TrendingPosts = () => {
  const [trendingPosts, setTrendingPosts] = useState<TrendingPost[]>([]);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        const data = await getTrendingPosts();
        setTrendingPosts(data);
      } catch (error) {
        console.error('Error fetching trending posts:', error);
      }
    };

    fetchTrendingPosts();
    const interval = setInterval(fetchTrendingPosts, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Trending Posts</Typography>
      {trendingPosts.map((post, index) => (
        <Card key={post.id} sx={{ mb: 2, bgcolor: index === 0 ? 'rgba(255, 215, 0, 0.1)' : 'inherit' }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: index === 0 ? 'gold' : 'primary.main' }}>
                {post.userId.charAt(0).toUpperCase()}
              </Avatar>
            }
            title={`User ${post.userId}`}
            subheader={new Date(post.timestamp).toLocaleString()}
          />
          <CardContent>
            <Typography variant="body1">{post.content}</Typography>
            <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
              🔥 {post.commentCount} Comments
            </Typography>
          </CardContent>
        </Card>
      ))}
      {trendingPosts.length === 0 && (
        <Typography variant="body1" color="text.secondary" textAlign="center">
          No trending posts available at the moment
        </Typography>
      )}
    </Box>
  );
};

export default TrendingPosts;
