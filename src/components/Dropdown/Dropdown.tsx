import DropdownDetail from 'components/DropdownDetail';
import { Option } from 'components/DropdownDetail/DropdownDetail';
import { ReactNode, useEffect, useRef, useState } from 'react';
import styles from './Dropdown.module.scss';

export type DropdownProps = {
  children: ReactNode;
  options: Option[];
  ariaLabel?: string;
  fullWidth?: boolean;
};

function Dropdown({ children, options, ariaLabel, fullWidth }: DropdownProps) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
      if (expanded && target.closest(`.${styles.dropdown}`) !== ref.current) {
        setExpanded(false);
      }
    };
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, [expanded]);

  return (
    <div data-testid="dropdown" className={styles.dropdown} ref={ref}>
      <button
        className={styles.dropdownButton}
        aria-expanded={expanded ? true : false}
        aria-label={ariaLabel}
        onClick={() => setExpanded((prev) => !prev)}
      >
        {children}
      </button>
      {expanded && (
        <DropdownDetail
          parent={{ className: styles.dropdown, ref }}
          onClick={() => setExpanded(false)}
          options={options}
          fullWidth={fullWidth}
        />
      )}
    </div>
  );
}

export default Dropdown;
