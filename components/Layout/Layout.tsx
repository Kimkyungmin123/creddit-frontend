import Head from 'next/head';
import type { ReactNode } from 'react';
import styles from './Layout.module.css';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title }: Props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </div>
  );
};

export default Layout;
