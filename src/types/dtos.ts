import { Post } from './entities';

type PostSummaryDTO = {
  id: string;
  body?: string;
  categoryName: string;
  commentCount: number;
  subCategoryName: string;
  title: string;
  username: string;
  createdDate: string;
  voteCount: number;
  thumbnailUrl?: string;
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
