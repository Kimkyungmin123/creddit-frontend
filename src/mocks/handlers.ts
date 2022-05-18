import commentsDummy from 'data/comments.json';
import postDummy from 'data/post.json';
import userDummy from 'data/user.json';
import { rest } from 'msw';
import { Follower } from 'types';

const API_ENDPOINT = 'http://localhost:8080';

export function handlers() {
  return [
    rest.get(`${API_ENDPOINT}/profile/show`, getMe),
    rest.get(
      `${API_ENDPOINT}/member/checkDuplicateByEmail/:email`,
      getEmailDuplicate
    ),
    rest.get(
      `${API_ENDPOINT}/member/checkDuplicateByNickname/:nickname`,
      getNicknameDuplicate
    ),
    rest.get(`${API_ENDPOINT}/post`, getPosts),
    rest.get(`${API_ENDPOINT}/post/search`, getPosts),
    rest.get(`${API_ENDPOINT}/post/1`, getPost),
    rest.post(`${API_ENDPOINT}/member/sendEmail/password`, postAny),
    rest.post(`${API_ENDPOINT}/member/changePassword`, postAny),
    rest.get(`${API_ENDPOINT}/comment/detail`, getComments),
    rest.get(`${API_ENDPOINT}/member/follow/list`, getFollowingList),
  ];
}

const getMe: Parameters<typeof rest.get>[1] = (_, res, ctx) => {
  return res(ctx.status(200), ctx.json(userDummy));
};

const getEmailDuplicate: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
  const { email } = req.params;
  if (email === 'duplicate@a.com') {
    return res(ctx.status(200), ctx.json(true));
  }
  return res(ctx.status(200), ctx.json(false));
};

const getNicknameDuplicate: Parameters<typeof rest.get>[1] = (
  req,
  res,
  ctx
) => {
  const { nickname } = req.params;
  if (nickname === 'duplicate') {
    return res(ctx.status(200), ctx.json(true));
  }
  return res(ctx.status(200), ctx.json(false));
};

const getPosts: Parameters<typeof rest.get>[1] = (_, res, ctx) => {
  return res(ctx.status(200), ctx.json([postDummy]));
};

const getPost: Parameters<typeof rest.get>[1] = (_, res, ctx) => {
  return res(ctx.status(200), ctx.json(postDummy));
};

const postAny: Parameters<typeof rest.get>[1] = (_, res, ctx) => {
  return res(ctx.status(200), ctx.json(true));
};

const getComments: Parameters<typeof rest.get>[1] = (_, res, ctx) => {
  return res(ctx.status(200), ctx.json([commentsDummy[0]]));
};

const getFollowingList: Parameters<typeof rest.get>[1] = (_, res, ctx) => {
  const user: Follower = {
    email: 'a@a.com ',
    imgName: null,
    imgUrl: 'https://a.com/b.jpg',
    nickname: 'abc',
  };
  return res(ctx.status(200), ctx.json([user]));
};
