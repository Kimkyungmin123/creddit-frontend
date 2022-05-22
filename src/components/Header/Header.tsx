import classNames from 'classnames';
import SearchBar from 'components/SearchBar';
import UserDropdown from 'components/UserDropdown';
import {
  Close,
  EditOutline,
  Github,
  Menu,
  MoonOutline,
  SunOutline,
} from 'icons';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTheme, useTheme } from 'slices/themeSlice';
import { useUser } from 'slices/userSlice';
import { Theme } from 'types';
import styles from './Header.module.scss';

export type HeaderProps = {
  hideSearchBar?: boolean;
};

function Header({ hideSearchBar }: HeaderProps) {
  const dispatch = useDispatch();
  const theme = useTheme();

  useLayoutEffect(() => {
    if (theme) {
      document.body.dataset.theme = theme;
      return;
    }

    const set = (t: Theme) => {
      dispatch(setTheme(t));
      document.body.dataset.theme = t;
    };

    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      set('light');
    } else {
      set('dark');
    }
  }, [theme, dispatch]);

  return (
    <div data-testid="header" className={styles.headerContainer}>
      <HeaderDesktop hideSearchBar={hideSearchBar} />
      <HeaderMobile />
    </div>
  );
}

export function HeaderDesktop({ hideSearchBar }: HeaderProps) {
  const user = useUser();

  return (
    <header className={classNames(styles.header, styles.headerDesktop)}>
      <div className={styles.container}>
        <Link href="/">
          <a aria-label="홈" className={styles.logo}>
            creddit
          </a>
        </Link>
        <>
          {hideSearchBar ? <div style={{ flexGrow: 1 }}></div> : <SearchBar />}
          <ThemeButton />
          {user && (
            <Link href="/create-post">
              <a className={styles.hoverElement} aria-label="글 작성">
                <EditOutline />
              </a>
            </Link>
          )}
          <GitHubLink />
          {user ? (
            <UserDropdown user={user} />
          ) : (
            <>
              <LoginButton />
              <SignupButton />
            </>
          )}
        </>
      </div>
    </header>
  );
}

function HeaderMobile() {
  const user = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [isMenuOpen]);

  useEffect(() => {
    const resizeEvent = () => {
      setIsMenuOpen(false);
    };
    window.addEventListener('resize', resizeEvent);
    return () => window.removeEventListener('resize', resizeEvent);
  }, []);

  return (
    <>
      <header className={classNames(styles.header, styles.headerMobile)}>
        <button
          className={styles.menuButton}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? <Close /> : <Menu />}
        </button>
        <Link href="/">
          <a aria-label="홈" className={styles.logo}>
            creddit
          </a>
        </Link>
        {user ? (
          <UserDropdown user={user} />
        ) : (
          <div className={styles.fragment}></div>
        )}
      </header>
      {isMenuOpen && (
        <div className={styles.menu}>
          <SearchBar />
          <div className={styles.menuBottom}>
            <ThemeButton />
            {user ? (
              <Link href={`/profile/${user.nickname}`}>
                <a>{user.nickname}</a>
              </Link>
            ) : (
              <div className={styles.authButtons}>
                <LoginButton />
                /
                <SignupButton />
              </div>
            )}
            <GitHubLink />
          </div>
        </div>
      )}
    </>
  );
}

function LoginButton() {
  const router = useRouter();
  return (
    <Link href="/login">
      <a
        className={styles.authLink}
        onClick={() => {
          if (router.asPath !== '/login') {
            sessionStorage.setItem('prevUrl', router.asPath);
          }
        }}
      >
        로그인
      </a>
    </Link>
  );
}

const SignupButton = () => (
  <Link href="/signup">
    <a className={styles.authLink}>회원가입</a>
  </Link>
);

function ThemeButton() {
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <button
      className={styles.hoverElement}
      onClick={() => {
        const set = (t: Theme) => {
          dispatch(setTheme(t));
          Cookies.set('theme', t, { expires: 10 * 365 });
          document.body.dataset.theme = t;
        };

        if (theme === 'light') set('dark');
        else if (theme === 'dark') set('light');
      }}
      aria-label={
        theme === 'light'
          ? '색상 모드 변경(현재 밝은 모드)'
          : '색상 모드 변경(현재 어두운 모드)'
      }
    >
      {theme === 'light' ? <SunOutline /> : <MoonOutline />}
    </button>
  );
}

const GitHubLink = () => (
  <a
    className={styles.githubLink}
    aria-label="깃허브 저장소"
    href="https://github.com/project-creddit"
  >
    <Github />
  </a>
);

export default Header;
