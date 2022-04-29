import MyDate from 'components/MyDate';
import useUser from 'hooks/useUser';
import { HeartOutline } from 'icons';
import { Comment } from 'types';
import styles from './Comment.module.scss';

export type commentProps = {
  comment: Comment;
};

const Comment = ({ comment }: commentProps) => {
  const { member, createdDate, content, likes } = comment;
  const { user } = useUser();

  return (
    <div className={styles.container} data-testid="comment">
      <div className={styles.top}>
        <div className={styles.info}>
          <span>{member.nickname}</span>
          <span>•</span>
          <MyDate date={createdDate} />
          {user?.nickname === member.nickname && (
            <>
              <button aria-label="댓글 수정">수정</button>
              <button aria-label="댓글 삭제">삭제</button>
            </>
          )}
        </div>
        <p>{content}</p>
      </div>
      <div className={styles.bottom}>
        <button aria-label="좋아요">
          <HeartOutline />
          {likes}
        </button>
        <button aria-label="답글 달기">답글</button>
      </div>
    </div>
  );
};

export default Comment;
