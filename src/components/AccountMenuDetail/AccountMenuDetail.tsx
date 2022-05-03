import useUser from 'hooks/useUser';
import Link from 'next/link';
import { MouseEventHandler, useEffect } from 'react';
import styles from './AccoutMenuDetail.module.scss';

export type AccountMenuDetailProps = {
  onClick: MouseEventHandler<HTMLUListElement>;
};

function AccoutMenuDetail({ onClick }: AccountMenuDetailProps) {
  const { logout } = useUser();

  useEffect(() => {
    const moveFocus = (event: KeyboardEvent) => {
      if (
        (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') ||
        !document.activeElement?.closest('[data-testid="account-menu"]')
      ) {
        return;
      }

      event.preventDefault();
      if (event.key === 'ArrowDown') moveDown();
      else if (event.key === 'ArrowUp') moveUp();
    };
    window.addEventListener('keydown', moveFocus);
    return () => window.removeEventListener('keydown', moveFocus);
  }, []);

  return (
    <ul
      className={styles.container}
      data-testid="account-menu-detail"
      onClick={onClick}
    >
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
        <Link href="/chat">
          <a>대화 목록</a>
        </Link>
      </li>
      <li>
        <button onClick={logout}>로그아웃</button>
      </li>
    </ul>
  );
}

const hasFocused = () =>
  document.activeElement?.closest(`.${styles.container}`);

const focusFirst = () => {
  const container = document.querySelector(`.${styles.container}`);
  (container?.firstChild?.firstChild as HTMLElement).focus();
};

const focusLast = () => {
  const container = document.querySelector(`.${styles.container}`);
  (container?.lastChild?.firstChild as HTMLElement).focus();
};

const moveDown = () => {
  if (!hasFocused()) {
    focusFirst();
  } else {
    const li = document.activeElement?.closest('li');
    if (li?.nextElementSibling) {
      (li.nextElementSibling.firstChild as HTMLElement).focus();
    } else {
      focusFirst();
    }
  }
};

const moveUp = () => {
  if (!hasFocused()) {
    focusLast();
  } else {
    const li = document.activeElement?.closest('li');
    if (li?.previousElementSibling) {
      (li.previousElementSibling.firstChild as HTMLElement).focus();
    } else {
      focusLast();
    }
  }
};

export default AccoutMenuDetail;
