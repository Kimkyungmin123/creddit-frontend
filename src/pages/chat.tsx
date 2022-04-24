import ChatBox from 'components/ChatListBox';
import Layout from 'components/Layout';
import MessageBox from 'components/MessageBox';
import SendMessageForm from 'components/SendMessageForm';
import type { NextPage } from 'next';
import styles from 'styles/Chat.module.scss';
// import SockJS from 'sockjs-client';
// import * as StompJS from '@stomp/stompjs';
// import { useEffect, useState } from 'react';

const Chat: NextPage = () => {
  // const [chatMessages, setChatMessages] = useState([]);
  // const [message, setMessage] = useState('');
  // const client = new StompJS.Client();

  // useEffect(() => {
  //   connect();
  //   return () => disconnect();
  // }, []);

  // const connect = () => {
  //   const client = new StompJS.Client({
  //     brokerURL: 'ws:http://localhost:8080/chat', // endpoint
  //     connectHeaders: {},
  //     debug: function (str) {
  //       console.log(str);
  //     },
  //     reconnectDelay: 5000,
  //     heartbeatIncoming: 4000,
  //     heartbeatOutgoing: 4000,
  //   });

  //   client.onConnect = () => {
  //     // Do something, all subscribes must be done is this callback
  //     // This is needed because this will be executed after a (re)connect
  //   };

  //   client.onStompError = (frame) => {
  //     // Will be invoked in case of error encountered at Broker
  //     // Bad login/passcode typically will cause an error
  //     // Complaint brokers will set `message` header with a brief message. Body may contain details.
  //     // Compliant brokers will terminate the connection after any error
  //     console.error(frame);
  //   };

  //   client.activate();
  // };

  // const disconnect = () => {
  //   client.deactivate();
  // };

  // // const subscribe = () => {
  // //   client.subscribe(` `, ({ body }) => {

  // //   });
  // // };

  // const publish = () => {
  //   if (!client.connected) {
  //     return;
  //   }

  //   client.publish({
  //     destination: ' ',
  //     body: '',
  //   });

  //   setMessage('');
  // };

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
              // content={message}
              content="안녕하세요요요요요요요요요요요
              대화중입니다....ZZzzZZzz대화중입니다....ZZzzZZzz대화중입니
              다....ZZzzZZzz대화중입니다....ZZzzZZzz대화중입니다....ZZzz
              ZZzz
              12:05"
              time="12:05"
              isMe={true}
            />
            <MessageBox
              interlocutorName="김개발"
              // content={message}
              content="안녕하세요요요요요요요요요요요
              대화중입니다....ZZzzZZzz대화중입니다....ZZzzZZzz대화중입니
              다....ZZzzZZzz대화중입니다....ZZzzZZzz대화중입니다....ZZzz
              ZZzz
              12:05"
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
          </div>
          <SendMessageForm
            onSubmit={() => {
              console.log('ok');
              // publish()
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
