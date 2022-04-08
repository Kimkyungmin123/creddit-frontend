import Image from 'next/image';
import styles from './ProfileBox.module.scss';
import cat from 'images/cat.jpg';
import Link from 'next/link';

export type ProfileProps = {
  nickName: string;
  statusMessage: string;
  signUpDateNum: string;
};

function ProfileBox({ nickName, statusMessage, signUpDateNum }: ProfileProps) {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileContainerLeft} />
      <div className={styles.profileContainerRight}>
        <div className={styles.profileBox}>
          <div className={styles.profileBoxTop} />
          <div className={styles.profileContent}>
            <div className={styles.userInfo}>
              <div className={styles.profileImg}>
                <Image src={cat} alt="프로필 이미지" width={96} height={96} />
              </div>
              <span className={styles.nickName}>{nickName}</span>
            </div>
            <span className={styles.statusMessage}>{statusMessage}</span>
            <div className={styles.signUpDate}>
              <span className={styles.signUpDateText}>가입일</span>
              <span className={styles.signUpDateNum}>{signUpDateNum}</span>
            </div>
            <div className={styles.btn}>
              <Link href="/create-post">
                <a className={styles.createNewPostBtn} aria-label="새 글 작성">
                  새 글 작성
                </a>
              </Link>
              <button className={styles.chatListBtn}>대화 목록</button>
            </div>
            <button className={styles.modifyProfile}>프로필 수정</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileBox;
