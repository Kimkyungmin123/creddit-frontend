import Dropdown from 'components/Dropdown';
import ProfileImage from 'components/ProfileImage';
import SearchBar from 'components/SearchBar';
import { CaretDown, EditOutline, Github, MoonOutline, SunOutline } from 'icons';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeCommentsLike } from 'slices/commentsSlice';
import { removePostDetailLike } from 'slices/postDetailSlice';
import { setTheme, useTheme } from 'slices/themeSlice';
import { logout, useUser } from 'slices/userSlice';
import { Theme } from 'types';
import styles from './Header.module.scss';

export type HeaderProps = {
  hideSearchBar?: boolean;
};

const Header = ({ hideSearchBar }: HeaderProps) => {
  const router = useRouter();
  const user = useUser();
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
                  onClick: () => {
                    dispatch(logout());
                    dispatch(removePostDetailLike());
                    dispatch(removeCommentsLike());
                  },
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
