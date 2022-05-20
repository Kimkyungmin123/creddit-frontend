import Layout from 'components/Layout';
import PostList from 'components/PostList';
import { useRouter } from 'next/router';
import styles from './Search.module.scss';

function Search() {
  const router = useRouter();
  const { q } = router.query;

  return (
    <Layout title="creddit">
      <div className={styles.container}>
        <h2>{q} 검색 결과</h2>
        {q && (
          <PostList
            clientUrl={`/search`}
            clientParams={{ q }}
            serverUrl="/post/search"
            serverParams={{ keyword: q }}
          />
        )}
      </div>
    </Layout>
  );
}

export default Search;
