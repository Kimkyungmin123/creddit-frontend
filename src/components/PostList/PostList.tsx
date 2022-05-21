import classNames from 'classnames';
import InfiniteScroll from 'components/InfiniteScroll';
import PostCard from 'components/PostCard';
import { PersonSmall, Rising, Time } from 'icons';
import Link from 'next/link';
import { useEffect, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addPosts, changePostsHydrate, usePosts } from 'slices/postsSlice';
import { useUser } from 'slices/userSlice';
import { Post } from 'types';
import api from 'utils/api';
import getInfiniteScrollIndex from 'utils/getInfiniteScrollIndex';
import getURLSearchParams from 'utils/getURLSearchParams';
import styles from './PostList.module.scss';

const SIZE = 10;

export interface PostListProps {
  clientUrl: string;
  serverUrl: string;
  clientParams?: any;
  serverParams?: any;
  disableSort?: boolean;
  className?: string;
  hideFollowing?: boolean;
}

function PostList({
  clientUrl,
  serverUrl,
  clientParams,
  serverParams,
  disableSort,
  className,
  hideFollowing,
}: PostListProps) {
  const user = useUser();
  const posts = usePosts();
  const { data: postsData, sortBy, scrollY, blockHydrate, finished } = posts;
  const dispatch = useDispatch();
  const urlQuery = clientParams ? `?${getURLSearchParams(clientParams)}` : '';

  useEffect(() => {
    dispatch(changePostsHydrate({ block: false }));
  }, [dispatch]);

  useLayoutEffect(() => {
    if (blockHydrate) window.scrollTo(0, scrollY || 0);
  }, [blockHydrate, scrollY]);

  return (
    <div className={classNames(styles.container, className)}>
      {!disableSort && (
        <div className={styles.sortContainer}>
          <Link href={`${clientUrl}${urlQuery}`}>
            <a
              className={classNames(sortBy === 'like' && styles.selected)}
              aria-label="인기순으로 정렬"
            >
              <Rising />
              <span>인기</span>
            </a>
          </Link>
          <Link
            href={`${clientUrl === '/' ? '' : clientUrl}/recent${urlQuery}`}
          >
            <a
              className={classNames(sortBy === 'new' && styles.selected)}
              aria-label="최신순으로 정렬"
            >
              <Time />
              <span>최신</span>
            </a>
          </Link>
          {!hideFollowing && (
            <Link
              href={`${
                clientUrl === '/' ? '' : clientUrl
              }/following${urlQuery}`}
            >
              <a
                className={classNames(
                  sortBy === 'following' && styles.selected
                )}
                aria-label="팔로우 중인 사용자 글 모아보기"
              >
                <PersonSmall />
                <span>팔로잉</span>
              </a>
            </Link>
          )}
        </div>
      )}
      <div className={styles.postsContainer}>
        {postsData?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <InfiniteScroll
        data={postsData}
        size={SIZE}
        onIntersect={async () => {
          if (finished) return [];

          const index = getInfiniteScrollIndex(posts);
          const { data } = await api.get<Post[]>(serverUrl, {
            params: {
              ...serverParams,
              nickname: user?.nickname,
              index,
              size: SIZE,
              sort: disableSort ? null : sortBy,
            },
          });
          dispatch(addPosts({ data }));
          return data;
        }}
      />
    </div>
  );
}

export default PostList;
