import Layout from 'components/Layout';
import PostList from 'components/PostList';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Layout title="creddit">
      <PostList />
    </Layout>
  );
};

export default Home;
