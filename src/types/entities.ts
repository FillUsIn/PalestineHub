type Post = {
  body: string;
  categoryName: string;
  comments: Comment[];
  createdAt: string;
  id: string;
  subcategoryName: string;
  thumbnailUrl: string | null;
  title: string;
  url: string;
  userDislikes: User[];
  userLikes: User[];
  username: string;
  voteCount: number;
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
