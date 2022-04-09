import type { NextPage } from 'next';
import ProfileBox from 'components/ProfileBox';
import Layout from 'components/Layout';
import styles from 'styles/Profile.module.scss';
import ClassifyingPosts from 'components/ClassifyingPosts';

const Profile: NextPage = () => {
  return (
    <Layout type="post" title="creddit: 프로필 설정">
      <div className={styles.ProfileContainer}>
        <div className={styles.userPostList}>
          <ClassifyingPosts />
        </div>
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
