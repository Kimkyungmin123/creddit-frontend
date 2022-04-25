import { AUTH_EXP_DATE, DAY } from 'constants/date';
import Cookies from 'js-cookie';

type Params = {
  accessToken: string;
  refreshToken?: string;
  options?: Cookies.CookieAttributes;
};

function setAuthToken({
  accessToken,
  refreshToken,
  options = { expires: AUTH_EXP_DATE },
}: Params) {
  Cookies.set('access_token', accessToken, options);
  if (refreshToken) {
    Cookies.set('refresh_token', refreshToken, options);
    Cookies.set(
      'auth_exp_date',
      (Date.now() + DAY * AUTH_EXP_DATE).toString(),
      options
    );
  }
}

export default setAuthToken;
