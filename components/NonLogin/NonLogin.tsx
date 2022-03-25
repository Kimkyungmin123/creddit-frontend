import Link from 'next/link';
import styles from './NonLogin.module.css';

const NonLogin = () => {
  return (
    <div className={styles.nonLogin}>
      <span className={styles.forgotPw}>
        <Link href="../../">
          <a>비밀번호를 잊으셨습니까?</a>
        </Link>
      </span>

      <span className={styles.nonAccount}>
        아직 회원이 아니신가요?
        <Link href="../../">
          <a>회원가입</a>
        </Link>
      </span>
    </div>
  );
};

export default NonLogin;
