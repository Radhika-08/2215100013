import axios from 'axios';

// Types for our data models
export interface Post {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  commentCount: number;
}

export interface TopUser {
  id: string;
  totalComments: number;
  postCount: number;
  averageCommentsPerPost: number;
}

// Mock data for development
const mockPosts: Post[] = [
  {
    id: '1',
    userId: 'john',
    content: 'Just finished a great coding session! #programming',
    timestamp: new Date().toISOString(),
    commentCount: 5
  },
  {
    id: '2',
    userId: 'sarah',
    content: 'Beautiful sunset today! 🌅 #photography',
    timestamp: new Date().toISOString(),
    commentCount: 8
  },
  {
    id: '3',
    userId: 'mike',
    content: 'Working on a new project using React and TypeScript',
    timestamp: new Date().toISOString(),
    commentCount: 3
  }
];

const mockTopUsers: TopUser[] = [
  {
    id: 'john',
    totalComments: 256,
    postCount: 62,
    averageCommentsPerPost: 4.13
  },
  {
    id: 'sarah',
    totalComments: 243,
    postCount: 58,
    averageCommentsPerPost: 4.19
  },
  {
    id: 'mike',
    totalComments: 198,
    postCount: 45,
    averageCommentsPerPost: 4.40
  },
  {
    id: 'emma',
    totalComments: 187,
    postCount: 43,
    averageCommentsPerPost: 4.35
  },
  {
    id: 'alex',
    totalComments: 176,
    postCount: 41,
    averageCommentsPerPost: 4.29
  },
  {
    id: 'lisa',
    totalComments: 165,
    postCount: 39,
    averageCommentsPerPost: 4.23
  }
];

const API_BASE_URL = 'http://localhost:3000/api';

// We'll keep these configurations for when we implement the real API
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

// Helper function to get data with caching
const getWithCache = async <T>(url: string): Promise<T> => {
  // Return mock data instead of making API calls
  if (url === '/posts') return mockPosts as T;
  if (url === '/users/top') return mockTopUsers as T;
  return [] as T;
};

export const getPosts = () => getWithCache<Post[]>('/posts');
export const getTrendingPosts = () => getWithCache<Post[]>('/posts/trending');
export const getTopUsers = () => getWithCache<TopUser[]>('/users/top');

export default api;
