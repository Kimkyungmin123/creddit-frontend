import Layout from 'components/Layout';
import PostList from 'components/PostList';
import { useResetPosts } from 'context/PostsContext';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import styles from 'styles/Search.module.scss';

const Search: NextPage = () => {
  const router = useRouter();
  const { q } = router.query;
  useResetPosts();

  return (
    <Layout title="creddit">
      <div className={styles.container}>
        <h2>{q} 검색 결과</h2>
        {q && <PostList url="/post/search" params={{ keyword: q }} />}
      </div>
    </Layout>
  );
};

export default Search;
