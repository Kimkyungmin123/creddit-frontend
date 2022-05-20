import Image from 'next/image';
import styles from './ChatListBox.module.scss';
import profileImg from 'images/profileImg.png';

export type ChatListBoxProps = {
  interlocutorName: string;
  lastMessage: string;
  sentDate: string;
  senderProfileImg: string | null;
  sendMessageData?: {
    message: string;
    sender: string;
    receiver: string;
    createdDate: string;
  };

  onClick?: (id: React.MouseEvent<HTMLDivElement>) => void;
};
const CONTENT_MAX_LENGTH = 35;

const ChatListBox = ({
  interlocutorName,
  lastMessage,
  sentDate,
  onClick,
  sendMessageData,
  senderProfileImg,
}: ChatListBoxProps) => {
  {
    sendMessageData;
  }
  return (
    <div className={styles.ChatBox} onClick={onClick}>
      <div className={styles.profileImg}>
        {senderProfileImg ? (
          <Image
            src={senderProfileImg}
            alt="프로필 이미지"
            width={200}
            height={200}
          />
        ) : (
          <Image src={profileImg} alt="프로필 이미지" />
        )}
      </div>
      <div className={styles.chatContent}>
        <div>{interlocutorName}</div>
        <div className={styles.lastMessage}>
          {lastMessage
            ? lastMessage.length > CONTENT_MAX_LENGTH
              ? `${lastMessage.slice(0, CONTENT_MAX_LENGTH)} ...`
              : lastMessage
            : ''}
        </div>
      </div>
      <div className={styles.sentDate}>{sentDate}</div>
    </div>
  );
};

export default ChatListBox;
