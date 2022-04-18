import { Kakao, Naver } from 'icons';
import { signIn } from 'next-auth/react';
import styles from './SocialLoginButtons.module.scss';

const SocialLoginButtons = () => {
  return (
    <div className={styles.socialLoginButtons} data-testid="socialLoginButtons">
      <button className={styles.naver} onClick={() => signIn('naver')}>
        <Naver />
        <span>네이버 로그인</span>
      </button>
      <button className={styles.kakao} onClick={() => signIn('kakao')}>
        <Kakao />
        <span>카카오 로그인</span>
      </button>
    </div>
  );
};

export default SocialLoginButtons;
