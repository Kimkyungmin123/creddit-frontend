import classNames from 'classnames';
import { ChangeEventHandler, FocusEventHandler } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styles from './Textarea.module.scss';

export type TextareaProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  placeholder: string;
  name?: string;
  resizable?: boolean;
  minRows?: number;
  maxLength?: number;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
  autoFocus?: boolean;
};

function Textarea({
  value,
  onChange,
  placeholder,
  name,
  resizable,
  minRows,
  maxLength,
  onBlur,
  autoFocus,
}: TextareaProps) {
  return (
    <div className={styles.container}>
      <TextareaAutosize
        className={classNames(
          styles.textarea,
          resizable === false && styles.notResizable,
          maxLength && styles.hasMaxLength
        )}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        minRows={minRows}
        maxLength={maxLength}
        onBlur={onBlur}
        autoFocus={autoFocus}
        onFocus={(event) => {
          event.target.setSelectionRange(value.length, value.length);
        }}
      />
      {maxLength && (
        <p className={styles.length}>
          {value.length}/{maxLength}
        </p>
      )}
    </div>
  );
}

export default Textarea;
