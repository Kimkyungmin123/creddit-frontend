import { AUTH_EXP_DATE, DAY } from 'constants/date';
import Cookies from 'js-cookie';
import api from 'utils/api';
import setAuthToken from 'utils/setAuthToken';

// 현재 서버 에러 코드가 모두 500이어서 에러 코드에 따라 구분하진 못했음.
async function reIssueAuthToken() {
  const expDate = Number(Cookies.get('auth_exp_date'));
  if (!expDate) return;

  const accessToken = Cookies.get('access_token');
  const refreshToken = Cookies.get('refresh_token');

  // 1. Refresh Token 만료일이 절반만 남은 경우 Refresh Token과 Access Token 재발급
  if (expDate - Date.now() < (DAY * AUTH_EXP_DATE) / 2) {
    const { data } = await api.post('/auth/reissueAccessRefreshToken', {
      accessToken,
      refreshToken,
    });
    setAuthToken(data);
    return;
  }

  // 2. 그렇지 않으면 Access Token만 재발급
  const { data } = await api.post('/auth/reissueAccessToken', {
    accessToken,
    refreshToken,
  });
  setAuthToken({ ...data, options: { expires: new Date(expDate) } });
}

export default reIssueAuthToken;
