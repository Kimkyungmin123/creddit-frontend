import { usePostsContext } from 'context/PostsContext';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { mutate } from 'swr';
import api from 'utils/api';
import setAuthToken from 'utils/setAuthToken';

function useLogin() {
  const router = useRouter();
  const { dispatch } = usePostsContext();

  const login = useCallback(
    async (values: { email: string; password: string }) => {
      const { data } = await api.post('/auth/login', values);
      setAuthToken(data);
      dispatch({ type: 'RESET' });
      await mutate('/profile/show');
      router.replace('/');
    },
    [dispatch, router]
  );

  return login;
}

export default useLogin;
