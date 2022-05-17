import Layout from 'components/Layout';
import NotFound from 'components/NotFound';
import PostForm from 'components/PostForm';
import { usePostCardContext } from 'context/PostCardContext';
import { usePostsContext } from 'context/PostsContext';
import useLogoutRedirect from 'hooks/useLogoutRedirect';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { wrapper } from 'slices/store';
import { initUser, useUser } from 'slices/userSlice';
import { mutate } from 'swr';
import useSWRImmutable from 'swr/immutable';
import { Post } from 'types';
import api, { fetcher } from 'utils/api';
import getPostFormData from 'utils/getPostFormData';

const EditPost: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const user = useUser();
  const { data, error } = useSWRImmutable<Post>(
    id && user ? `/post/${id}?nickname=${user.nickname}` : null,
    fetcher
  );
  const { dispatch } = usePostsContext();
  const { setClickedPostCard } = usePostCardContext();
  useLogoutRedirect({ to: '/' });

  const isAuthor = useCallback(() => {
    if (!user || !data) return true;
    return data.member.nickname === user.nickname;
  }, [user, data]);

  return (
    <Layout title="글 수정 - creddit">
      {(error || !isAuthor()) && <NotFound />}
      {user && data && id !== undefined && (
        <PostForm
          title="수정"
          imageUrl={data.image.imgUrl}
          initialValues={{ title: data.title, content: data.content }}
          onSubmit={async (values, imageFile) => {
            const formData = getPostFormData({ values, imageFile });
            await api.post(`/post/${id}/edit`, formData);
            const post = await mutate<Post>(
              `/post/${id}?nickname=${user.nickname}`
            );
            dispatch({ type: 'CHANGE_POST', post });
            setClickedPostCard(false);
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
    if (!user) return { redirect: { destination: '/', permanent: false } };
    return { props: {} };
  }
);

export default EditPost;
