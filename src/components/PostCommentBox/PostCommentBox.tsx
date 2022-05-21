import CommentForm from 'components/CommentForm';
import Dropdown from 'components/Dropdown';
import InfiniteScroll from 'components/InfiniteScroll';
import ParentComment from 'components/ParentComment';
import { CaretDown, Sort } from 'icons';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import {
  addComment,
  addComments,
  changeCommentsSort,
  useComments,
} from 'slices/commentsSlice';
import { changePostDetailComments } from 'slices/postDetailSlice';
import { changePostComments } from 'slices/postsSlice';
import { Comment, Post } from 'types';
import api from 'utils/api';
import getInfiniteScrollIndex from 'utils/getInfiniteScrollIndex';
import styles from './PostCommentBox.module.scss';

export type PostCommentBoxProps = {
  post: Post;
};

function PostCommentBox({ post }: PostCommentBoxProps) {
  const comments = useComments();
  const { data: commentsData, sortBy } = comments;
  const message = useMemo(
    () => (sortBy === 'like' ? '좋아요순' : '최신순'),
    [sortBy]
  );
  const dispatch = useDispatch();

  return (
    <div className={styles.commentBox} data-testid="post-comment-box">
      <div className={styles.commentBoxTop}>
        <div className={styles.commentInfo}>
          <span>댓글 {post.comments}개</span>
          <Dropdown
            ariaLabel={`댓글 정렬 기준 변경(현재 ${message})`}
            options={[
              {
                name: '좋아요순',
                onClick: () => {
                  dispatch(changeCommentsSort('like'));
                },
              },
              {
                name: '최신순',
                onClick: () => {
                  dispatch(changeCommentsSort('new'));
                },
              },
            ]}
            fullWidth={true}
          >
            <Sort />
            <span>정렬 기준: </span>
            <span>{message}</span>
            <CaretDown />
          </Dropdown>
        </div>
        <CommentForm
          onSubmit={async ({ comment }) => {
            const { data } = await api.post<Comment>('/comment', {
              content: comment,
              postId: post.id,
            });
            dispatch(changePostDetailComments('add'));
            dispatch(changePostComments({ id: post.id, type: 'add' }));
            dispatch(addComment(data));
          }}
        />
      </div>
      <div className={styles.commentsContainer}>
        {commentsData?.map((comment) => {
          return <ParentComment key={comment.commentId} comment={comment} />;
        })}
      </div>
      <InfiniteScroll
        data={commentsData}
        size={10}
        onIntersect={async () => {
          const index = getInfiniteScrollIndex(comments);
          const { data } = await api.get<Comment[]>(
            `/comment?postId=${post.id}&index=${index}&size=10&sort=${sortBy}`
          );
          dispatch(addComments({ data }));
          return data;
        }}
      />
    </div>
  );
}

export default PostCommentBox;
