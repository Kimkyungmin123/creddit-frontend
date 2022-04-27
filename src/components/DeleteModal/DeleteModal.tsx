import Button from 'components/Button';
import { MouseEventHandler } from 'react';
import styles from './DeleteModal.module.scss';

export type DeleteModalProps = {
  title: string;
  message: string;
  onConfirm: MouseEventHandler<HTMLButtonElement>;
  onCancel: MouseEventHandler<HTMLElement>;
};

// TODO: 포커스 트랩
function DeleteModal({
  title,
  message,
  onConfirm,
  onCancel,
}: DeleteModalProps) {
  return (
    <div
      className={styles.container}
      onClick={(event) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains(styles.container)) {
          onCancel(event);
        }
      }}
      data-testid="delete-modal"
    >
      <div className={styles.main}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className={styles.buttonsContainer}>
          <Button onClick={onConfirm} variant="error">
            삭제
          </Button>
          <Button variant="plain" onClick={onCancel} ariaLabel="삭제 취소">
            취소
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
