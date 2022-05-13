import DeleteModal from 'components/DeleteModal';
import MyDate from 'components/MyDate';
import ProfileImage from 'components/ProfileImage';
import { usePostsContext } from 'context/PostsContext';
import useModal from 'hooks/useModal';
import useUser from 'hooks/useUser';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Post } from 'types';
import api from 'utils/api';
import styles from './PostMain.module.scss';

export type PostMainProps = {
  post: Post;
};

function PostMain({ post }: PostMainProps) {
  const { title, createdDate, content, member, id, image, profile } = post;
  const { user } = useUser();
  const router = useRouter();
  const { isModalOpen, openModal, closeModal } = useModal();
  const { dispatch } = usePostsContext();

  return (
    <div className={styles.postMain} data-testid="post-main">
      <h2>{title}</h2>
      <div className={styles.postDetail}>
        <div className={styles.author}>
          <ProfileImage imgUrl={profile.imgUrl} size={1.5} />
          <span>{member.nickname}</span>
        </div>
        <MyDate date={createdDate} />
        {user?.nickname === member.nickname && (
          <>
            <Link href={`/edit-post?id=${id}`}>
              <a aria-label="게시물 수정">수정</a>
            </Link>
            <button aria-label="게시물 삭제" onClick={openModal}>
              삭제
            </button>
            {isModalOpen && (
              <DeleteModal
                title="글 삭제"
                message={
                  '정말 글을 삭제하시겠습니까?\n삭제한 글은 복구할 수 없습니다.'
                }
                onConfirm={async () => {
                  await api.delete(`/post/${id}`);
                  dispatch({ type: 'RESET' });
                  router.replace(`/profile/${user.nickname}`);
                }}
                onCancel={closeModal}
              />
            )}
          </>
        )}
      </div>
      <p data-testid="content">{content}</p>
      {image.imgUrl && <img src={image.imgUrl} alt="글 이미지" />}
    </div>
  );
}

export default PostMain;
