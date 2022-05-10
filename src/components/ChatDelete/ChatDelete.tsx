import styles from './ChatDelete.module.scss';
import Button from 'components/Button';
import useModal from 'hooks/useModal';
import DeleteModal from 'components/DeleteModal';

const ChatDelete = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
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
          // TODO: 나가기 api 요청하기
          onConfirm={closeModal}
          onCancel={closeModal}
        />
      )}
    </div>
  );
};

export default ChatDelete;
