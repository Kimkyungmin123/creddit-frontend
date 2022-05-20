import Profile from 'components/Profile';
import { initPosts } from 'slices/postsSlice';
import { initProfile } from 'slices/profileSlice';
import { wrapper } from 'slices/store';
import { initUser } from 'slices/userSlice';

export default Profile;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    await initUser(store, context);
    await Promise.all([
      initPosts(`/post/user/${context.params?.nickname}`, store, context),
      initProfile(store, context),
    ]);
    return { props: {} };
  }
);
