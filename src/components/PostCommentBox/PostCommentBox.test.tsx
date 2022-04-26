import postDummy from 'data/post.json';
import { render, screen } from 'utils/test-utils';
import PostCommentBox, { PostCommentBoxProps } from './PostCommentBox';

describe('PostCommentBox', () => {
  const setup = (props: Partial<PostCommentBoxProps> = {}) => {
    const initialProps: PostCommentBoxProps = {
      post: postDummy,
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
    const { comments } = post;
    expect(screen.getByText(`댓글 ${comments.length}개`)).toBeInTheDocument();
    expect(screen.getByLabelText('댓글 정렬 기준 변경')).toBeInTheDocument();
    expect(screen.getByTestId('post-comment-form')).toBeInTheDocument();
    expect(screen.getAllByTestId('comment').length).toBe(comments.length);
  });
});
