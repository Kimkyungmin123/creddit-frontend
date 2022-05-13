import Button from 'components/Button';
import useSWRImmutable from 'swr/immutable';
import ButtonLink from 'components/ButtonLink';
import ImageBox from 'components/ImageBox';
import MyDate from 'components/MyDate';
import ProfileEditForm from 'components/ProfileEditForm/ProfileEditForm';
import useUser from 'hooks/useUser';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Follower, User } from 'types';
import api, { fetcher } from 'utils/api';
import editProfile from 'utils/editProfile';
import isDuplicate from 'utils/isDuplicate';
import styles from './ProfileBox.module.scss';
import { mutate } from 'swr';
import { useRouter } from 'next/router';

export type ProfileBoxProps = {
  user: User;
};

function ProfileBox({ user }: ProfileBoxProps) {
  const { nickname, introduction, createdDate, image } = user;
  const [isEditing, setIsEditing] = useState(false);
  const { user: currentUser, isLoading: isLoadingCurrentUser } = useUser();
  const isAuthor = useMemo(
    () => currentUser?.nickname === nickname,
    [currentUser, nickname]
  );
  const { data: followingList } = useSWRImmutable<Follower[]>(
    currentUser ? '/member/follow/list' : null,
    fetcher
  );
  const router = useRouter();

  const isFollowing = useMemo(() => {
    return followingList?.find((user) => user.nickname === nickname)
      ? true
      : false;
  }, [followingList, nickname]);

  return (
    <div className={styles.profileBox}>
      <ImageBox image={image} introduction={introduction} isAuthor={isAuthor} />
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
                    if (isLoadingCurrentUser) return;
                    if (!currentUser) {
                      router.push('/login');
                      return;
                    }

                    const post = (url: string) =>
                      api.post(url, nickname, {
                        headers: { 'Content-Type': 'text/plain' },
                      });

                    if (isFollowing) {
                      await post('/member/follow/delete');
                      mutate('/member/follow/list');
                    } else {
                      await post('/member/follow');
                      mutate('/member/follow/list');
                    }
                  }}
                >
                  {isFollowing ? '팔로우 해제' : '팔로우'}
                </Button>
                <Button
                  round={true}
                  onClick={() => {
                    if (isLoadingCurrentUser) return;
                    if (!currentUser) {
                      router.push('/login');
                      return;
                    }
                    // TODO: 대화하기 버튼 누르면 대화 페이지로 이동 후 방 생성
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
