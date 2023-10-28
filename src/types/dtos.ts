import { Post } from './entities';

// type PostSummaryDTO = {
//   id: string;
//   title: string;
//   username: string;
//   createdDate: string;
//   voteCount: number;
//   commentCount: number;
//   body?: string;
//   thumbnailUrl?: string;
// };

type PostSummaryDTO = {
  id: string;
  title: string;
  voteCount: number;
  thumbnailUrl: string;
  body?: string;
  url?: string;
  categoryName: string;
  subcategoryName: string;
  commentCount: number;
  username: string;
  createdAt: string;
  updatedDate: string;
};

type CreatePostDTO = {
  title: string;
  username: string;
  body?: string;
  url?: string;
};

type CreateCommentDTO = {
  parentPostId: string;
  parentCommentId: string;
  body: string;
};

type CreateUserDTO = {
  username: string;
  password: string;
};

type LoginDTO = {
  username: string;
  password: string;
};

type Topic = {
  title: string;
  topPosts: TopPost[];
};

type TopPost = {
  subcategoryName: string;
  post: Post;
};

export type {
  CreatePostDTO,
  CreateCommentDTO,
  PostSummaryDTO,
  Topic,
  TopPost,
  LoginDTO,
  CreateUserDTO,
};
