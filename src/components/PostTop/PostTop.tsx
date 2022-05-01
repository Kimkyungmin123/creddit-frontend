import { usePostCardContext } from 'context/PostCardContext';
import { Close, HeartOutline } from 'icons';
import { useRouter } from 'next/router';
import { Post } from 'types';
import styles from './PostTop.module.scss';

export type PostTopProps = {
  post: Post;
};

function PostTop({ post }: PostTopProps) {
  const router = useRouter();
  const { likes, title } = post;
  const { clickedPostCard } = usePostCardContext();

  return (
    <div className={styles.container} data-testid="post-top">
      <div className={styles.inside}>
        <button
          className={styles.likeButton}
          // TODO: 좋아요 누른 상태면 "좋아요 취소"로 변경
          aria-label="좋아요"
        >
          <HeartOutline />
          {likes}
        </button>
        <span className={styles.title}>{title}</span>

        <button
          aria-label="게시물 닫기"
          onClick={() => {
            if (clickedPostCard) router.back();
            else router.push('/');
          }}
          className={styles.closeButton}
        >
          <Close />
        </button>
      </div>
    </div>
  );
}

export default PostTop;
