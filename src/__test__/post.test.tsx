import Post from 'pages/post/[id]';
import { render, screen } from 'utils/test-utils';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: { id: 1 },
    };
  },
}));

describe('Post', () => {
  const setup = () => {
    const utils = render(<Post />);
    return {
      ...utils,
    };
  };

  it('renders properly', () => {
    setup();
    expect(screen.getByTestId('layout')).toBeInTheDocument();
    expect(screen.getByTestId('post-top')).toBeInTheDocument();
    expect(screen.getByTestId('post-main')).toBeInTheDocument();
    expect(screen.getByTestId('post-comment-box')).toBeInTheDocument();
  });
});
