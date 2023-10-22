type PostSummaryDTO = {
  id: string;
  title: string;
  authorUsername: string;
  createdDate: string;
  voteCount: number;
  commentCount: number;
  body?: string;
  imageUrl?: string;
};

export type { PostSummaryDTO };
