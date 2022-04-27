import ButtonLink from 'components/ButtonLink';
import MyDate from 'components/MyDate';
import profile from 'images/profileImg.png';
import Image from 'next/image';
import { User } from 'types';
import styles from './ProfileBox.module.scss';

export type ProfileBoxProps = {
  user: User;
};

function ProfileBox({ user }: ProfileBoxProps) {
  const { nickname, introduction, createdDate } = user;

  return (
    <div className={styles.profileBox}>
      <div className={styles.profileImage}>
        <Image src={profile} alt="프로필 이미지" />
      </div>
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
      <button className={styles.editButton}>프로필 수정</button>
    </div>
  );
}

export default ProfileBox;
