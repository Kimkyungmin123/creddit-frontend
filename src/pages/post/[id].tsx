import Layout from 'components/Layout';
import PostCommentBox from 'components/PostCommentBox';
import PostMain from 'components/PostMain';
import PostTop from 'components/PostTop';
import { useRouter } from 'next/router';
import styles from 'styles/Post.module.scss';
import postsDummy from '../../data/posts.json';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const numID = Number(id) - 1;
  const post = postsDummy[numID];

  return (
    <Layout title={post.title}>
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
          <PostTop post={post} />
          <section className={styles.postContent}>
            <PostMain post={post} />
            <PostCommentBox post={post} />
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Post;
