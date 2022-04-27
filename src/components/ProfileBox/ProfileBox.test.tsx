import userDummy from 'data/user.json';
import { render, screen } from 'utils/test-utils';
import ProfileBox, { ProfileBoxProps } from './ProfileBox';

describe('ProfileBox', () => {
  const setup = (props: Partial<ProfileBoxProps> = {}) => {
    const initialProps: ProfileBoxProps = {
      user: userDummy,
    };
    const utils = render(<ProfileBox {...initialProps} {...props} />);
    return {
      initialProps,
      ...utils,
    };
  };

  it('renders properly', () => {
    const { initialProps } = setup();
    const { nickname, introduction } = initialProps.user;
    expect(screen.getByText(nickname)).toBeInTheDocument();
    expect(screen.getByText(introduction)).toBeInTheDocument();
    expect(screen.getByText('가입일')).toBeInTheDocument();
    expect(screen.getByTestId('my-date')).toBeInTheDocument();
    expect(screen.getByText('새 글 작성')).toHaveAttribute(
      'href',
      '/create-post'
    );
    expect(screen.getByText('대화 목록')).toHaveAttribute('href', '/chat');
    expect(screen.getByText('프로필 수정')).toBeInTheDocument();
  });
});
