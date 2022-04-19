import axios from 'axios';
import Cookies from 'js-cookie';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import useSWR, { useSWRConfig } from 'swr';

type UserType = {
  id: string;
  createdDate: string;
  nickname: string;
  introduce: string;
} | null;

const fetcher = (url: string) => {
  const accessToken = Cookies.get('access_token');
  return axios
    .get(url, {
      headers: accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : {},
    })
    .then((res) => res.data);
};

// const fetcher = (url: string) => api.get(url).then((res) => res.data);

function useUser(options?: { redirectTo: string }) {
  // TODO: 백엔드에서 현재 로그인한 유저 정보를 조회할 수 있는 API가 만들어지면 리팩토링
  const { data, error } = useSWR<{ user: UserType }>('/api/me', fetcher);
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { data: sessionData } = useSession();

  useEffect(() => {
    if (data?.user && options?.redirectTo) {
      router.replace(options.redirectTo);
    }
  }, [options, router, data]);

  const logout = useCallback(async () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    if (sessionData) await signOut();
    mutate('/api/me');
  }, [sessionData, mutate]);

  return {
    user: data?.user,
    isLoading: !error && !data,
    error,
    logout,
  };
}

export default useUser;
