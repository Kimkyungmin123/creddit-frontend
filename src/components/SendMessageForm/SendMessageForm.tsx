import { useState } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';
import styles from './SendMessageForm.module.scss';

const SendMessageForm = () => {
  const [typingMsg, setTypingMsg] = useState<string>('');

  const handleSendMessage = () => {
    const nonContent = typingMsg.trim() === '';
    if (nonContent) {
      return;
    }
    setTypingMsg('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSendMessage();
      e.preventDefault();
    }
  };

  return (
    <form
      className={styles.sendMessageFormBox}
      onSubmit={(e) => {
        handleSendMessage();
        e.preventDefault();
      }}
    >
      <ReactTextareaAutosize
        value={typingMsg}
        onChange={(e) => {
          setTypingMsg(e.target.value);
        }}
        onKeyDown={handleKeyDown}
      />

      <button aria-label="메시지 전송" type="submit">
        전송
      </button>
    </form>
  );
};
export default SendMessageForm;
