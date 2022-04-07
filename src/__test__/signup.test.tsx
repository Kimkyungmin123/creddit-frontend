import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ERRORS from 'constants/errors';
import Signup, { SignupForm } from 'pages/signup';

describe('Signup', () => {
  const setupElements = () => {
    const emailInput = screen.getByLabelText('이메일') as HTMLInputElement;
    const nicknameInput = screen.getByLabelText('닉네임') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('비밀번호') as HTMLInputElement;
    const submitButton = screen.getByTestId(
      'submitButton'
    ) as HTMLButtonElement;
    return {
      emailInput,
      nicknameInput,
      passwordInput,
      submitButton,
    };
  };

  it('renders properly', () => {
    render(<Signup />);
    const { emailInput, nicknameInput, passwordInput, submitButton } =
      setupElements();

    expect(screen.getByTestId('layout')).toBeInTheDocument();
    expect(
      screen.getByText('회원가입', { selector: 'h1' })
    ).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(nicknameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(screen.getByTestId('socialLoginButtons')).toBeInTheDocument();
    expect(screen.getByText('이미 회원이신가요?')).toBeInTheDocument();
    screen.getAllByText('로그인').forEach((el) => {
      expect(el).toHaveAttribute('href', '/login');
    });
  });

  it('shows an email error message if the email is invalid', async () => {
    render(<Signup />);
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

  it('shows an nickname error message if the nickname is invalid', async () => {
    render(<Signup />);
    const { nicknameInput } = setupElements();
    fireEvent.blur(nicknameInput);
    await waitFor(() => {
      expect(screen.getByText(ERRORS.nicknameRequired)).toBeInTheDocument();
    });
  });

  it('shows an password error message if the password is invalid', async () => {
    render(<Signup />);
    const { passwordInput } = setupElements();
    fireEvent.blur(passwordInput);
    await waitFor(() => {
      expect(screen.getByText(ERRORS.passwordRequired)).toBeInTheDocument();
    });
  });

  it('submit the values if the values are valid', async () => {
    const onSubmit = jest.fn();
    render(<SignupForm onSubmit={onSubmit} />);
    const { emailInput, nicknameInput, passwordInput, submitButton } =
      setupElements();

    const values = { email: '123@a.com', nickname: '123', password: '123' };
    fireEvent.change(emailInput, { target: { value: values.email } });
    fireEvent.change(nicknameInput, { target: { value: values.nickname } });
    fireEvent.change(passwordInput, { target: { value: values.password } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(values);
    });
  });
});
