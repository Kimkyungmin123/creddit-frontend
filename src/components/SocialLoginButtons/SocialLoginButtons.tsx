import { Kakao, Naver } from 'icons';
import { getRedirectUrl } from 'pages/api/auth/[...auth]';
import styles from './SocialLoginButtons.module.scss';

const SocialLoginButtons = () => {
  return (
    <div className={styles.socialLoginButtons} data-testid="socialLoginButtons">
      <a
        className={styles.naver}
        href={`https://nid.naver.com/oauth2.0/authorize?client_id=${
          process.env.NEXT_PUBLIC_NAVER_ID
        }&response_type=code&redirect_uri=${getRedirectUrl('naver')}`}
      >
        <Naver />
        <span>네이버 로그인</span>
      </a>
      <a
        className={styles.kakao}
        href={`https://kauth.kakao.com/oauth/authorize?client_id=${
          process.env.NEXT_PUBLIC_KAKAO_ID
        }&redirect_uri=${getRedirectUrl('kakao')}&response_type=code`}
      >
        <Kakao />
        <span>카카오 로그인</span>
      </a>
    </div>
  );
};

export default SocialLoginButtons;
