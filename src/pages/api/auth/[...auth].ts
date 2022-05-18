import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { KaKaoTokens, KaKaoUser, NaverTokens, NaverUser } from 'types';
import api from 'utils/api';
import getURLSearchParams from 'utils/getURLSearchParams';
import setAuthCookies from 'utils/setAuthCookies';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type, email, nickname } = await getUser(req);
  const { data } = await api.post('/auth/login/social', {
    type,
    email,
    nickname,
  });

  const { accessToken, refreshToken } = data;
  setAuthCookies(res, accessToken, refreshToken);

  res.redirect(307, '/');
}

export const getRedirectUrl = (type: 'kakao' | 'naver') =>
  `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/auth/callback/${type}`;

const getType = (url?: string): 'kakao' | 'naver' =>
  url?.includes('/api/auth/callback/naver') ? 'naver' : 'kakao';

async function getUser(req: NextApiRequest) {
  const { code } = req.query;
  const type = getType(req?.url);

  switch (type) {
    case 'kakao': {
      const { data: tokens } = await axios.post<KaKaoTokens>(
        'https://kauth.kakao.com/oauth/token',
        getURLSearchParams({
          grant_type: 'authorization_code',
          client_id: process.env.NEXT_PUBLIC_KAKAO_ID,
          redirect_uri: getRedirectUrl('kakao'),
          code,
          client_secret: process.env.KAKAO_SECRET,
        })
      );

      const { access_token } = tokens;
      const { data: userInfo } = await axios.get<KaKaoUser>(
        'https://kapi.kakao.com/v2/user/me',
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      return {
        type,
        email: userInfo.kakao_account.email,
        nickname: userInfo.properties.nickname,
      };
    }
    case 'naver': {
      const { data: tokens } = await axios.post<NaverTokens>(
        `https://nid.naver.com/oauth2.0/token?client_id=${process.env.NEXT_PUBLIC_NAVER_ID}&client_secret=${process.env.NAVER_SECRET}&grant_type=authorization_code&code=${code}`
      );

      const { access_token } = tokens;
      const { data: userInfo } = await axios.get<NaverUser>(
        'https://openapi.naver.com/v1/nid/me',
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      return {
        type,
        email: userInfo.response.email,
        nickname: userInfo.response.name,
      };
    }
    default:
      return { type, email: '', nickname: '' };
  }
}
