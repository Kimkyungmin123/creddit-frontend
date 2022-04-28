import ChatListBox from 'components/ChatListBox';
import Layout from 'components/Layout';
import MessageBox from 'components/MessageBox';
import SendMessageDate from 'components/SendMessageDate';
import SendMessageForm from 'components/SendMessageForm';
import type { NextPage } from 'next';
import styles from 'styles/Chat.module.scss';
// import SockJS from 'sockjs-client';
// import { Stomp } from '@stomp/stompjs';
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
  //   return () => client.disconnet();
  // }, []);

  // const connect = () => {
  //   const socket = new SockJS('ws:http://localhost:8080/ws');
  //   client = Stomp.over(socket);
  //   client.connect({}, onConnected, onError);
  // };

  // const onConnected = () => {
  //   setChatData({ ...chatData, connected: true });
  //   client.send('/app', {}, JSON.stringify(chatData.username));
  //   client.subscribe('/queue/' + chatData.username + '/', onPrivateMessage);
  // };

  // const onError = (err: Error) => {
  //   console.log(err);
  // };

  // const onPrivateMessage = (payload: any) => {
  //   console.log(payload);
  //   const payloadData = JSON.parse(payload.body);
  //   // TODO: 사용자이름 받아와서 privateChats에 payloadData 넣기
  // };

  // const handleMessage = (event) => {
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

  //     client.send('/queue', {}, JSON.stringify(chatMessage));
  //     setChatData({ ...chatData, message: '' });
  //   }
  // };

  return (
    <Layout title="creddit: Chat">
      <div className={styles.chatContainer}>
        <div className={styles.chatBox}>
          <ChatListBox
            interlocutorName="김개발"
            lastMessage="뭐해 ?? 뭐해 ?? 뭐해 ??
            뭐해 ?? 뭐해 ?? 뭐해 ??
            뭐해 ?? 뭐해 ?? 뭐해 ??뭐해 ??뭐해 ??뭐해 ??뭐g
            "
            sentDate="21:20"
          />
          <ChatListBox
            interlocutorName="abc"
            lastMessage="ㅎㅎ 
            "
            sentDate="21:20"
          />
          <ChatListBox
            interlocutorName="ㅋㅋ"
            lastMessage="하하 
            "
            sentDate="21:20"
          />
        </div>
        <div className={styles.messageform}>
          <div className={styles.messageBox}>
            <SendMessageDate date="2022년 4월 5일 화요일" />
            <MessageBox
              interlocutorName="김개발"
              content="Zzz대화중입니다....ZZzz"
              time="12:05"
              isMe={true}
            />

            <SendMessageDate date="2022년 4월 5일 화요일" />
            <MessageBox
              interlocutorName="김개발"
              content="안zzZZzz대화중입니다....ZZzz
ZZzz"
              time="12:05"
              isMe={false}
            />
            <MessageBox
              interlocutorName="김개발"
              content="안zzZZzz대화중입니다....ZZzz
ZZzz"
              time="12:05"
              isMe={false}
            />
            <MessageBox
              interlocutorName="김개발"
              content="안zzZZzz대화중입니다....ZZzz
              ZZzz안zzZZzz대화중입니다....ZZzz
              ZZzz안zzZZzz대화중입니다....ZZzz
              ZZzz안zzZZzz대화중입니다....ZZzz
              ZZzz"
              time="12:05"
              isMe={true}
            />

            <MessageBox
              interlocutorName="김개발"
              content="안zzZZzz대화중입니다....ZZzz
              ZZzz안zzZZzz대화중입니다....ZZzz
              ZZzz안zzZZzz대화중입니다....ZZzz
              ZZzz안zzZZzz대화중입니다....ZZzz
              ZZzz"
              time="12:05"
              isMe={true}
            />
            <MessageBox
              interlocutorName="김개발"
              content="안zzZZzz대화중입니다....ZZzz
              ZZzz안zzZZzz대화중입니다....ZZzz
              ZZzz안zzZZzz대화중입니다....ZZzz
              ZZzz안zzZZzz대화중입니다....ZZzz
              ZZzz"
              time="12:05"
              isMe={true}
            />
            <MessageBox
              interlocutorName="김개발"
              content="안zzZZzz대화중입니다....ZZzz
              ZZzz안zzZZzz대화중입니다....ZZzz
              ZZzz안zzZZzz대화중입니다....ZZzz
              ZZzz안zzZZzz대화중입니다....ZZzz
              ZZzz"
              time="12:05"
              isMe={true}
            />
          </div>
          <div className={styles.SendMessageBox}>
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
      </div>
    </Layout>
  );
};

export default Chat;
