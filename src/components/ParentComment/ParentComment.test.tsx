import commentsDummy from 'data/comments.json';
import { fireEvent, render, screen } from 'utils/test-utils';
import ParentComment, { parentCommentProps } from './ParentComment';

function renderParentComment(props?: Partial<parentCommentProps>) {
  const comment = commentsDummy[0];
  const dispatchComments = jest.fn();

  const utils = render(<ParentComment comment={comment} {...props} />);

  const Comment = () => screen.getByTestId('comment');
  const ReplyToggleButton = () => screen.getByTestId('reply-toggle-button');

  function clickReplyToggleButton() {
    fireEvent.click(ReplyToggleButton());
  }

  return {
    utils,
    comment,
    dispatchComments,
    Comment,
    ReplyToggleButton,
    clickReplyToggleButton,
  };
}

describe('<ParentComment />', () => {
  it('기본 필드를 렌더링한다', () => {
    const { Comment, ReplyToggleButton } = renderParentComment();

    expect(Comment()).toBeInTheDocument();
    expect(ReplyToggleButton()).toBeInTheDocument();
  });

  it('답글 토글 버튼을 클릭하면 답글 토글 버튼 문구를 변경한다', () => {
    const { comment, ReplyToggleButton, clickReplyToggleButton } =
      renderParentComment();
    const { detailCommentCount } = comment;

    const message = (word: string) => `답글 ${detailCommentCount}개 ${word}`;

    expect(ReplyToggleButton().textContent).toBe(message('보기'));
    clickReplyToggleButton();
    expect(ReplyToggleButton().textContent).toBe(message('숨기기'));
  });
});
