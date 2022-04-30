import classNames from 'classnames';
import PostCard from 'components/PostCard';
import { Rising, Time } from 'icons';
import { useState } from 'react';
import useSWR from 'swr';
import { Post } from 'types';
import { fetcher } from 'utils/api';
import styles from './PostList.module.scss';

// TODO: userID가 존재하면 해당 유저의 글만 받아오기
function PostList() {
  const [sortBy, setSortBy] = useState<'like' | 'recent'>('like');
  // TODO: 무한 스크롤
  const { data } = useSWR<Post[]>(
    `/post?lastPostId=${Number.MAX_SAFE_INTEGER}&size=9999`,
    fetcher,
    { revalidateOnFocus: false }
  );

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
      {data && (
        <div className={styles.postsContainer}>
          {data.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PostList;
