import Layout from 'components/Layout';
import NotFound from 'components/NotFound';
import type { NextPage } from 'next';

const Custom404: NextPage = () => {
  return (
    <Layout title="존재하지 않는 페이지 - creddit" hideHeader={true}>
      <NotFound />
    </Layout>
  );
};

export default Custom404;
