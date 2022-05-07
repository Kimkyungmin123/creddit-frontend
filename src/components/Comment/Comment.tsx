import CommentForm from 'components/CommentForm';
import DeleteModal from 'components/DeleteModal';
import LikeButton from 'components/LikeButton';
import MyDate from 'components/MyDate';
import ProfileImage from 'components/ProfileImage';
import { usePostsContext } from 'context/PostsContext';
import { CommentsAction } from 'hooks/useComments';
import useModal from 'hooks/useModal';
import useUser from 'hooks/useUser';
import { Dispatch, useState } from 'react';
import { mutate } from 'swr';
import { Comment, Post } from 'types';
import api from 'utils/api';
import styles from './Comment.module.scss';

export type commentProps = {
  comment: Comment;
  dispatchComments: Dispatch<CommentsAction>;
};

const Comment = ({ comment, dispatchComments }: commentProps) => {
  const {
    member,
    createdDate,
    content,
    liked,
    likes,
    commentId,
    postId,
    profile,
  } = comment;
  const { user } = useUser();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [isEditing, setIsEditing] = useState(false);
  const { dispatch } = usePostsContext();

  return (
    <div className={styles.container} data-testid="comment">
      <ProfileImage imgUrl={profile.imgUrl} size={2.25} />
      <div className={styles.right}>
        <div className={styles.top}>
          <div className={styles.info}>
            <span>{member.nickname}</span>
            <span>•</span>
            <MyDate date={createdDate} />
            {user?.nickname === member.nickname && !isEditing && (
              <>
                <button
                  aria-label="댓글 수정"
                  onClick={() => setIsEditing(true)}
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
                      const data = await mutate(
                        `/post/${postId}`,
                        (post: Post) => ({
                          ...post,
                          comments: post.comments - 1,
                        }),
                        false
                      );
                      dispatch({ type: 'CHANGE_POST', post: data });
                      dispatchComments({ type: 'REMOVE_COMMENT', commentId });
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
                  await api.post(`/comment/${commentId}`, {
                    content: comment,
                    id: commentId,
                  });
                  dispatchComments({
                    type: 'CHANGE_COMMENT',
                    comment: {
                      commentId,
                      content: comment,
                    },
                  });
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
                dispatchComments({ type: 'LIKE_COMMENT', commentId });
              }}
            >
              {likes}
            </LikeButton>
            <button aria-label="답글 달기">답글</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
