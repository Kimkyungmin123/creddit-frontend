import Dropdown from 'components/Dropdown';
import ProfileImage from 'components/ProfileImage';
import SearchBar from 'components/SearchBar';
import { CaretDown, EditOutline, Github, MoonOutline, SunOutline } from 'icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout, useUser } from 'slices/userSlice';
import styles from './Header.module.scss';

export type HeaderProps = {
  hideSearchBar?: boolean;
};

const Header = ({ hideSearchBar }: HeaderProps) => {
  const [screenTheme, setScreenTheme] = useState(true);
  const router = useRouter();
  const user = useUser();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    const stringLocalTheme = JSON.stringify(localTheme);
    const userSetTheme = window.matchMedia(
      '(prefers-color-scheme: light)'
    ).matches;

    if (document.body.dataset.theme === undefined) {
      document.body.dataset.theme = JSON.parse(stringLocalTheme);
      userSetTheme ? setScreenTheme(true) : setScreenTheme(false);
    }
    if (window.localStorage.getItem('theme') === null) {
      userSetTheme
        ? window.localStorage.setItem('theme', 'light')
        : window.localStorage.setItem('theme', 'dark');
    }

    if (document.body.dataset.theme === 'dark') {
      setScreenTheme(false);
    }

    if (document.body.dataset.theme === 'light') {
      setScreenTheme(true);
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
        <>
          {hideSearchBar ? <div style={{ flexGrow: 1 }}></div> : <SearchBar />}
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
            <Dropdown
              ariaLabel="계정 메뉴"
              options={[
                { name: '프로필', href: `/profile/${user.nickname}` },
                { name: '새 글 작성', href: '/create-post' },
                { name: '대화 목록', href: '/chat' },
                {
                  name: '로그아웃',
                  onClick: () => dispatch(logout()),
                },
              ]}
            >
              <ProfileImage imgUrl={user.image.imgUrl} size={1.875} />
              <CaretDown />
            </Dropdown>
          ) : (
            <>
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
              <Link href="/signup">
                <a className={styles.authLink}>회원가입</a>
              </Link>
            </>
          )}
        </>
      </div>
    </header>
  );
};

export default Header;
