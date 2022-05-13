import ButtonLink from 'components/ButtonLink';
import styles from './NonLogin.module.scss';

function NonLogin() {
  return (
    <div className={styles.container}>
      <h2>로그인 후 사용할 수 있습니다.</h2>
      <ButtonLink href="/login">로그인 하기</ButtonLink>
    </div>
  );
}

export default NonLogin;
