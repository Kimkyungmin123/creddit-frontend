import styles from './CreateForm.module.css';

const CreateForm = () => {
  return (
    <div className={styles.createFormContainer}>
      <form>
        <input type="text" placeholder="제목" />
        {/* <textarea name="" id="" cols="30" rows="10"></textarea> */}
        <textarea placeholder="내용"></textarea>
        <button>제출</button>
      </form>
    </div>
  );
};

export default CreateForm;
