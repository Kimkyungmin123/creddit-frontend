import { useCallback } from 'react';
import { useUser } from 'slices/userSlice';
import useSWRImmutable from 'swr/immutable';
import { Follower } from 'types';
import { fetcher } from 'utils/api';

function useFollowingList() {
  const user = useUser();

  const { data, error, ...rest } = useSWRImmutable<Follower[]>(
    user ? '/member/follow/list' : null,
    fetcher
  );

  const isFollowing = useCallback(
    (nickname: string) => {
      return data?.find((user) => user.nickname === nickname) ? true : false;
    },
    [data]
  );

  return {
    data,
    error,
    isLoading: !error && !data,
    isFollowing,
    ...rest,
  };
}

export default useFollowingList;
