import styles from './ChatDelete.module.scss';
import Button from 'components/Button';
import useModal from 'hooks/useModal';
import DeleteModal from 'components/DeleteModal';
import wsInstance from 'utils/wsInstance';
import { Message } from 'types';
import { useRouter } from 'next/router';
import { mutate } from 'swr';

export type ChatDeleteProps = {
  user: string;
  currentChatRoomId: string;
};

const ChatDelete = ({ user, currentChatRoomId }: ChatDeleteProps) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const router = useRouter();
  const onClickLeftChatRoom = () => {
    wsInstance
      .post<{ messages: Message[] }>(`/chat/${user}/chatroom/left`, {
        chatRoomId: currentChatRoomId,
      })
      .then((response) => {
        console.log(response);
        closeModal();
        mutate(`/chat/${user}/chatrooms`);
        router.replace(router.asPath);
      });
  };
  return (
    <div className={styles.chatDelete}>
      <Button
        type="button"
        aria-label="채팅 나가기"
        onClick={openModal}
        variant="plain"
      >
        채팅 나가기
      </Button>
      {isModalOpen && (
        <DeleteModal
          buttonName="확인"
          title="채팅방 나가기"
          message="채팅방을 나가시겠습니까?"
          onConfirm={onClickLeftChatRoom}
          onCancel={closeModal}
        />
      )}
    </div>
  );
};

export default ChatDelete;
