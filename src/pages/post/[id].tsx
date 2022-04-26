import Layout from 'components/Layout';
import NotFound from 'components/NotFound';
import PostCommentBox from 'components/PostCommentBox';
import PostMain from 'components/PostMain';
import PostTop from 'components/PostTop';
import { useRouter } from 'next/router';
import styles from 'styles/Post.module.scss';
import useSWR from 'swr';
import { Post as PostType } from 'types';
import { fetcher } from 'utils/api';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR<PostType>(id ? `/post/${id}` : null, fetcher);

  return (
    <Layout title={data?.title}>
      {error && <NotFound />}
      {data && (
        <div
          className={styles.postContainer}
          onClick={(event) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains(styles.postContainer)) {
              router.back();
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

export default Post;
