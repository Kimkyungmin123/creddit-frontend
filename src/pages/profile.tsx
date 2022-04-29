import Layout from 'components/Layout';
import PostList from 'components/PostList';
import ProfileBox from 'components/ProfileBox';
import useUser from 'hooks/useUser';
import type { NextPage } from 'next';
import styles from 'styles/Profile.module.scss';

// TODO: 현재 로그인한 사용자 말고 다른 사용자의 프로필도 볼 수 있게 하기.
const Profile: NextPage = () => {
  const { user } = useUser();

  return (
    <Layout title={`${user?.nickname} - creddit`}>
      <div className={styles.profileContainer}>
        <PostList />
        {user && <ProfileBox user={user} />}
      </div>
    </Layout>
  );
};

export default Profile;
