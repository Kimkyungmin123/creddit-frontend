import Layout from 'components/Layout';
import PostList from 'components/PostList';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { wrapper } from 'slices/store';
import { initUser } from 'slices/userSlice';
import styles from 'styles/Search.module.scss';

const Search: NextPage = () => {
  const router = useRouter();
  const { q } = router.query;

  return (
    <Layout title="creddit">
      <div className={styles.container}>
        <h2>{q} 검색 결과</h2>
        {q && <PostList url="/post/search" params={{ keyword: q }} />}
      </div>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    await initUser(store, context);
    return { props: {} };
  }
);

export default Search;
