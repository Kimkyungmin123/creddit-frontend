import { Close, Search } from 'icons';
import { useEffect, useRef, useState } from 'react';
import styles from './SearchBar.module.scss';

function SearchBar() {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const focus = (event: KeyboardEvent) => {
      if (event.key === '/' && document.activeElement !== inputRef.current) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', focus);
    return () => window.removeEventListener('keydown', focus);
  }, []);

  return (
    <label
      className={styles.searchBar}
      data-testid="search-bar"
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <Search className={styles.searchIcon} />
      <input
        placeholder="검색"
        onChange={(event) => setValue(event.target.value)}
        value={value}
        ref={inputRef}
      />
      {!focused && <div className={styles.slash}>/</div>}
      {value && (
        <button
          className={styles.closeButton}
          aria-label="검색 내용 지우기"
          onClick={() => setValue('')}
        >
          <Close />
        </button>
      )}
    </label>
  );
}

export default SearchBar;
