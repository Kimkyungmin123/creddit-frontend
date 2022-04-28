import ERRORS from 'constants/errors';
import userDummy from 'data/user.json';
import { fireEvent, render, screen, waitFor } from 'utils/test-utils';
import ProfileEditForm, { ProfileEditFormProps } from './ProfileEditForm';

describe('ProfileEditForm', () => {
  const setup = (props: Partial<ProfileEditFormProps> = {}) => {
    const initialProps: ProfileEditFormProps = {
      user: userDummy,
      onSubmit: jest.fn(),
      onCancel: jest.fn(),
    };
    const utils = render(<ProfileEditForm {...initialProps} {...props} />);
    const nicknameTextarea = screen.getByPlaceholderText(
      '닉네임'
    ) as HTMLTextAreaElement;
    const introductionTextarea = screen.getByPlaceholderText(
      '소개'
    ) as HTMLTextAreaElement;
    const submitButton = screen.getByText('저장') as HTMLButtonElement;
    const cancelButton = screen.getByText('취소') as HTMLButtonElement;
    return {
      initialProps,
      nicknameTextarea,
      introductionTextarea,
      submitButton,
      cancelButton,
      ...utils,
    };
  };

  it('renders properly', () => {
    const {
      initialProps,
      nicknameTextarea,
      introductionTextarea,
      submitButton,
      cancelButton,
    } = setup();
    const { user } = initialProps;
    expect(nicknameTextarea.value).toBe(user.nickname);
    expect(introductionTextarea.value).toBe(user.introduction);
    expect(submitButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  it('shows an nickname error message if the nickname is invalid', async () => {
    const { nicknameTextarea } = setup();
    fireEvent.change(nicknameTextarea, { target: { value: '' } });
    fireEvent.blur(nicknameTextarea);
    await waitFor(() => {
      expect(screen.getByText(ERRORS.nicknameRequired)).toBeInTheDocument();
    });
    fireEvent.change(nicknameTextarea, { target: { value: '1' } });
    await waitFor(() => {
      expect(screen.getByText(ERRORS.nicknameShort)).toBeInTheDocument();
    });
    fireEvent.change(nicknameTextarea, { target: { value: '1234567890a' } });
    await waitFor(() => {
      expect(screen.getByText(ERRORS.nicknameLong)).toBeInTheDocument();
    });
    fireEvent.change(nicknameTextarea, { target: { value: '!' } });
    await waitFor(() => {
      expect(screen.getByText(ERRORS.nicknameInvalid)).toBeInTheDocument();
    });
  });

  it('calls onCancel when the cancelButton is clicked', () => {
    const { initialProps, cancelButton } = setup();
    const { onCancel } = initialProps;
    fireEvent.click(cancelButton);
    expect(onCancel).toHaveBeenCalled();
  });

  it('shows an duplicate error message if a nickname already exists', async () => {
    const { nicknameTextarea, submitButton } = setup();
    fireEvent.change(nicknameTextarea, { target: { value: 'duplicate' } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText(ERRORS.nicknameDuplicate)).toBeInTheDocument();
    });
  });

  it('submit the values if the values are valid', async () => {
    const {
      initialProps,
      nicknameTextarea,
      introductionTextarea,
      submitButton,
    } = setup();
    const { onSubmit } = initialProps;
    const values = {
      nickname: 'ㄱ이름-_1aZ',
      introduction: '반갑습니다',
    };
    fireEvent.change(nicknameTextarea, { target: { value: values.nickname } });
    fireEvent.change(introductionTextarea, {
      target: { value: values.introduction },
    });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(values);
    });
  });
});
