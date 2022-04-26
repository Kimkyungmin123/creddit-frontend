import Comment from 'components/Comment';
import PostCommentForm from 'components/PostCommentForm';
import { CaretDown, Sort } from 'icons';
import { Post } from 'types';
import styles from './PostCommentBox.module.scss';

export type PostCommentBoxProps = {
  post: Post;
};

function PostCommentBox({ post }: PostCommentBoxProps) {
  const { comments } = post;

  return (
    <div className={styles.commentBox} data-testid="post-comment-box">
      <div className={styles.commentBoxTop}>
        <div className={styles.commentInfo}>
          <span>댓글 {comments.length}개</span>
          <button
            // TODO: 현재 정렬 기준에 따라 aria-label 변경
            aria-label={'댓글 정렬 기준 변경'}
          >
            <Sort />
            <span>정렬 기준: 좋아요순</span>
            <CaretDown />
          </button>
        </div>
        <PostCommentForm
          onSubmit={async (values) => {
            console.log(values);
          }}
        />
      </div>
      <div className={styles.commentsContainer}>
        {comments.map((comment, i) => {
          return (
            <Comment
              key={i}
              nickName={comment.member.nickname}
              content={comment.content}
              likeCount={comment.likes}
              date={comment.createdDate}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PostCommentBox;
