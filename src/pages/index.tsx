import Layout from 'components/Layout';
import PostList from 'components/PostList';
import { useResetPosts } from 'context/PostsContext';
import type { NextPage } from 'next';
import { wrapper } from 'slices/store';
import { initUser } from 'slices/userSlice';

const Home: NextPage = () => {
  useResetPosts();

  return (
    <Layout title="creddit">
      <PostList url="/post" />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    await initUser(store, context);
    return { props: {} };
  }
);

export default Home;
