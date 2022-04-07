import Image from 'next/image';
import styles from './ProfileBox.module.scss';
import profileImg from '../../../img/profileImg.png';
import Link from 'next/link';

export type ProfileProps = {
  nickName: string;
  statusMessage: string;
  signUpDateNum: string;
};

function ProfileBox({ nickName, statusMessage, signUpDateNum }: ProfileProps) {
  const profileImage = profileImg;

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileContainerLeft}></div>
      <div className={styles.profileContainerRight}>
        <div className={styles.profileBox}>
          <div className={styles.profileBoxTop}></div>

          <div className={styles.profileContent}>
            <div className={styles.profileImg}>
              <Image
                src={profileImage}
                alt="Defulat Profile Image"
                // width={96}
                // height={96}
              />
            </div>
            <span className={styles.nickName}>{nickName}</span>
            <span className={styles.statusMessage}>{statusMessage}</span>
            <div className={styles.signUpDate}>
              <span className={styles.signUpDateText}>가입일</span>
              <span className={styles.signUpDateNum}>{signUpDateNum}</span>
            </div>
            <Link href="/create-post">
              <a>
                <button className={styles.createNewPostBtn}>새 글 작성</button>
              </a>
            </Link>

            <span className={styles.modifyProfile}>프로필 수정</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileBox;
