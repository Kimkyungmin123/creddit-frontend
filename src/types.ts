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
  profile: MyImage;
  detailCommentCount?: number;
  parentCommentId?: number;
  postId?: number;
};

export type Post = {
  comments: number;
  content: string;
  createdDate: string;
  id: number;
  image: MyImage;
  liked: boolean;
  likes: number;
  member: Member;
  modifiedDate: string;
  profile: MyImage;
  title: string;
};

export type Message = {
  sender: string;
  receiver: string;
  chatRoomId: string;
  message: string;
  createdDate: string;
};

export type Follower = {
  email: string;
  imgName: string | null;
  imgUrl: string | null;
  nickname: string;
};

export interface KaKaoTokens {
  access_token: string;
  token_type: 'bearer';
  refresh_token: string;
  expires_in: number;
  scope: string;
  refresh_token_expires_in: number;
}

export interface KaKaoUser {
  id: number;
  connected_at: string;
  properties: { nickname: string };
  kakao_account: {
    profile_nickname_needs_agreement: boolean;
    profile: { nickname: string };
    has_email: boolean;
    email_needs_agreement: boolean;
    is_email_valid: boolean;
    is_email_verified: boolean;
    email: string;
  };
}

export interface NaverTokens {
  access_token: string;
  refresh_token: string;
  token_type: 'bearer';
  expires_in: string;
}

export interface NaverUser {
  resultcode: string;
  message: string;
  response: {
    id: string;
    gender: string;
    email: string;
    mobile: string;
    mobile_e164: string;
    name: string;
  };
}
