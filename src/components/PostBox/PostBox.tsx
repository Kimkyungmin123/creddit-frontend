import { HeartOutline } from 'icons';
import styles from './PostBox.module.scss';

export type PostBoxProps = {
  postTitle: string;
  postContent: string;
  nickName: string;
  commentsCount: number;
  likeCount: number;
  date: string;
};

const PostBox = ({
  postTitle,
  postContent,
  nickName,
  commentsCount,
  likeCount,
  date,
}: PostBoxProps) => {
  return (
    <div className={styles.postBox}>
      <section>
        <h1>{postTitle}</h1>
        <article>
          {postContent.length > 60
            ? `${postContent.slice(0, 60)}...`
            : postContent}
        </article>

        <div className={styles.postDetails}>
          <div className={styles.postDetailsLeft}>
            <div className={styles.userID}>
              <span>by </span>
              {nickName}
            </div>
            <div className={styles.comments}>댓글 {commentsCount}개</div>
            <div className={styles.likeCount}>
              <HeartOutline className={styles.heartIcon} />
              {likeCount}
            </div>
          </div>
          <div className={styles.postDetailsRight}>
            <div className={styles.postDate}>{date}</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PostBox;
