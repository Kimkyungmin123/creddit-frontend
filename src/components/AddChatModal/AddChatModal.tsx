import useInput from 'hooks/useInput';
// import { FC, useCallback } from 'react';
import styles from './AddChatModal.module.scss';
import axios from 'axios';
import Button from 'components/Button';
import Input from 'components/Input';
import { Close } from 'icons';
import useSWR from 'swr';
import { useCallback, useEffect, useState } from 'react';
import useDebounce from 'hooks/useDebounce';
import useUser from 'hooks/useUser';
import classNames from 'classnames';

interface AddChatModalProps {
  show: boolean;
  onCloseModal: () => void;
}

const AddChatModal = ({ show, onCloseModal }: AddChatModalProps) => {
  const [newMember, onChangeNewMember, setNewMember] = useInput('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const debounce = useDebounce();
  const { user } = useUser();
  const username = user?.nickname;
  const [currentIndex, setCurrentIndex] = useState(0);
  const fetcher = (url: string) =>
    axios.get(url).then((response) => response.data.data);

  // const fetcherAddMember = (url: string) =>
  //   axios.get(url).then((response) => response.data);

  const { data: subscribed } = useSWR(
    `http://localhost:8080/member/search?page=0&keyword=${newMember}`,
    fetcher
  );
  // const { mutate: revalidateMembers } = useSWR(
  //   username
  //     ? `http://localhost:8000/chat/register/${username}/${newMember}`
  //     : null,
  //   fetcherAddMember
  // );
  console.log(subscribed);

  useEffect(() => {
    const moveFocus = (event: KeyboardEvent) => {
      if (!subscribed) return;
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setCurrentIndex((prev) => (prev + 1) % (subscribed.length + 1));
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setCurrentIndex((prev) =>
          prev - 1 < 0 ? subscribed.length : prev - 1
        );
      }
    };
    window.addEventListener('keydown', moveFocus);
    return () => window.removeEventListener('keydown', moveFocus);
  }, [subscribed]);

  useEffect(() => {
    const enter = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        const selectors = `.${styles.results} li[data-index="${currentIndex}"] `;
        const element = document.querySelector<HTMLElement>(selectors);
        element?.click();
      }
    };
    window.addEventListener('keydown', enter);
    return () => window.removeEventListener('keydown', enter);
  }, [currentIndex]);

  const handleAddChatPartner = useCallback(
    (e) => {
      e.preventDefault();
      setNewMember('');
      setDebouncedValue('');
      if (!newMember || !newMember.trim()) {
        return;
      }
      axios
        .get(`http://localhost:8000/chat/register/${username}/${newMember}`)
        .then((response) => {
          if (subscribed !== response.data) {
            return;
          }
          // revalidateMembers();

          console.log(response);
        })
        .catch((error) => {
          console.dir(error.response?.data);
        });
    },
    [
      username,
      newMember,
      // revalidateMembers,
      setNewMember,
      subscribed,
    ]
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
        <form onSubmit={handleAddChatPartner}>
          <Input
            value={newMember}
            onChange={(event) => {
              const { value } = event.target;
              onChangeNewMember;
              setNewMember(value);
              debounce(() => {
                setDebouncedValue(value);
              }, 150);
            }}
            placeholder="이메일 또는 닉네임을 입력하세요"
          />

          <Button type="submit" ariaLabel="확인">
            추가
          </Button>
          {debouncedValue && (
            <div className={styles.ChatSearchResults}>
              <ul
                className={styles.results}
                onClick={() => setDebouncedValue('')}
              >
                <li
                  className={classNames(
                    styles.searchAll,
                    currentIndex === 0 && styles.selected
                  )}
                  data-index={0}
                  onClick={() => console.log('ok')}
                >
                  <span> {debouncedValue}</span>
                </li>
                {subscribed?.map((data: any, index: number) => (
                  <li
                    key={index}
                    className={classNames(
                      index + 1 === currentIndex && styles.selected
                    )}
                    data-index={index + 1}
                  >
                    <span onClick={() => setNewMember(data.nickname)}>
                      {data.nickname} ({data.email})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddChatModal;
