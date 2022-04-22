import { Close, HeartFill } from 'icons';
import { useRouter } from 'next/router';
import { Post } from 'types';
import styles from './PostTop.module.scss';

export type PostTopProps = {
  post: Post;
};

function PostTop({ post }: PostTopProps) {
  const router = useRouter();
  const { likeCount, title } = post;

  return (
    <div className={styles.container} data-testid="post-top">
      <div className={styles.inside}>
        <button
          className={styles.likeButton}
          // TODO: 좋아요 누른 상태면 "좋아요 취소"로 변경
          aria-label="좋아요"
        >
          <HeartFill />
          {likeCount}
        </button>
        <span className={styles.title}>{title}</span>
        <button aria-label="게시물 닫기" onClick={() => router.back()}>
          <Close />
        </button>
      </div>
    </div>
  );
}

export default PostTop;
