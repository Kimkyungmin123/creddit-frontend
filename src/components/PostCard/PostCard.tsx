import LikeButton from 'components/LikeButton';
import MyDate from 'components/MyDate';
import { usePostCardContext } from 'context/PostCardContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Post } from 'types';
import styles from './PostCard.module.scss';

const CONTENT_MAX_LENGTH = 150;

export const cutContents = (content: string) =>
  `${content.slice(0, CONTENT_MAX_LENGTH)}...`;

export type PostCardProps = {
  post: Post;
};

const PostCard = ({ post }: PostCardProps) => {
  const { id, title, content, member, createdDate, likes, comments, liked } =
    post;
  const router = useRouter();
  const { setClickedPostCard } = usePostCardContext();

  return (
    <section
      className={styles.postCard}
      onClick={(event) => {
        if ((event.target as HTMLElement).closest('button')) {
          return;
        }
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
          <div className={styles.comments}>댓글 {comments}개</div>
          <LikeButton type="post" id={id} liked={liked} variant="small">
            {likes}
          </LikeButton>
        </div>
        <MyDate date={createdDate} />
      </div>
    </section>
  );
};

export default PostCard;
