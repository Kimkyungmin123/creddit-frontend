import Comment from 'components/Comment';
import CommentForm from 'components/CommentForm';
import InfiniteScroll from 'components/InfiniteScroll';
import { CaretDown, Sort } from 'icons';
import { useState } from 'react';
import { mutate } from 'swr';
import { Comment as CommentType, Post } from 'types';
import api from 'utils/api';
import styles from './PostCommentBox.module.scss';

export type PostCommentBoxProps = {
  post: Post;
};

// TODO: 댓글 무한 스크롤
function PostCommentBox({ post }: PostCommentBoxProps) {
  const [comments, setComments] = useState<CommentType[]>([]);

  return (
    <div className={styles.commentBox} data-testid="post-comment-box">
      <div className={styles.commentBoxTop}>
        <div className={styles.commentInfo}>
          <span>댓글 {post.comments}개</span>
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
              postId: post.id,
            });
            await mutate<Post>(`/post/${post.id}`);
            setComments([]);
          }}
        />
      </div>
      <div className={styles.commentsContainer}>
        {[...comments].map((comment) => {
          return <Comment key={comment.commentId} comment={comment} />;
        })}
      </div>
      <InfiniteScroll
        data={comments}
        onIntersect={async () => {
          const id =
            comments.length === 0
              ? Number.MAX_SAFE_INTEGER
              : comments[comments.length - 1].commentId;

          const { data } = await api.get<CommentType[]>(
            `/comment?postId=${post.id}&lastCommentId=${id}&size=10&sort=new`
          );
          setComments((prev) => [...prev, ...data]);
          return data;
        }}
      />
    </div>
  );
}

export default PostCommentBox;
