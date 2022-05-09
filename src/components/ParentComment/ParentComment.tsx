import classNames from 'classnames';
import Comment from 'components/Comment';
import useComments, { CommentsAction } from 'hooks/useComments';
import { ArrowSubDownRight, CaretDown } from 'icons';
import { Dispatch, useCallback, useState } from 'react';
import { Comment as CommentType } from 'types';
import api from 'utils/api';
import styles from './ParentComment.module.scss';

export type parentCommentProps = {
  comment: CommentType;
  dispatchComments: Dispatch<CommentsAction>;
};

const ParentComment = ({ comment, dispatchComments }: parentCommentProps) => {
  const { detailCommentCount, commentId: parentCommentId } = comment;
  const [expanded, setExpanded] = useState(false);
  const { state, dispatch: dispatchReplys } = useComments();
  const { comments: replys } = state;

  const addReplys = useCallback(async () => {
    const lastCommentId = replys
      ? replys[replys.length - 1].commentId
      : Number.MAX_SAFE_INTEGER;
    const { data } = await api.get<CommentType[]>(
      `/comment/detail?parentCommentId=${parentCommentId}&lastCommentId=${lastCommentId}&size=10`
    );
    dispatchReplys({
      type: 'ADD_COMMENTS',
      comments: data,
    });
  }, [parentCommentId, replys, dispatchReplys]);

  return (
    <Comment
      comment={comment}
      dispatchComments={dispatchComments}
      enableReply={true}
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
              if (!expanded && !replys) await addReplys();
            }}
            data-testid="reply-toggle-button"
          >
            <CaretDown />
            답글 {detailCommentCount}개 {expanded ? '숨기기' : '보기'}
          </button>
        )}
        {expanded && replys && (
          <>
            {replys.map((reply) => (
              <Comment
                key={reply.commentId}
                comment={reply}
                dispatchComments={dispatchReplys}
                postId={comment.postId}
                onDelete={() =>
                  dispatchComments({
                    type: 'CHANGE_COMMENT',
                    comment: {
                      commentId: parentCommentId,
                      detailCommentCount: (detailCommentCount || 0) - 1,
                    },
                  })
                }
              />
            ))}
            {replys.length < (detailCommentCount || 0) && (
              <button className={styles.replyButton} onClick={addReplys}>
                <ArrowSubDownRight className={styles.subArrow} />
                답글 더보기
              </button>
            )}
          </>
        )}
      </div>
    </Comment>
  );
};

export default ParentComment;
