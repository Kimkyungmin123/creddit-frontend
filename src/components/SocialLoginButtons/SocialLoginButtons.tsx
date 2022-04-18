import { Kakao, Naver } from 'icons';
import styles from './SocialLoginButtons.module.scss';

const SocialLoginButtons = () => {
  return (
    <div className={styles.socialLoginButtons} data-testid="socialLoginButtons">
      <button className={styles.naver}>
        <Naver />
        <span>네이버 로그인</span>
      </button>
      <button className={styles.kakao}>
        <Kakao />
        <span>카카오 로그인</span>
      </button>
    </div>
  );
};

export default SocialLoginButtons;
