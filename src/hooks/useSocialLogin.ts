import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useSWRConfig } from 'swr';
import setAuthToken from 'utils/setAuthToken';

/**
 * 소셜 로그인한 유저가 존재하면 서버에서 Access Token과 Refresh Token을 받아온다.
 */
function useSocialLogin() {
  const { data } = useSession();
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (data) {
      // FIXME: 서버 소셜 로그인 API가 만들어지면 수정
      setAuthToken({ accessToken: 'FIXME', refreshToken: 'FIXME' });
      mutate('/profile/show');
    }
  }, [data, mutate]);
}

export default useSocialLogin;
