export type MyImage = {
  imgName: string | null;
  imgUrl: string | null;
};

export type User = {
  createdDate: string;
  image: MyImage;
  introduction: string;
  nickname: string;
};

export type Member = {
  email: string;
  /** @mockType {name.findName} */
  nickname: string;
};

export type Comment = {
  commentId: number;
  content: string;
  createdDate: string;
  liked: boolean;
  likes: number;
  member: Member;
  modifiedDate: string;
  parentCommentId: number;
  postId: number;
};

export type Post = {
  comments: Comment[];
  content: string;
  createdDate: string;
  id: number;
  image: MyImage;
  liked: boolean;
  likes: number;
  member: Member;
  modifiedDate: string;
  title: string;
};
