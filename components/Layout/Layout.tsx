import Head from 'next/head';
import type { ReactNode } from 'react';
import styles from './Layout.module.css';
import Header from '../Header';

type Props = {
  children?: ReactNode;
  title?: string;
  type: 'post' | 'account';
};

const Layout = ({ children, title, type }: Props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
      </Head>
      {type === 'post' && <Header type="post" />}
      {type === 'account' && <Header type="account" />}
      {children}
    </div>
  );
};

export default Layout;
