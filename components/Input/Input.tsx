import { ChangeEventHandler, HTMLInputTypeAttribute, useState } from 'react';
import styles from './Input.module.scss';
import classnames from 'classnames';

export type InputProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
};

function Input({ value, onChange, placeholder, type }: InputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <label
      className={classnames(styles.label, (focused || value) && styles.filling)}
    >
      <span>{placeholder}</span>
      <input
        className={styles.input}
        value={value}
        onChange={onChange}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
        }}
        type={type}
      />
    </label>
  );
}

export default Input;
