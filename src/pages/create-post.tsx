import Layout from 'components/Layout';
import PostForm from 'components/PostForm';
import useUser from 'hooks/useUser';
import type { NextPage } from 'next';

const CreatePost: NextPage = () => {
  const { isLoading, user } = useUser({
    redirectTo: '/',
    redirectWhen: 'unauthorized',
  });

  return (
    <Layout title="creddit: 글 작성">
      {!isLoading && user && (
        <PostForm
          title="글 작성"
          onSubmit={async ({ title, content }) => {
            console.log(JSON.stringify({ title, content }));
          }}
        />
      )}
    </Layout>
  );
};

export default CreatePost;
