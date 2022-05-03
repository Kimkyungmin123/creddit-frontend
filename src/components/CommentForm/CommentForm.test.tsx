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

  it('renders properly when initialValues exist', async () => {
    const initialValues = { comment: '안녕하세요' };
    const { textarea } = setup({ initialValues });
    expect(textarea.value).toBe(initialValues.comment);
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

  it('calls onCancel when the cancelButton is clicked', () => {
    const onCancel = jest.fn();
    setup({ onCancel });
    const cancelButton = screen.getByText('취소');
    fireEvent.click(cancelButton);
    expect(onCancel).toHaveBeenCalled();
  });
});
