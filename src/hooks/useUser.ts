import Cookies from 'js-cookie';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo } from 'react';
import { useSWRConfig } from 'swr';
import useSWRImmutable from 'swr/immutable';
import { User } from 'types';
import api from 'utils/api';

type UserResponse = { user?: User; message?: string };

const fetcher = async (url: string): Promise<UserResponse> => {
  const accessToken = Cookies.get('access_token');
  if (!accessToken) return { message: 'access token이 존재하지 않습니다' };
  const response = await api.get(url);
  return { user: response.data };
};

type Options = {
  redirectTo?: string;
  redirectWhen?: 'authorized' | 'unauthorized';
};

function useUser({ redirectTo, redirectWhen = 'authorized' }: Options = {}) {
  const { data, error } = useSWRImmutable<UserResponse>(
    '/profile/show',
    fetcher
  );
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { data: sessionData } = useSession();
  const isLoading = useMemo(() => !error && !data, [error, data]);

  useEffect(() => {
    if (!redirectTo || isLoading || error) return;

    if (
      (redirectWhen === 'authorized' && data?.user) ||
      (redirectWhen === 'unauthorized' && !data?.user)
    ) {
      router.replace(redirectTo);
    }
  }, [redirectTo, redirectWhen, isLoading, router, data, error]);

  const logout = useCallback(async () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    Cookies.remove('auth_exp_date');
    if (sessionData) await signOut();
    mutate('/profile/show');
  }, [sessionData, mutate]);

  return {
    user: data?.user,
    isLoading,
    error,
    logout,
  };
}

export default useUser;
