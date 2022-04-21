import Layout from 'components/Layout';
import PostList from 'components/PostList';
import ProfileBox from 'components/ProfileBox';
import type { NextPage } from 'next';
import styles from 'styles/Profile.module.scss';

const Profile: NextPage = () => {
  return (
    <Layout title="creddit: 프로필">
      <div className={styles.ProfileContainer}>
        <PostList />
        <div className={styles.ProfileInfo}>
          <ProfileBox
            nickName="woochul"
            statusMessage="고양이는 귀여워"
            signUpDateNum="0000.00.00"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
