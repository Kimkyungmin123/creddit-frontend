import { render, screen, fireEvent } from '@testing-library/react';
import Input, { InputProps } from './Input';

describe('Input', () => {
  const setup = (props: Partial<InputProps> = {}) => {
    const initialProps: InputProps = {
      value: 'value',
      onChange: jest.fn(),
      placeholder: 'placeholder',
    };
    const utils = render(<Input {...initialProps} {...props} />);
    const input = screen.getByLabelText(
      initialProps.placeholder
    ) as HTMLInputElement;
    return {
      initialProps,
      input,
      ...utils,
    };
  };

  it('renders properly', () => {
    const type = 'email';
    const { initialProps, input } = setup({ type });
    const { value, placeholder } = initialProps;
    expect(screen.getByText(placeholder)).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input.value).toBe(value);
    expect(input.type).toBe(type);
  });

  it('sets the type as text if the type is undefined', () => {
    const { input } = setup();
    expect(input.type).toBe('text');
  });

  it('sets the type as text if the type is incorrect', () => {
    const type = 'ㅎㅎ';
    const { input } = setup({ type });
    expect(input.type).toBe('text');
  });

  it('calls onChange when input is changed', () => {
    const { initialProps, input } = setup();
    const { onChange } = initialProps;
    fireEvent.change(input, { target: { value: 'abc@gma' } });
    expect(onChange).toHaveBeenCalled();
  });

  it('calls onBlur if the onBlur is defined and blur', () => {
    const onBlur = jest.fn();
    const { input } = setup({ onBlur });
    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalled();
  });

  it('shows error when there is an error', () => {
    const error = 'error';
    setup({ error });
    expect(screen.getByText(error)).toBeInTheDocument();
  });
});
