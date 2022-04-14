import AccountMenu from 'components/AccountMenu';
import SearchBar from 'components/SearchBar';
import useUser from 'hooks/useUser';
import { EditOutline, Github, MoonOutline, SunOutline } from 'icons';
import Link from 'next/link';
import { useLayoutEffect, useState } from 'react';
import styles from './Header.module.scss';

export type HeaderProps = {
  hideSearchBar?: boolean;
};

const Header = ({ hideSearchBar }: HeaderProps) => {
  const { user, isLoading } = useUser();
  const [screenTheme, setScreenTheme] = useState(true);

  useLayoutEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    const stringLocalTheme = JSON.stringify(localTheme);

    if (document.body.dataset.theme === undefined) {
      document.body.dataset.theme = JSON.parse(stringLocalTheme);
    }

    if (document.body.dataset.theme === 'dark') {
      setScreenTheme(false);
    }
  }, []);

  const themeHandle = () => {
    setScreenTheme(() => !screenTheme);
    if (window.localStorage.getItem('theme') === 'light') {
      window.localStorage.setItem('theme', 'dark');
      document.body.dataset.theme = 'dark';
    } else {
      window.localStorage.setItem('theme', 'light');
      document.body.dataset.theme = 'light';
    }
  };

  return (
    <header className={styles.header} data-testid="header">
      <div className={styles.container}>
        <Link href="/">
          <a aria-label="홈" className={styles.logo}>
            creddit
          </a>
        </Link>
        {!isLoading && (
          <>
            {!hideSearchBar && <SearchBar />}
            <button
              className={styles.hoverElement}
              onClick={themeHandle}
              aria-label={
                screenTheme
                  ? '색상 모드 변경(현재 밝은 모드)'
                  : '색상 모드 변경(현재 어두운 모드)'
              }
            >
              {screenTheme ? <SunOutline /> : <MoonOutline />}
            </button>
            {user && (
              <Link href="/create-post">
                <a className={styles.hoverElement} aria-label="글 작성">
                  <EditOutline />
                </a>
              </Link>
            )}
            <a
              className={styles.githubLink}
              aria-label="깃허브 저장소"
              href="https://github.com/project-creddit"
            >
              <Github />
            </a>
            {user ? (
              <AccountMenu />
            ) : (
              <>
                <Link href="/login">
                  <a className={styles.authLink}>로그인</a>
                </Link>
                <Link href="/signup">
                  <a className={styles.authLink}>회원가입</a>
                </Link>
              </>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
