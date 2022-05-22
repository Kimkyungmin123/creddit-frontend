import Home from 'components/Home';
import { initPosts } from 'slices/postsSlice';
import { wrapper } from 'slices/store';
import { initTheme } from 'slices/themeSlice';
import { initUser } from 'slices/userSlice';

export default Home;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    initTheme(store, context);
    await initUser(store, context);
    await initPosts('/post', store, context);
    return { props: {} };
  }
);
