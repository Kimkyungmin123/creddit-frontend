import Button from 'components/Button';
import styles from './CreateForm.module.scss';

const CreateForm = () => {
  return (
    <div className={styles.createFormContainer}>
      <form>
        <input type="text" placeholder="제목" />
        <textarea placeholder="내용"></textarea>
        <Button>제출</Button>
      </form>
    </div>
  );
};

export default CreateForm;
