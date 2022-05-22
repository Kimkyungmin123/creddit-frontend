import Layout from 'components/Layout';
import NotFound from 'components/NotFound';
import PostList from 'components/PostList';
import ProfileBox from 'components/ProfileBox';
import { useRouter } from 'next/router';
import { useProfile } from 'slices/profileSlice';
import styles from './Profile.module.scss';

interface ProfileProps {
  subTitle?: string;
}

function Profile({ subTitle }: ProfileProps) {
  const router = useRouter();
  const { nickname } = router.query;
  const profile = useProfile();

  return (
    <Layout title={`${nickname}${subTitle ? ` (${subTitle})` : ''} - creddit`}>
      {!profile ? (
        <NotFound />
      ) : (
        <div className={styles.profileContainer}>
          {nickname && (
            <PostList
              clientUrl={`/profile/${nickname}`}
              serverUrl={`/post/user/${nickname}`}
              className={styles.postList}
              hideFollowing={true}
            />
          )}
          {profile && <ProfileBox user={profile} />}
        </div>
      )}
    </Layout>
  );
}

export default Profile;
