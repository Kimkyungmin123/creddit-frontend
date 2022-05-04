import postDummy from 'data/post.json';
import { fireEvent, render, screen, waitFor } from 'utils/test-utils';
import SearchResults, { SearchResultsProps } from './SearchResults';

describe('SearchResults', () => {
  const setup = () => {
    const initialProps: SearchResultsProps = {
      value: 'value',
      onClick: jest.fn(),
    };
    const utils = render(<SearchResults {...initialProps} />);
    return {
      initialProps,
      ...utils,
    };
  };

  it('renders properly', async () => {
    const { initialProps } = setup();
    const { value } = initialProps;
    expect(screen.getByText(value)).toBeInTheDocument();
    expect(screen.getByText('모두 검색')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(postDummy.title)).toBeInTheDocument();
    });
    expect(screen.getByText(postDummy.content)).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const { initialProps } = setup();
    const { onClick } = initialProps;
    fireEvent.click(screen.getByTestId('search-results'));
    expect(onClick).toHaveBeenCalled();
  });
});
