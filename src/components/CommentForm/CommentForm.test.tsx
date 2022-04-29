import ERRORS from 'constants/errors';
import { fireEvent, render, screen, waitFor } from 'utils/test-utils';
import CommentForm, { CommentFormProps } from './CommentForm';

describe('CommentForm', () => {
  const setup = (props: Partial<CommentFormProps> = {}) => {
    const initialProps: CommentFormProps = {
      onSubmit: jest.fn(),
    };
    const utils = render(<CommentForm {...initialProps} {...props} />);
    const textarea = screen.getByPlaceholderText(
      '댓글을 남겨보세요'
    ) as HTMLTextAreaElement;
    const submitButton = screen.getByTestId(
      'submitButton'
    ) as HTMLButtonElement;
    return {
      initialProps,
      textarea,
      submitButton,
      ...utils,
    };
  };

  it('renders properly', () => {
    const { textarea, submitButton } = setup();
    expect(textarea).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('shows an error message if the comment is invalid', async () => {
    const { textarea, submitButton } = setup();
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText(ERRORS.commentRequired)).toBeInTheDocument();
    });
    fireEvent.change(textarea, { target: { value: '1'.repeat(2001) } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText(ERRORS.commentLong)).toBeInTheDocument();
    });
  });

  it('submit the values if the values are valid', async () => {
    const { initialProps, textarea, submitButton } = setup();
    const { onSubmit } = initialProps;
    const values = { comment: '글 잘 읽었습니다' };
    fireEvent.change(textarea, { target: { value: values.comment } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(values);
    });
  });
});
