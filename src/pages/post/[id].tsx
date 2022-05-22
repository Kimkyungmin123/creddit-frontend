import Layout from 'components/Layout';
import NotFound from 'components/NotFound';
import PostCommentBox from 'components/PostCommentBox';
import PostMain from 'components/PostMain';
import PostTop from 'components/PostTop';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initComments } from 'slices/commentsSlice';
import { initPostDetail, usePostDetail } from 'slices/postDetailSlice';
import { changePostsHydrate, usePosts } from 'slices/postsSlice';
import { wrapper } from 'slices/store';
import { initTheme } from 'slices/themeSlice';
import { initUser } from 'slices/userSlice';
import styles from 'styles/Post.module.scss';

const Post = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { blockHydrate } = usePosts();
  const post = usePostDetail();

  useEffect(() => {
    const clickEvent = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest('a')) {
        dispatch(changePostsHydrate({ block: false }));
      }
    };
    window.addEventListener('click', clickEvent);
    return () => window.removeEventListener('click', clickEvent);
  }, [dispatch]);

  return (
    <Layout title={post?.title}>
      {!post ? (
        <NotFound />
      ) : (
        <div
          className={styles.postContainer}
          onClick={(event) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains(styles.postContainer)) {
              if (blockHydrate) router.back();
              else router.push('/');
            }
          }}
        >
          <div className={styles.postBox}>
            <PostTop post={post} />
            <section className={styles.postContent}>
              <PostMain post={post} />
              <PostCommentBox post={post} />
            </section>
          </div>
        </div>
      )}
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    initTheme(store, context);
    await initUser(store, context);
    await Promise.all([
      initPostDetail(store, context),
      initComments(store, context),
    ]);
    return { props: {} };
  }
);

export default Post;
