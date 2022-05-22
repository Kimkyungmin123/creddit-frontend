import Button from 'components/Button';
import ButtonLink from 'components/ButtonLink';
import ImageBox from 'components/ImageBox';
import MyDate from 'components/MyDate';
import ProfileEditForm from 'components/ProfileEditForm/ProfileEditForm';
import useFollowingList from 'hooks/useFollowingList';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { useUser } from 'slices/userSlice';
import { mutate } from 'swr';
import { User } from 'types';
import api from 'utils/api';
import editProfile from 'utils/editProfile';
import isDuplicate from 'utils/isDuplicate';
import wsInstance from 'utils/wsInstance';
import styles from './ProfileBox.module.scss';

export type ProfileBoxProps = {
  user: User;
};

function ProfileBox({ user }: ProfileBoxProps) {
  const { nickname, introduction, createdDate, image } = user;
  const [isEditing, setIsEditing] = useState(false);
  const currentUser = useUser();
  const isAuthor = useMemo(
    () => currentUser?.nickname === nickname,
    [currentUser, nickname]
  );
  const router = useRouter();
  const { data: followingList, isFollowing } = useFollowingList();

  return (
    <div className={styles.profileBox}>
      <ImageBox
        className={styles.imageBox}
        image={image}
        introduction={introduction}
        isAuthor={isAuthor}
      />
      {isEditing ? (
        <ProfileEditForm
          user={user}
          onCancel={() => setIsEditing(false)}
          onSubmit={async ({ nickname, introduction }) => {
            const error: { [key: string]: boolean } = {};
            if (nickname !== user.nickname) {
              const duplicate = await isDuplicate('nickname', nickname);
              if (duplicate) {
                error.nicknameDuplicate = true;
                throw error;
              }
            }

            const changeNickname = async () => {
              if (nickname !== user.nickname) {
                await api.post('/member/changeNickname', nickname, {
                  headers: {
                    'Content-Type': 'text/plain',
                  },
                });
              }
            };

            const changeIntroduction = async () => {
              if (introduction !== user.introduction) {
                await editProfile({ introduction });
              }
            };

            await Promise.all([changeNickname(), changeIntroduction()]);
          }}
        />
      ) : (
        <>
          <p className={styles.nickName}>{nickname}</p>
          {introduction && (
            <span className={styles.introduction}>{introduction}</span>
          )}
          <div className={styles.signUpDate}>
            <span>가입일</span>
            <MyDate date={createdDate} />
          </div>
          {isAuthor && (
            <Link href="/following-list">
              <a className={styles.followingLink}>
                {followingList?.length} <span>팔로우 중</span>
              </a>
            </Link>
          )}
          <div className={styles.buttons}>
            {isAuthor ? (
              <>
                <ButtonLink href="/create-post" round={true}>
                  새 글 작성
                </ButtonLink>
                <ButtonLink href="/chat" round={true}>
                  대화 목록
                </ButtonLink>
              </>
            ) : (
              <>
                <Button
                  round={true}
                  onClick={async () => {
                    if (!currentUser) {
                      router.push('/login');
                      return;
                    }

                    const post = (url: string) =>
                      api.post(url, nickname, {
                        headers: { 'Content-Type': 'text/plain' },
                      });

                    if (isFollowing(nickname)) {
                      await post('/member/follow/delete');
                      mutate('/member/follow/list');
                    } else {
                      await post('/member/follow');
                      mutate('/member/follow/list');
                    }
                  }}
                >
                  {isFollowing(nickname) ? '팔로우 해제' : '팔로우'}
                </Button>
                <Button
                  round={true}
                  onClick={() => {
                    if (!currentUser) {
                      router.push('/login');
                    } else {
                      wsInstance.post(`/chat/register`, {
                        myId: currentUser.nickname,
                        userId: user.nickname,
                      });
                      router.push('/chat');
                    }
                  }}
                >
                  대화하기
                </Button>
              </>
            )}
          </div>
          {isAuthor && (
            <div className={styles.bottomButtons}>
              <button onClick={() => setIsEditing(true)}>프로필 수정</button>
              <Link href="/reset-password">
                <a>비밀번호 변경</a>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProfileBox;
