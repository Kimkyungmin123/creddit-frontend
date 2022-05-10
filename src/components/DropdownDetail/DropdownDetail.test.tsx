import { fireEvent, render, screen } from 'utils/test-utils';
import DropdownDetail, { DropdownDetailProps } from './DropdownDetail';

describe('DropdownDetail', () => {
  const setup = () => {
    const initialProps: DropdownDetailProps = {
      parent: { className: '', ref: { current: null } },
      onClick: jest.fn(),
      options: [
        { name: '프로필', href: '/profile' },
        { name: '새 글 작성', href: '/create-post' },
        { name: '대화 목록', href: '/chat' },
        { name: '로그아웃', onClick: jest.fn() },
      ],
    };
    const utils = render(<DropdownDetail {...initialProps} />);
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
    const Dropdown = screen.getByTestId('dropdown-detail');
    fireEvent.click(Dropdown);
    expect(onClick).toHaveBeenCalled();
  });
});
