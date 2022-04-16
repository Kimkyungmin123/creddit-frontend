import { HeartFill, HeartOutline } from 'icons';
import { useState } from 'react';
import styles from './Comment.module.scss';

export type commentProps = {
  nickName: string;
  content: string;
  likeCount: number;
  date: string;
};

const Comment = ({ nickName, content, likeCount, date }: commentProps) => {
  const [clickLike, setClickLike] = useState(false);
  const handleLikebtn = () => {
    setClickLike(() => !clickLike);
  };
  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentBoxTop}>
        <div className={styles.commentInfo}>
          <span>{nickName}</span>
          <span>·</span>
          <span>{date}</span>
          <div className={styles.commentBtn}>
            <button aria-label="댓글 수정">수정</button>
            <button aria-label="댓글 삭제">삭제</button>
          </div>
        </div>
        <span>{content}</span>
      </div>
      <div className={styles.commentBoxBottom}>
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
        <button aria-label="답글 달기">답글</button>
      </div>
    </div>
  );
};

export default Comment;
