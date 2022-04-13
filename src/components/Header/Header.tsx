import useUser from 'hooks/useUser';
import { EditOutline, Github, MoonOutline, Search, SunOutline } from 'icons';
import Link from 'next/link';
import { useLayoutEffect, useState } from 'react';
import styles from './Header.module.scss';

type HeaderProps = {
  hideSearchBar?: boolean;
};

const Header = ({ hideSearchBar }: HeaderProps) => {
  const { user, isLoading, logout } = useUser();
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
    <header className={styles.headerContainer} data-testid="header">
      <div className={styles.headerbox}>
        <div className={styles.headerLogo}>
          <Link href="/">
            <a>creddit</a>
          </Link>
        </div>
        {!hideSearchBar && (
          <div className={styles.headerPostSearch} data-testid="search-bar">
            <Search className={styles.searchIcon} />
            <input type="text" placeholder="검색" />
          </div>
        )}
        <div className={styles.headerNav}>
          <div className={styles.modeIcon} onClick={themeHandle}>
            {screenTheme ? (
              <button aria-label="색상 모드 변경(현재 어두운 모드)">
                <MoonOutline />
              </button>
            ) : (
              <button aria-label="색상 모드 변경(현재 밝은 모드)">
                <SunOutline />
              </button>
            )}
          </div>
          <div className={styles.editOutlineIcon}>
            <Link href="/create-post">
              <a aria-label="글 작성">
                <EditOutline />
              </a>
            </Link>
          </div>
          <div>
            <a
              aria-label="깃허브 저장소"
              href="https://github.com/project-creddit/creddit-frontend"
            >
              <Github />
            </a>
          </div>
          {!isLoading && (
            <>
              {user ? (
                <>
                  <div>{user.nickname}</div>
                  <button onClick={logout} className={styles.logoutButton}>
                    로그아웃
                  </button>
                </>
              ) : (
                <>
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
                </>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
