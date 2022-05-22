import Layout from 'components/Layout';
import NotFound from 'components/NotFound';
import PostForm from 'components/PostForm';
import useLogoutRedirect from 'hooks/useLogoutRedirect';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { initPostDetail, usePostDetail } from 'slices/postDetailSlice';
import { wrapper } from 'slices/store';
import { initUser, useUser } from 'slices/userSlice';
import api from 'utils/api';
import getPostFormData from 'utils/getPostFormData';

const EditPost: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const user = useUser();
  useLogoutRedirect({ to: '/' });
  const post = usePostDetail();
  const isAuthor = post?.member.nickname === user?.nickname;

  return (
    <Layout title="글 수정 - creddit">
      {!post || !isAuthor ? (
        <NotFound />
      ) : (
        <PostForm
          title="수정"
          imageUrl={post.image.imgUrl}
          initialValues={{ title: post.title, content: post.content }}
          onSubmit={async (values, imageFile) => {
            const formData = getPostFormData({ values, imageFile });
            await api.post(`/post/${id}/edit`, formData);
            router.push(`/post/${id}`);
          }}
        />
      )}
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { user } = await initUser(store, context);
    await initPostDetail(store, context);
    if (!user) return { redirect: { destination: '/', permanent: false } };
    return { props: {} };
  }
);

export default EditPost;
