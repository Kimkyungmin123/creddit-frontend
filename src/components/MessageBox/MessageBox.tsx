import styles from './MessageBox.module.scss';
import Image from 'next/image';
import profile from 'images/profileImg.png';

export type MessageBoxProps = {
  interlocutorName: string;
  content: string;
  time: string;
  isMe: boolean;
  isManager: boolean;
  chatManager: any;
  senderProfileImg?: string;
};

const MessageBox = ({
  interlocutorName,
  content,
  time,
  isMe,
  chatManager,
  isManager,
  senderProfileImg,
}: MessageBoxProps) => {
  return (
    <>
      {chatManager}
      {!isManager &&
        (!isMe ? (
          <div className={styles.messageBox}>
            <div className={styles.profileImg}>
              {senderProfileImg ? (
                <Image src={senderProfileImg} alt="상대방 프로필 이미지" />
              ) : (
                <Image src={profile} alt="상대방 프로필 이미지" />
              )}
            </div>

            <div className={styles.messageContent}>
              <div className={styles.middleContent}>
                <span>{interlocutorName}</span>
                <div className={styles.textContainer}>
                  <div className={styles.textBox}>{content}</div>
                  <div className={styles.time}>{time}</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.isMeMessageBox}>
            <div className={styles.isMeMessageContent}>
              <div className={styles.textBox}>{content}</div>
            </div>
            <div className={styles.time}>{time}</div>
          </div>
        ))}
    </>
  );
};
export default MessageBox;
