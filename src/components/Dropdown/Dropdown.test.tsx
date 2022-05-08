import { fireEvent, render, screen } from 'utils/test-utils';
import Dropdown, { DropdownProps } from './Dropdown';

describe('Dropdown', () => {
  const setup = () => {
    const initialProps: DropdownProps = {
      children: 'children',
      options: [],
      ariaLabel: 'ariaLabel',
    };
    const utils = render(<Dropdown {...initialProps} />);
    const button = screen.getByLabelText(
      '' + initialProps.ariaLabel
    ) as HTMLButtonElement;
    return {
      initialProps,
      button,
      ...utils,
    };
  };

  it('renders properly', () => {
    const { button } = setup();
    expect(button).toBeInTheDocument();
  });

  it('shows detail when expanded', () => {
    const { button } = setup();
    fireEvent.click(button);
    expect(screen.getByTestId('dropdown-detail')).toBeInTheDocument();
  });

  it('hides detail when closed', () => {
    const { button } = setup();
    fireEvent.click(button);
    fireEvent.click(button);
    expect(screen.queryByTestId('dropdown-detail')).not.toBeInTheDocument();
  });

  it('closes detail when click outside', () => {
    const { button } = setup();
    fireEvent.click(button);
    fireEvent.click(document.body);
    expect(screen.queryByTestId('dropdown-detail')).not.toBeInTheDocument();
  });

  it('closes detail when press esc key', () => {
    const { button } = setup();
    fireEvent.click(button);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByTestId('dropdown-detail')).not.toBeInTheDocument();
  });
});
