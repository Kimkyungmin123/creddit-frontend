import PostModal from 'components/PostModal';
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
  const [clickModal, setClickModal] = useState(false);
  const openModal = () => {
    setClickModal(true);
  };
  const closeModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setClickModal(false);
  };

  return (
    <>
      <div className={styles.postBox}>
        <section>
          <div onClick={openModal}>
            <h2>{postTitle}</h2>
            <p>
              {postContent.length > 60
                ? `${postContent.slice(0, 60)}...`
                : postContent}
            </p>
          </div>

          <div className={styles.postDetails}>
            <div className={styles.postDetailsLeft}>
              <div className={styles.userID}>
                <span>by </span>
                {nickName}
              </div>
              <div className={styles.comments}>댓글 {commentsCount}개</div>

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
            <div className={styles.postDetailsRight}>
              <div className={styles.postDate}>{date}</div>
            </div>
          </div>
        </section>
      </div>
      <PostModal
        postTitle={postTitle}
        postContent={postContent}
        nickName={nickName}
        commentsCount={commentsCount}
        likeCount={likeCount}
        date={date}
        state={clickModal}
        onCloseClick={closeModal}
      />
    </>
  );
};

export default PostBox;
