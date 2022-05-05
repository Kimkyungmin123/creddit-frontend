import Layout from 'components/Layout';
import NotFound from 'components/NotFound';
import PostForm from 'components/PostForm';
import { usePostCardContext } from 'context/PostCardContext';
import { usePostsContext } from 'context/PostsContext';
import useUser from 'hooks/useUser';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { mutate } from 'swr';
import useSWRImmutable from 'swr/immutable';
import { Post } from 'types';
import api, { fetcher } from 'utils/api';
import getPostFormData from 'utils/getPostFormData';

// TODO: 기존 이미지를 없앨 수 있도록 하기
const EditPost: NextPage = () => {
  const { isLoading, user } = useUser({
    redirectTo: '/',
    redirectWhen: 'unauthorized',
  });
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWRImmutable<Post>(
    id ? `/post/${id}` : null,
    fetcher
  );
  const { dispatch } = usePostsContext();
  const { setClickedPostCard } = usePostCardContext();

  const isAuthor = useCallback(() => {
    if (!user || !data) return true;
    return data.member.nickname === user.nickname;
  }, [user, data]);

  return (
    <Layout title="글 수정 - creddit">
      {(error || !isAuthor()) && <NotFound />}
      {!isLoading && user && data && id !== undefined && (
        <PostForm
          title="수정"
          imageUrl={data.image.imgUrl}
          initialValues={{ title: data.title, content: data.content }}
          onSubmit={async (values, imageFile) => {
            const formData = getPostFormData({ values, imageFile });
            await api.post(`/post/${id}/edit`, formData);
            const { title, content } = values;
            const post = await mutate<Post>(
              `/post/${id}`,
              { ...data, title, content },
              false
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

export default EditPost;
