import Layout from 'components/Layout';
import NicknameLink from 'components/NicknameLink';
import ProfileImage from 'components/ProfileImage';
import { useResetPosts } from 'context/PostsContext';
import useFollowingList from 'hooks/useFollowingList';
import type { NextPage } from 'next';
import styles from 'styles/Following.module.scss';

const Following: NextPage = () => {
  useResetPosts();
  const { data: followingList } = useFollowingList();

  return (
    <Layout title="creddit">
      <div className={styles.container}>
        <h2>팔로우 중인 사용자 목록</h2>
        <ul className={styles.list}>
          {followingList?.map((user) => (
            <li key={user.nickname}>
              <ProfileImage
                nickname={user.nickname}
                imgUrl={user.imgUrl}
                size={2.25}
              />
              <NicknameLink nickname={user.nickname} />
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Following;
