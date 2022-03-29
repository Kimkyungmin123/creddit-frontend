import Link from 'next/link';
import styles from './NonLogin.module.css';

const NonLogin = () => {
  return (
    <div className={styles.nonLogin}>
      <span className={styles.forgotPW}>
        <Link href="/find-password">
          <a aria-label="비밀번호 찾기">비밀번호를 잊으셨습니까?</a>
        </Link>
      </span>

      <span className={styles.nonAccount}>
        아직 회원이 아니신가요?
        <Link href="/signup">
          <a>회원가입</a>
        </Link>
      </span>
    </div>
  );
};

export default NonLogin;
