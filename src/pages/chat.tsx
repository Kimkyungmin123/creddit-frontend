import { Client } from '@stomp/stompjs';
import AddChatButton from 'components/AddChatButton';
import AddChatModal from 'components/AddChatModal';
import ChatDelete from 'components/ChatDelete';
import ChatListBox from 'components/ChatListBox';
import ChatManager from 'components/ChatManager';
import Layout from 'components/Layout';
import MessageBox from 'components/MessageBox';
import NonChatZone from 'components/NonChatZone';
import NonLogin from 'components/NonLogin';
import SendMessageDate from 'components/SendMessageDate';
import SendMessageForm from 'components/SendMessageForm';
import useInput from 'hooks/useInput';
import useModal from 'hooks/useModal';
import type { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import { wrapper } from 'slices/store';
import { initTheme } from 'slices/themeSlice';
import { initUser, useUser } from 'slices/userSlice';
import SockJS from 'sockjs-client';
import styles from 'styles/Chat.module.scss';
import useSWR from 'swr';
import { Chat, Message } from 'types';
import wsInstance, { fetcher } from 'utils/wsInstance';

const Chat: NextPage = () => {
  const user = useUser();
  const [chat, onChangeChat, setChat] = useInput('');
  const { isModalOpen, openModal, closeModal } = useModal();
  const [currChatUser, setCurrChatUser] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentChatRoomId, setCurrentChatRoomId] = useState('');
  const [chatList, setChatList] = useState<Chat[]>([]);
  const client = useRef<Client | null>(null);
  const scrollRef = useRef<null | HTMLDivElement>(null);
  const { data: chatData, mutate: mutateChatData } = useSWR(
    user ? `/chat/${user.nickname}/chatrooms` : null,
    fetcher
  );

  mutateChatData();

  useEffect(() => {
    if (!user || !currChatUser) return;
    if (currentChatRoomId) {
      wsInstance
        .get<{ messages: Message[] }>(
          `/chat/${user?.nickname}/chatrooms/${currentChatRoomId}`
        )
        .then(({ data }) => {
          setMessages(data.messages);
        });
    }
  }, [user, currChatUser, currentChatRoomId]);

  useEffect(() => {
    client.current = new Client({
      webSocketFactory: () =>
        new SockJS(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/ws`),
      onConnect: () => {
        client.current?.subscribe(`/topic/${currentChatRoomId}`, ({ body }) => {
          const message = JSON.parse(body) as Message;
          if (message.sender === 'CHAT_MANAGER') {
            wsInstance
              .get<{ messages: Message[] }>(
                `/chat/${user?.nickname}/chatrooms/${currentChatRoomId}`
              )
              .then(({ data }) => {
                setMessages(data.messages);
              });
          }
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
    chatData?.sort(function (a: Chat, b: Chat) {
      const dateA =
        a.messages && a.messages.length > 0
          ? a.messages[a.messages.length - 1].createdDate
          : '9999';
      const dateB =
        b.messages && b.messages.length > 0
          ? b.messages[b.messages.length - 1].createdDate
          : '9999';
      return dateA > dateB ? -1 : 1;
    });

    setChatList(chatData);
  }, [chatData]);

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
      )}:${('0' + new Date().getMinutes()).slice(
        -2
      )}:${new Date().getSeconds()} `,
    };

    setMessages((prev) => [...prev, messageInfo]);
    publish(messageInfo);
  };

  return (
    <Layout title="대화 - creddit">
      {user ? (
        <>
          <div className={styles.chatContainer}>
            <div className={styles.chatBox}>
              <AddChatButton onClick={openModal} />
              {chatList?.map((data: any, i: number) => (
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
                  sentDate={
                    data.messages[0]?.createdDate.slice(0, 12) ===
                    data.messages[data.messages.length - 1]?.createdDate.slice(
                      0,
                      12
                    )
                      ? data.receiver === 'CHAT_MANAGER'
                        ? data.messages[
                            data.messages.length - 1
                          ]?.createdDate.slice(13, 19)
                        : data.messages[
                            data.messages.length - 1
                          ]?.createdDate.slice(13, 18)
                      : data.messages[
                          data.messages.length - 1
                        ]?.createdDate.slice(5, 12)
                  }
                  senderProfileImg={data.users[1]?.image.imgUrl}
                />
              ))}
            </div>
            <div className={styles.messageform}>
              <div className={styles.encourageChat}>
                {!isModalOpen && !messages && <NonChatZone />}{' '}
              </div>
              <div className={styles.chatDelete}>
                {currChatUser && messages && (
                  <ChatDelete
                    user={user.nickname}
                    currentChatRoomId={currentChatRoomId}
                  />
                )}
              </div>
              <div className={styles.messageBox}>
                {/* 임시 날짜 */}
                {currChatUser && messages && (
                  <SendMessageDate
                    date={messages[0]?.createdDate.slice(0, 12)}
                  />
                )}

                {messages &&
                  messages.map((data: any, i: number) => (
                    <div ref={scrollRef} key={i}>
                      <MessageBox
                        key={i}
                        interlocutorName={data.sender}
                        content={data.message}
                        time={data.createdDate.slice(13, 18)}
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
                        // senderProfileImg={}
                      />
                    </div>
                  ))}
              </div>
              {currChatUser && messages && (
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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    initTheme(store, context);
    await initUser(store, context);
    return { props: {} };
  }
);

export default Chat;
