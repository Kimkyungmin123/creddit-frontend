import { rest } from 'msw';

const API_ENDPOINT = 'http://localhost:8080';

export function handlers() {
  return [
    rest.get('/api/me', getMe),
    rest.get(
      `${API_ENDPOINT}/member/checkDuplicateByEmail/:email`,
      getEmailDuplicate
    ),
    rest.get(
      `${API_ENDPOINT}/member/checkDuplicateByNickname/:nickname`,
      getNicknameDuplicate
    ),
  ];
}

const getMe: Parameters<typeof rest.get>[1] = (_, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      id: 'id',
      createdDate: '2020-12-29 13:10:40',
      nickname: '이름',
      introduce: '소개 글',
    })
  );
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
