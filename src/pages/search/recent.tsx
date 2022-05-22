import Search from 'components/Search';
import { initPosts } from 'slices/postsSlice';
import { wrapper } from 'slices/store';
import { initTheme } from 'slices/themeSlice';
import { initUser } from 'slices/userSlice';

export default function SearchRecent() {
  return <Search subTitle="최신 글" />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    initTheme(store, context);
    await initUser(store, context);
    await initPosts('/post/search', store, context);
    return { props: {} };
  }
);
