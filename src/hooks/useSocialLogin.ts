import Cookies from 'js-cookie';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useSWRConfig } from 'swr';

/**
 * 소셜 로그인한 유저가 존재하면 서버에서
 * Access Token과 Refresh Token을 받아온다.
 */
function useSocialLogin() {
  const { data } = useSession();
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (data) {
      // FIXME: 서버 소셜 로그인 API가 만들어지면 수정
      Cookies.set('access_token', 'FIXME', { expires: 1 });
      Cookies.set('refresh_token', 'FIXME', { expires: 7 });
      mutate('/api/me');
    }
  }, [data, mutate]);
}

export default useSocialLogin;
