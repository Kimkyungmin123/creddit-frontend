import Profile from 'components/Profile';
import { initPosts } from 'slices/postsSlice';
import { wrapper } from 'slices/store';
import { initUser } from 'slices/userSlice';

export default Profile;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    await initUser(store, context);
    await initPosts(`/post/user/${context.params?.nickname}`, store, context);
    return { props: {} };
  }
);
