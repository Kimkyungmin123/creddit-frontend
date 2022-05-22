import LikeButton from 'components/LikeButton';
import { Close } from 'icons';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { likePostDetail } from 'slices/postDetailSlice';
import { usePosts } from 'slices/postsSlice';
import { Post } from 'types';
import styles from './PostTop.module.scss';

export type PostTopProps = {
  post: Post;
};

function PostTop({ post }: PostTopProps) {
  const router = useRouter();
  const { likes, title, id, liked } = post;
  const { blockHydrate } = usePosts();
  const dispatch = useDispatch();

  return (
    <div className={styles.container} data-testid="post-top">
      <div className={styles.inside}>
        <LikeButton
          type="post"
          id={id}
          liked={liked}
          variant="large"
          onClick={() => dispatch(likePostDetail())}
        >
          {likes}
        </LikeButton>
        <span className={styles.title}>{title}</span>
        <button
          aria-label="게시물 닫기"
          onClick={() => {
            if (blockHydrate) router.back();
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
