import Comment from 'components/Comment';
import { CaretDown, Close, HeartFill, Sort } from 'icons';
import { useRouter } from 'next/router';
import styles from './PostModal.module.scss';
import dummy from '../../data/posts.json';
import Button from 'components/Button';

export type modalProps = {
  postTitle: string;
  postContent: string;
  nickName: string;
  commentsCount: number;
  likeCount: number;
  date: string;
};

const PostModal = ({
  postTitle,
  postContent,
  nickName,
  commentsCount,
  likeCount,
  date,
}: modalProps) => {
  const router = useRouter();
  const { id } = router.query;
  const numID = Number(id) - 1;
  const postData = dummy[numID].comments;

  return (
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
            <button ria-label="게시물 닫기" onClick={() => router.back()}>
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
                <span className={styles.commentCount}>
                  댓글 {commentsCount}개
                </span>
                <Sort className={styles.sortIcon} />
                <span>정렬 기준: 좋아요순</span> {/*수정전*/}
                <CaretDown className={styles.caretIcon} />
              </div>
              <form>
                <input />
                <Button>작성</Button>
              </form>
            </div>
            <div className={styles.commentBoxBottom}>
              {postData.map((data, i) => {
                return (
                  <Comment
                    key={i}
                    nickName={data.member}
                    content={data.content}
                    likeCount={data.likeCount}
                    date={data.createdDate}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.overlay} onClick={() => router.back()}></div>
    </div>
  );
};

export default PostModal;
