import { Close, Search } from 'icons';
import { useState } from 'react';
import styles from './SearchBar.module.scss';

function SearchBar() {
  const [value, setValue] = useState('');

  return (
    <label className={styles.searchBar} data-testid="search-bar">
      <Search className={styles.searchIcon} />
      <input
        placeholder="검색"
        onChange={(event) => setValue(event.target.value)}
        value={value}
      />
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
