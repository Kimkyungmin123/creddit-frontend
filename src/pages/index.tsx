import ClassifyingPosts from 'components/ClassifyingPosts';
import Layout from 'components/Layout';
import PostBox from 'components/PostBox';
import type { NextPage } from 'next';
import styles from 'styles/Home.module.scss';
import dummy from '../data/dataset.json';

const Home: NextPage = () => {
  return (
    <Layout type="post" title="creddit">
      <div className={styles.container}>
        <div className={styles.ClassifyingPostsBox}>
          <ClassifyingPosts />
        </div>
        <div className={styles.PostBox}>
          {dummy.map((data) => (
            <PostBox
              key={data.id}
              postTitle={data.title}
              postContent={data.content}
              nickName={data.member}
              commentsCount={data.likeCount}
              likeCount={data.commentCount}
              date={data.createdDate}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
