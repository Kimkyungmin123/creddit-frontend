import AccoutMenuDetail from 'components/AccountMenuDetail';
import ProfileImage from 'components/ProfileImage';
import { CaretDown } from 'icons';
import { useEffect, useState } from 'react';
import { User } from 'types';
import styles from './AccountMenu.module.scss';

export type AccountMenuProps = {
  user: User;
};

function AccountMenu({ user }: AccountMenuProps) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (expanded && event.key === 'Escape') {
        setExpanded(false);
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [expanded]);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (expanded && !target.closest(`.${styles.accountMenu}`)) {
        setExpanded(false);
      }
    };
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, [expanded]);

  return (
    <div data-testid="account-menu" className={styles.accountMenu}>
      <button
        className={styles.accountMenuButton}
        aria-expanded={expanded ? 'true' : 'false'}
        aria-label="계정 메뉴"
        onClick={() => setExpanded((prev) => !prev)}
      >
        <ProfileImage imgUrl={user.image.imgUrl} size={1.875} />
        <CaretDown />
      </button>
      {expanded && <AccoutMenuDetail onClick={() => setExpanded(false)} />}
    </div>
  );
}

export default AccountMenu;
