import postsDummy from 'data/posts.json';
import { render, screen } from 'utils/test-utils';
import PostCommentBox, { PostCommentBoxProps } from './PostCommentBox';

describe('PostCommentBox', () => {
  const setup = (props: Partial<PostCommentBoxProps> = {}) => {
    const initialProps: PostCommentBoxProps = {
      post: postsDummy[0],
    };
    const utils = render(<PostCommentBox {...initialProps} {...props} />);
    return {
      initialProps,
      ...utils,
    };
  };

  it('renders properly', () => {
    const { initialProps } = setup();
    const { post } = initialProps;
    const { commentCount, comments } = post;
    expect(screen.getByText(`댓글 ${commentCount}개`)).toBeInTheDocument();
    expect(screen.getByLabelText('댓글 정렬 기준 변경')).toBeInTheDocument();
    expect(screen.getByTestId('post-comment-form')).toBeInTheDocument();
    expect(screen.getAllByTestId('comment').length).toBe(comments.length);
  });
});
