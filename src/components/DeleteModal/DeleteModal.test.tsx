import { fireEvent, render, screen } from 'utils/test-utils';
import DeleteModal, { DeleteModalProps } from './DeleteModal';

describe('DeleteModal', () => {
  const setup = (props: Partial<DeleteModalProps> = {}) => {
    const initialProps: DeleteModalProps = {
      title: '제목',
      message: '설명 글',
      onConfirm: jest.fn(),
      onCancel: jest.fn(),
    };
    const utils = render(<DeleteModal {...initialProps} {...props} />);
    const confirmButton = screen.getByText('삭제') as HTMLButtonElement;
    const cancelButton = screen.getByLabelText(
      '삭제 취소'
    ) as HTMLButtonElement;
    return {
      initialProps,
      confirmButton,
      cancelButton,
      ...utils,
    };
  };

  it('renders properly', () => {
    const { initialProps } = setup();
    const { title, message } = initialProps;
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('calls onConfirm when the confirmButton is clicked', () => {
    const { initialProps, confirmButton } = setup();
    const { onConfirm } = initialProps;
    fireEvent.click(confirmButton);
    expect(onConfirm).toHaveBeenCalled();
  });

  it('calls onCancel when the cancelButton is clicked', () => {
    const { initialProps, cancelButton } = setup();
    const { onCancel } = initialProps;
    fireEvent.click(cancelButton);
    expect(onCancel).toHaveBeenCalled();
  });

  it('calls onCancel when click outside', async () => {
    const { initialProps } = setup();
    const { onCancel } = initialProps;
    fireEvent.click(screen.getByTestId('delete-modal'));
    expect(onCancel).toHaveBeenCalled();
  });
});
