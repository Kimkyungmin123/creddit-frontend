import ChatListBox from 'components/ChatListBox';
import Layout from 'components/Layout';
import MessageBox from 'components/MessageBox';
import SendMessageForm from 'components/SendMessageForm';
import NonChatZone from 'components/NonChatZone';
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
import useSWR, { mutate } from 'swr';
import ChatDelete from 'components/ChatDelete';
import { Message } from 'types';
import wsInstance, { fetcher, WEBSOCKET_URL } from 'utils/wsInstance';
import NonLogin from 'components/NonLogin';
import SendMessageDate from 'components/SendMessageDate';
import ChatManager from 'components/ChatManager';

const Chat: NextPage = () => {
  const { user } = useUser();
  const [chat, onChangeChat, setChat] = useInput('');
  const { isModalOpen, openModal, closeModal } = useModal();
  const [currChatUser, setCurrChatUser] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentChatRoomId, setCurrentChatRoomId] = useState('');
  const client = useRef<Client | null>(null);
  const scrollRef = useRef<null | HTMLDivElement>(null);

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
        console.log(data);
        setMessages(data.messages);
      });
  }, [user, currChatUser, currentChatRoomId]);

  useEffect(() => {
    client.current = new Client({
      webSocketFactory: () => new SockJS(`${WEBSOCKET_URL}/ws`),
      onConnect: () => {
        client.current?.subscribe(`/topic/${currentChatRoomId}`, ({ body }) => {
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
  }, [user, currChatUser, currentChatRoomId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
      chatRoomId: currentChatRoomId,
      receiver: currChatUser,
      createdDate: `${new Date().getFullYear()}년 ${
        new Date().getMonth() + 1
      }월 ${new Date().getDate()}일 ${('0' + new Date().getHours()).slice(
        -2
      )}:${('0' + new Date().getMinutes()).slice(-2)} `,
    };

    setMessages((prev) => [...prev, messageInfo]);

    publish(messageInfo);
    mutate(`/chat/${user.nickname}/chatrooms`);
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
                  lastMessage={data.messages[data.messages.length - 1]?.message}
                  sentDate={data.messages[
                    data.messages.length - 1
                  ]?.createdDate.slice(13)}
                />
              ))}
            </div>
            <div className={styles.messageform}>
              <div className={styles.encourageChat}>
                {!isModalOpen && !currChatUser && <NonChatZone />}{' '}
              </div>
              <div className={styles.chatDelete}>
                {currChatUser && (
                  <ChatDelete
                    user={user.nickname}
                    currentChatRoomId={currentChatRoomId}
                  />
                )}
              </div>
              <div className={styles.messageBox}>
                {/* 임시 날짜 */}
                {currChatUser && (
                  <SendMessageDate
                    date={messages[0]?.createdDate.slice(0, 12)}
                  />
                )}

                {messages.map((data: any, i: number) => (
                  <div ref={scrollRef} key={i}>
                    <MessageBox
                      key={i}
                      interlocutorName={data.sender}
                      content={data.message}
                      time={data.createdDate.slice(13)}
                      isMe={data.receiver === currChatUser ? true : false}
                      isManager={
                        data.receiver === 'CHAT_MANAGER' ? true : false
                      }
                      chatManager={
                        data.receiver === 'CHAT_MANAGER' && (
                          <ChatManager
                            key={i}
                            managerMessage={data.message}
                            time={data.createdDate}
                          />
                        )
                      }
                    />
                  </div>
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
        <NonLogin />
      )}
    </Layout>
  );
};

export default Chat;
