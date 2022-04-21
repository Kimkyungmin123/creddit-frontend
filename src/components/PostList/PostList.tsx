import classNames from 'classnames';
import PostBox from 'components/PostBox';
import postsDummy from 'data/posts.json';
import { Rising, Time } from 'icons';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './PostList.module.scss';

// TODO: userID가 존재하면 해당 유저의 글만 받아오기
function PostList() {
  const router = useRouter();
  const [sortBy, setSortBy] = useState<'like' | 'recent'>('like');

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
        {postsDummy.map((post) => (
          <PostBox
            key={post.id}
            postTitle={post.title}
            postContent={post.content}
            nickName={post.member}
            commentsCount={post.commentCount}
            likeCount={post.likeCount}
            date={post.createdDate}
            onClick={() => router.push({ pathname: `/posts/${post.id}` })}
            data-testid={post.id}
          />
        ))}
      </div>
    </div>
  );
}

export default PostList;
