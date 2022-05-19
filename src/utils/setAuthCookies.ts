import { AUTH_EXP_DATE, DAY } from 'constants/date';
import { CookieSerializeOptions, serialize } from 'cookie';
import { ServerResponse } from 'http';
import { NextApiResponse } from 'next';

/**
 * 서버 사이드에서 토큰을 쿠키에 저장하기 위해 사용하는 함수
 */
function setAuthCookies(
  res: NextApiResponse | ServerResponse,
  accessToken: string,
  refreshToken: string
) {
  const options: CookieSerializeOptions = {
    path: '/',
    maxAge: (DAY * AUTH_EXP_DATE) / 1000,
  };

  res.setHeader('Set-Cookie', [
    serialize('access_token', accessToken, options),
    serialize('refresh_token', refreshToken, options),
    serialize(
      'auth_exp_date',
      (Date.now() + DAY * AUTH_EXP_DATE).toString(),
      options
    ),
  ]);
}

export default setAuthCookies;
