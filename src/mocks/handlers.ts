import postDummy from 'data/post.json';
import userDummy from 'data/user.json';
import { rest } from 'msw';
import { API_ENDPOINT } from 'utils/api';

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
    rest.get(`${API_ENDPOINT}/post/1`, getPost),
  ];
}

const getMe: Parameters<typeof rest.get>[1] = (_, res, ctx) => {
  return res(ctx.status(200), ctx.json(userDummy));
};

const getEmailDuplicate: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
  const { email } = req.params;
  if (email === 'duplicate@a.com') {
    return res(ctx.status(200), ctx.json({ data: true }));
  }
  return res(ctx.status(200), ctx.json({ data: false }));
};

const getNicknameDuplicate: Parameters<typeof rest.get>[1] = (
  req,
  res,
  ctx
) => {
  const { nickname } = req.params;
  if (nickname === 'duplicate') {
    return res(ctx.status(200), ctx.json({ data: true }));
  }
  return res(ctx.status(200), ctx.json({ data: false }));
};

const getPosts: Parameters<typeof rest.get>[1] = (_, res, ctx) => {
  return res(ctx.status(200), ctx.json([postDummy]));
};

const getPost: Parameters<typeof rest.get>[1] = (_, res, ctx) => {
  return res(ctx.status(200), ctx.json(postDummy));
};
