import { useRouter } from 'next/router';
import { useCallback } from 'react';
import api from 'utils/api';
import setAuthToken from 'utils/setAuthToken';

function useLogin() {
  const router = useRouter();

  const login = useCallback(
    async (values: { email: string; password: string }) => {
      const { data } = await api.post('/auth/login', values);
      setAuthToken(data);
      const prevUrl = sessionStorage.getItem('prevUrl');
      router.replace(prevUrl || '/');
    },
    [router]
  );

  return login;
}

export default useLogin;
