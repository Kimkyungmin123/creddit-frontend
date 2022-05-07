import classNames from 'classnames';
import Link from 'next/link';
import { MouseEventHandler, RefObject, useEffect } from 'react';
import styles from './DropdownDetail.module.scss';

export interface Option {
  name: string;
  href?: string;
  onClick?: () => void;
}

export type DropdownDetailProps = {
  parent: { className: string; ref: RefObject<HTMLDivElement> };
  onClick: MouseEventHandler<HTMLUListElement>;
  options: Option[];
  fullWidth?: boolean;
};

function DropdownDetail({
  parent,
  onClick,
  options,
  fullWidth,
}: DropdownDetailProps) {
  useEffect(() => {
    const moveFocus = (event: KeyboardEvent) => {
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
      const p = document.activeElement?.closest(`.${parent.className}`);
      if (p !== parent.ref.current) return;

      event.preventDefault();
      if (event.key === 'ArrowDown') moveDown();
      else if (event.key === 'ArrowUp') moveUp();
    };
    window.addEventListener('keydown', moveFocus);
    return () => window.removeEventListener('keydown', moveFocus);
  }, [parent]);

  return (
    <ul
      className={classNames(styles.container, fullWidth && styles.fullWidth)}
      data-testid="dropdown-detail"
      onClick={onClick}
    >
      {options.map(({ name, href, onClick }, index) => (
        <li key={index}>
          {href ? (
            <Link href={href}>
              <a onClick={onClick}>{name}</a>
            </Link>
          ) : (
            <button onClick={onClick}>{name}</button>
          )}
        </li>
      ))}
    </ul>
  );
}

const hasFocused = () =>
  document.activeElement?.closest(`.${styles.container}`);

const focusFirst = () => {
  const container = document.querySelector(`.${styles.container}`);
  (container?.firstChild?.firstChild as HTMLElement).focus();
};

const focusLast = () => {
  const container = document.querySelector(`.${styles.container}`);
  (container?.lastChild?.firstChild as HTMLElement).focus();
};

const moveDown = () => {
  if (!hasFocused()) {
    focusFirst();
  } else {
    const li = document.activeElement?.closest('li');
    if (li?.nextElementSibling) {
      (li.nextElementSibling.firstChild as HTMLElement).focus();
    } else {
      focusFirst();
    }
  }
};

const moveUp = () => {
  if (!hasFocused()) {
    focusLast();
  } else {
    const li = document.activeElement?.closest('li');
    if (li?.previousElementSibling) {
      (li.previousElementSibling.firstChild as HTMLElement).focus();
    } else {
      focusLast();
    }
  }
};

export default DropdownDetail;
