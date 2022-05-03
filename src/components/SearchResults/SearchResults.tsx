import classNames from 'classnames';
import { usePostsContext } from 'context/PostsContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Post } from 'types';
import { fetcher } from 'utils/api';
import styles from './SearchResults.module.scss';

export interface SearchResultsProps {
  value: string;
  onClick: () => void;
}

function SearchResults({ value, onClick }: SearchResultsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data } = useSWR<Post[]>(
    `/post/search?keyword=${value}&lastPostId=${Number.MAX_SAFE_INTEGER}&size=5`,
    fetcher
  );
  const { dispatch } = usePostsContext();

  useEffect(() => {
    const moveFocus = (event: KeyboardEvent) => {
      if (!data) return;
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setCurrentIndex((prev) => (prev + 1) % (data.length + 1));
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setCurrentIndex((prev) => (prev - 1 < 0 ? data.length : prev - 1));
      }
    };
    window.addEventListener('keydown', moveFocus);
    return () => window.removeEventListener('keydown', moveFocus);
  }, [data]);

  useEffect(() => {
    const enter = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        const selectors = `.${styles.results} li[data-index="${currentIndex}"] a`;
        const anchor = document.querySelector<HTMLElement>(selectors);
        anchor?.click();
      }
    };
    window.addEventListener('keydown', enter);
    return () => window.removeEventListener('keydown', enter);
  }, [currentIndex]);

  return (
    <ul
      className={styles.results}
      onClick={onClick}
      data-testid="search-results"
    >
      <li
        className={classNames(
          styles.searchAll,
          currentIndex === 0 && styles.selected
        )}
        data-index={0}
        onClick={() => dispatch({ type: 'RESET' })}
      >
        <Link href={`/search?q=${value}`}>
          <a tabIndex={-1}>
            <span>{value}</span>
            <span>모두 검색</span>
          </a>
        </Link>
      </li>
      {data?.map(({ id, title, content }, index) => (
        <li
          key={id}
          className={classNames(index + 1 === currentIndex && styles.selected)}
          data-index={index + 1}
        >
          <Link href={`/post/${id}`}>
            <a tabIndex={-1}>
              <span>{title}</span>
              <span>{content}</span>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default SearchResults;
