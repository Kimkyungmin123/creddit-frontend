import useInput from 'hooks/useInput';
// import { FC, useCallback } from 'react';
import styles from './AddChatModal.module.scss';
import axios from 'axios';
import Button from 'components/Button';
import Input from 'components/Input';
import { Close } from 'icons';
import useSWR from 'swr';

interface AddChatModalProps {
  show: boolean;
  onCloseModal: () => void;
  setShowInviteModal: (flag: boolean) => void;
  targetUser: string;
}

const AddChatModal = ({
  show,
  onCloseModal,
  setShowInviteModal,
}: AddChatModalProps) => {
  const [newMember, onChangeNewMember, setNewMember] = useInput('');
  // const [keyword, setKeyword, onChangeKeyword] = useInput('');
  const fetcher = (url: string) =>
    axios.get(url).then((response) => response.data);
  const { data } = useSWR(
    `http://localhost:8080/member/search?page=0&keyword=${newMember}`,
    fetcher
  );

  console.log(data);

  const onSubmit = (e: any) => {
    e.preventDefault();
    axios({
      method: 'get',
      url: `http://localhost:8080/member/search?page=0&keyword=${newMember}`,
    })
      .then((response) => {
        console.log(response);
        setNewMember('');
        setShowInviteModal(false);
      })
      .catch((error) => {
        setNewMember('');
        console.log(error.response);
        console.log(newMember + '추가실패');
      });
  };
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
        <form onSubmit={onSubmit}>
          <Input
            value={newMember}
            onChange={onChangeNewMember}
            placeholder="대화할 상대를 입력하세요."
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
