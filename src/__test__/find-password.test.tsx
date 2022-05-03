import ERRORS from 'constants/errors';
import { server } from 'mocks/server';
import { rest } from 'msw';
import FindPassword from 'pages/find-password';
import { API_ENDPOINT } from 'utils/api';
import { fireEvent, render, screen, waitFor } from 'utils/test-utils';

describe('FindPassword', () => {
  const setup = async () => {
    render(<FindPassword />);
    let emailInput!: HTMLInputElement;
    await waitFor(() => {
      emailInput = screen.getByLabelText('이메일');
    });
    const submitButton = screen.getByTestId(
      'submitButton'
    ) as HTMLButtonElement;
    return {
      emailInput,
      submitButton,
    };
  };

  beforeEach(() => {
    server.use(
      rest.get(`${API_ENDPOINT}/profile/show`, (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(null));
      })
    );
  });

  it('renders properly', async () => {
    const { emailInput, submitButton } = await setup();
    expect(screen.getByTestId('layout')).toBeInTheDocument();
    expect(
      screen.getByText('비밀번호 찾기', { selector: 'h1' })
    ).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(
      screen.getByText(
        '이메일을 입력하고 확인 버튼을 누르시면, 해당 이메일로 임시 비밀번호를 보내드립니다.'
      )
    ).toBeInTheDocument();
  });

  it('shows an email error message if the email is invalid', async () => {
    const { emailInput, submitButton } = await setup();
    fireEvent.blur(emailInput);
    await waitFor(() => {
      expect(screen.getByText(ERRORS.emailRequired)).toBeInTheDocument();
    });
    fireEvent.change(emailInput, { target: { value: '123' } });
    await waitFor(() => {
      expect(screen.getByText(ERRORS.emailInvalid)).toBeInTheDocument();
    });
    fireEvent.change(emailInput, { target: { value: '123@a.com' } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText(ERRORS.emailNotFound)).toBeInTheDocument();
    });
  });

  it('sends an temporary password if the email exists', async () => {
    const { emailInput, submitButton } = await setup();
    fireEvent.change(emailInput, { target: { value: 'duplicate@a.com' } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(
        screen.getByText('해당 이메일로 임시 비밀번호를 보내드렸습니다.')
      ).toBeInTheDocument();
    });
    expect(screen.getByText('홈으로')).toHaveAttribute('href', '/');
  });
});
