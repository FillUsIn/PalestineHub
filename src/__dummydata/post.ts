import { PostSummaryDTO } from '@/types/dtos';
import { Post, TopPosts } from '@/types/entities';

export const examplePost: Post = {
  id: 'post1',
  title: 'Post title',
  body: 'Post body',
  voteCount: 5,
  createdAt: new Date().toDateString(),
  username: 'testuser',
  url: '/testpost',
  thumbnailUrl: '',
  userLikes: [
    {
      username: 'user1',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
    },
  ],
  userDislikes: [
    {
      username: 'user2',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
    },
  ],
  comments: [],
};

export const exampleTopPosts: TopPosts = [
  {
    subcategoryName: 'Cat 1',
    post: examplePost,
  },
  {
    subcategoryName: 'Cat 2',
    post: {
      ...examplePost,
      id: 'post2',
      title: 'Post 2 title',
      url: '/testpost2',
    },
  },
  {
    subcategoryName: 'Cat 3',
    post: {
      ...examplePost,
      id: 'post3',
      title: 'Post 3 title',
      url: '/testpost3',
    },
  },
];

export const examplePostSummary: PostSummaryDTO = {
  id: 'post1',
  title: 'Post title',
  body: 'Post body',
  voteCount: 5,
  commentCount: 3,
  createdDate: new Date().toDateString(),
  username: 'testuser',
  thumbnailUrl: '',
};
