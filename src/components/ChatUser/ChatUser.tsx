import styles from './ChatUser.module.scss';

export type ChatUserProps = {
  onSubmit: () => void;
  username: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
};

const ChatUser = ({ onSubmit, username, onChange }: ChatUserProps) => {
  return (
    <div className={styles.ChatUserBox}>
      <form action="submit" onSubmit={onSubmit}>
        <input
          type="text"
          value={username}
          onChange={() => {
            onChange;
          }}
        />
        <button>확인</button>
      </form>
    </div>
  );
};

export default ChatUser;
