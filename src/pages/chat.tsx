import ChatListBox from 'components/ChatListBox';
import Layout from 'components/Layout';
import MessageBox from 'components/MessageBox';
import SendMessageDate from 'components/SendMessageDate';
import SendMessageForm from 'components/SendMessageForm';
import type { NextPage } from 'next';
import styles from 'styles/Chat.module.scss';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { useCallback, useEffect, useState } from 'react';
import useUser from 'hooks/useUser';
import axios from 'axios';
import useInput from 'hooks/useInput';
import useModal from 'hooks/useModal';
import AddChatButton from 'components/AddChatButton';
import AddChatModal from 'components/AddChatModal';
import useSWR from 'swr';
import dayjs from 'dayjs';
import ChatDelete from 'components/ChatDelete';
import 'dayjs/locale/ko';

export type messageInfo = {
  message?: any;
  sender?: string;
  receiver: string;
  createdDate: string;
};

let client: any = null;
const socketUrl = 'http://localhost:8000/ws';

const Chat: NextPage = () => {
  const { user } = useUser();
  const username = user?.nickname;
  const [chat, onChangeChat, setChat] = useInput('');
  const { isModalOpen, openModal, closeModal } = useModal();
  const [currChatUser, setCurrChatUser] = useState('');

  const fetcher = (url: string) =>
    axios.get(url).then((response) => response.data);
  const fetcherDetails = (url: string) =>
    axios.get(url).then((response) => response.data.messages);

  const {
    data: chatData,
    //  mutate: mutateChat
  } = useSWR(`http://localhost:8000/chat/${username}/chatrooms`, fetcher);

  const { data: chatDetails, mutate: mutateChatDetails } = useSWR(
    `http://localhost:8000/chat/${username}/chatrooms/${currChatUser}/messages`,
    fetcherDetails
  );

  console.log('chatDetails는??', chatDetails);
  // const { data: localUser } = useSWR(currChatUser, (key) => {
  //   localStorage.setItem('curUser', key);
  //   return localStorage.getItem('curUser');
  // });

  const getChatRooms = useCallback(() => {
    axios
      .get(`http://localhost:8000/chat/${username}/chatrooms`)
      .then((response) => {
        console.log('response: ', response.data);
      });
  }, [username]);

  useEffect(() => {
    getChatRooms();

    const socket = new SockJS(socketUrl);
    client = Stomp.over(socket);
    client.connect(
      {},
      () => {
        console.log('현재 ' + username);
        const messageInfo: messageInfo = {
          message: chat,
          sender: username,
          receiver: currChatUser,
          createdDate: dayjs().format('HH:MM'),
        };

        client.subscribe('/topic/' + username, function (msg: any) {
          _processMessage(msg.body), msg.headers.destination;

          mutateChatDetails((prevChatData: any) => {
            prevChatData?.unshift({
              messageInfo,
            });
            return prevChatData;
          });
        });
        client.send('/topic/' + currChatUser, {}, JSON.stringify(chat));
      },
      (err: Error) => {
        console.log(err);
      }
    );

    return () => client.deactivate();
  }, [
    username,
    getChatRooms,
    chatData,
    chat,
    currChatUser,
    chatDetails,
    mutateChatDetails,
  ]);

  const _processMessage = (msgBody: any) => {
    try {
      return JSON.parse(msgBody);
    } catch (e) {
      return msgBody;
    }
  };

  const publish = (messageInfo: messageInfo) => {
    if (!client.connected) {
      return;
    }

    client.publish({
      destination: '/app/send',
      body: JSON.stringify(messageInfo),
    });
  };

  const onSubmitForm = (e: any) => {
    e.preventDefault();
    setChat('');

    const messageInfo: messageInfo = {
      message: chat,
      sender: username,
      receiver: currChatUser,
      createdDate: dayjs().format('HH:MM'),
    };
    publish(messageInfo);
    mutateChatDetails((prevChatData: any) => {
      prevChatData?.unshift({
        messageInfo,
      });
      return prevChatData;
    });

    console.log(messageInfo);
    console.log('chatDetails: ', chatDetails);
    console.log(dayjs().format('HH:MM'));
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

                {currChatUser &&
                  chatDetails?.map((data: any, i: number) => (
                    <MessageBox
                      key={i}
                      interlocutorName={data.sender}
                      content={data.message}
                      time={data.createdDate}
                      isMe={data.receiver === currChatUser ? true : false}
                    />
                  ))}
              </div>
              <div className={styles.SendMessageBox}>
                <SendMessageForm
                  onSubmit={onSubmitForm}
                  onChange={onChangeChat}
                  value={chat}
                />
              </div>
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
