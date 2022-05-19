import CommentForm from 'components/CommentForm';
import Dropdown from 'components/Dropdown';
import InfiniteScroll from 'components/InfiniteScroll';
import ParentComment from 'components/ParentComment';
import { usePostsContext } from 'context/PostsContext';
import useComments from 'hooks/useComments';
import { CaretDown, Sort } from 'icons';
import { useEffect, useMemo, useRef } from 'react';
import { useUser } from 'slices/userSlice';
import { mutate } from 'swr';
import { Comment as CommentType, Post, User } from 'types';
import api from 'utils/api';
import styles from './PostCommentBox.module.scss';

export type PostCommentBoxProps = {
  post: Post;
};

function PostCommentBox({ post }: PostCommentBoxProps) {
  const { dispatch } = usePostsContext();
  const { state: commentsState, dispatch: dispatchComments } = useComments();
  const { comments, sortBy, page } = commentsState;
  const message = useMemo(
    () => (sortBy === 'like' ? '좋아요순' : '최신순'),
    [sortBy]
  );
  const user = useUser();
  const prevUser = useRef<User | undefined>(user);

  useEffect(() => {
    if (prevUser.current !== user) {
      dispatchComments({ type: 'RESET' });
    }
  }, [user, dispatchComments]);

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
                  dispatchComments({ type: 'CHANGE_SORT', sortBy: 'like' });
                  dispatchComments({ type: 'RESET' });
                },
              },
              {
                name: '최신순',
                onClick: () => {
                  dispatchComments({ type: 'CHANGE_SORT', sortBy: 'new' });
                  dispatchComments({ type: 'RESET' });
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
            await api.post('/comment', {
              content: comment,
              postId: post.id,
            });
            const userQuery = user ? `?nickname=${user.nickname}` : '';
            const data = await mutate<Post>(`/post/${post.id}${userQuery}`);
            dispatchComments({ type: 'RESET' });
            dispatch({ type: 'CHANGE_POST', post: data });
          }}
        />
      </div>
      <div className={styles.commentsContainer}>
        {comments?.map((comment) => {
          return (
            <ParentComment
              key={comment.commentId}
              comment={comment}
              dispatchComments={dispatchComments}
            />
          );
        })}
      </div>
      <InfiniteScroll
        data={comments}
        size={10}
        onIntersect={async () => {
          const getIndex = () => {
            switch (sortBy) {
              case 'new':
                return !comments || comments.length === 0
                  ? Number.MAX_SAFE_INTEGER
                  : comments[comments.length - 1].commentId;
              case 'like':
                return !comments || comments.length === 0 ? 0 : page || 0;
            }
          };

          const index = getIndex();
          const { data } = await api.get<CommentType[]>(
            `/comment?postId=${post.id}&index=${index}&size=10&sort=${sortBy}`
          );
          dispatchComments({
            type: 'ADD_COMMENTS',
            comments: data,
            page: index + 1,
          });
          return data;
        }}
      />
    </div>
  );
}

export default PostCommentBox;
