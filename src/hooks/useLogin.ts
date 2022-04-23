import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useSWRConfig } from 'swr';
import api from 'utils/api';

function useLogin() {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const login = useCallback(
    async (values: { email: string; password: string }) => {
      const { data } = await api.post('/auth/login', values);
      Cookies.set('access_token', data.accessToken, { expires: 1 });
      Cookies.set('refresh_token', data.refreshToken, { expires: 7 });
      await mutate('/profile/show');
      router.replace('/');
    },
    [mutate, router]
  );

  return login;
}

export default useLogin;
