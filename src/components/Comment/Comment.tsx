import CommentForm from 'components/CommentForm';
import DeleteModal from 'components/DeleteModal';
import MyDate from 'components/MyDate';
import useModal from 'hooks/useModal';
import useUser from 'hooks/useUser';
import { HeartOutline } from 'icons';
import { useState } from 'react';
import { mutate } from 'swr';
import { Comment } from 'types';
import api from 'utils/api';
import styles from './Comment.module.scss';

export type commentProps = {
  comment: Comment;
};

const Comment = ({ comment }: commentProps) => {
  const { member, createdDate, content, likes, commentId, postId } = comment;
  const { user } = useUser();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className={styles.container} data-testid="comment">
      <div className={styles.top}>
        <div className={styles.info}>
          <span>{member.nickname}</span>
          <span>•</span>
          <MyDate date={createdDate} />
          {user?.nickname === member.nickname && !isEditing && (
            <>
              <button aria-label="댓글 수정" onClick={() => setIsEditing(true)}>
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
                    mutate(`/post/${postId}`);
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
                const formData = new FormData();
                formData.append('content', comment);
                formData.append('id', `${commentId}`);
                await api.post(`/comment/${commentId}`, formData);
                await mutate(`/post/${postId}`);
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
          <button aria-label="좋아요">
            <HeartOutline />
            {likes}
          </button>
          <button aria-label="답글 달기">답글</button>
        </div>
      )}
    </div>
  );
};

export default Comment;
