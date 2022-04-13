import Comment from 'components/Comment';
import { Close, HeartFill, Sort } from 'icons';
import styles from './PostModal.module.scss';

export type modalProps = {
  postTitle: string;
  postContent: string;
  nickName: string;
  commentsCount: number;
  likeCount: number;
  date: string;
  state: boolean;
  onCloseClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const PostModal = ({
  postTitle,
  postContent,
  nickName,
  commentsCount,
  likeCount,
  date,
  state,
  onCloseClick,
}: modalProps) => {
  return state ? (
    <div className={styles.postModalContainer}>
      <div className={styles.postModalBox}>
        <div className={styles.topBar}>
          <div className={styles.topBarContent}>
            <div className={styles.topBarLeft}>
              <div className={styles.topBarLeftLikeCnt}>
                <HeartFill className={styles.heartFillIcon} />
                {likeCount}
              </div>
              {postTitle}
            </div>
            <button ria-label="게시물 닫기" onClick={onCloseClick}>
              <Close />
            </button>
          </div>
        </div>
        <div className={styles.postModalContent}>
          <section>
            <h2>{postTitle}</h2>
            <div className={styles.postDetail}>
              <span>{nickName}</span>
              <span>{date}</span>
              <button aria-label="게시물 수정">수정</button>
              <button aria-label="게시물 삭제">삭제</button>
            </div>
            <p>{postContent}</p>
          </section>
          <div className={styles.commentBox}>
            <div className={styles.commentBoxTop}>
              <div className={styles.commentInfo}>
                <span>댓글 {commentsCount}개</span>
                <Sort className={styles.sortIcon} />
                <span>정렬 기준 : 좋아요순</span> {/*수정전*/}
              </div>
              <form>
                <input />
                <button aria-label="댓글 삭제">작성</button>
              </form>
            </div>
            <div className={styles.commentBoxBottom}>
              <Comment
                nickName="woochul"
                content="글 잘 읽었습니다~ ^^"
                likeCount={1}
                date="2022년 2월 7일 18:00"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.overlay} onClick={() => console.log('hi')}></div>
    </div>
  ) : (
    <></>
  );
};

export default PostModal;
