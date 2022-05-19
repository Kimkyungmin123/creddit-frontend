import LikeButton from 'components/LikeButton';
import { usePostCardContext } from 'context/PostCardContext';
import { Close } from 'icons';
import { useRouter } from 'next/router';
import { useUser } from 'slices/userSlice';
import { mutate } from 'swr';
import { Post } from 'types';
import styles from './PostTop.module.scss';

export type PostTopProps = {
  post: Post;
};

function PostTop({ post }: PostTopProps) {
  const router = useRouter();
  const { likes, title, id, liked } = post;
  const { clickedPostCard } = usePostCardContext();
  const user = useUser();

  return (
    <div className={styles.container} data-testid="post-top">
      <div className={styles.inside}>
        <LikeButton
          type="post"
          id={id}
          liked={liked}
          variant="large"
          onClick={async () => {
            const userQuery = user ? `?nickname=${user.nickname}` : '';
            await mutate(
              `/post/${id}${userQuery}`,
              (post: Post) => ({
                ...post,
                liked: !post.liked,
                likes: post.liked ? post.likes - 1 : post.likes + 1,
              }),
              false
            );
          }}
        >
          {likes}
        </LikeButton>
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
