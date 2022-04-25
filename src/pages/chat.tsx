import ChatBox from 'components/ChatListBox';
import Layout from 'components/Layout';
import MessageBox from 'components/MessageBox';
import SendMessageForm from 'components/SendMessageForm';
import type { NextPage } from 'next';
import styles from 'styles/Chat.module.scss';
// import SockJS from 'sockjs-client';
// import { over } from 'stompjs';
// import { useEffect, useState } from 'react';

const Chat: NextPage = () => {
  // let client: any = null;
  // const [privateChats, setPrivateChats] = useState(new Map());
  // const [chatData, setChatData] = useState({
  //   username: '',
  //   receivername: '',
  //   connected: false,
  //   message: '',
  // });

  // useEffect(() => {
  //   connect();
  //   return () => client.deactivate();
  // }, []);

  // const connect = () => {
  //   const socket = new SockJS('ws:http://localhost:8080/ws');
  //   client = over(socket);
  //   client.connect({}, onConnected, onError);
  // };

  // const onConnected = () => {
  //   setChatData({ ...chatData, connected: true });
  //   client.subscribe('//' + chatData.username + '/', onPrivateMessage);
  // };

  // const onError = (err: Error) => {
  //   console.log(err);
  // };

  // const onPrivateMessage = (payload: any) => {
  //   console.log(payload);
  //   const payloadData = JSON.parse(payload.body);
  // };

  // const handleMessage = (event: any) => {
  //   const { value } = event.target;
  //   setChatData({ ...chatData, message: value });
  // };

  // const sendPrivateValue = () => {
  //   if (client) {
  //     const chatMessage = {
  //       senderName: chatData.username,
  //       receiverName: chatData.receivername,
  //       message: chatData.message,
  //     };

  //     client.send('/', {}, JSON.stringify(chatMessage));
  //     setChatData({ ...chatData, message: '' });
  //   }
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
              content="Zzz대화중입니다....ZZzz"
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
              // sendPrivateValue();
            }}
            // onChange={handleMessage}
            // value={chatData.message}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
