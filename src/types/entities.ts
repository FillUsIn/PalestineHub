type Post = {
  id: string;
  title: string;
  body: string;
  voteCount: number;
  createdAt: string;
  subcategoryName: string;
  thumbnailUrl: string | null;
  userLikes: User[];
  userDislikes: User[];
  comments: Comment[];
};

type TopPosts = {
  subcategoryName: string;
  post: Post;
}[];

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

export type { Post, TopPosts, User, Category, Subcategory, Comment };
