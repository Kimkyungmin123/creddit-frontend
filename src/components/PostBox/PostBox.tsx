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
  clickedPost?: (id: React.MouseEvent<HTMLDivElement>) => void;
};

const PostBox = ({
  postTitle,
  postContent,
  nickName,
  commentsCount,
  likeCount,
  date,
  clickedPost,
}: PostBoxProps) => {
  const [clickLike, setClickLike] = useState(false);
  const handleLikebtn = () => {
    setClickLike(() => !clickLike);
  };
  const nonClickArea = (event: any) => {
    event.stopPropagation();
  };

  return (
    <>
      <div className={styles.postBox} onClick={clickedPost}>
        <section>
          <h2>{postTitle}</h2>
          <p>
            {postContent.length > 60
              ? `${postContent.slice(0, 60)}...`
              : postContent}
          </p>

          <div className={styles.postDetails}>
            <div className={styles.postDetailsLeft}>
              <div className={styles.userID}>
                <span>by </span>
                {nickName}
              </div>
              <div className={styles.comments}>댓글 {commentsCount}개</div>
              <div onClick={nonClickArea}>
                {!clickLike ? (
                  <button
                    className={styles.likeCountBtn}
                    onClick={handleLikebtn}
                    aria-label="좋아요"
                  >
                    <HeartOutline className={styles.heartOutlineIcon} />
                    {!clickLike ? likeCount : likeCount + 1}
                  </button>
                ) : (
                  <button
                    className={styles.likeCountBtn}
                    onClick={handleLikebtn}
                    aria-label="좋아요 취소"
                  >
                    <HeartFill className={styles.heartFillIcon} />
                    {!clickLike ? likeCount : likeCount + 1}
                  </button>
                )}
              </div>
            </div>
            <div className={styles.postDetailsRight}>
              <div className={styles.postDate}>{date}</div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PostBox;
