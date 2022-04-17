import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ERRORS from 'constants/errors';
import { server } from 'mocks/server';
import { rest } from 'msw';
import Login, { LoginForm } from 'pages/login';
import '../mocks/matchMedia.ts';

server.use(
  rest.get('/api/me', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  })
);

describe('Login', () => {
  const setupElements = async () => {
    let emailInput!: HTMLInputElement;
    await waitFor(() => {
      emailInput = screen.getByLabelText('이메일');
    });
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

  it('renders properly', async () => {
    render(<Login />);
    const { emailInput, passwordInput, submitButton } = await setupElements();

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
    const { emailInput } = await setupElements();
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
    const { passwordInput } = await setupElements();
    fireEvent.blur(passwordInput);
    await waitFor(() => {
      expect(screen.getByText(ERRORS.passwordRequired)).toBeInTheDocument();
    });
  });

  it('submit the values if the values are valid', async () => {
    const onSubmit = jest.fn();
    render(<LoginForm onSubmit={onSubmit} />);
    const { emailInput, passwordInput, submitButton } = await setupElements();

    const values = { email: '123@a.com', password: '123' };
    fireEvent.change(emailInput, { target: { value: values.email } });
    fireEvent.change(passwordInput, { target: { value: values.password } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(values);
    });
  });
});
