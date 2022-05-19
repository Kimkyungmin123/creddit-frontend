import classNames from 'classnames';
import InfiniteScroll from 'components/InfiniteScroll';
import PostCard from 'components/PostCard';
import { PersonSmall, Rising, Time } from 'icons';
import { useEffect, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  addPosts,
  changePostsHydrate,
  changePostsSort,
  resetPosts,
  usePosts,
} from 'slices/postsSlice';
import { useUser } from 'slices/userSlice';
import { Post } from 'types';
import api from 'utils/api';
import styles from './PostList.module.scss';

const SIZE = 10;

export interface PostListProps {
  url: string;
  params?: any;
  disableSort?: boolean;
  className?: string;
  hideFollowing?: boolean;
}

function PostList({
  url,
  params,
  disableSort,
  className,
  hideFollowing,
}: PostListProps) {
  const user = useUser();
  const { data: postsData, sortBy, page, scrollY, blockHydrate } = usePosts();
  const dispatch = useDispatch();

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
          <button
            className={classNames(sortBy === 'like' && styles.selected)}
            onClick={() => {
              if (sortBy !== 'like') {
                dispatch(changePostsSort('like'));
                dispatch(resetPosts());
              }
            }}
            aria-label="인기순으로 정렬"
          >
            <Rising />
            <span>인기</span>
          </button>
          <button
            className={classNames(sortBy === 'new' && styles.selected)}
            onClick={() => {
              if (sortBy !== 'new') {
                dispatch(changePostsSort('new'));
                dispatch(resetPosts());
              }
            }}
            aria-label="최신순으로 정렬"
          >
            <Time />
            <span>최신</span>
          </button>
          {!hideFollowing && (
            <button
              className={classNames(sortBy === 'following' && styles.selected)}
              onClick={() => {
                if (sortBy !== 'following') {
                  dispatch(changePostsSort('following'));
                  dispatch(resetPosts());
                }
              }}
              aria-label="팔로우 중인 사용자 글 모아보기"
            >
              <PersonSmall />
              <span>팔로잉</span>
            </button>
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
          const getIndex = () => {
            switch (sortBy) {
              case 'new':
              case 'following':
                return !postsData || postsData.length === 0
                  ? Number.MAX_SAFE_INTEGER
                  : postsData[postsData.length - 1].id;
              case 'like':
                return !postsData || postsData.length === 0 ? 0 : page || 0;
            }
          };

          const index = getIndex();
          if (index === -1) return [];
          const { data } = await api.get<Post[]>(url, {
            params: {
              ...params,
              nickname: user?.nickname,
              index,
              size: SIZE,
              sort: disableSort ? null : sortBy,
            },
          });

          dispatch(addPosts({ data, page: data.length > 0 ? index + 1 : -1 }));
          return data;
        }}
      />
    </div>
  );
}

export default PostList;
