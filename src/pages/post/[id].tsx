import Layout from 'components/Layout';
import NotFound from 'components/NotFound';
import PostCommentBox from 'components/PostCommentBox';
import PostMain from 'components/PostMain';
import PostTop from 'components/PostTop';
import { usePostCardContext } from 'context/PostCardContext';
import { useRouter } from 'next/router';
import { wrapper } from 'slices/store';
import { initUser, useUser } from 'slices/userSlice';
import styles from 'styles/Post.module.scss';
import useSWR from 'swr';
import { Post as PostType } from 'types';
import { fetcher } from 'utils/api';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const user = useUser();
  const userQuery = user ? `?nickname=${user.nickname}` : '';
  const { data, error } = useSWR<PostType>(
    id ? `/post/${id}${userQuery}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  const { clickedPostCard } = usePostCardContext();

  return (
    <Layout title={data?.title}>
      {error && <NotFound />}
      {data && (
        <div
          className={styles.postContainer}
          onClick={(event) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains(styles.postContainer)) {
              if (clickedPostCard) router.back();
              else router.push('/');
            }
          }}
        >
          <div className={styles.postBox}>
            <PostTop post={data} />
            <section className={styles.postContent}>
              <PostMain post={data} />
              <PostCommentBox post={data} />
            </section>
          </div>
        </div>
      )}
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    await initUser(store, context);
    return { props: {} };
  }
);

export default Post;
