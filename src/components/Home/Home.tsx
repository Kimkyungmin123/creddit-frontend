import Layout from 'components/Layout';
import PostList from 'components/PostList';

interface HomeProps {
  title?: string;
}

function Home({ title }: HomeProps) {
  return (
    <Layout title={title}>
      <PostList clientUrl="/" serverUrl="/post" />
    </Layout>
  );
}

export default Home;
