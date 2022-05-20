import Layout from 'components/Layout';
import PostList from 'components/PostList';

function Home() {
  return (
    <Layout title="creddit">
      <PostList clientUrl="/" serverUrl="/post" />
    </Layout>
  );
}

export default Home;
