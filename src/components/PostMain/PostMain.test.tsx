import postDummy from 'data/post.json';
import { render, screen } from 'utils/test-utils';
import PostMain, { PostMainProps } from './PostMain';

describe('PostMain', () => {
  const setup = (props: Partial<PostMainProps> = {}) => {
    const initialProps: PostMainProps = {
      post: postDummy,
    };
    const utils = render(<PostMain {...initialProps} {...props} />);
    return {
      initialProps,
      ...utils,
    };
  };

  it('renders properly', () => {
    const { initialProps } = setup();
    const { post } = initialProps;
    const { title, member, content } = post;
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(member.nickname)).toBeInTheDocument();
    expect(screen.getByTestId('my-date')).toBeInTheDocument();
    expect(screen.getByLabelText('게시물 수정')).toBeInTheDocument();
    expect(screen.getByLabelText('게시물 삭제')).toBeInTheDocument();
    expect(screen.getByTestId('content').textContent).toBe(content);
  });
});
