import styles from './MessageBox.module.scss';
import Image from 'next/image';
import profile from 'images/profileImg.png';
// import { useEffect, useRef } from 'react';

export type MessageBoxProps = {
  interlocutorName: string;
  content: string;
  time: string;
  isMe: boolean;
  isManager: boolean;
  chatManager: any;
};

const MessageBox = ({
  interlocutorName,
  content,
  time,
  isMe,
  chatManager,
  isManager,
}: MessageBoxProps) => {
  // const chatFocus = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   if (chatFocus.current) {
  //     chatFocus.current.scrollTo({
  //       top: chatFocus.current.scrollHeight,
  //       behavior: 'smooth',
  //     });
  //   }
  //   chatFocus.current?.focus();
  //   console.log(chatFocus.current?.scrollHeight);
  // }, [chatFocus]);

  return (
    <>
      {chatManager}
      {!isManager &&
        (!isMe ? (
          <div className={styles.messageBox}>
            <div className={styles.profileImg}>
              <Image src={profile} alt="상대방 프로필 이미지" />
            </div>

            <div className={styles.messageContent}>
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
        ))}
    </>
  );
};
export default MessageBox;
