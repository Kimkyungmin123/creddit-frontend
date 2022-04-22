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
  ];
}

const getMe: Parameters<typeof rest.get>[1] = (_, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      nickname: '닉네임',
      introduction: '소개',
      image: {
        imgName: null,
        imgUrl: null,
      },
      createdDate: '2022-04-22T14:01:34.930Z',
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
