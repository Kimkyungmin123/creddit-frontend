import { render, screen, fireEvent } from '@testing-library/react';
import Button, { ButtonProps } from './Button';

describe('Button', () => {
  const setup = (props: Partial<ButtonProps> = {}) => {
    const children = 'button';
    const utils = render(<Button {...props}>{children}</Button>);
    const button = screen.getByText(children) as HTMLButtonElement;
    return {
      children,
      button,
      ...utils,
    };
  };

  it('renders properly', () => {
    const type = 'button';
    const { button } = setup({ type });
    expect(button).toBeInTheDocument();
    expect(button.type).toBe(type);
  });

  it('sets the type as submit if the type is undefined', () => {
    const { button } = setup();
    expect(button.type).toBe('submit');
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    const { button } = setup({ onClick });
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  it('is disabled when disabled.', () => {
    const { button } = setup({ disabled: true });
    expect(button).toBeDisabled();
  });
});
