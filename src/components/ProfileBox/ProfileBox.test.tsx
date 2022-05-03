import userDummy from 'data/user.json';
import { fireEvent, render, screen } from 'utils/test-utils';
import ProfileBox, { ProfileBoxProps } from './ProfileBox';

describe('ProfileBox', () => {
  const setup = (props: Partial<ProfileBoxProps> = {}) => {
    const initialProps: ProfileBoxProps = {
      user: userDummy,
    };
    const utils = render(<ProfileBox {...initialProps} {...props} />);
    const editButton = screen.getByText('프로필 수정') as HTMLButtonElement;
    return {
      initialProps,
      editButton,
      ...utils,
    };
  };

  it('renders properly', () => {
    const { initialProps, editButton } = setup();
    const { nickname, introduction } = initialProps.user;
    expect(screen.getByTestId('image-box')).toBeInTheDocument();
    expect(screen.getByText(nickname)).toBeInTheDocument();
    expect(screen.getByText(introduction)).toBeInTheDocument();
    expect(screen.getByText('가입일')).toBeInTheDocument();
    expect(screen.getByTestId('my-date')).toBeInTheDocument();
    expect(screen.getByText('새 글 작성')).toHaveAttribute(
      'href',
      '/create-post'
    );
    expect(screen.getByText('대화 목록')).toHaveAttribute('href', '/chat');
    expect(editButton).toBeInTheDocument();
    expect(screen.getByText('비밀번호 변경')).toHaveAttribute(
      'href',
      '/reset-password'
    );
  });

  it('shows ProfileEditForm when click editButton', async () => {
    const { editButton } = setup();
    fireEvent.click(editButton);
    expect(screen.getByTestId('profile-edit-form')).toBeInTheDocument();
    const cancelButton = screen.getByText('취소');
    expect(cancelButton).toBeInTheDocument();
    fireEvent.click(cancelButton);
    expect(screen.queryByTestId('profile-edit-form')).not.toBeInTheDocument();
  });
});
