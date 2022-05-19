import classNames from 'classnames';
import { usePostsContext } from 'context/PostsContext';
import { HeartFill, HeartOutline } from 'icons';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { useUser } from 'slices/userSlice';
import api from 'utils/api';
import getFormData from 'utils/getFormData';
import styles from './LikeButton.module.scss';

interface LikeButtonProps {
  children: ReactNode;
  type: 'post' | 'comment';
  id: number;
  liked: boolean;
  variant: 'large' | 'medium' | 'small';
  onClick?: () => void;
}

function LikeButton({
  children,
  type,
  id,
  liked,
  variant,
  onClick,
}: LikeButtonProps) {
  const { dispatch } = usePostsContext();
  const user = useUser();
  const router = useRouter();

  return (
    <button
      data-testid="like-button"
      className={classNames(
        styles.likeButton,
        liked && styles.liked,
        styles[variant]
      )}
      aria-label={liked ? '좋아요 취소' : '좋아요'}
      onClick={async () => {
        if (!user) {
          router.push('/login');
          return;
        }

        await api.post(`/like/${id}`, getFormData({ type }));
        if (type === 'post') dispatch({ type: 'LIKE_POST', postId: id });
        if (onClick) onClick();
      }}
    >
      {<>{liked ? <HeartFill /> : <HeartOutline />}</>}
      {children}
    </button>
  );
}

export default LikeButton;
