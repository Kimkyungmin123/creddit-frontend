import ERRORS from 'constants/errors';
import FindPassword, { FindPasswordForm } from 'pages/find-password';
import { fireEvent, render, screen, waitFor } from 'utils/test-utils';

describe('FindPassword', () => {
  const setupElements = () => {
    const emailInput = screen.getByLabelText('이메일') as HTMLInputElement;
    const submitButton = screen.getByTestId(
      'submitButton'
    ) as HTMLButtonElement;
    return {
      emailInput,
      submitButton,
    };
  };

  it('renders properly', () => {
    render(<FindPassword />);
    const { emailInput, submitButton } = setupElements();

    expect(screen.getByTestId('layout')).toBeInTheDocument();
    expect(
      screen.getByText('비밀번호 찾기', { selector: 'h1' })
    ).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(
      screen.getByText(
        '이메일을 입력하고 확인 버튼을 누르시면, 해당 이메일로 비밀번호 재설정 링크를 보내드립니다.'
      )
    ).toBeInTheDocument();
  });

  it('shows an email error message if the email is invalid', async () => {
    render(<FindPassword />);
    const { emailInput } = setupElements();
    fireEvent.blur(emailInput);
    await waitFor(() => {
      expect(screen.getByText(ERRORS.emailRequired)).toBeInTheDocument();
    });
    fireEvent.change(emailInput, { target: { value: '123' } });
    await waitFor(() => {
      expect(screen.getByText(ERRORS.emailInvalid)).toBeInTheDocument();
    });
  });

  it('submit the values if the values are valid', async () => {
    const onSubmit = jest.fn();
    render(<FindPasswordForm onSubmit={onSubmit} />);
    const { emailInput, submitButton } = setupElements();

    const values = { email: '123@a.com' };
    fireEvent.change(emailInput, {
      target: { value: values.email },
    });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(values);
    });
  });
});
