import { fireEvent, render, screen, waitFor } from 'utils/test-utils';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  const setup = () => {
    const utils = render(<SearchBar />);
    const searchInput = screen.getByPlaceholderText('검색') as HTMLInputElement;
    return {
      ...utils,
      searchInput,
    };
  };

  it('renders properly', () => {
    const { searchInput } = setup();
    expect(searchInput).toBeInTheDocument();
    expect(screen.queryByLabelText('검색 내용 지우기')).not.toBeInTheDocument();
  });

  it('removes value when click the remove button', () => {
    const { searchInput } = setup();
    fireEvent.change(searchInput, { target: { value: '123' } });
    const removeButton = screen.getByLabelText('검색 내용 지우기');
    expect(removeButton).toBeInTheDocument();
    fireEvent.click(removeButton);
    expect(searchInput.value).toBe('');
  });

  it('moves focus when press the slash key or escape key', () => {
    const { searchInput } = setup();
    fireEvent.keyDown(window, { key: '/' });
    expect(searchInput).toHaveFocus();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(searchInput).not.toHaveFocus();
  });

  it('shows search results when input has a value', async () => {
    const { searchInput } = setup();
    fireEvent.change(searchInput, { target: { value: '123' } });
    await waitFor(() => {
      expect(screen.getByTestId('search-results')).toBeInTheDocument();
    });
  });
});
