import styles from './ProfileBox.module.scss';

export type ProfileProps = {
  nickName: string;
  statusMessage: string;
  signUpDateNum: string;
};

function ProfileBox({ nickName, statusMessage, signUpDateNum }: ProfileProps) {
  return (
    <div className={styles.profileBox}>
      <div className={styles.profileBoxTop}></div>
      <div className={styles.profileContent}>
        <div className={styles.profileImg}></div>
        <span className={styles.nickName}>{nickName}</span>
        <span className={styles.statusMessage}>{statusMessage}</span>
        <div className={styles.signUpDate}>
          <span className={styles.signUpDateText}>가입일</span>
          <span className={styles.signUpDateNum}>{signUpDateNum}</span>
        </div>
        <button className={styles.createNewPostBtn}>새 글 작성</button>
        <span className={styles.modifyProfile}>프로필 수정</span>
      </div>

      <div className={styles.profileBoxBottom}></div>
    </div>
  );
}

export default ProfileBox;
