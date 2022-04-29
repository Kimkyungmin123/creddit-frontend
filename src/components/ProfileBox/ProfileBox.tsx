import ButtonLink from 'components/ButtonLink';
import ImageBox from 'components/ImageBox';
import MyDate from 'components/MyDate';
import ProfileEditForm from 'components/ProfileEditForm/ProfileEditForm';
import { useState } from 'react';
import { User } from 'types';
import api from 'utils/api';
import editProfile from 'utils/editProfile';
import isDuplicate from 'utils/isDuplicate';
import styles from './ProfileBox.module.scss';

export type ProfileBoxProps = {
  user: User;
};

function ProfileBox({ user }: ProfileBoxProps) {
  const { nickname, introduction, createdDate, image } = user;
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className={styles.profileBox}>
      <ImageBox image={image} introduction={introduction} />
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
            <ButtonLink href="/create-post" round={true}>
              새 글 작성
            </ButtonLink>
            <ButtonLink href="/chat" round={true}>
              대화 목록
            </ButtonLink>
          </div>
          <button
            className={styles.editButton}
            onClick={() => setIsEditing(true)}
          >
            프로필 수정
          </button>
        </>
      )}
    </div>
  );
}

export default ProfileBox;
