import classNames from 'classnames';
import Comment from 'components/Comment';
import useReplies, {
  addReplies as add,
  removeRepliesLike,
  removeReply,
} from 'hooks/useReplies';
import { ArrowSubDownRight, CaretDown } from 'icons';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Provider, useDispatch, useStore } from 'react-redux';
import { changeReplyCount } from 'slices/commentsSlice';
import { useUser } from 'slices/userSlice';
import { Comment as CommentType, User } from 'types';
import api from 'utils/api';
import styles from './ParentComment.module.scss';

export type parentCommentProps = {
  comment: CommentType;
};

const ParentComment = ({ comment }: parentCommentProps) => {
  const { detailCommentCount, commentId: parentCommentId } = comment;
  const [expanded, setExpanded] = useState(false);
  const { state: replies, dispatch: dispatchReplies } = useReplies();
  const dispatch = useDispatch();
  const store = useStore();
  const user = useUser();
  const prevUser = useRef<User | undefined>(user);

  const addReplies = useCallback(async () => {
    const lastCommentId = replies
      ? replies[replies.length - 1].commentId
      : Number.MAX_SAFE_INTEGER;
    const { data } = await api.get<CommentType[]>(
      `/comment/detail?parentCommentId=${parentCommentId}&lastCommentId=${lastCommentId}&size=10`
    );
    dispatchReplies(add(data));
  }, [parentCommentId, replies, dispatchReplies]);

  useEffect(() => {
    if (prevUser.current !== user) {
      dispatchReplies(removeRepliesLike());
    }
  }, [user, dispatchReplies]);

  return (
    <Provider store={{ ...store }}>
      <Comment
        comment={comment}
        enableReply={true}
        dispatchReplies={dispatchReplies}
        setExpanded={setExpanded}
      >
        <div className={styles.parentComment}>
          {(detailCommentCount || 0) > 0 && (
            <button
              className={classNames(
                styles.replyButton,
                expanded && styles.expanded
              )}
              aria-expanded={expanded ? true : false}
              onClick={async () => {
                setExpanded((prev) => !prev);
                if (!expanded && !replies) await addReplies();
              }}
              data-testid="reply-toggle-button"
            >
              <CaretDown />
              답글 {detailCommentCount}개 {expanded ? '숨기기' : '보기'}
            </button>
          )}
          {expanded && replies && (
            <>
              {replies.map((reply) => (
                <Comment
                  key={reply.commentId}
                  comment={reply}
                  dispatchReplies={dispatchReplies}
                  postId={comment.postId}
                  onDelete={() => {
                    dispatch(
                      changeReplyCount({
                        id: comment.commentId,
                        type: 'remove',
                      })
                    );
                    dispatchReplies(removeReply(reply.commentId));
                  }}
                />
              ))}
              {replies.length < (detailCommentCount || 0) && (
                <button className={styles.replyButton} onClick={addReplies}>
                  <ArrowSubDownRight className={styles.subArrow} />
                  답글 더보기
                </button>
              )}
            </>
          )}
        </div>
      </Comment>
    </Provider>
  );
};

export default ParentComment;
