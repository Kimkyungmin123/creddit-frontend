import Header from 'components/Header';
import Head from 'next/head';
import type { ReactNode } from 'react';
import styles from './Layout.module.css';

type Props = {
  children?: ReactNode;
  title?: string;
  type: 'post' | 'account';
};

const Layout = ({ children, title, type }: Props) => {
  return (
    <div className={styles.container} data-testid="layout">
      <Head>
        <title>{title}</title>
      </Head>
      <Header type={type} />
      {children}
    </div>
  );
};

export default Layout;
