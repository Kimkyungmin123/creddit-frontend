import type { NextPage } from 'next';
import CreateForm from '../components/CreateForm';
import Layout from '../components/Layout';
import styles from '../styles/CreatePost.module.css';

const CreatePost: NextPage = () => {
  return (
    <Layout type="post" title="creddit: 글 작성">
      <div className={styles.createPostContainer}>
        <h1>글 작성</h1>
        <CreateForm />
      </div>
    </Layout>
  );
};

export default CreatePost;
