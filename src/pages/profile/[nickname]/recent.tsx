import Profile from 'components/Profile';
import { initPosts } from 'slices/postsSlice';
import { initProfile } from 'slices/profileSlice';
import { wrapper } from 'slices/store';
import { initTheme } from 'slices/themeSlice';
import { initUser } from 'slices/userSlice';

export default function ProfileRecent() {
  return <Profile subTitle="최신 글" />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    initTheme(store, context);
    await initUser(store, context);
    await Promise.all([
      initPosts(`/post/user/${context.params?.nickname}`, store, context),
      initProfile(store, context),
    ]);
    return { props: {} };
  }
);
