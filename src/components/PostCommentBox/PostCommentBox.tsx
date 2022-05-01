import Comment from 'components/Comment';
import CommentForm from 'components/CommentForm';
import { usePostsContext } from 'context/PostsContext';
import { CaretDown, Sort } from 'icons';
import { mutate } from 'swr';
import { Post } from 'types';
import api from 'utils/api';
import styles from './PostCommentBox.module.scss';

export type PostCommentBoxProps = {
  post: Post;
};

// TODO: 댓글 무한 스크롤
function PostCommentBox({ post }: PostCommentBoxProps) {
  const { comments, id } = post;
  const { dispatch } = usePostsContext();

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
            <span>정렬 기준:&nbsp;</span>
            <span>좋아요순</span>
            <CaretDown />
          </button>
        </div>
        <CommentForm
          onSubmit={async ({ comment }) => {
            await api.post('/comment', {
              content: comment,
              parentCommentId: 0,
              postId: id,
            });
            const data = await mutate<Post>(`/post/${id}`);
            dispatch({ type: 'CHANGE_POST', post: data });
          }}
        />
      </div>
      <div className={styles.commentsContainer}>
        {[...comments].reverse().map((comment) => {
          return <Comment key={comment.commentId} comment={comment} />;
        })}
      </div>
    </div>
  );
}

export default PostCommentBox;
