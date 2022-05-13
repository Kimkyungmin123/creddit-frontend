import Layout from 'components/Layout';
import PostList from 'components/PostList';
import ProfileBox from 'components/ProfileBox';
import { useResetPosts } from 'context/PostsContext';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import styles from 'styles/Profile.module.scss';
import useSWRImmutable from 'swr/immutable';
import { User } from 'types';
import { fetcher } from 'utils/api';

const Profile: NextPage = () => {
  useResetPosts();
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

export default Profile;
