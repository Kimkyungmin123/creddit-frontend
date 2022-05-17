import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { API_ENDPOINT } from './api';
import setAuthCookies from './setAuthCookies';

const axiosInstance = axios.create({ baseURL: API_ENDPOINT });

async function getCurrentUser(context: GetServerSidePropsContext) {
  const { access_token, refresh_token } = context.req.cookies;
  if (!access_token) return null;

  try {
    const { data: user } = await axiosInstance.get('/profile/show', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return user;
  } catch (err) {
    try {
      const { data: tokens } = await axiosInstance.post(
        '/auth/reissueAccessRefreshToken',
        {
          accessToken: access_token,
          refreshToken: refresh_token,
        }
      );

      const { accessToken, refreshToken } = tokens;
      setAuthCookies(context.res, accessToken, refreshToken);
      const { data: user } = await axiosInstance.get('/profile/show', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return user;
    } catch (err) {
      console.error(err);
    }
  }

  return null;
}

export default getCurrentUser;
