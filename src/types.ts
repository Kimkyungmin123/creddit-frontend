export type Comment = {
  member: string;
  content: string;
  likeCount: number;
  createdDate: string;
};

export type Post = {
  id: number;
  title: string;
  content: string;
  member: string;
  createdDate: string;
  likeCount: number;
  score: number;
  commentCount: number;
  comments: Comment[];
};
