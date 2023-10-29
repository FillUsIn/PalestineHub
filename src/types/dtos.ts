import { Post } from './entities';

type PostSummaryDTO = {
  id: string;
  body?: string;
  categoryName: string;
  commentCount: number;
  subcategoryName: string;
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
  email: string;
  username: string;
  password: string;
};

type LoginDTO = {
  email: string;
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

type Category = {
  name: string;
  subcategories: Subcategory[];
};

type Subcategory = {
  name: string;
  posts: PostSummaryDTO[];
};

export type {
  CreatePostDTO,
  CreateCommentDTO,
  PostSummaryDTO,
  Topic,
  TopPost,
  LoginDTO,
  CreateUserDTO,
  Category,
  Subcategory,
};
