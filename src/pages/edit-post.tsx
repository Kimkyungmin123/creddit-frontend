import type { NextPage } from 'next';
import CreateForm from '../components/CreateForm';
import Layout from '../components/Layout';
import styles from '../styles/EditPost.module.css';

const EditPost: NextPage = () => {
  return (
    <Layout type="post" title="creddit: 글 수정">
      <div className={styles.editPostContainer}>
        <h1>글 수정</h1>
        <CreateForm />
      </div>
    </Layout>
  );
};

export default EditPost;
