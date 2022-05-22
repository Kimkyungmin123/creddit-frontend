import Home from 'components/Home';
import { initPosts } from 'slices/postsSlice';
import { wrapper } from 'slices/store';
import { initTheme } from 'slices/themeSlice';
import { initUser } from 'slices/userSlice';

export default function HomeFollowing() {
  return <Home title="팔로우 중인 글 - creddit" />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    initTheme(store, context);
    await initUser(store, context);
    await initPosts('/post', store, context);
    return { props: {} };
  }
);
