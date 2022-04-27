import Link from 'next/link';
import { ReactNode } from 'react';
import styles from './ButtonLink.module.scss';

export type ButtonLinkProps = {
  children: ReactNode;
  href: string;
};

function ButtonLink({ children, href }: ButtonLinkProps) {
  return (
    <Link href={href}>
      <a className={styles.buttonLink}>{children}</a>
    </Link>
  );
}

export default ButtonLink;
