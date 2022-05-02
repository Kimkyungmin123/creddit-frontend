import useInput from 'hooks/useInput';
import { FC, useCallback } from 'react';
import styles from './AddChatModal.module.scss';
import axios from 'axios';
import useSWR from 'swr';
import useUser from 'hooks/useUser';
import Button from 'components/Button';
import Input from 'components/Input';
import { Close } from 'icons';

interface AddChatModalProps {
  show: boolean;
  onCloseModal: () => void;
  setShowInviteWorkspaceModal: (flag: boolean) => void;
}

const AddChatModal: FC<AddChatModalProps> = ({
  show,
  onCloseModal,
  setShowInviteWorkspaceModal,
}) => {
  const fetcher = (url: string) =>
    axios.get(url).then((response) => response.data);

  const { user } = useUser();
  const username = user?.nickname;
  const [newMember, onChangeNewMember, setNewMember] = useInput('');
  const { mutate: revalidateMember } = useSWR(
    username ? `/api/멤버 초대 API` : null,
    fetcher
  );
  const onInviteMember = useCallback(
    (e) => {
      e.preventDefault();

      if (!newMember || !newMember.trim()) {
        return;
      }
      axios
        .post(`/api/`, {
          // 멤버 초대 API 추가
        })
        .then(() => {
          revalidateMember();
          setShowInviteWorkspaceModal(false);
          setNewMember('');
        })
        .catch((error) => {
          setNewMember('');
          console.dir(error);
          alert(error.response?.data);
        });
    },

    [newMember, revalidateMember, setShowInviteWorkspaceModal, setNewMember]
  );
  if (!show) {
    return null;
  }
  const stopPropagation = (e: any) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.chatModalContainer} onClick={onCloseModal}>
      <div className={styles.chatModal} onClick={stopPropagation}>
        <Button type="reset" variant="plain" onClick={onCloseModal}>
          <Close />
        </Button>
        <form onSubmit={onInviteMember}>
          <Input
            value={newMember}
            onChange={onChangeNewMember}
            placeholder="닉네임 입력"
          />

          <Button type="submit" ariaLabel="확인">
            추가
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddChatModal;
