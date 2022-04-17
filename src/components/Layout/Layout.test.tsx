import { render, screen } from '@testing-library/react';
import Layout, { LayoutProps } from './Layout';
import '../../mocks/matchMedia.mock';

describe('Layout', () => {
  const setup = (props: Partial<LayoutProps> = {}) => {
    const initialProps: LayoutProps = {
      children: 'children',
      title: 'creddit',
    };
    const utils = render(<Layout {...initialProps} {...props}></Layout>);
    return {
      initialProps,
      ...utils,
    };
  };

  it('renders properly', () => {
    setup();
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('hides the search bar if hideSearchBar is true', () => {
    setup({ hideSearchBar: true });
    expect(screen.queryByTestId('search-bar')).not.toBeInTheDocument();
  });
});
