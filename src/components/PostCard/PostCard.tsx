import MyDate from 'components/MyDate';
import { usePostCardContext } from 'context/PostCardContext';
import { HeartFill, HeartOutline } from 'icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Post } from 'types';
import styles from './PostCard.module.scss';

const CONTENT_MAX_LENGTH = 150;

export const cutContents = (content: string) =>
  `${content.slice(0, CONTENT_MAX_LENGTH)}...`;

export type PostCardProps = {
  post: Post;
};

const PostCard = ({ post }: PostCardProps) => {
  const { id, title, content, member, createdDate, likes, comments } = post;
  const [clickedLike, setClickedLike] = useState(false);
  const router = useRouter();
  const { setClickedPostCard } = usePostCardContext();

  return (
    <section
      className={styles.postCard}
      onClick={() => {
        setClickedPostCard(true);
        router.push({ pathname: `/post/${id}` });
      }}
      data-testid="post-card"
    >
      <Link href={`/post/${id}`}>
        <a>
          <h2>{title}</h2>
        </a>
      </Link>
      <p data-testid="content">
        {content.length > CONTENT_MAX_LENGTH ? cutContents(content) : content}
      </p>
      <div className={styles.postDetail}>
        <div className={styles.postDetailLeft}>
          <div className={styles.creator} data-testid="creator">
            <span>by </span>
            {member.nickname}
          </div>
          <div className={styles.comments}>댓글 {comments.length}개</div>
          <button
            className={styles.likeCountBtn}
            onClick={(event) => {
              event.stopPropagation();
              setClickedLike((prev) => !prev);
            }}
            aria-label={clickedLike ? '좋아요 취소' : '좋아요'}
          >
            {
              <>
                {clickedLike ? (
                  <HeartFill className={styles.heartFillIcon} />
                ) : (
                  <HeartOutline />
                )}
              </>
            }
            {!clickedLike ? likes : likes + 1}
          </button>
        </div>
        <MyDate date={createdDate} />
      </div>
    </section>
  );
};

export default PostCard;
