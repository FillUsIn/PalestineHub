import { Post } from './entities';

type PostSummaryDTO = {
  body?: string;
  categoryName: string;
  commentCount: number;
  createdDate: string;
  id: string;
  subCategoryName: string;
  thumbnailUrl?: string;
  title: string;
  username: string;
  voteCount: number;
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
