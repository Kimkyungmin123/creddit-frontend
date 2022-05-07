import postDummy from 'data/post.json';
import { fireEvent, render, screen } from 'utils/test-utils';
import PostCommentBox, { PostCommentBoxProps } from './PostCommentBox';

describe('PostCommentBox', () => {
  const setup = (props: Partial<PostCommentBoxProps> = {}) => {
    const initialProps: PostCommentBoxProps = {
      post: postDummy,
    };
    const utils = render(<PostCommentBox {...initialProps} {...props} />);
    const dropdown = screen.getByTestId('dropdown') as HTMLButtonElement;
    return {
      initialProps,
      dropdown,
      ...utils,
    };
  };

  it('renders properly', () => {
    const { initialProps, dropdown } = setup();
    const { post } = initialProps;
    const { comments } = post;
    expect(screen.getByText(`댓글 ${comments}개`)).toBeInTheDocument();
    expect(dropdown.textContent).toBe('정렬 기준: 좋아요순');
    expect(screen.getByTestId('comment-form')).toBeInTheDocument();
  });

  it('changes sorting when change state', () => {
    const { dropdown } = setup();
    const button = screen.getByLabelText('댓글 정렬 기준 변경(현재 좋아요순)');
    fireEvent.click(button);
    const recentButton = screen.getByText('최신순');
    fireEvent.click(recentButton);
    expect(dropdown.textContent).toBe('정렬 기준: 최신순');
  });
});
