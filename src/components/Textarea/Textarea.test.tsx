import { fireEvent, render, screen } from 'utils/test-utils';
import Textarea, { TextareaProps } from './Textarea';

describe('Textarea', () => {
  const setup = (props: Partial<TextareaProps> = {}) => {
    const initialProps: TextareaProps = {
      value: 'value',
      onChange: jest.fn(),
      placeholder: 'placeholder',
    };
    const utils = render(<Textarea {...initialProps} {...props} />);
    const textarea = screen.getByPlaceholderText(
      initialProps.placeholder
    ) as HTMLInputElement;
    return {
      initialProps,
      textarea,
      ...utils,
    };
  };

  it('renders properly', () => {
    const { initialProps, textarea } = setup();
    const { value } = initialProps;
    expect(textarea).toBeInTheDocument();
    expect(textarea.value).toBe(value);
  });

  it('calls onChange when input is changed', () => {
    const { initialProps, textarea } = setup();
    const { onChange } = initialProps;
    fireEvent.change(textarea, { target: { value: '안녕하세요' } });
    expect(onChange).toHaveBeenCalled();
  });
});
