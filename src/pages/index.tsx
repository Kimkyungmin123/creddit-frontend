import Home from 'components/Home';
import { initPosts } from 'slices/postsSlice';
import { wrapper } from 'slices/store';
import { initUser } from 'slices/userSlice';

export default Home;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    await initUser(store, context);
    await initPosts('/post', store, context);
    return { props: {} };
  }
);
