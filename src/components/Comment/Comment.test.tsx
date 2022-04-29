import postDummy from 'data/post.json';
import { server } from 'mocks/server';
import { rest } from 'msw';
import { API_ENDPOINT } from 'utils/api';
import { render, screen, waitFor } from 'utils/test-utils';
import Comment, { commentProps } from './Comment';

describe('Comment', () => {
  const setup = (props: Partial<commentProps> = {}) => {
    const initialProps: commentProps = {
      comment: postDummy.comments[0],
    };
    const utils = render(<Comment {...initialProps} {...props} />);
    return {
      initialProps,
      ...utils,
    };
  };

  const setupButtons = async () => {
    let editButton!: HTMLButtonElement;
    await waitFor(() => {
      editButton = screen.getByLabelText('댓글 수정');
    });
    const deleteButton = screen.getByLabelText(
      '댓글 삭제'
    ) as HTMLButtonElement;
    return {
      editButton,
      deleteButton,
    };
  };

  it('renders properly', async () => {
    const { initialProps } = setup();
    const { editButton, deleteButton } = await setupButtons();
    const { comment } = initialProps;
    const { member, content, likes } = comment;
    expect(screen.getByText(member.nickname)).toBeInTheDocument();
    expect(screen.getByTestId('my-date')).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    expect(screen.getByText(content)).toBeInTheDocument();
    expect(screen.getByLabelText('좋아요')).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${likes}`))).toBeInTheDocument();
    expect(screen.getByLabelText('답글 달기')).toBeInTheDocument();
  });

  it('hides edit and delete buttons if the current user is not the author', () => {
    server.use(
      rest.get(`${API_ENDPOINT}/profile/show`, (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(null));
      })
    );
    setup();
    expect(screen.queryByLabelText('댓글 수정')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('댓글 삭제')).not.toBeInTheDocument();
  });
});
