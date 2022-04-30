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
    <Layout title="글 작성 - creddit">
      {!isLoading && user && (
        <PostForm
          title="작성"
          onSubmit={async (values) => {
            const formData = getPostFormData(values);
            const { data } = await api.post('/post/create', formData);
            router.replace(`/post/${data}`);
          }}
        />
      )}
    </Layout>
  );
};

export default CreatePost;
