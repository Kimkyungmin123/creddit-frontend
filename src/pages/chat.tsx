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
import { useDispatch } from 'react-redux';
import { createChatRoom, sendNewMessage, receiveMessage } from '../store/slice';

export type messageInfo = {
  message?: any;
  sender: string;
  receiver: string;
  createdDate: string | number;
};

let client: any = null;
const socketUrl = 'http://localhost:8000/ws';
const Chat: NextPage = () => {
  const { user } = useUser();
  const username = user?.nickname;
  const [chat, onChangeChat, setChat] = useInput('');
  const { isModalOpen, openModal, closeModal } = useModal();
  const dispatch = useDispatch();
  const [targetUser, setTargetUser] = useState('');

  const getChatRooms = useCallback(() => {
    axios({
      method: 'get',
      url: 'http://localhost:8000/chat/' + username + '/chatrooms',
    }).then((response) => {
      console.log('response: ', response);
      setChat(''); //
      setTargetUser('');
      for (const key in response.data) {
        dispatch(
          createChatRoom({
            targetUser: response.data[key].target,
            messages: [...response.data[key].messages],
          })
        );
      }
    });
  }, [dispatch, setChat, username]);

  const receiveMessageData = useCallback(
    (...message: any) => {
      dispatch(receiveMessage(message));
    },
    [dispatch]
  );

  useEffect(() => {
    getChatRooms();
    const socket = new SockJS(socketUrl);
    client = Stomp.over(socket);
    client.connect(
      {},
      () => {
        console.log('현재' + username);

        client.subscribe('/topic/' + username, function (msg: any) {
          receiveMessageData(
            _processMessage(msg.body),
            msg.headers.destination
          );
        });
        // client.send('/topic/' + username, {}, JSON.stringify(chat));
      },
      (err: Error) => {
        console.log(err);
      }
    );

    return () => client.deactivate();
  }, [username, getChatRooms, receiveMessageData]);

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

    // setMessage("");
  };

  const sendMessageData = (message: any, sender: string, receiver: string) => {
    const messageInfo = {
      message,
      sender,
      receiver,
      createdDate: new Date().getTime(),
    };

    publish(messageInfo);
    dispatch(sendNewMessage(messageInfo));
  };

  // console.log(chatRooms);

  return (
    <Layout title="creddit: Chat">
      {user ? (
        <>
          <div className={styles.chatContainer}>
            <div className={styles.chatBox}>
              <AddChatButton onClick={openModal} />
              {/* {Object.keys(chatRooms).map((key) => (
                <ChatListBox
                  key={key}
                  interlocutorName={key}
                  sendMessageData={sendMessageData}
                />
              ))} */}

              <ChatListBox
                interlocutorName="aa"
                lastMessage="뭐해 ?? 뭐해 ?? 뭐해 ??
            뭐해 ?? 뭐해 ?? 뭐해 ??
            뭐해 ?? 뭐해 ?? 뭐해 ??뭐해 ??뭐해 ??뭐해 ??뭐g
            "
                sentDate="13:11"
              />
            </div>
            <div className={styles.messageform}>
              <div className={styles.messageBox}>
                <SendMessageDate date="2022년 4월 1일" />

                <MessageBox
                  interlocutorName="김개발"
                  content="aa"
                  time="12:05"
                  isMe={true}
                />
              </div>
              <div className={styles.SendMessageBox}>
                <SendMessageForm
                  onSubmit={() => sendMessageData}
                  onChange={onChangeChat}
                  value={chat}
                />
              </div>
            </div>
            <AddChatModal
              show={isModalOpen}
              onCloseModal={closeModal}
              setShowInviteModal={openModal}
              targetUser={targetUser || ''}
            />
          </div>
        </>
      ) : (
        <div>로그인해주세요</div>
      )}
    </Layout>
  );
};

export default Chat;
