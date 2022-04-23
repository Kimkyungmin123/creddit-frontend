import ChatBox from 'components/ChatListBox';
import Layout from 'components/Layout';
import MessageBox from 'components/MessageBox';
import SendMessageForm from 'components/SendMessageForm';
import type { NextPage } from 'next';
import styles from 'styles/Chat.module.scss';
// import SockJS from 'sockjs-client';
// import * as stomp from 'stompjs';

const Chat: NextPage = () => {
  //   const client = new stomp.Client({
  //     brokerURL: ' ', // endpoint
  //     connectHeaders: {
  //     },
  //     debug: function (str) {
  //       console.log(str);
  //     },
  //     reconnectDelay: 5000, //자동 재 연결
  //     heartbeatIncoming: 4000,
  //     heartbeatOutgoing: 4000,
  //   });

  //   //연결 실행
  //   client.onConnect = function (frame) {
  //     console.log('connetion opend.');
  //   };

  //   //에러처리
  //   client.onStompError = function (frame) {
  //     console.log('Broker reported error: ' + frame.headers['message']);
  //     console.log('Additional details: ' + frame.body);
  //   };

  //   //클라이언트 활성화
  //   client.activate();

  //   //비활성화
  //   client.deactivate();

  return (
    <Layout title="creddit: Chat">
      <div className={styles.chatContainer}>
        <div className={styles.chatBox}>
          <ChatBox
            interlocutorName="김개발"
            lastMessage="뭐해 ??"
            sentDate="21:20"
          />
        </div>
        <div className={styles.messageform}>
          <div className={styles.messageBox}>
            <div className={styles.beginChatDate}>2022년 4월 5일 화요일</div>
            <MessageBox
              interlocutorName="김개발"
              content="안녕하세요요요요요요요요요요요
대화중입니다....ZZzzZZzz대화중입니다....ZZzzZZzz대화중입니
다....ZZzzZZzz대화중입니다....ZZzzZZzz대화중입니다....ZZzz
ZZzz"
              time="12:05"
              isMe={true}
            />
            <div className={styles.beginChatDate}>2022년 4월 5일 화요일</div>
            <MessageBox
              interlocutorName="김개발"
              content="안zzZZzz대화중입니다....ZZzz
ZZzz"
              time="12:05"
              isMe={false}
            />
            <MessageBox
              interlocutorName="김개발"
              content="안녕하세요요요요요요요요요요요
대화중입니다....ZZzzZZzz대화중입니다....ZZzzZZzz대화중입니
다....ZZzzZZzz대화중입니다....ZZzzZZzz대화중입니다....ZZzz
ZZzz"
              time="12:05"
              isMe={false}
            />
            <MessageBox
              interlocutorName="김개발"
              content="안녕하세요요요요요요요요요요요
대화중입니다....ZZzzZZzz대화중입니다....ZZzzZZzz대화중입니
다....ZZzzZZzz대화중입니다....ZZzzZZzz대화중입니다....ZZzz
ZZzz"
              time="12:05"
              isMe={false}
            />
            <MessageBox
              interlocutorName="김개발"
              content="안녕하세요요요요요요요요요요요
대화중입니다....ZZzzZZzz대화중입니다....ZZzzZZzz대화중입니
다....ZZzzZZzz대화중입니다....ZZzzZZzz대화중입니다....ZZzz
ZZzz"
              time="12:05"
              isMe={false}
            />
            <MessageBox
              interlocutorName="김개발"
              content="안녕하세요요요요요요요요요요요
대화중입니다....ZZzzZZzz대화중입니다....ZZzzZZzz대화중입니
다....ZZzzZZzz대화중입니다....ZZzzZZzz대화중입니다....ZZzz
ZZzz"
              time="12:05"
              isMe={false}
            />
          </div>
          <SendMessageForm />
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
