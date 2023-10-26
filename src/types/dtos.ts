import { Post } from "./entities";

type PostSummaryDTO = {
  id: string;
  title: string;
  username: string;
  createdDate: string;
  voteCount: number;
  commentCount: number;
  body?: string;
  imageUrl?: string;
};

type CreatePostDTO = {
  title: string;
  username: string;
  body?: string;
  url?: string;
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

export type { CreatePostDTO, PostSummaryDTO, Topic, TopPost, LoginDTO, CreateUserDTO };
