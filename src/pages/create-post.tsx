import Layout from 'components/Layout';
import PostForm from 'components/PostForm';
import useUser from 'hooks/useUser';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import api from 'utils/api';
import getPostFormData from 'utils/getPostFormData';

const CreatePost: NextPage = () => {
  const { isLoading, user } = useUser({
    redirectTo: '/',
    redirectWhen: 'unauthorized',
  });
  const router = useRouter();

  return (
    <Layout title="creddit: 글 작성">
      {!isLoading && user && (
        <PostForm
          title="작성"
          onSubmit={async (values) => {
            try {
              const formData = getPostFormData(values);
              await api.post('/post/create', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
              });
            } finally {
              router.push('/');
            }
          }}
        />
      )}
    </Layout>
  );
};

export default CreatePost;
