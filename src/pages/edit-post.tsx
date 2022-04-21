import Layout from 'components/Layout';
import PostForm from 'components/PostForm';
import useUser from 'hooks/useUser';
import type { NextPage } from 'next';

const EditPost: NextPage = () => {
  const { isLoading, user } = useUser({
    redirectTo: '/',
    redirectWhen: 'unauthorized',
  });

  return (
    <Layout title="creddit: 글 수정">
      {!isLoading && user && (
        <PostForm
          title="글 수정"
          onSubmit={async ({ title, content }) => {
            console.log(JSON.stringify({ title, content }));
          }}
        />
      )}
    </Layout>
  );
};

export default EditPost;
