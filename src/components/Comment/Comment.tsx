import CommentForm from 'components/CommentForm';
import DeleteModal from 'components/DeleteModal';
import LikeButton from 'components/LikeButton';
import MyDate from 'components/MyDate';
import NicknameLink from 'components/NicknameLink';
import ProfileImage from 'components/ProfileImage';
import useModal from 'hooks/useModal';
import {
  addReply,
  changeReply,
  CommentsAction,
  likeReply,
} from 'hooks/useReplies';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  changeComment,
  changeReplyCount,
  likeComment,
  removeComment,
} from 'slices/commentsSlice';
import { changePostDetailComments } from 'slices/postDetailSlice';
import { changePostComments } from 'slices/postsSlice';
import { useUser } from 'slices/userSlice';
import { Comment as CommentType } from 'types';
import api from 'utils/api';
import styles from './Comment.module.scss';

export type CommentProps = {
  comment: CommentType;
  dispatchReplies: Dispatch<CommentsAction>;
  setExpanded?: Dispatch<SetStateAction<boolean>>;
  children?: ReactNode;
  enableReply?: boolean;
  onDelete?: () => void;
  postId?: number;
};

function Comment({
  comment,
  dispatchReplies,
  setExpanded,
  children,
  enableReply,
  onDelete,
  postId: pid,
}: CommentProps) {
  const { member, createdDate, content, liked, likes, commentId, profile } =
    comment;
  const user = useUser();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const postId = pid || (comment.postId as number);
  const dispatch = useDispatch();

  return (
    <div className={styles.container} data-testid="comment">
      <ProfileImage
        nickname={member.nickname}
        imgUrl={profile.imgUrl}
        size={2.25}
      />
      <div className={styles.right}>
        <div className={styles.top}>
          <div className={styles.info}>
            <NicknameLink nickname={member.nickname} />
            <span>•</span>
            <MyDate date={createdDate} />
            {user?.nickname === member.nickname && !isEditing && (
              <>
                <button
                  aria-label="댓글 수정"
                  onClick={() => {
                    setIsEditing(true);
                    setIsReplying(false);
                  }}
                >
                  수정
                </button>
                <button aria-label="댓글 삭제" onClick={openModal}>
                  삭제
                </button>
                {isModalOpen && (
                  <DeleteModal
                    title="댓글 삭제"
                    message={'정말 댓글을 삭제하시겠습니까?'}
                    onConfirm={async () => {
                      await api.delete(`/comment/${commentId}`);
                      closeModal();
                      dispatch(changePostDetailComments('delete'));
                      dispatch(
                        changePostComments({ id: postId, type: 'delete' })
                      );
                      dispatch(removeComment(commentId));
                      if (onDelete) onDelete();
                    }}
                    onCancel={closeModal}
                  />
                )}
              </>
            )}
          </div>
          {isEditing ? (
            <CommentForm
              type="edit"
              initialValues={{ comment: content }}
              onSubmit={async ({ comment }) => {
                if (comment !== content) {
                  const { data } = await api.post<CommentType>(
                    `/comment/${commentId}`,
                    {
                      content: comment,
                      id: commentId,
                    }
                  );
                  dispatchReplies(changeReply(data));
                  dispatch(changeComment(data));
                }
                setIsEditing(false);
              }}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <p>{content}</p>
          )}
        </div>
        {!isEditing && (
          <div className={styles.bottom}>
            <LikeButton
              type="comment"
              id={commentId}
              liked={liked}
              variant="medium"
              onClick={() => {
                dispatch(likeComment(commentId));
                dispatchReplies(likeReply(commentId));
              }}
            >
              {likes}
            </LikeButton>
            {enableReply && (
              <button
                className={styles.replyButton}
                aria-label="답글 추가"
                onClick={() => setIsReplying(true)}
              >
                답글
              </button>
            )}
          </div>
        )}
        {!isEditing && isReplying && (
          <CommentForm
            type="reply"
            onSubmit={async ({ comment }) => {
              const { data } = await api.post<CommentType>('/comment', {
                content: comment,
                parentCommentId: commentId,
                postId: postId,
              });
              dispatch(changePostDetailComments('add'));
              dispatch(changePostComments({ id: postId, type: 'add' }));
              dispatch(changeReplyCount({ id: commentId, type: 'add' }));
              dispatchReplies(addReply(data));
              if (setExpanded) setExpanded(true);
              setIsReplying(false);
            }}
            onCancel={() => setIsReplying(false)}
          />
        )}
        {children}
      </div>
    </div>
  );
}

export default Comment;
