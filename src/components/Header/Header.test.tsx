import { server } from 'mocks/server';
import { rest } from 'msw';
import { render, screen, waitFor } from 'utils/test-utils';
import Header, { HeaderProps } from './Header';

describe('Header', () => {
  const setup = (props: Partial<HeaderProps> = {}) => {
    const utils = render(<Header {...props} />);
    return {
      ...utils,
    };
  };

  it('renders properly', async () => {
    setup();
    expect(screen.getByLabelText('홈')).toHaveAttribute('href', '/');
    await waitFor(() => {
      expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    });
    expect(
      screen.getByLabelText('색상 모드 변경(현재 어두운 모드)')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('깃허브 저장소')).toHaveAttribute(
      'href',
      'https://github.com/project-creddit'
    );
  });

  it('renders properly when logged in', async () => {
    setup();
    await waitFor(() => {
      expect(screen.getByLabelText('글 작성')).toHaveAttribute(
        'href',
        '/create-post'
      );
    });
    expect(screen.getByTestId('account-menu')).toBeInTheDocument();
  });

  it('renders properly when not logged in', async () => {
    server.use(
      rest.get('/api/me', (_, res, ctx) => {
        return res(ctx.status(200), ctx.json({}));
      })
    );
    setup();

    await waitFor(() => {
      expect(screen.getByText('로그인')).toHaveAttribute('href', '/login');
    });
    expect(screen.getByText('회원가입')).toHaveAttribute('href', '/signup');
  });

  it('hides the search bar if hideSearchBar is true', () => {
    setup({ hideSearchBar: true });
    expect(screen.queryByTestId('search-bar')).not.toBeInTheDocument();
  });
});
