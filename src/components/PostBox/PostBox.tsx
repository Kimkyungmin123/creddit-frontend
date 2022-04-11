import { HeartFill, HeartOutline } from 'icons';
import { useState } from 'react';
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
  const [clickLike, setClickLike] = useState(false);
  const handleLikebtn = () => {
    setClickLike(() => !clickLike);
  };

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
            <button className={styles.likeCountBtn} onClick={handleLikebtn}>
              {!clickLike ? (
                <HeartOutline className={styles.heartOutlineIcon} />
              ) : (
                <HeartFill className={styles.heartFillIcon} />
              )}

              {!clickLike ? likeCount : likeCount + 1}
            </button>
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
