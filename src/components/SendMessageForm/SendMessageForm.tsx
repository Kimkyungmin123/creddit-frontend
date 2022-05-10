import ReactTextareaAutosize from 'react-textarea-autosize';
import styles from './SendMessageForm.module.scss';

export type SendMessageFormProps = {
  onSubmit: (e: any) => void;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  value?: string;
};

const SendMessageForm = ({
  onSubmit,
  onChange,
  value,
}: SendMessageFormProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  return (
    <form className={styles.sendMessageFormBox} onSubmit={onSubmit}>
      <ReactTextareaAutosize
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />

      <button aria-label="메시지 전송" type="submit">
        전송
      </button>
    </form>
  );
};
export default SendMessageForm;
