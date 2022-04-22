import classNames from 'classnames';
import { ChangeEventHandler } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styles from './Textarea.module.scss';

export type TextareaProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  placeholder: string;
  name?: string;
  resizable?: boolean;
  minRows?: number;
};

function Textarea({
  value,
  onChange,
  placeholder,
  name,
  resizable,
  minRows,
}: TextareaProps) {
  return (
    <TextareaAutosize
      className={classNames(
        styles.Textarea,
        resizable === false && styles.notResizable
      )}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      minRows={minRows}
    />
  );
}

export default Textarea;
