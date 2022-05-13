import Link from 'next/link';
import styles from './NicknameLink.module.scss';

interface NicknameLinkProps {
  nickname: string;
}

function NicknameLink({ nickname }: NicknameLinkProps) {
  return (
    <Link href={`/profile/${nickname}`}>
      <a className={styles.nicknameLink}>{nickname}</a>
    </Link>
  );
}

export default NicknameLink;
