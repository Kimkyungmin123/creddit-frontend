import { Search } from 'icons';
import styles from './SearchBar.module.scss';

function SearchBar() {
  return (
    <div className={styles.headerPostSearch} data-testid="search-bar">
      <Search className={styles.searchIcon} />
      <input type="text" placeholder="검색" />
    </div>
  );
}

export default SearchBar;
