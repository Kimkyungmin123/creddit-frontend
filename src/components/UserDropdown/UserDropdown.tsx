import Dropdown from 'components/Dropdown';
import ProfileImage from 'components/ProfileImage';
import { CaretDown } from 'icons';
import { useDispatch } from 'react-redux';
import { removeCommentsLike } from 'slices/commentsSlice';
import { removePostDetailLike } from 'slices/postDetailSlice';
import { logout } from 'slices/userSlice';
import { User } from 'types';
import styles from './UserDropdown.module.scss';

function UserDropdown({ user }: { user: User }) {
  const dispatch = useDispatch();

  return (
    <Dropdown
      ariaLabel="계정 메뉴"
      options={[
        { name: '프로필', href: `/profile/${user.nickname}` },
        { name: '새 글 작성', href: '/create-post' },
        { name: '대화 목록', href: '/chat' },
        {
          name: '로그아웃',
          onClick: () => {
            dispatch(logout());
            dispatch(removePostDetailLike());
            dispatch(removeCommentsLike());
          },
        },
      ]}
    >
      <ProfileImage imgUrl={user.image.imgUrl} size={1.625} />
      <CaretDown className={styles.caretDownIcon} />
    </Dropdown>
  );
}

export default UserDropdown;
