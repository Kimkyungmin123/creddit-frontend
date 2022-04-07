import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ERRORS from 'constants/errors';
import Login, { LoginForm } from 'pages/login';

describe('Login', () => {
  const setupElements = () => {
    const emailInput = screen.getByLabelText('이메일') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('비밀번호') as HTMLInputElement;
    const submitButton = screen.getByTestId(
      'submitButton'
    ) as HTMLButtonElement;
    return {
      emailInput,
      passwordInput,
      submitButton,
    };
  };

  it('renders properly', () => {
    render(<Login />);
    const { emailInput, passwordInput, submitButton } = setupElements();

    expect(screen.getByTestId('layout')).toBeInTheDocument();
    expect(screen.getByText('로그인', { selector: 'h1' })).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(screen.getByTestId('socialLoginButtons')).toBeInTheDocument();
    expect(screen.getByText('비밀번호를 잊으셨습니까?')).toHaveAttribute(
      'href',
      '/find-password'
    );
    expect(screen.getByText('아직 회원이 아니신가요?')).toBeInTheDocument();
    screen.getAllByText('회원가입').forEach((el) => {
      expect(el).toHaveAttribute('href', '/signup');
    });
  });

  it('shows an email error message if the email is invalid', async () => {
    render(<Login />);
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

  it('shows an password error message if the password is invalid', async () => {
    render(<Login />);
    const { passwordInput } = setupElements();
    fireEvent.blur(passwordInput);
    await waitFor(() => {
      expect(screen.getByText(ERRORS.passwordRequired)).toBeInTheDocument();
    });
  });

  it('submit the values if the values are valid', async () => {
    const onSubmit = jest.fn();
    render(<LoginForm onSubmit={onSubmit} />);
    const { emailInput, passwordInput, submitButton } = setupElements();

    const values = { email: '123@a.com', password: '123' };
    fireEvent.change(emailInput, { target: { value: values.email } });
    fireEvent.change(passwordInput, { target: { value: values.password } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(values);
    });
  });
});
