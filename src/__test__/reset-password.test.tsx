import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ERRORS } from '../constants';
import ResetPassword, { ResetPasswordForm } from '../pages/reset-password';

describe('ResetPassword', () => {
  const setupElements = () => {
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
    render(<ResetPassword />);
    const { newPasswordInput, newPasswordConfirmInput, submitButton } =
      setupElements();

    expect(screen.getByTestId('layout')).toBeInTheDocument();
    expect(
      screen.getByText('비밀번호 재설정', { selector: 'h1' })
    ).toBeInTheDocument();
    expect(newPasswordInput).toBeInTheDocument();
    expect(newPasswordConfirmInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('shows an newPassword error message if the newPassword is invalid', async () => {
    render(<ResetPassword />);
    const { newPasswordInput } = setupElements();
    fireEvent.blur(newPasswordInput);
    await waitFor(() => {
      expect(screen.getByText(ERRORS.newPasswordRequired)).toBeInTheDocument();
    });
  });

  it('shows an newPasswordConfirm error message if the newPasswordConfirm is invalid', async () => {
    render(<ResetPassword />);
    const { newPasswordConfirmInput } = setupElements();
    fireEvent.blur(newPasswordConfirmInput);
    await waitFor(() => {
      expect(
        screen.getByText(ERRORS.newPasswordConfirmRequired)
      ).toBeInTheDocument();
    });
  });

  it('submit the values if the values are valid', async () => {
    const onSubmit = jest.fn();
    render(<ResetPasswordForm onSubmit={onSubmit} />);
    const { newPasswordInput, newPasswordConfirmInput, submitButton } =
      setupElements();

    const values = { newPassword: '123', newPasswordConfirm: '123' };
    fireEvent.change(newPasswordInput, {
      target: { value: values.newPassword },
    });
    fireEvent.change(newPasswordConfirmInput, {
      target: { value: values.newPasswordConfirm },
    });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(values);
    });
  });
});
