import classNames from 'classnames';
import InfiniteScroll from 'components/InfiniteScroll';
import PostCard from 'components/PostCard';
import { usePostsContext } from 'context/PostsContext';
import { Rising, Time } from 'icons';
import { useState } from 'react';
import { Post } from 'types';
import api from 'utils/api';
import styles from './PostList.module.scss';

// TODO: userID가 존재하면 해당 유저의 글만 받아오기
function PostList() {
  const [sortBy, setSortBy] = useState<'like' | 'recent'>('like');
  const { posts, dispatch } = usePostsContext();

  return (
    <div className={styles.container}>
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
          className={classNames(sortBy === 'recent' && styles.selected)}
          onClick={() => setSortBy('recent')}
          aria-label="최신순으로 정렬"
        >
          <Time />
          <span>최신</span>
        </button>
      </div>
      <div className={styles.postsContainer}>
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <InfiniteScroll
        data={posts}
        size={10}
        onIntersect={async () => {
          const id = !posts
            ? Number.MAX_SAFE_INTEGER
            : posts[posts.length - 1].id;

          const { data } = await api.get<Post[]>(
            `/post?lastPostId=${id}&size=10&sort=new`
          );
          dispatch({ type: 'ADD_POSTS', posts: data });
          return data;
        }}
      />
    </div>
  );
}

export default PostList;
