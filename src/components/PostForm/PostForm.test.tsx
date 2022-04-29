import ERRORS from 'constants/errors';
import { fireEvent, render, screen, waitFor } from 'utils/test-utils';
import PostForm, { PostFormProps } from './PostForm';

describe('PostForm', () => {
  const setup = (props: Partial<PostFormProps> = {}) => {
    const initialProps: PostFormProps = {
      title: 'form title',
      onSubmit: jest.fn(),
    };
    const utils = render(<PostForm {...initialProps} {...props} />);
    const titleTextarea = screen.getByPlaceholderText(
      '제목'
    ) as HTMLTextAreaElement;
    const contentTextarea = screen.getByPlaceholderText(
      '내용'
    ) as HTMLTextAreaElement;
    const submitButton = screen.getByTestId(
      'submitButton'
    ) as HTMLButtonElement;
    return {
      initialProps,
      titleTextarea,
      contentTextarea,
      submitButton,
      ...utils,
    };
  };

  it('renders properly', async () => {
    const { initialProps, titleTextarea, contentTextarea, submitButton } =
      setup();
    const { title } = initialProps;
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(titleTextarea).toBeInTheDocument();
    expect(contentTextarea).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('renders properly when initialValues exist', async () => {
    const initialValues = { title: '제목', content: '내용' };
    const { titleTextarea, contentTextarea, submitButton } = setup({
      initialValues,
    });
    expect(titleTextarea.value).toBe(initialValues.title);
    expect(contentTextarea.value).toBe(initialValues.content);
    expect(submitButton).not.toBeDisabled();
  });

  it('shows an content error message if the content is invalid', async () => {
    const { contentTextarea } = setup();
    fireEvent.change(contentTextarea, { target: { value: '1'.repeat(2001) } });
    fireEvent.blur(contentTextarea);
    await waitFor(() => {
      expect(screen.getByText(ERRORS.contentLong)).toBeInTheDocument();
    });
  });

  it('submit the values if the all values are filled', async () => {
    const { initialProps, titleTextarea, contentTextarea, submitButton } =
      setup();
    const { onSubmit } = initialProps;
    const values = { title: '제목', content: '내용' };
    fireEvent.change(titleTextarea, { target: { value: values.title } });
    expect(submitButton).toBeDisabled();
    fireEvent.change(contentTextarea, { target: { value: values.content } });
    expect(submitButton).not.toBeDisabled();
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(values);
    });
  });
});
