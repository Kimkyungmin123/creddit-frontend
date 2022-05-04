import classNames from 'classnames';
import InfiniteScroll from 'components/InfiniteScroll';
import PostCard from 'components/PostCard';
import { usePostsContext } from 'context/PostsContext';
import { Rising, Time } from 'icons';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Post } from 'types';
import api from 'utils/api';
import styles from './PostList.module.scss';

export interface PostListProps {
  url: string;
  params?: any;
  diableSort?: boolean;
}

// TODO: userID가 존재하면 해당 유저의 글만 받아오기
function PostList({ url, params, diableSort }: PostListProps) {
  const [sortBy, setSortBy] = useState<'like' | 'new'>('new');
  const { state, dispatch } = usePostsContext();
  const { posts } = state;
  const router = useRouter();

  return (
    <div className={styles.container}>
      {!diableSort && (
        <div className={styles.sortContainer}>
          <button
            className={classNames(sortBy === 'like' && styles.selected)}
            onClick={() => setSortBy('like')}
            aria-label="인기순으로 정렬"
          >
            <Rising />
            <span>인기</span>
          </button>
          <button
            className={classNames(sortBy === 'new' && styles.selected)}
            onClick={() => setSortBy('new')}
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
        size={10}
        onIntersect={async () => {
          const id =
            !posts || posts.length === 0
              ? Number.MAX_SAFE_INTEGER
              : posts[posts.length - 1].id;
          const { data } = await api.get<Post[]>(url, {
            params: {
              ...params,
              lastPostId: id,
              size: 10,
              sort: diableSort ? null : 'new',
            },
          });
          dispatch({
            type: 'ADD_POSTS',
            posts: data,
            url: router.asPath,
          });
          return data;
        }}
      />
    </div>
  );
}

export default PostList;
