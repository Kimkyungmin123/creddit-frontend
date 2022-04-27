import classNames from 'classnames';
import Header from 'components/Header';
import Head from 'next/head';
import { ReactNode } from 'react';
import styles from './Layout.module.scss';

export type LayoutProps = {
  children: ReactNode;
  title?: string;
  hideSearchBar?: boolean;
  backgroundColor?: 'base' | 'clean';
};

const Layout = ({
  children,
  title,
  hideSearchBar,
  backgroundColor = 'base',
}: LayoutProps) => {
  return (
    <div
      className={classNames(
        styles.container,
        backgroundColor === 'clean' && styles.clean
      )}
      data-testid="layout"
    >
      <Head>
        <title>{title || 'creddit'}</title>
      </Head>
      <Header hideSearchBar={hideSearchBar} />
      <div className={styles.childrenContainer}>{children}</div>
    </div>
  );
};

export default Layout;
