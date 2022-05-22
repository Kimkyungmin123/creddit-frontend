import Button from 'components/Button';
import { MouseEventHandler } from 'react';
import styles from './DeleteModal.module.scss';
import FocusLock from 'react-focus-lock';

export type DeleteModalProps = {
  title: string;
  message: string;
  onConfirm: MouseEventHandler<HTMLButtonElement>;
  onCancel: MouseEventHandler<HTMLElement>;
  buttonName?: string;
};

function DeleteModal({
  title,
  message,
  onConfirm,
  onCancel,
  buttonName,
}: DeleteModalProps) {
  return (
    <FocusLock>
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
            <Button variant="plain" onClick={onCancel} ariaLabel="삭제 취소">
              취소
            </Button>
            <Button onClick={onConfirm} variant="error">
              {buttonName || '삭제'}
            </Button>
          </div>
        </div>
      </div>
    </FocusLock>
  );
}

export default DeleteModal;
