import { fireEvent, render, screen } from 'utils/test-utils';
import AccountMenuDetail, { AccountMenuDetailProps } from './AccountMenuDetail';

describe('AccountMenuDetail', () => {
  const setup = () => {
    const initialProps: AccountMenuDetailProps = {
      onClick: jest.fn(),
    };
    const utils = render(<AccountMenuDetail {...initialProps} />);
    return {
      initialProps,
      ...utils,
    };
  };

  it('renders properly', () => {
    setup();
    expect(screen.getByText('프로필')).toHaveAttribute('href', '/profile');
    expect(screen.getByText('새 글 작성')).toHaveAttribute(
      'href',
      '/create-post'
    );
    expect(screen.getByText('대화 목록')).toHaveAttribute('href', '/chat');
    expect(screen.getByText('로그아웃')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const { initialProps } = setup();
    const { onClick } = initialProps;
    const accountMenu = screen.getByTestId('account-menu-detail');
    fireEvent.click(accountMenu);
    expect(onClick).toHaveBeenCalled();
  });
});
