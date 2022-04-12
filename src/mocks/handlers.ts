import { rest } from 'msw';

export function handlers() {
  return [rest.get('/api/me', getMe)];
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
