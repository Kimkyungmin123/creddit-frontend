import { Github, Google } from '../../icons';
import styles from './SocialLoginButton.module.css';

const SocialLoginButton = () => {
  return (
    <div>
      <button className={styles.socialLoginBtn}>
        <span className={styles.socialLogiIcon}>
          <Google />
        </span>
        <span className={styles.socialLogiText}>Google 계정으로 계속하기</span>
      </button>

      <button className={styles.socialLoginBtn}>
        <span className={styles.socialLogiIcon}>
          <Github />
        </span>
        <span className={styles.socialLogiText}>GitHub 계정으로 계속하기</span>
      </button>
    </div>
  );
};

export default SocialLoginButton;
