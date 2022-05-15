import styles from './MessageBox.module.scss';
import Image from 'next/image';
import profile from 'images/profileImg.png';
import { useEffect, useRef } from 'react';

// import SendMessageDate from 'components/SendMessageDate';

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
  const chatFocus = useRef<HTMLDivElement | null>(null);

  // const week = ['일', '월', '화', '수', '목', '금', '토'];

  // const date = `${new Date().getFullYear()}년 ${
  //   new Date().getMonth() + 1
  // }월 ${new Date().getDate()}일 ${week[new Date().getDay()]}요일 `;

  useEffect(() => {
    if (chatFocus.current) {
      chatFocus.current.scrollTo({
        top: chatFocus.current.scrollHeight,
        behavior: 'smooth',
      });
    }
    chatFocus.current?.focus();
    console.log(chatFocus.current?.scrollHeight);
  }, [chatFocus]);

  return (
    <>
      {chatManager}
      {!isManager &&
        (!isMe ? (
          <div className={styles.messageBox} ref={chatFocus}>
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
          <div className={styles.isMeMessageBox} ref={chatFocus}>
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
