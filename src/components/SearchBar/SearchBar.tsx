import classNames from 'classnames';
import SearchResults from 'components/SearchResults/SearchResults';
import useDebounce from 'hooks/useDebounce';
import { Close, Search } from 'icons';
import { useEffect, useRef, useState } from 'react';
import styles from './SearchBar.module.scss';

function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState('');
  const debounce = useDebounce();

  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if (event.key === '/' && document.activeElement !== inputRef.current) {
        event.preventDefault();
        inputRef.current?.focus();
      } else if (event.key === 'Escape') {
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', keydown);
    return () => window.removeEventListener('keydown', keydown);
  }, []);

  let clickedWithMouse = false;
  return (
    <form
      className={classNames(styles.searchBar, value && styles.editing)}
      data-testid="search-bar"
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
      }}
      onMouseDown={() => {
        clickedWithMouse = true;
      }}
    >
      <label
        onFocus={() => {
          setFocused(true);
          setDebouncedValue(value);
        }}
        onBlur={() => {
          setFocused(false);
          if (!clickedWithMouse) setDebouncedValue('');
        }}
      >
        <Search className={styles.searchIcon} />
        <input
          placeholder="검색"
          onChange={(event) => {
            const { value } = event.target;
            setValue(value);
            debounce(() => {
              setDebouncedValue(value);
            }, 150);
          }}
          value={value}
          ref={inputRef}
        />
        {!focused && <div className={styles.slash}>/</div>}
        {value && (
          <button
            type="button"
            className={styles.closeButton}
            aria-label="검색 내용 지우기"
            onClick={() => setValue('')}
            tabIndex={-1}
          >
            <Close />
          </button>
        )}
      </label>
      {debouncedValue && (
        <SearchResults
          value={debouncedValue}
          onClick={() => setDebouncedValue('')}
        />
      )}
    </form>
  );
}

export default SearchBar;
