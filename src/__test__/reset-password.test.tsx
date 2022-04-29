import ERRORS from 'constants/errors';
import ResetPassword from 'pages/reset-password';
import { fireEvent, render, screen, waitFor } from 'utils/test-utils';

describe('ResetPassword', () => {
  const setup = () => {
    render(<ResetPassword />);
    const newPasswordInput = screen.getByLabelText(
      '새 비밀번호'
    ) as HTMLInputElement;
    const newPasswordConfirmInput = screen.getByLabelText(
      '새 비밀번호 확인'
    ) as HTMLInputElement;
    const submitButton = screen.getByTestId(
      'submitButton'
    ) as HTMLButtonElement;
    return {
      newPasswordInput,
      newPasswordConfirmInput,
      submitButton,
    };
  };

  it('renders properly', () => {
    const { newPasswordInput, newPasswordConfirmInput, submitButton } = setup();

    expect(screen.getByTestId('layout')).toBeInTheDocument();
    expect(
      screen.getByText('비밀번호 변경', { selector: 'h1' })
    ).toBeInTheDocument();
    expect(newPasswordInput).toBeInTheDocument();
    expect(newPasswordConfirmInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('shows an password error message if the newPassword is invalid', async () => {
    const { newPasswordInput } = setup();
    fireEvent.blur(newPasswordInput);
    await waitFor(() => {
      expect(screen.getByText(ERRORS.passwordRequired)).toBeInTheDocument();
    });
    fireEvent.change(newPasswordInput, { target: { value: 'aA1#' } });
    await waitFor(() => {
      expect(screen.getByText(ERRORS.passwordShort)).toBeInTheDocument();
    });
    fireEvent.change(newPasswordInput, {
      target: { value: '12345678901234567890aA#' },
    });
    await waitFor(() => {
      expect(screen.getByText(ERRORS.passwordLong)).toBeInTheDocument();
    });
    fireEvent.change(newPasswordInput, {
      target: { value: '12345678a' },
    });
    await waitFor(() => {
      expect(screen.getByText(ERRORS.passwordInvalid)).toBeInTheDocument();
    });
  });

  it('shows an newnewPasswordConfirm error message if the newnewPasswordConfirm is invalid', async () => {
    const { newPasswordInput, newPasswordConfirmInput } = setup();

    fireEvent.change(newPasswordInput, { target: { value: 'qqqqqqQ1!' } });
    fireEvent.change(newPasswordConfirmInput, { target: { value: '123' } });
    fireEvent.blur(newPasswordConfirmInput);
    await waitFor(() => {
      expect(
        screen.getByText(ERRORS.newPasswordConfirmInvalid)
      ).toBeInTheDocument();
    });
  });

  it('changes password successfully if the values are valid', async () => {
    const { newPasswordInput, newPasswordConfirmInput, submitButton } = setup();
    const values = {
      newPassword: 'qqqqqqQ1!',
      newnewPasswordConfirm: 'qqqqqqQ1!',
    };
    fireEvent.change(newPasswordInput, {
      target: { value: values.newPassword },
    });
    fireEvent.change(newPasswordConfirmInput, {
      target: { value: values.newnewPasswordConfirm },
    });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(
        screen.getByText('비밀번호를 성공적으로 변경했습니다.')
      ).toBeInTheDocument();
    });
    expect(screen.getByText('홈으로')).toHaveAttribute('href', '/');
  });
});
