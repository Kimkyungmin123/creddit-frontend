import { Github, Google } from '../../icons';
import styles from './SocialLoginButtons.module.css';

const SocialLoginButtons = () => {
  return (
    <div>
      <button className={styles.socialLoginBtn}>
        <span className={styles.socialLoginIcon}>
          <Google />
        </span>
        <span className={styles.socialLoginText}>Google 계정으로 계속하기</span>
      </button>

      <button className={styles.socialLoginBtn}>
        <span className={styles.socialLogincon}>
          <Github />
        </span>
        <span className={styles.socialLoginText}>GitHub 계정으로 계속하기</span>
      </button>
    </div>
  );
};

export default SocialLoginButtons;
