import useUser from 'hooks/useUser';
import { CaretDown } from 'icons';
import cat from 'images/cat.jpg';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from './AccountMenu.module.scss';

function AccountMenu() {
  const { logout } = useUser();
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      data-testid="account-menu"
      className={styles.accountMenu}
      onBlur={() => setExpanded(false)}
    >
      <button
        className={styles.accountMenuButton}
        aria-expanded={expanded ? 'true' : 'false'}
        aria-label="계정 메뉴"
        onClick={() => setExpanded((prev) => !prev)}
      >
        <div className={styles.imageContainer}>
          <Image src={cat} alt="사용자 프로필 이미지" />
        </div>
        <CaretDown />
      </button>
      {expanded && (
        <ul className={styles.detail} data-testid="detail">
          <li>
            <Link href="/profile">
              <a>프로필</a>
            </Link>
          </li>
          <li>
            <Link href="/create-post">
              <a>새 글 작성</a>
            </Link>
          </li>
          <li>
            <Link href="/chat-list">
              <a>대화 목록</a>
            </Link>
          </li>
          <li>
            <button onClick={logout}>로그아웃</button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default AccountMenu;
