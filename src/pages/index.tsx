import Layout from 'components/Layout';
import PostList from 'components/PostList';
import type { NextPage } from 'next';
import { initPosts } from 'slices/postsSlice';
import { wrapper } from 'slices/store';
import { initUser } from 'slices/userSlice';

const Home: NextPage = () => {
  return (
    <Layout title="creddit">
      <PostList url="/post" />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    await initUser(store, context);
    await initPosts(store);
    return { props: {} };
  }
);

export default Home;
