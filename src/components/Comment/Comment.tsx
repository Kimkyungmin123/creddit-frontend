import { HeartFill } from 'icons';
import styles from './Comment.module.scss';

export type commentProps = {
  nickName: string;
  content: string;
  likeCount: number;
  date: string;
};

const Comment = ({ nickName, content, likeCount, date }: commentProps) => {
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
        <button aria-label="좋아요">
          <HeartFill className={styles.HeartFillIcon} />
          <span>{likeCount}</span>
        </button>
        <button aria-label="답글 달기">답글</button>
      </div>
    </div>
  );
};

export default Comment;
