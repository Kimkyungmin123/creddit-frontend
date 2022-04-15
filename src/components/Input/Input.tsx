import classNames from 'classnames';
import {
  ChangeEventHandler,
  FocusEventHandler,
  HTMLInputTypeAttribute,
  useState,
} from 'react';
import styles from './Input.module.scss';

export type InputProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  name?: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  error?: string | false;
};

function Input({
  value,
  onChange,
  placeholder,
  type,
  name,
  onBlur,
  error,
}: InputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div className={styles.inputBox}>
      <label
        className={classNames(
          styles.label,
          (focused || value) && styles.filling
        )}
      >
        <span>{placeholder}</span>
        <input
          className={styles.input}
          value={value}
          onChange={onChange}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={(event) => {
            setFocused(false);
            if (onBlur) onBlur(event);
          }}
          type={type}
          name={name}
        />
      </label>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default Input;
