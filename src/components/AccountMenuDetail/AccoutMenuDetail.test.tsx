import { render, screen } from '@testing-library/react';
import AccountMenuDetail from './AccountMenuDetail';

describe('AccountMenuDetail', () => {
  const setup = () => {
    const utils = render(<AccountMenuDetail />);
    return {
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
    expect(screen.getByText('대화 목록')).toHaveAttribute('href', '/chat-list');
    expect(screen.getByText('로그아웃')).toBeInTheDocument();
  });
});
