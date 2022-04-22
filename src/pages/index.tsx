import Layout from 'components/Layout';
import PostList from 'components/PostList';
import type { NextPage } from 'next';
import styles from 'styles/Home.module.scss';

const Home: NextPage = () => {
  return (
    <Layout title="creddit">
      <div className={styles.homeContainer}>
        <PostList />
      </div>
    </Layout>
  );
};

export default Home;
