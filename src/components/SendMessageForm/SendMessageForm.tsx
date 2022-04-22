import { useCallback, useRef, useState } from 'react';
import styles from './SendMessageForm.module.scss';

const SendMessageForm = () => {
  const [typingMsg, setTypingMsg] = useState<string>('');
  const handleTypingMessage = useCallback((e) => {
    setTypingMsg(e.target.value);
  }, []);
  const handleSendMessage = useCallback(() => {
    const nonContent = typingMsg.trim() === '';
    if (nonContent) {
      return;
    }
    setTypingMsg('');
  }, [typingMsg]);

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSendMessage();
    }
  };
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleResizeHeight = useCallback(() => {
    if (ref === null || ref.current === null) {
      return;
    }
    ref.current.style.height = ref.current.scrollHeight + 'px';
  }, []);

  return (
    <form className={styles.sendMessageFormBox}>
      <textarea
        ref={ref}
        value={typingMsg}
        onChange={handleTypingMessage}
        onKeyUp={handleKeyUp}
        onInput={handleResizeHeight}
      />
      <button
        onClick={handleSendMessage}
        aria-label="메시지 전송"
        type="submit"
      >
        전송
      </button>
    </form>
  );
};
export default SendMessageForm;
