import classNames from 'classnames';
import InfiniteScroll from 'components/InfiniteScroll';
import PostCard from 'components/PostCard';
import { usePostsContext } from 'context/PostsContext';
import { Rising, Time } from 'icons';
import { useRouter } from 'next/router';
import { Post } from 'types';
import api from 'utils/api';
import styles from './PostList.module.scss';

const SIZE = 10;

export interface PostListProps {
  url: string;
  params?: any;
  disableSort?: boolean;
}

// TODO: userID가 존재하면 해당 유저의 글만 받아오기
function PostList({ url, params, disableSort }: PostListProps) {
  const { state, dispatch } = usePostsContext();
  const { posts, sortBy, page } = state;
  const router = useRouter();

  return (
    <div className={styles.container}>
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
        </div>
      )}
      <div className={styles.postsContainer}>
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <InfiniteScroll
        data={posts}
        size={SIZE}
        onIntersect={async () => {
          const getIndex = () => {
            switch (sortBy) {
              case 'new':
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
              index,
              size: SIZE,
              sort: disableSort ? null : sortBy,
            },
          });
          dispatch({
            type: 'ADD_POSTS',
            posts: data,
            url: router.asPath,
            page: index + 1,
          });
          return data;
        }}
      />
    </div>
  );
}

export default PostList;
