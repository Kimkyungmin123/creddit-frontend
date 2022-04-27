import ButtonLink from 'components/ButtonLink';
import styles from './NotFound.module.scss';

function NotFound() {
  return (
    <div className={styles.container}>
      <h2>요청하신 페이지를 찾을 수 없습니다.</h2>
      <ButtonLink href="/">홈으로</ButtonLink>
    </div>
  );
}

export default NotFound;
