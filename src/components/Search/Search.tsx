import Layout from 'components/Layout';
import PostList from 'components/PostList';
import { useRouter } from 'next/router';
import styles from './Search.module.scss';

interface SearchProps {
  subTitle?: string;
}

function Search({ subTitle }: SearchProps) {
  const router = useRouter();
  const { q } = router.query;

  return (
    <Layout
      title={`${q} 검색 결과${subTitle ? ` (${subTitle})` : ''} - credidt`}
    >
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
