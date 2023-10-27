type Post = {
  id: string;
  title: string;
  body: string;
  voteCount: number;
  createdAt: string;
  username: string;
  url: string;
  thumbnailUrl: string | null;
  userLikes: User[];
  userDislikes: User[];
  comments: Comment[];
};

type Comment = {
  id: string;
  body: string;
  voteCount: number;
  createdAt: string;
  username: string;
  replyComments: Comment[];
  userLikes: User[];
  userDislikes: User[];
};

type User = {
  username: string;
  createdAt: string;
  updatedAt: string;
};

type Category = {
  name: string;
  subcategories: Subcategory[];
};

type Subcategory = {
  name: string;
  posts: Post[];
};

export type { Post, User, Category, Subcategory, Comment };
