import { fireEvent, render, screen } from '@testing-library/react';
import AccountMenu from './AccountMenu';

describe('AccountMenu', () => {
  const setup = () => {
    const utils = render(<AccountMenu />);
    const button = screen.getByLabelText('계정 메뉴') as HTMLButtonElement;
    return {
      button,
      ...utils,
    };
  };

  it('renders properly', () => {
    const { button } = setup();
    expect(screen.getByAltText('사용자 프로필 이미지')).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('shows detail when expanded', () => {
    const { button } = setup();
    fireEvent.click(button);
    expect(screen.getByTestId('account-menu-detail')).toBeInTheDocument();
  });

  it('hides detail when closed', () => {
    const { button } = setup();
    fireEvent.click(button);
    fireEvent.click(button);
    expect(screen.queryByTestId('account-menu-detail')).not.toBeInTheDocument();
  });

  it('closes detail when click outside', () => {
    const { button } = setup();
    fireEvent.click(button);
    fireEvent.click(document.body);
    expect(screen.queryByTestId('account-menu-detail')).not.toBeInTheDocument();
  });

  it('closes detail when press esc key', () => {
    const { button } = setup();
    fireEvent.click(button);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByTestId('account-menu-detail')).not.toBeInTheDocument();
  });
});
