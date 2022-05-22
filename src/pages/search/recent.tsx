import Search from 'components/Search';
import { initPosts } from 'slices/postsSlice';
import { wrapper } from 'slices/store';
import { initUser } from 'slices/userSlice';

export default Search;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    await initUser(store, context);
    await initPosts('/post/search', store, context);
    return { props: {} };
  }
);
