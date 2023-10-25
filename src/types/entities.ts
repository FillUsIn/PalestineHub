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
};

type User = {
  username: string;
  createdAt: string;
  updatedAt: string;
};

export type { Post, User };
