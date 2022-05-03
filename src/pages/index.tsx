import Layout from 'components/Layout';
import PostList from 'components/PostList';
import { useResetPosts } from 'context/PostsContext';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  useResetPosts();

  return (
    <Layout title="creddit">
      <PostList url="/post" />
    </Layout>
  );
};

export default Home;
