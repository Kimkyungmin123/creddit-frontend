import styles from './MessageBox.module.scss';
import Image from 'next/image';
import profile from 'images/profileImg.png';

export type MessageBoxProps = {
  interlocutorName: string;
  content: string;
  time: string;
  isMe?: boolean;
};

const MessageBox = ({
  interlocutorName,
  content,
  time,
  isMe,
}: MessageBoxProps) => {
  return (
    <>
      {!isMe ? (
        <div className={styles.MessageBox}>
          <div className={styles.profileImg}>
            <Image src={profile} alt="상대방 프로필 이미지" />
          </div>

          <div className={styles.MessageContent}>
            <div className={styles.middleContent}>
              <span>{interlocutorName}</span>
              <div className={styles.textBox}>{content}</div>
            </div>
            <span className={styles.time}>{time}</span>
          </div>
        </div>
      ) : (
        <div className={styles.isMeMessageBox}>
          <div className={styles.isMeMessageContent}>
            <div className={styles.textBox}>{content}</div>
          </div>
          <span className={styles.time}>{time}</span>
        </div>
      )}
    </>
  );
};
export default MessageBox;
