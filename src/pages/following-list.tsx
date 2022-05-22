import Layout from 'components/Layout';
import NicknameLink from 'components/NicknameLink';
import ProfileImage from 'components/ProfileImage';
import useFollowingList from 'hooks/useFollowingList';
import type { NextPage } from 'next';
import { wrapper } from 'slices/store';
import { initTheme } from 'slices/themeSlice';
import { initUser } from 'slices/userSlice';
import styles from 'styles/Following.module.scss';

const FollowingList: NextPage = () => {
  const { data: followingList } = useFollowingList();

  return (
    <Layout title="팔로우 중인 사용자 목록 - creddit">
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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    initTheme(store, context);
    await initUser(store, context);
    return { props: {} };
  }
);

export default FollowingList;
