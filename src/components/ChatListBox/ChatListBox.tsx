import Image from 'next/image';
import styles from './ChatListBox.module.scss';
import profileImg from 'images/profileImg.png';

export type ChatListBoxProps = {
  interlocutorName: string;
  lastMessage: string;
  sentDate: string;
  onClick?: (id: React.MouseEvent<HTMLDivElement>) => void;
};

const ChatListBox = ({
  interlocutorName,
  lastMessage,
  sentDate,
  onClick,
}: ChatListBoxProps) => {
  return (
    <div className={styles.ChatBox} onClick={onClick}>
      <div className={styles.profileImg}>
        <Image src={profileImg} alt="프로필 이미지" />
      </div>
      <div className={styles.chatContent}>
        <div>{interlocutorName}</div>
        <div className={styles.lastMessage}>{lastMessage}</div>
      </div>
      <div className={styles.sentDate}>{sentDate}</div>
    </div>
  );
};

export default ChatListBox;
