import Button from 'components/Button';
import styles from './AddChatButton.module.scss';

type AddChatButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const AddChatButton = ({ onClick }: AddChatButtonProps) => {
  return (
    <div className={styles.addChatButton}>
      <Button
        type="button"
        aria-label="대화 상대 추가"
        onClick={onClick}
        variant="plain"
      >
        대화 상대 추가
      </Button>
    </div>
  );
};

export default AddChatButton;
