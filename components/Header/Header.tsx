import Link from 'next/link';
import { useState } from 'react';
import {
  Github,
  MoonOutline,
  EditOutline,
  Search,
  SunOutline,
} from '../../icons';
import styles from './Header.module.css';

type HeaderProps = {
  type: 'post' | 'account';
};

const Header = ({ type }: HeaderProps) => {
  const [clicked, setClicked] = useState(true);
  const [nextMode, setNextMode] = useState('light');

  const handle = () => {
    setClicked(!clicked);
    setNextMode(() =>
      nextMode === 'light'
        ? (document.body.dataset.theme = 'dark')
        : (document.body.dataset.theme = 'light')
    );
  };

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerbox}>
        <div className={styles.headerLogo}>
          <Link href="/">
            <a>creddit</a>
          </Link>
        </div>
        {type === 'account' && <div className={styles.headerAccount}></div>}

        {type === 'post' && (
          <div className={styles.headerPostSearch}>
            <Search className={styles.searchIcon} />
            <input className={styles.headerInput} type="text" placeholder="" />
          </div>
        )}
        <div className={styles.headerNav}>
          <div className={styles.modeIcon} onClick={handle}>
            {clicked ? <MoonOutline /> : <SunOutline />}
          </div>
          {type === 'post' && (
            <div className={styles.editOutlineIcon}>
              <Link href="/create-post">
                <a aria-label="글 작성">
                  <EditOutline />
                </a>
              </Link>
            </div>
          )}
          <div>
            <a
              aria-label="깃허브 저장소"
              href="https://github.com/project-creddit/creddit-frontend"
            >
              <Github />
            </a>
          </div>
          <div>
            <Link href="/login">
              <a aria-label="로그인">로그인</a>
            </Link>
          </div>
          <div>
            <Link href="/signup">
              <a aria-label="회원가입">회원가입</a>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
