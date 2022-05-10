import classNames from 'classnames';
import Link from 'next/link';
import { ReactNode } from 'react';
import styles from './ButtonLink.module.scss';

export type ButtonLinkProps = {
  children: ReactNode;
  href: string;
  round?: boolean;
};

function ButtonLink({ children, href, round }: ButtonLinkProps) {
  return (
    <Link href={href}>
      <a className={classNames(styles.buttonLink, round && styles.round)}>
        {children}
      </a>
    </Link>
  );
}

export default ButtonLink;
