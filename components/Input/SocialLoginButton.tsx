import { Github, Google } from '../../icons';
import styles from './Input.module.css';
const SocialLogin = () => {
  return (
    <div>
      <button className={styles.snsLoginBtn}>
        <span className={styles.snsLogiIcon}>
          <Google />
        </span>
        <span>Google 계정으로 계속하기</span>
      </button>
      <button className={styles.snsLoginBtn}>
        <span className={styles.snsLogiIcon}>
          <Github />
        </span>
        <span>GitHub 계정으로 계속하기</span>
      </button>
    </div>
  );
};

export default SocialLogin;
