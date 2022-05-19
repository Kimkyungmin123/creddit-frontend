import styles from './ChatManager.module.scss';

export type ChatManagerProps = {
  managerMessage: string;
  time: string;
};

const ChatManager = ({ managerMessage, time }: ChatManagerProps) => {
  return (
    <div className={styles.chatManager}>
      <h2>{managerMessage}</h2>
      <span>{time}</span>
    </div>
  );
};

export default ChatManager;
