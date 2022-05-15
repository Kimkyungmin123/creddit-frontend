import ChatListBox from 'components/ChatListBox';
import Layout from 'components/Layout';
import MessageBox from 'components/MessageBox';
import SendMessageDate from 'components/SendMessageDate';
import SendMessageForm from 'components/SendMessageForm';
import type { NextPage } from 'next';
import styles from 'styles/Chat.module.scss';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import useUser from 'hooks/useUser';
import useInput from 'hooks/useInput';
import useModal from 'hooks/useModal';
import AddChatButton from 'components/AddChatButton';
import AddChatModal from 'components/AddChatModal';
import useSWR from 'swr';
import dayjs from 'dayjs';
import ChatDelete from 'components/ChatDelete';
import { Message } from 'types';
import wsInstance, { fetcher, WEBSOCKET_URL } from 'utils/wsInstance';
// import 'dayjs/locale/ko';

const Chat: NextPage = () => {
  const { user } = useUser();
  const [chat, onChangeChat, setChat] = useInput('');
  const { isModalOpen, openModal, closeModal } = useModal();
  const [currChatUser, setCurrChatUser] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentChatRoomId, setCurrentChatRoomId] = useState('');
  const client = useRef<Client | null>(null);

  const { data: chatData } = useSWR(
    user ? `/chat/${user.nickname}/chatrooms` : null,
    fetcher
  );

  useEffect(() => {
    if (!user || !currChatUser) return;
    wsInstance
      .get<{ messages: Message[] }>(
        `/chat/${user.nickname}/chatrooms/${currentChatRoomId}`
      )
      .then(({ data }) => {
        setMessages(data.messages);
      });
  }, [user, currChatUser]);

  // const { data: localUser } = useSWR(currChatUser, (key) => {
  //   localStorage.setItem('curUser', key);
  //   return localStorage.getItem('curUser');
  // });

  useEffect(() => {
    client.current = new Client({
      webSocketFactory: () => new SockJS(`${WEBSOCKET_URL}/ws`),
      onConnect: () => {
        client.current?.subscribe(`/topic/${user?.nickname}`, ({ body }) => {
          const message = JSON.parse(body) as Message;
          if (currChatUser === message.sender) {
            setMessages((prev) => [...prev, message]);
          }
        });
      },
    });
    client.current.activate();

    return () => {
      client.current?.deactivate();
    };
  }, [user, currChatUser]);

  const publish = (messageInfo: Message) => {
    if (!client.current?.connected) {
      return;
    }

    client.current.publish({
      destination: '/app/send',
      body: JSON.stringify(messageInfo),
    });
  };

  const onSubmitForm = (e: any) => {
    e.preventDefault();

    if (!chat) return;
    setChat('');

    if (!user) return;
    const messageInfo: Message = {
      message: chat,
      sender: user.nickname,
      receiver: currChatUser,
      createdDate: dayjs().format('HH:MM'),
    };
    setMessages((prev) => [...prev, messageInfo]);

    publish(messageInfo);
    // console.log(messageInfo);
    // console.log('messages: ', messages);
    // console.log(dayjs().format('HH:MM'));
  };

  return (
    <Layout title="creddit: Chat">
      {user ? (
        <>
          <div className={styles.chatContainer}>
            <div className={styles.chatBox}>
              <AddChatButton onClick={openModal} />
              {chatData?.map((data: any, i: number) => (
                <ChatListBox
                  key={i}
                  interlocutorName={data.target}
                  onClick={() => {
                    setCurrChatUser(data.target);
                    setCurrentChatRoomId(data.id);
                    console.log(currChatUser);
                    setChat('');
                  }}
                  // lastMessage={}
                  // sentDate={}
                />
              ))}
            </div>
            <div className={styles.messageform}>
              <div className={styles.chatDelete}>
                {currChatUser && <ChatDelete />}
              </div>
              <div className={styles.messageBox}>
                {/* 임시 시간 */}
                {currChatUser && (
                  <SendMessageDate date={'2022년 00월 00일 0요일'} />
                )}

                {messages.map((data: any, i: number) => (
                  <MessageBox
                    key={i}
                    interlocutorName={data.sender}
                    content={data.message}
                    time={data.createdDate}
                    isMe={data.receiver === currChatUser ? true : false}
                  />
                ))}
              </div>
              {currChatUser && (
                <div className={styles.SendMessageBox}>
                  <SendMessageForm
                    onSubmit={onSubmitForm}
                    onChange={onChangeChat}
                    value={chat}
                  />
                </div>
              )}
            </div>
            <AddChatModal show={isModalOpen} onCloseModal={closeModal} />
          </div>
        </>
      ) : (
        <div>로그인해주세요</div>
      )}
    </Layout>
  );
};

export default Chat;
