import classNames from 'classnames';
import InfiniteScroll from 'components/InfiniteScroll';
import PostCard from 'components/PostCard';
import { usePostsContext } from 'context/PostsContext';
import useUser from 'hooks/useUser';
import { PersonSmall, Rising, Time } from 'icons';
import { useRouter } from 'next/router';
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
  const { state, dispatch } = usePostsContext();
  const { posts, sortBy, page } = state;
  const router = useRouter();
  const { isLoading, user } = useUser();

  return (
    <div className={classNames(styles.container, className)}>
      {!disableSort && (
        <div className={styles.sortContainer}>
          <button
            className={classNames(sortBy === 'like' && styles.selected)}
            onClick={() => {
              if (sortBy !== 'like') {
                dispatch({ type: 'CHANGE_SORT', sortBy: 'like' });
                dispatch({ type: 'RESET' });
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
                dispatch({ type: 'CHANGE_SORT', sortBy: 'new' });
                dispatch({ type: 'RESET' });
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
                  dispatch({ type: 'CHANGE_SORT', sortBy: 'following' });
                  dispatch({ type: 'RESET' });
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
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      {!isLoading && (
        <InfiniteScroll
          data={posts}
          size={SIZE}
          onIntersect={async () => {
            const getIndex = () => {
              switch (sortBy) {
                case 'new':
                case 'following':
                  return !posts || posts.length === 0
                    ? Number.MAX_SAFE_INTEGER
                    : posts[posts.length - 1].id;
                case 'like':
                  return !posts || posts.length === 0 ? 0 : page || 0;
              }
            };

            const index = getIndex();
            const { data } = await api.get<Post[]>(url, {
              params: {
                ...params,
                nickname: user?.nickname,
                index,
                size: SIZE,
                sort: disableSort ? null : sortBy,
              },
            });
            dispatch({
              type: 'ADD_POSTS',
              posts: data,
              url: router.asPath,
              page: (index || 0) + 1,
            });
            return data;
          }}
        />
      )}
    </div>
  );
}

export default PostList;
