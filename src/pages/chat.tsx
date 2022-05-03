import ChatListBox from 'components/ChatListBox';
import Layout from 'components/Layout';
import MessageBox from 'components/MessageBox';
import SendMessageDate from 'components/SendMessageDate';
import SendMessageForm from 'components/SendMessageForm';
import type { NextPage } from 'next';
import styles from 'styles/Chat.module.scss';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { useEffect, useState } from 'react';
import useUser from 'hooks/useUser';
// import axios from 'axios';
import useInput from 'hooks/useInput';
// import useSWR from 'swr';
import AddChatButton from 'components/AddChatButton';
import AddChatModal from 'components/AddChatModal';

const socketUrl = 'http://localhost:8000/ws';
let client: any = null;
const Chat: NextPage = () => {
  // const fetcher = (url: string) =>
  //   axios.get(url).then((response) => response.data);

  const { user } = useUser();
  const username = user?.nickname;
  const [chat, onChangeChat, setChat] = useInput('');
  const [showInviteModal, setShowInviteModal] = useState(false);

  //채팅 받아 오는 API
  // const { data: chatData, mutate: mutateChat } = useSWR(
  //   API + '/' + username + '/chatrooms',
  //   fetcher,
  //   {
  // onSuccess(data) {
  //   if (data?.length === 1) {
  //     setTimeout(() => {
  //       scrollbarRef.current?.scrollToBottom();
  //     }, 100);
  //   }
  // },
  //}
  //);

  useEffect(() => {
    const socket = new SockJS(socketUrl);
    client = Stomp.over(socket);
    client.connect(
      {},
      () => {
        console.log('현재' + username);
        client.send('/topic/' + username, {}, JSON.stringify(chat));
      },
      onError
    );

    // return () => client.disconnet();
  }, [chat, username]);

  const onError = (err: Error) => {
    console.log(err);
  };

  //채팅 보내는 API
  // const onSubmitForm = useCallback((e) => {
  //   e.preventDefault();
  //    setChat('')
  //   if (chat?.trim() && chatData) {
  //     // mutate ...
  //     // 스크롤 밑으로
  //     axios
  //       .post(
  //        '채팅 POST API' +
  //           '/' +
  //           username +
  //           '/chatrooms',
  //         {
  //           content: chat,
  //         }
  //       )
  //       .catch(console.error);
  //   }
  // }, []);

  const onClickInvite = () => {
    setShowInviteModal(true);
  };

  const onCloseModal = () => {
    setShowInviteModal(false);
  };

  return (
    <Layout title="creddit: Chat">
      {/* 작업 중에만 반대로 */}
      {!user ? (
        <>
          <div className={styles.chatContainer}>
            <div className={styles.chatBox}>
              <AddChatButton onClick={onClickInvite} />
              <ChatListBox
                interlocutorName="aa"
                lastMessage="뭐해 ?? 뭐해 ?? 뭐해 ??
            뭐해 ?? 뭐해 ?? 뭐해 ??
            뭐해 ?? 뭐해 ?? 뭐해 ??뭐해 ??뭐해 ??뭐해 ??뭐g
            "
                sentDate="13:11"
              />
              <ChatListBox
                interlocutorName="aa"
                lastMessage="뭐해 ?? 뭐해 ?? 뭐해 ??
            뭐해 ?? 뭐해 ?? 뭐해 ??
            뭐해 ?? 뭐해 ?? 뭐해 ??뭐해 ??뭐해 ??뭐해 ??뭐g
            "
                sentDate="13:11"
              />
              <ChatListBox
                interlocutorName="aa"
                lastMessage="뭐해 ?? 뭐해 ?? 뭐해 ??
            뭐해 ?? 뭐해 ?? 뭐해 ??
            뭐해 ?? 뭐해 ?? 뭐해 ??뭐해 ??뭐해 ??뭐해 ??뭐g
            "
                sentDate="13:11"
              />
              <ChatListBox
                interlocutorName="aa"
                lastMessage="뭐해 ?? 뭐해 ?? 뭐해 ??
            뭐해 ?? 뭐해 ?? 뭐해 ??
            뭐해 ?? 뭐해 ?? 뭐해 ??뭐해 ??뭐해 ??뭐해 ??뭐g
            "
                sentDate="13:11"
              />
              <ChatListBox
                interlocutorName="aa"
                lastMessage="뭐해 ?? 뭐해 ?? 뭐해 ??
            뭐해 ?? 뭐해 ?? 뭐해 ??
            뭐해 ?? 뭐해 ?? 뭐해 ??뭐해 ??뭐해 ??뭐해 ??뭐g
            "
                sentDate="13:11"
              />
              <ChatListBox
                interlocutorName="aa"
                lastMessage="뭐해 ?? 뭐해 ?? 뭐해 ??
            뭐해 ?? 뭐해 ?? 뭐해 ??
            뭐해 ?? 뭐해 ?? 뭐해 ??뭐해 ??뭐해 ??뭐해 ??뭐g
            "
                sentDate="13:11"
              />
              <ChatListBox
                interlocutorName="aa"
                lastMessage="뭐해 ?? 뭐해 ?? 뭐해 ??
            뭐해 ?? 뭐해 ?? 뭐해 ??
            뭐해 ?? 뭐해 ?? 뭐해 ??뭐해 ??뭐해 ??뭐해 ??뭐g
            "
                sentDate="13:11"
              />
              <ChatListBox
                interlocutorName="aa"
                lastMessage="뭐해 ?? 뭐해 ?? 뭐해 ??
            뭐해 ?? 뭐해 ?? 뭐해 ??
            뭐해 ?? 뭐해 ?? 뭐해 ??뭐해 ??뭐해 ??뭐해 ??뭐g
            "
                sentDate="13:11"
              />
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
                  // onSubmit={onSubmitForm}
                  // 임시 onSubmit
                  onSubmit={() => setChat('')}
                  onChange={onChangeChat}
                  value={chat}
                />
              </div>
            </div>
            <AddChatModal
              show={showInviteModal}
              onCloseModal={onCloseModal}
              setShowInviteModal={setShowInviteModal}
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
