import styles from './CreateForm.module.css';

const CreateForm = () => {
  return (
    <div className={styles.createFormContainer}>
      <form>
        <input type="text" />
        {/* <textarea name="" id="" cols="30" rows="10"></textarea> */}
        <textarea></textarea>
        <button>제출</button>
      </form>
    </div>
  );
};

export default CreateForm;
