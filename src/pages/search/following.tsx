import Search from 'components/Search';
import { initPosts } from 'slices/postsSlice';
import { wrapper } from 'slices/store';
import { initTheme } from 'slices/themeSlice';
import { initUser } from 'slices/userSlice';

export default function SearchFollowing() {
  return <Search subTitle="팔로우 중인 글" />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    initTheme(store, context);
    await initUser(store, context);
    await initPosts('/post/search', store, context);
    return { props: {} };
  }
);
