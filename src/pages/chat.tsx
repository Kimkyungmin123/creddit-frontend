import ChatListBox from 'components/ChatListBox';
import Layout from 'components/Layout';
import MessageBox from 'components/MessageBox';
import SendMessageDate from 'components/SendMessageDate';
import SendMessageForm from 'components/SendMessageForm';
import type { NextPage } from 'next';
import styles from 'styles/Chat.module.scss';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import {
  useCallback,
  useEffect,
  // useState
} from 'react';
import useUser from 'hooks/useUser';
import axios from 'axios';
import useInput from 'hooks/useInput';
import useModal from 'hooks/useModal';
import AddChatButton from 'components/AddChatButton';
import AddChatModal from 'components/AddChatModal';
import useSWR from 'swr';

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
  // const [currChatUser, setCurrChatUser] = useState('');

  const fetcher = (url: string) =>
    axios.get(url).then((response) => response.data);

  const { data } = useSWR(
    `http://localhost:8000/chat/${username}/chatrooms`,
    fetcher
  );

  const getChatRooms = useCallback(() => {
    axios
      .get(`http://localhost:8000/chat/${username}/chatrooms`)
      .then((response) => {
        console.log('response: ', response);
      });
  }, [username]);

  useEffect(() => {
    getChatRooms();
    const socket = new SockJS(socketUrl);
    client = Stomp.over(socket);
    client.connect(
      {},
      () => {
        console.log('현재' + username);

        client.subscribe('/topic/' + username, function (msg: any) {
          _processMessage(msg.body), msg.headers.destination;
        });
        client.send('/topic/' + username, {}, JSON.stringify(chat));
      },
      (err: Error) => {
        console.log(err);
      }
    );
    console.log('현재 사용자들' + data);
    return () => client.deactivate();
  }, [username, getChatRooms, data, chat]);

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
    setChat('');
    const messageInfo = {
      message,
      sender,
      receiver,
      createdDate: new Date().getTime(),
    };

    publish(messageInfo);
  };

  // const onSubmitForm = useCallback(
  //   (e) => {
  //     e.preventDefault();
  //     if (chat?.trim() && chatData) {
  //       const savedChat = chat;
  //       mutateChat((prevChatData) => {
  //         prevChatData?.[0].unshift({
  //           id: (chatData[0][0]?.id || 0) + 1,
  //           content: savedChat,
  //           SenderId: myData.id,
  //           Sender: myData,
  //           ReceiverId: userData.id,
  //           Receiver: userData,
  //           createdAt: new Date(),
  //         });
  //         return prevChatData;
  //       }, false).then(() => {
  //         localStorage.setItem(
  //           `${workspace}-${id}`,
  //           new Date().getTime().toString()
  //         );
  //         setChat('');
  //         if (scrollbarRef.current) {
  //           console.log('scrollToBottom!', scrollbarRef.current?.getValues());
  //           scrollbarRef.current.scrollToBottom();
  //         }
  //       });
  //       axios
  //         .post(`/api/workspaces/${workspace}/dms/${id}/chats`, {
  //           content: chat,
  //         })
  //         .catch(console.error);
  //     }
  //   },
  //   [chat, workspace, id, myData, userData, chatData, mutateChat, setChat]
  // );
  return (
    <Layout title="creddit: Chat">
      {user ? (
        <>
          <div className={styles.chatContainer}>
            <div className={styles.chatBox}>
              <AddChatButton onClick={openModal} />
              {data?.map((data: any, i: number) => (
                <ChatListBox
                  key={i}
                  interlocutorName={data.target}
                  // onClick={() => setCurrChatUser(data.target)
                  // }
                />
              ))}

              {/* <ChatListBox
                interlocutorName="aa"
                lastMessage="뭐해 ?? 뭐해 ?? 뭐해 ??
            뭐해 ?? 뭐해 ?? 뭐해 ??
            뭐해 ?? 뭐해 ?? 뭐해 ??뭐해 ??뭐해 ??뭐해 ??뭐g
            "
                sentDate="13:11"
              /> */}
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
