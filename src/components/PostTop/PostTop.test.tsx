import postDummy from 'data/post.json';
import { render, screen } from 'utils/test-utils';
import PostTop, { PostTopProps } from './PostTop';

describe('PostTop', () => {
  const setup = (props: Partial<PostTopProps> = {}) => {
    const initialProps: PostTopProps = {
      post: postDummy,
    };
    const utils = render(<PostTop {...initialProps} {...props} />);
    return {
      initialProps,
      ...utils,
    };
  };

  it('renders properly', () => {
    const { initialProps } = setup();
    const { post } = initialProps;
    const { likes, title } = post;
    expect(screen.getByLabelText('좋아요')).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${likes}`))).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByLabelText('게시물 닫기')).toBeInTheDocument();
  });
});
