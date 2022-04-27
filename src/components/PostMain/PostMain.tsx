import DeleteModal from 'components/DeleteModal';
import MyDate from 'components/MyDate';
import useUser from 'hooks/useUser';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Post } from 'types';
import api from 'utils/api';
import styles from './PostMain.module.scss';

export type PostMainProps = {
  post: Post;
};

function PostMain({ post }: PostMainProps) {
  const { title, createdDate, content, member, id } = post;
  const { user } = useUser();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (openDeleteModal && event.key === 'Escape') {
        setOpenDeleteModal(false);
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [openDeleteModal]);

  return (
    <div className={styles.postMain} data-testid="post-main">
      <h2>{title}</h2>
      <div className={styles.postDetail}>
        <span>{member.nickname}</span>
        <MyDate date={createdDate} />
        {user?.nickname === member.nickname && (
          <>
            <Link href={`/edit-post?id=${id}`}>
              <a aria-label="게시물 수정">수정</a>
            </Link>
            <button
              aria-label="게시물 삭제"
              onClick={() => setOpenDeleteModal(true)}
            >
              삭제
            </button>
            {openDeleteModal && (
              <DeleteModal
                title="글 삭제"
                message={
                  '정말 글을 삭제하시겠습니까?\n삭제한 글은 복구할 수 없습니다.'
                }
                onConfirm={async () => {
                  try {
                    await api.delete(`/post/${id}`);
                  } finally {
                    router.push('/');
                  }
                }}
                onCancel={() => setOpenDeleteModal(false)}
              />
            )}
          </>
        )}
      </div>
      <p data-testid="content">{content}</p>
    </div>
  );
}

export default PostMain;
