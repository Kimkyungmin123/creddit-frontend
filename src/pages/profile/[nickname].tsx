import Layout from 'components/Layout';
import PostList from 'components/PostList';
import ProfileBox from 'components/ProfileBox';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { wrapper } from 'slices/store';
import { initUser } from 'slices/userSlice';
import styles from 'styles/Profile.module.scss';
import useSWRImmutable from 'swr/immutable';
import { User } from 'types';
import { fetcher } from 'utils/api';

const Profile: NextPage = () => {
  const router = useRouter();
  const { nickname } = router.query;
  const { data: userData } = useSWRImmutable<User>(
    nickname ? `/profile/show/${nickname}` : null,
    fetcher
  );

  return (
    <Layout title={`${nickname} - creddit`}>
      <div className={styles.profileContainer}>
        {nickname && (
          <PostList
            url={`/post/user/${nickname}`}
            className={styles.postList}
            hideFollowing={true}
          />
        )}
        {userData && <ProfileBox user={userData} />}
      </div>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    await initUser(store, context);
    return { props: {} };
  }
);

export default Profile;
