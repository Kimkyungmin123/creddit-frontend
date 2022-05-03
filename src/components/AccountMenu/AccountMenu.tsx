import AccoutMenuDetail from 'components/AccountMenuDetail';
import { CaretDown } from 'icons';
import profile from 'images/profileImg.png';
import Image from 'next/image';
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
        <div className={styles.imageContainer}>
          <Image
            src={user.image.imgUrl || profile}
            alt="사용자 프로필 이미지"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <CaretDown />
      </button>
      {expanded && <AccoutMenuDetail onClick={() => setExpanded(false)} />}
    </div>
  );
}

export default AccountMenu;
