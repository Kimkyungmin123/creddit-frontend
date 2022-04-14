import { fireEvent, render, screen } from '@testing-library/react';
import AccountMenu from './AccountMenu';

describe('AccountMenu', () => {
  const setup = () => {
    const utils = render(<AccountMenu />);
    const button = screen.getByLabelText('계정 메뉴') as HTMLButtonElement;
    return {
      button,
      ...utils,
    };
  };

  it('renders properly', () => {
    const { button } = setup();
    expect(screen.getByAltText('사용자 프로필 이미지')).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('shows detail when expanded', () => {
    const { button } = setup();
    fireEvent.click(button);
    expect(screen.getByText('프로필')).toHaveAttribute('href', '/profile');
    expect(screen.getByText('새 글 작성')).toHaveAttribute(
      'href',
      '/create-post'
    );
    expect(screen.getByText('대화 목록')).toHaveAttribute('href', '/chat-list');
    expect(screen.getByText('로그아웃')).toBeInTheDocument();
  });

  it('hides detail when closed', () => {
    const { button } = setup();
    fireEvent.click(button);
    fireEvent.click(button);
    expect(screen.queryByTestId('detail')).not.toBeInTheDocument();
  });
});
