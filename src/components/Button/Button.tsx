import { MouseEventHandler, ReactNode } from 'react';
import styles from './Button.module.scss';

export type ButtonProps = {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  ariaLabel?: string;
};

function Button({
  children,
  type,
  onClick,
  disabled,
  ariaLabel,
  ...props
}: ButtonProps) {
  return (
    <button
      className={styles.button}
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
