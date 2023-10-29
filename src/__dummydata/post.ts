import { PostSummaryDTO } from '@/types/dtos';
import { Post, TopPosts } from '@/types/entities';

export const examplePost: Post = {
  body: 'Post body',
  categoryName: 'Charities',
  comments: [],
  createdAt: new Date().toDateString(),
  id: 'post1',
  subcategoryName: 'Medical',
  thumbnailUrl: '',
  title: 'Post title',
  url: '/testpost',
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
  username: 'testuser',
  voteCount: 5,
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
  body: 'Post body',
  categoryName: 'Charities',
  commentCount: 3,
  createdDate: new Date().toDateString(),
  id: 'post1',
  subcategoryName: 'Medical',
  thumbnailUrl: '',
  title: 'Post title',
  username: 'testuser',
  voteCount: 5,
};
